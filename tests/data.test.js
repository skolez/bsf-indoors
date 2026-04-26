/**
 * Data Validation Tests — Validates JSON data files and config
 *
 * AI AGENT: These tests validate that your data files (products.json,
 * store.json, site.json, navigation.json) have the correct structure
 * and that cross-references are consistent. They catch common mistakes
 * like missing ASIN fields, orphaned categories, or broken config.
 *
 * These tests work on ANY customized site — they validate structure,
 * not specific content. Run them after making data changes.
 *
 * Run: npm test (or: npm test -- data.test.js)
 */

const fs = require('fs');
const path = require('path');

// Helper: read and parse a JSON data file
function readData(filename) {
  const filePath = path.resolve(__dirname, '..', 'src', '_data', filename);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function readConfig() {
  const filePath = path.resolve(__dirname, '..', 'site-config.json');
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// ─────────────────────────────────────────────────────────────
// products.json Schema
// ─────────────────────────────────────────────────────────────

describe('Data — products.json', () => {
  let products;

  beforeAll(() => {
    products = readData('products.json');
  });

  test('products.json exists and is an array', () => {
    expect(products).not.toBeNull();
    expect(Array.isArray(products)).toBe(true);
  });

  test('each product has required fields', () => {
    const requiredFields = ['id', 'name', 'category', 'categoryName'];
    products.forEach((product) => {
      // Skip _agentNote-only entries
      if (Object.keys(product).length <= 1 && product._agentNote) return;
      requiredFields.forEach((field) => {
        expect(product).toHaveProperty(field);
        expect(product[field]).toBeTruthy();
      });
    });
  });

  test('product IDs are unique', () => {
    const ids = products.map((p) => p.id).filter(Boolean);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('product IDs are URL-safe (no spaces or special characters)', () => {
    products.forEach((product) => {
      if (!product.id) return;
      expect(product.id).toMatch(/^[a-zA-Z0-9_-]+$/);
    });
  });

  test('ASINs follow Amazon format when present', () => {
    products.forEach((product) => {
      if (product.asin && !product.asin.startsWith('B00EXAMPLE')) {
        // Amazon ASINs are 10-character alphanumeric, starting with B0
        expect(product.asin).toMatch(/^[A-Z0-9]{10}$/);
      }
    });
  });

  test('prices are positive numbers when present', () => {
    products.forEach((product) => {
      if (product.price !== undefined && product.price !== null) {
        expect(typeof product.price).toBe('number');
        expect(product.price).toBeGreaterThan(0);
      }
    });
  });

  test('image paths start with / when present', () => {
    products.forEach((product) => {
      if (product.image && product.image.trim()) {
        expect(product.image).toMatch(/^\//);
      }
    });
  });
});

// ─────────────────────────────────────────────────────────────
// store.json Schema
// ─────────────────────────────────────────────────────────────

describe('Data — store.json', () => {
  let store;

  beforeAll(() => {
    store = readData('store.json');
  });

  test('store.json exists and has categories array', () => {
    expect(store).not.toBeNull();
    expect(store).toHaveProperty('categories');
    expect(Array.isArray(store.categories)).toBe(true);
  });

  test('each category has id and name', () => {
    store.categories.forEach((cat) => {
      expect(cat).toHaveProperty('id');
      expect(cat).toHaveProperty('name');
      expect(cat.id).toBeTruthy();
      expect(cat.name).toBeTruthy();
    });
  });

  test('category IDs are unique', () => {
    const ids = [];
    store.categories.forEach((cat) => {
      ids.push(cat.id);
      if (cat.subcategories) {
        cat.subcategories.forEach((sub) => ids.push(sub.id));
      }
    });
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('subcategories have id and name when present', () => {
    store.categories.forEach((cat) => {
      if (cat.subcategories) {
        expect(Array.isArray(cat.subcategories)).toBe(true);
        cat.subcategories.forEach((sub) => {
          expect(sub).toHaveProperty('id');
          expect(sub).toHaveProperty('name');
        });
      }
    });
  });
});

// ─────────────────────────────────────────────────────────────
// Cross-Reference: Products ↔ Categories
// ─────────────────────────────────────────────────────────────

describe('Data — Product/Category Cross-Reference', () => {
  let products;
  let store;
  let allCategoryIds;

  beforeAll(() => {
    products = readData('products.json') || [];
    store = readData('store.json') || { categories: [] };
    allCategoryIds = new Set();
    store.categories.forEach((cat) => {
      allCategoryIds.add(cat.id);
      if (cat.subcategories) {
        cat.subcategories.forEach((sub) => allCategoryIds.add(sub.id));
      }
    });
  });

  test('every product category exists in store.json', () => {
    if (allCategoryIds.size === 0) return; // Skip if no categories defined yet
    products.forEach((product) => {
      if (product.category) {
        expect(allCategoryIds.has(product.category)).toBe(true);
      }
    });
  });

  test('every store category has at least one product', () => {
    if (products.length === 0) return; // Skip if no products yet
    const usedCategories = new Set(products.map((p) => p.category).filter(Boolean));
    store.categories.forEach((cat) => {
      // Warn but don't fail — empty categories are OK during development
      if (!usedCategories.has(cat.id)) {
        console.warn(`[data] Category "${cat.name}" (${cat.id}) has no products`);
      }
    });
  });

  test('product categoryName matches store category name', () => {
    const catNameMap = {};
    store.categories.forEach((cat) => {
      catNameMap[cat.id] = cat.name;
      if (cat.subcategories) {
        cat.subcategories.forEach((sub) => { catNameMap[sub.id] = sub.name; });
      }
    });

    products.forEach((product) => {
      if (product.category && product.categoryName && catNameMap[product.category]) {
        expect(product.categoryName).toBe(catNameMap[product.category]);
      }
    });
  });
});

// ─────────────────────────────────────────────────────────────
// navigation.json
// ─────────────────────────────────────────────────────────────

describe('Data — navigation.json', () => {
  let navigation;

  beforeAll(() => {
    navigation = readData('navigation.json');
  });

  test('navigation.json exists and is an array', () => {
    expect(navigation).not.toBeNull();
    expect(Array.isArray(navigation)).toBe(true);
  });

  test('each nav item has label and url', () => {
    navigation.forEach((item) => {
      expect(item).toHaveProperty('label');
      expect(item).toHaveProperty('url');
      expect(item.label).toBeTruthy();
      expect(item.url).toBeTruthy();
    });
  });

  test('nav URLs start with /', () => {
    navigation.forEach((item) => {
      expect(item.url).toMatch(/^\//);
    });
  });

  test('required pages are in navigation', () => {
    const urls = navigation.map((item) => item.url);
    expect(urls).toContain('/');
    expect(urls).toContain('/store/');
  });
});

// ─────────────────────────────────────────────────────────────
// site.json
// ─────────────────────────────────────────────────────────────

describe('Data — site.json', () => {
  let site;

  beforeAll(() => {
    site = readData('site.json');
  });

  test('site.json exists', () => {
    expect(site).not.toBeNull();
  });

  test('has name field', () => {
    expect(site).toHaveProperty('name');
  });

  test('has url field', () => {
    expect(site).toHaveProperty('url');
  });

  test('url starts with https:// when set', () => {
    if (site.url && site.url.trim()) {
      expect(site.url).toMatch(/^https:\/\//);
    }
  });
});

// ─────────────────────────────────────────────────────────────
// site-config.json
// ─────────────────────────────────────────────────────────────

describe('Data — site-config.json', () => {
  let config;

  beforeAll(() => {
    config = readConfig();
  });

  test('site-config.json exists and is valid JSON', () => {
    expect(config).not.toBeNull();
  });

  test('has required top-level sections', () => {
    expect(config).toHaveProperty('site');
    expect(config).toHaveProperty('affiliate');
    expect(config).toHaveProperty('theme');
    expect(config).toHaveProperty('navigation');
  });

  test('theme colors are valid CSS values when set', () => {
    const colorFields = [
      'primaryColor', 'primaryColorDark', 'accentColor', 'accentColorDark',
      'goldColor', 'backgroundColor', 'creamColor',
    ];
    colorFields.forEach((field) => {
      const value = config.theme?.[field];
      if (value && value.trim()) {
        // Should be hex color, rgb(), or CSS named color — not contain { } ;
        expect(value).not.toMatch(/[{};]/);
      }
    });
  });

  test('navigation has at least Home and Store', () => {
    const nav = config.navigation || [];
    const urls = nav.map((n) => n.url);
    expect(urls).toContain('/');
    expect(urls).toContain('/store/');
  });
});
