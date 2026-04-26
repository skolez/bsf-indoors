/**
 * Build Output Tests — Validates the Eleventy build output
 *
 * AI AGENT: These tests run AFTER `npm run build` and verify that the
 * built _site/ output is correct. They catch template errors, broken
 * links, missing pages, and data injection issues.
 *
 * These tests are designed to work regardless of what niche/products
 * the agent has configured — they test structure, not specific content.
 *
 * Run: npm test (or: npm test -- build.test.js)
 * Prereq: npm run build (tests read from _site/)
 */

const fs = require('fs');
const path = require('path');

const siteDir = path.resolve(__dirname, '..', '_site');

// Helper: read a built HTML file
function readBuilt(relativePath) {
  const fullPath = path.join(siteDir, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf-8');
}

// Helper: check if a built file exists
function builtExists(relativePath) {
  return fs.existsSync(path.join(siteDir, relativePath));
}

// ─────────────────────────────────────────────────────────────
// Build Output Existence
// ─────────────────────────────────────────────────────────────

describe('Build Output — Required Pages', () => {
  test('homepage exists', () => {
    expect(builtExists('index.html')).toBe(true);
  });

  test('store page exists', () => {
    expect(builtExists('store/index.html')).toBe(true);
  });

  test('about page exists', () => {
    expect(builtExists('about/index.html')).toBe(true);
  });

  test('contact page exists', () => {
    expect(builtExists('contact/index.html')).toBe(true);
  });

  test('disclosure page exists', () => {
    expect(builtExists('disclosure/index.html')).toBe(true);
  });

  test('blog index exists', () => {
    expect(builtExists('blog/index.html')).toBe(true);
  });

  test('404 page exists', () => {
    expect(builtExists('404.html')).toBe(true);
  });

  test('robots.txt exists', () => {
    expect(builtExists('robots.txt')).toBe(true);
  });

  test('sitemap.xml exists', () => {
    expect(builtExists('sitemap.xml')).toBe(true);
  });

  test('CSS copied to output', () => {
    expect(builtExists('css/style.css')).toBe(true);
  });

  test('JS copied to output', () => {
    expect(builtExists('js/cart.js')).toBe(true);
    expect(builtExists('js/store.js')).toBe(true);
    expect(builtExists('js/main.js')).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────
// HTML Structure Validation
// ─────────────────────────────────────────────────────────────

describe('Build Output — HTML Structure', () => {
  const pages = [
    'index.html',
    'store/index.html',
    'about/index.html',
    'contact/index.html',
    'disclosure/index.html',
    'blog/index.html',
    '404.html',
  ];

  test.each(pages)('%s has DOCTYPE', (page) => {
    const html = readBuilt(page);
    expect(html).not.toBeNull();
    expect(html).toMatch(/<!DOCTYPE html>/i);
  });

  test.each(pages)('%s has <html> and </html>', (page) => {
    const html = readBuilt(page);
    expect(html).toContain('<html');
    expect(html).toContain('</html>');
  });

  test.each(pages)('%s has <head> with meta charset', (page) => {
    const html = readBuilt(page);
    expect(html).toContain('<meta charset="UTF-8">');
  });

  test.each(pages)('%s has <title>', (page) => {
    const html = readBuilt(page);
    expect(html).toMatch(/<title>.+<\/title>/);
  });

  test.each(pages)('%s has viewport meta', (page) => {
    const html = readBuilt(page);
    expect(html).toContain('viewport');
  });

  test.each(pages)('%s has <main> content area', (page) => {
    const html = readBuilt(page);
    expect(html).toContain('<main');
  });

  test.each(pages)('%s has non-empty body', (page) => {
    const html = readBuilt(page);
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
    expect(bodyMatch).not.toBeNull();
    // Body should have substantial content (not just whitespace)
    const bodyContent = bodyMatch[1].replace(/\s+/g, '');
    expect(bodyContent.length).toBeGreaterThan(100);
  });

  test.each(pages)('%s loads main.js', (page) => {
    const html = readBuilt(page);
    expect(html).toContain('src="/js/main.js"');
  });

  test.each(pages)('%s loads style.css', (page) => {
    const html = readBuilt(page);
    expect(html).toContain('href="/css/style.css"');
  });
});

// ─────────────────────────────────────────────────────────────
// SEO Validation
// ─────────────────────────────────────────────────────────────

describe('Build Output — SEO', () => {
  const pages = [
    'index.html',
    'store/index.html',
    'about/index.html',
    'contact/index.html',
  ];

  test.each(pages)('%s has meta description', (page) => {
    const html = readBuilt(page);
    expect(html).toMatch(/<meta name="description"/);
  });

  test.each(pages)('%s has canonical URL', (page) => {
    const html = readBuilt(page);
    expect(html).toMatch(/<link rel="canonical"/);
  });

  test.each(pages)('%s has Open Graph tags', (page) => {
    const html = readBuilt(page);
    expect(html).toContain('og:title');
    expect(html).toContain('og:description');
  });

  test.each(pages)('%s has Twitter card tags', (page) => {
    const html = readBuilt(page);
    expect(html).toContain('twitter:card');
  });

  test('homepage has Organization structured data', () => {
    const html = readBuilt('index.html');
    expect(html).toContain('application/ld+json');
    expect(html).toContain('schema.org');
    expect(html).toContain('Organization');
  });

  test('robots.txt references sitemap', () => {
    const robots = readBuilt('robots.txt');
    expect(robots).toContain('sitemap.xml');
  });

  test('sitemap.xml has <urlset> with entries', () => {
    const sitemap = readBuilt('sitemap.xml');
    expect(sitemap).toContain('<urlset');
    expect(sitemap).toContain('<url>');
    expect(sitemap).toContain('<loc>');
  });

  test('sitemap.xml does not include 404 page', () => {
    const sitemap = readBuilt('sitemap.xml');
    expect(sitemap).not.toContain('404');
  });
});

// ─────────────────────────────────────────────────────────────
// Affiliate Tag & Data Injection
// ─────────────────────────────────────────────────────────────

describe('Build Output — Affiliate Integration', () => {
  test('every page has affiliate-tag meta', () => {
    const pages = ['index.html', 'store/index.html', 'about/index.html'];
    pages.forEach((page) => {
      const html = readBuilt(page);
      expect(html).toContain('name="affiliate-tag"');
    });
  });

  test('PRODUCT_ASIN_MAP is injected on store page', () => {
    const html = readBuilt('store/index.html');
    expect(html).toContain('PRODUCT_ASIN_MAP');
  });

  test('store page injects STORE_PRODUCTS', () => {
    const html = readBuilt('store/index.html');
    expect(html).toContain('STORE_PRODUCTS');
  });

  test('store page injects STORE_CATEGORIES', () => {
    const html = readBuilt('store/index.html');
    expect(html).toContain('STORE_CATEGORIES');
  });

  test('store page loads store.js', () => {
    const html = readBuilt('store/index.html');
    expect(html).toContain('src="/js/store.js"');
  });

  test('no _agentNote fields leak into HTML output', () => {
    const pages = ['index.html', 'store/index.html', 'blog/index.html'];
    pages.forEach((page) => {
      const html = readBuilt(page);
      expect(html).not.toContain('_agentNote');
      expect(html).not.toContain('_agentInstructions');
    });
  });
});

// ─────────────────────────────────────────────────────────────
// Script Injection Safety (safeDump)
// ─────────────────────────────────────────────────────────────

describe('Build Output — Script Safety', () => {
  test('no raw </script> inside inline script blocks', () => {
    const pages = ['index.html', 'store/index.html'];
    pages.forEach((page) => {
      const html = readBuilt(page);
      // Extract content between <script> and </script> tags (non-greedy)
      const scriptBlocks = html.match(/<script(?:\s[^>]*)?>[\s\S]*?<\/script>/g) || [];
      scriptBlocks.forEach((block) => {
        // Strip the opening and closing tags to get just the content
        const content = block.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
        // The content between script tags should never contain a literal </script>
        expect(content).not.toContain('</script>');
      });
    });
  });
});

// ─────────────────────────────────────────────────────────────
// Internal Link Integrity
// ─────────────────────────────────────────────────────────────

describe('Build Output — Internal Links', () => {
  test('homepage links to /store/', () => {
    const html = readBuilt('index.html');
    expect(html).toContain('href="/store/"');
  });

  test('homepage links to /blog/', () => {
    // Check nav or footer
    const html = readBuilt('index.html');
    expect(html).toContain('href="/blog/"');
  });

  test('all pages link to /disclosure/', () => {
    // Footer should have disclosure link on every page
    const pages = ['index.html', 'store/index.html', 'about/index.html'];
    pages.forEach((page) => {
      const html = readBuilt(page);
      expect(html).toContain('href="/disclosure/"');
    });
  });

  test('navigation links are consistent across pages', () => {
    const homepage = readBuilt('index.html');
    const store = readBuilt('store/index.html');

    // Both should have the same nav links
    const navLinks = ['/store/', '/blog/', '/about/', '/contact/'];
    navLinks.forEach((link) => {
      expect(homepage).toContain(`href="${link}"`);
      expect(store).toContain(`href="${link}"`);
    });
  });
});

// ─────────────────────────────────────────────────────────────
// Blog Pipeline
// ─────────────────────────────────────────────────────────────

describe('Build Output — Blog', () => {
  test('blog index lists posts', () => {
    const html = readBuilt('blog/index.html');
    // Should contain at least a link to the example post or "Coming Soon"
    const hasPost = html.includes('example-post') || html.includes('Coming Soon');
    expect(hasPost).toBe(true);
  });

  test('blog posts have Article structured data', () => {
    // Check if any blog posts exist in build output
    const blogDir = path.join(siteDir, 'blog');
    if (!fs.existsSync(blogDir)) return;

    const entries = fs.readdirSync(blogDir, { withFileTypes: true });
    const postDirs = entries.filter((e) => e.isDirectory());

    postDirs.forEach((dir) => {
      const postHtml = readBuilt(`blog/${dir.name}/index.html`);
      if (postHtml) {
        expect(postHtml).toContain('application/ld+json');
        expect(postHtml).toContain('Article');
      }
    });
  });
});
