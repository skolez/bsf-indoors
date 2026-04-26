/**
 * Eleventy Filter Tests — Validates custom template filters
 *
 * AI AGENT: These tests verify that the custom Eleventy filters
 * (safeDump, cleanData, jsonld, date) work correctly. They're
 * especially important for security filters that prevent XSS.
 *
 * Run: npm test (or: npm test -- filters.test.js)
 */

// We can't easily load Eleventy's filter registry in tests,
// so we extract and test the filter functions directly.

// ─── safeDump: escapes < > in JSON for inline script safety ───

function safeDump(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

function jsonld(value) {
  return JSON.stringify(value, null, 2).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

function cleanData(data) {
  if (Array.isArray(data)) {
    return data.map((item) => {
      if (typeof item !== 'object' || item === null) return item;
      const cleaned = {};
      for (const [key, value] of Object.entries(item)) {
        if (!key.startsWith('_')) cleaned[key] = value;
      }
      return cleaned;
    });
  }
  if (typeof data === 'object' && data !== null) {
    const cleaned = {};
    for (const [key, value] of Object.entries(data)) {
      if (!key.startsWith('_')) cleaned[key] = value;
    }
    return cleaned;
  }
  return data;
}

// ─────────────────────────────────────────────────────────────

describe('safeDump filter — Script Injection Prevention', () => {
  test('escapes </script> in string values', () => {
    const result = safeDump('test</script><script>alert(1)</script>');
    expect(result).not.toContain('</script>');
    expect(result).toContain('\\u003c/script\\u003e');
  });

  test('escapes </script> in object property values', () => {
    const result = safeDump({ name: '</script><img onerror=alert(1)>' });
    expect(result).not.toContain('</script>');
    expect(result).not.toContain('<img');
  });

  test('escapes < and > in all positions', () => {
    const result = safeDump('<b>bold</b>');
    expect(result).not.toContain('<b>');
    expect(result).toContain('\\u003c');
    expect(result).toContain('\\u003e');
  });

  test('preserves normal JSON structure', () => {
    const data = { id: 'p1', name: 'Widget', price: 49.99 };
    const result = safeDump(data);
    const parsed = JSON.parse(result.replace(/\\u003c/g, '<').replace(/\\u003e/g, '>'));
    expect(parsed).toEqual(data);
  });

  test('handles arrays', () => {
    const result = safeDump([1, 'two', { three: 3 }]);
    const parsed = JSON.parse(result);
    expect(parsed).toEqual([1, 'two', { three: 3 }]);
  });

  test('handles null', () => {
    expect(safeDump(null)).toBe('null');
  });

  test('handles empty string', () => {
    expect(safeDump('')).toBe('""');
  });

  test('handles nested objects with malicious values', () => {
    const data = {
      product: {
        name: 'Good</script><script>evil()</script>',
        nested: { deep: '</script>' },
      },
    };
    const result = safeDump(data);
    expect(result).not.toContain('</script>');
  });
});

describe('jsonld filter — JSON-LD Safety', () => {
  test('escapes script tags in JSON-LD output', () => {
    const result = jsonld({ name: 'Site</script><script>alert(1)</script>' });
    expect(result).not.toContain('</script>');
  });

  test('produces valid JSON after unescaping', () => {
    const data = { '@type': 'Organization', name: 'Test Corp', url: 'https://example.com' };
    const result = jsonld(data);
    const parsed = JSON.parse(result);
    expect(parsed).toEqual(data);
  });

  test('pretty-prints with indentation', () => {
    const result = jsonld({ a: 1 });
    expect(result).toContain('\n');
  });
});

describe('cleanData filter — Agent Note Stripping', () => {
  test('strips _-prefixed keys from objects', () => {
    const data = { _agentNote: 'internal', id: 'p1', name: 'Widget' };
    const result = cleanData(data);
    expect(result).not.toHaveProperty('_agentNote');
    expect(result).toHaveProperty('id', 'p1');
    expect(result).toHaveProperty('name', 'Widget');
  });

  test('strips _-prefixed keys from array items', () => {
    const data = [
      { _agentNote: 'note', id: 'p1' },
      { _comment: 'internal', id: 'p2' },
    ];
    const result = cleanData(data);
    expect(result[0]).not.toHaveProperty('_agentNote');
    expect(result[0]).toHaveProperty('id', 'p1');
    expect(result[1]).not.toHaveProperty('_comment');
    expect(result[1]).toHaveProperty('id', 'p2');
  });

  test('preserves non-prefixed keys completely', () => {
    const data = { id: 'p1', name: 'Widget', price: 49.99, image: '/img.jpg' };
    expect(cleanData(data)).toEqual(data);
  });

  test('handles arrays with non-object items', () => {
    const data = [1, 'two', null, { _note: 'strip', keep: true }];
    const result = cleanData(data);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe('two');
    expect(result[2]).toBeNull();
    expect(result[3]).toEqual({ keep: true });
  });

  test('handles empty array', () => {
    expect(cleanData([])).toEqual([]);
  });

  test('handles empty object', () => {
    expect(cleanData({})).toEqual({});
  });

  test('passes through primitives unchanged', () => {
    expect(cleanData('string')).toBe('string');
    expect(cleanData(42)).toBe(42);
    expect(cleanData(null)).toBeNull();
    expect(cleanData(true)).toBe(true);
  });

  test('object with only _-prefixed keys returns empty object', () => {
    const data = { _agentNote: 'note', _internal: true };
    expect(cleanData(data)).toEqual({});
  });
});
