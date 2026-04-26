/**
 * Store Page Tests — Tests the ACTUAL store.js code
 *
 * These tests load the real store.js IIFE in a JSDOM environment with
 * the correct DOM structure (matching store.njk), then verify filtering,
 * category navigation, and product rendering.
 *
 * Run: npm test (or: npm test -- store.test.js)
 */

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const storeJsPath = path.resolve(__dirname, '..', 'src', 'js', 'store.js');
const storeJsCode = fs.readFileSync(storeJsPath, 'utf-8');

// Sample product data matching the products.json format
const SAMPLE_PRODUCTS = [
  { id: 'kit-001', name: 'Starter Kit', category: 'kits', categoryName: 'Kits', price: 49.99, asin: 'B001KIT001', image: '/images/kit.jpg', description: 'Complete starter pack' },
  { id: 'kit-002', name: 'Pro Bundle', category: 'kits', categoryName: 'Kits', price: 99.99, asin: 'B001KIT002', image: '/images/pro.jpg', description: 'Advanced kit' },
  { id: 'tool-001', name: 'Hand Tool', category: 'tools', categoryName: 'Tools', price: 34.99, asin: 'B001TOOL01', image: '/images/tool.jpg', description: 'Essential hand tool' },
  { id: 'tool-002', name: 'Power Tool', category: 'tools', categoryName: 'Tools', price: 59.99, asin: 'B001TOOL02', image: '', description: 'Premium power tool' },
  { id: 'book-001', name: 'Reference Guide', category: 'books', categoryName: 'Books', price: 24.99, asin: 'B001BOOK01', image: '/images/guide.jpg', description: 'Comprehensive guide' },
];

const SAMPLE_CATEGORIES = {
  categories: [
    { id: 'kits', name: 'Kits & Bundles', subcategories: [{ id: 'beginner', name: 'Beginner Kits' }] },
    { id: 'tools', name: 'Tools & Equipment' },
    { id: 'books', name: 'Books & Guides' },
  ],
};

/**
 * Helper: create JSDOM with store page HTML structure (matching store.njk),
 * inject product/category data, then execute the real store.js.
 */
function loadStore(options = {}) {
  const affiliateTag = options.affiliateTag || 'test-tag-20';
  const products = options.products || SAMPLE_PRODUCTS;
  const categories = options.categories || SAMPLE_CATEGORIES;
  const urlSearch = options.urlSearch || '';

  // Build sidebar HTML from categories (matches store.njk template output)
  let sidebarHtml = '';
  (categories.categories || []).forEach((cat) => {
    sidebarHtml += `<li class="sb-item">
      <button class="sb-btn" data-category="${cat.id}">${cat.name}`;
    if (cat.subcategories) {
      sidebarHtml += '<span class="sb-arrow">&#x25BC;</span>';
    }
    sidebarHtml += '</button>';
    if (cat.subcategories) {
      sidebarHtml += '<ul class="sb-subs">';
      cat.subcategories.forEach((sub) => {
        sidebarHtml += `<li><button class="sb-sub" data-category="${sub.id}">${sub.name}</button></li>`;
      });
      sidebarHtml += '</ul>';
    }
    sidebarHtml += '</li>';
  });

  const html = `<!DOCTYPE html><html><head>
    <meta name="affiliate-tag" content="${affiliateTag}">
  </head><body>
    <div class="store-layout">
      <aside class="store-sidebar">
        <h3>Categories</h3>
        <ul class="sb-list">${sidebarHtml}</ul>
      </aside>
      <main class="store-main">
        <div class="store-breadcrumb" id="store-breadcrumb"></div>
        <div id="store-welcome" class="store-welcome"><h2>Browse Our Products</h2></div>
        <div id="product-grid" class="product-grid" style="display: none;"></div>
      </main>
    </div>
  </body></html>`;

  const url = 'https://example.com/store/' + (urlSearch ? '?' + urlSearch : '');

  const dom = new JSDOM(html, {
    url,
    runScripts: 'dangerously',
    resources: 'usable',
  });

  const { window } = dom;

  // Inject data globals (matches what store.njk produces)
  window.STORE_PRODUCTS = products;
  window.STORE_CATEGORIES = categories;

  // Execute the real store.js
  window.eval(storeJsCode);

  return { window, dom };
}

// ─────────────────────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────────────────────

describe('Store (real store.js) — Initialization', () => {
  test('store.js loads without errors', () => {
    expect(() => loadStore()).not.toThrow();
  });

  test('welcome message is visible by default', () => {
    const { window } = loadStore();
    const welcome = window.document.getElementById('store-welcome');
    expect(welcome.style.display).not.toBe('none');
  });

  test('product grid is hidden by default', () => {
    const { window } = loadStore();
    const grid = window.document.getElementById('product-grid');
    expect(grid.style.display).toBe('none');
  });
});

describe('Store (real store.js) — Category Filtering via Sidebar', () => {
  test('clicking a category button shows filtered products', () => {
    const { window } = loadStore();
    const kitsBtn = window.document.querySelector('[data-category="kits"]');
    kitsBtn.click();

    const grid = window.document.getElementById('product-grid');
    expect(grid.style.display).not.toBe('none');
    // Should show 2 kit products
    const cards = grid.querySelectorAll('.prod-card');
    expect(cards.length).toBe(2);
  });

  test('clicking tools category shows only tools', () => {
    const { window } = loadStore();
    const toolsBtn = window.document.querySelector('[data-category="tools"]');
    toolsBtn.click();

    const grid = window.document.getElementById('product-grid');
    const cards = grid.querySelectorAll('.prod-card');
    expect(cards.length).toBe(2);
  });

  test('clicking books category shows only 1 book', () => {
    const { window } = loadStore();
    const booksBtn = window.document.querySelector('[data-category="books"]');
    booksBtn.click();

    const grid = window.document.getElementById('product-grid');
    const cards = grid.querySelectorAll('.prod-card');
    expect(cards.length).toBe(1);
  });

  test('breadcrumb updates when category is clicked', () => {
    const { window } = loadStore();
    const kitsBtn = window.document.querySelector('[data-category="kits"]');
    kitsBtn.click();

    const bc = window.document.getElementById('store-breadcrumb');
    expect(bc.innerHTML).toContain('Store');
    expect(bc.innerHTML).toContain('Kits');
  });

  test('welcome message hides when category is clicked', () => {
    const { window } = loadStore();
    const kitsBtn = window.document.querySelector('[data-category="kits"]');
    kitsBtn.click();

    const welcome = window.document.getElementById('store-welcome');
    expect(welcome.style.display).toBe('none');
  });

  test('active class is set on clicked category button', () => {
    const { window } = loadStore();
    const kitsBtn = window.document.querySelector('[data-category="kits"]');
    kitsBtn.click();

    expect(kitsBtn.classList.contains('active')).toBe(true);
  });
});

describe('Store (real store.js) — URL Category Parameter', () => {
  test('auto-filters when ?category= is in URL', () => {
    const { window } = loadStore({ urlSearch: 'category=tools' });

    const grid = window.document.getElementById('product-grid');
    expect(grid.style.display).not.toBe('none');
    const cards = grid.querySelectorAll('.prod-card');
    expect(cards.length).toBe(2);
  });
});

describe('Store (real store.js) — Product Rendering', () => {
  test('product cards contain product name', () => {
    const { window } = loadStore();
    const kitsBtn = window.document.querySelector('[data-category="kits"]');
    kitsBtn.click();

    const grid = window.document.getElementById('product-grid');
    expect(grid.innerHTML).toContain('Starter Kit');
    expect(grid.innerHTML).toContain('Pro Bundle');
  });

  test('product cards link to Amazon with ASIN, affiliate tag, and rel="sponsored"', () => {
    const { window } = loadStore({ affiliateTag: 'mysite-20' });
    const kitsBtn = window.document.querySelector('[data-category="kits"]');
    kitsBtn.click();

    const grid = window.document.getElementById('product-grid');
    const links = grid.querySelectorAll('a.prod-card');
    expect(links[0].href).toContain('amazon.com/dp/B001KIT001');
    expect(links[0].href).toContain('tag=mysite-20');
    expect(links[0].getAttribute('rel')).toContain('sponsored');
  });

  test('product cards show "View on Amazon" CTA (no static prices per Amazon compliance)', () => {
    const { window } = loadStore();
    const kitsBtn = window.document.querySelector('[data-category="kits"]');
    kitsBtn.click();

    const grid = window.document.getElementById('product-grid');
    // Static prices removed per Amazon Associates Operating Agreement
    // Products should link to Amazon where live prices are shown
    expect(grid.innerHTML).toContain('View on Amazon');
    expect(grid.innerHTML).not.toContain('$49.99');
  });

  test('products without images show SVG placeholder', () => {
    const { window } = loadStore();
    const toolsBtn = window.document.querySelector('[data-category="tools"]');
    toolsBtn.click();

    const grid = window.document.getElementById('product-grid');
    const placeholders = grid.querySelectorAll('.prod-card-placeholder');
    // tool-002 has empty image string
    expect(placeholders.length).toBe(1);
  });

  test('product without ASIN falls back to Amazon search URL', () => {
    const noAsinProducts = [
      { id: 'no-asin', name: 'Search Widget', category: 'misc', price: 9.99, asin: '', image: '' },
    ];
    const categories = { categories: [{ id: 'misc', name: 'Misc' }] };
    const { window } = loadStore({ products: noAsinProducts, categories, affiliateTag: 'test-20' });
    const miscBtn = window.document.querySelector('[data-category="misc"]');
    miscBtn.click();

    const grid = window.document.getElementById('product-grid');
    const link = grid.querySelector('a.prod-card');
    expect(link.href).toContain('amazon.com/s?k=Search');
    expect(link.href).toContain('tag=test-20');
  });

  test('empty category shows "no products" message', () => {
    const categories = { categories: [{ id: 'empty', name: 'Empty' }] };
    const { window } = loadStore({ products: [], categories });
    const emptyBtn = window.document.querySelector('[data-category="empty"]');
    emptyBtn.click();

    const grid = window.document.getElementById('product-grid');
    expect(grid.innerHTML).toContain('No products');
  });
});

describe('Store (real store.js) — XSS Protection', () => {
  test('product names are HTML-escaped in output', () => {
    const xssProducts = [
      { id: 'xss-1', name: '<script>alert("xss")</script>', category: 'test', price: 1, asin: 'B001', image: '' },
    ];
    const categories = { categories: [{ id: 'test', name: 'Test' }] };
    const { window } = loadStore({ products: xssProducts, categories });
    const testBtn = window.document.querySelector('[data-category="test"]');
    testBtn.click();

    const grid = window.document.getElementById('product-grid');
    // Script tags should be escaped, not executed
    expect(grid.innerHTML).not.toContain('<script>');
    expect(grid.innerHTML).toContain('&lt;script&gt;');
  });

  test('product image paths are HTML-escaped — no attribute injection', () => {
    const xssProducts = [
      { id: 'xss-2', name: 'Safe', category: 'test', price: 1, asin: 'B001', image: '" onerror="alert(1)' },
    ];
    const categories = { categories: [{ id: 'test', name: 'Test' }] };
    const { window } = loadStore({ products: xssProducts, categories });
    const testBtn = window.document.querySelector('[data-category="test"]');
    testBtn.click();

    const grid = window.document.getElementById('product-grid');
    const img = grid.querySelector('img');
    expect(img).not.toBeNull();
    // The key test: onerror must NOT be parsed as an actual DOM attribute
    expect(img.hasAttribute('onerror')).toBe(false);
  });
});

describe('Store (real store.js) — Subcategory Navigation', () => {
  test('clicking subcategory button filters by subcategory', () => {
    const { window } = loadStore();
    // 'beginner' subcategory exists under 'kits'
    const beginnerBtn = window.document.querySelector('[data-category="beginner"]');
    beginnerBtn.click();

    const bc = window.document.getElementById('store-breadcrumb');
    expect(bc.innerHTML).toContain('Beginner Kits');
  });
});
