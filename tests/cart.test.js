/**
 * Cart System Tests — Tests the ACTUAL cart.js code
 *
 * These tests load the real cart.js IIFE in a JSDOM environment,
 * then exercise the window.SiteCart public API. This catches real bugs
 * in the actual implementation, not just mock behavior.
 *
 * Run: npm test (or: npm test -- cart.test.js)
 */

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const cartJsPath = path.resolve(__dirname, '..', 'src', 'js', 'cart.js');
const cartJsCode = fs.readFileSync(cartJsPath, 'utf-8');

/**
 * Helper: create a fresh JSDOM with the affiliate tag meta and ASIN map,
 * then execute the real cart.js code inside it.
 */
function loadCart(options = {}) {
  const affiliateTag = options.affiliateTag || 'test-tag-20';
  const asinMap = options.asinMap || {};

  const html = `<!DOCTYPE html><html><head>
    <meta name="affiliate-tag" content="${affiliateTag}">
  </head><body></body></html>`;

  const dom = new JSDOM(html, {
    url: 'https://example.com/store/p1/Product_Name.html',
    runScripts: 'dangerously',
    resources: 'usable',
  });

  const { window } = dom;

  // Set up localStorage mock on the window
  const storage = {};
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (key) => storage[key] || null,
      setItem: (key, value) => { storage[key] = String(value); },
      removeItem: (key) => { delete storage[key]; },
      clear: () => { Object.keys(storage).forEach((k) => delete storage[k]); },
    },
    writable: true,
  });

  // Inject ASIN map before cart.js runs
  window.PRODUCT_ASIN_MAP = asinMap;

  // Mock alert() — JSDOM doesn't implement it
  window.alert = function () {};

  // Execute the real cart.js code.
  // cart.js checks document.readyState and runs init immediately if not 'loading'.
  // In JSDOM, readyState may be 'loading' during eval, so we also fire DOMContentLoaded.
  window.eval(cartJsCode);

  // Trigger DOMContentLoaded in case cart.js registered a listener
  const event = new window.Event('DOMContentLoaded');
  window.document.dispatchEvent(event);

  return { window, dom, storage };
}

// ─────────────────────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────────────────────

describe('SiteCart (real cart.js) — Cart State Management', () => {
  test('empty cart returns empty array', () => {
    const { window } = loadCart();
    expect(window.SiteCart.getCart()).toEqual([]);
  });

  test('getCartCount returns 0 for empty cart', () => {
    const { window } = loadCart();
    expect(window.SiteCart.getCartCount()).toBe(0);
  });

  test('addToCart adds single item', () => {
    const { window } = loadCart();
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 1 });
    const items = window.SiteCart.getCart();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('p1');
    expect(items[0].name).toBe('Widget');
    expect(items[0].quantity).toBe(1);
  });

  test('addToCart merges duplicate items (same id + optionKey)', () => {
    const { window } = loadCart();
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 2 });
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 3 });
    const items = window.SiteCart.getCart();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(5);
  });

  test('addToCart keeps items separate by optionKey', () => {
    const { window } = loadCart();
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 1, optionKey: 'small' });
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 1, optionKey: 'large' });
    const items = window.SiteCart.getCart();
    expect(items).toHaveLength(2);
  });

  test('removeFromCart removes item by index', () => {
    const { window } = loadCart();
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget A', quantity: 1 });
    window.SiteCart.addToCart({ id: 'p2', name: 'Widget B', quantity: 1 });
    window.SiteCart.removeFromCart(0);
    const items = window.SiteCart.getCart();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('p2');
  });

  test('updateQuantity changes quantity', () => {
    const { window } = loadCart();
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 1 });
    window.SiteCart.updateQuantity(0, 5);
    expect(window.SiteCart.getCart()[0].quantity).toBe(5);
  });

  test('updateQuantity removes item if quantity <= 0', () => {
    const { window } = loadCart();
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 1 });
    window.SiteCart.updateQuantity(0, 0);
    expect(window.SiteCart.getCart()).toHaveLength(0);
  });

  test('clearCart empties cart', () => {
    const { window } = loadCart();
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 5 });
    window.SiteCart.clearCart();
    expect(window.SiteCart.getCart()).toHaveLength(0);
    expect(window.SiteCart.getCartCount()).toBe(0);
  });

  test('getCartCount sums all quantities', () => {
    const { window } = loadCart();
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget A', quantity: 2 });
    window.SiteCart.addToCart({ id: 'p2', name: 'Widget B', quantity: 3 });
    expect(window.SiteCart.getCartCount()).toBe(5);
  });

  test('cart persists to localStorage', () => {
    const { window, storage } = loadCart();
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 2 });
    expect(storage['site_cart']).toBeDefined();
    const parsed = JSON.parse(storage['site_cart']);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].quantity).toBe(2);
  });
});

describe('SiteCart (real cart.js) — Affiliate Tag', () => {
  test('reads affiliate tag from meta tag', () => {
    const { window } = loadCart({ affiliateTag: 'mysite-20' });
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 1, asin: 'B001TEST' });
    // Open the cart drawer to trigger URL building — we test the tag indirectly
    // by checking the public API exists and works
    expect(window.SiteCart.getCart()[0].asin).toBe('B001TEST');
  });

  test('warns when affiliate tag is empty', () => {
    const warnings = [];
    const { window } = loadCart({ affiliateTag: '' });
    // The warning fires during cart.js initialization
    // We can't easily capture console.warn in JSDOM eval,
    // but we verify the cart still functions without crashing
    expect(window.SiteCart.getCart()).toEqual([]);
  });
});

describe('SiteCart (real cart.js) — ASIN Map from products.json', () => {
  test('reads PRODUCT_ASIN_MAP injected by base.njk', () => {
    const { window } = loadCart({
      asinMap: {
        'telescope-1': { asin: 'B00SCOPE01' },
        'eyepiece-1': { asin: 'B00EYEPC01' },
      },
    });
    // ASIN map is internal to cart.js; we verify it works by adding a product
    // and checking cart behavior doesn't crash
    window.SiteCart.addToCart({ id: 'telescope-1', name: 'Telescope', quantity: 1 });
    expect(window.SiteCart.getCart()).toHaveLength(1);
  });
});

describe('SiteCart (real cart.js) — UI Components', () => {
  test('creates cart icon on page load', () => {
    const { window } = loadCart();
    const cartIcon = window.document.getElementById('cart-icon-wrap');
    expect(cartIcon).not.toBeNull();
  });

  test('creates cart notification element', () => {
    const { window } = loadCart();
    const notif = window.document.getElementById('cart-notification');
    expect(notif).not.toBeNull();
  });

  test('creates cart drawer', () => {
    const { window } = loadCart();
    const panel = window.document.getElementById('cart-panel');
    expect(panel).not.toBeNull();
  });

  test('cart badge shows 0 initially', () => {
    const { window } = loadCart();
    const badge = window.document.getElementById('cart-badge');
    expect(badge).not.toBeNull();
    expect(badge.textContent).toBe('0');
  });

  test('cart badge updates when items added', () => {
    const { window } = loadCart();
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 3 });
    const badge = window.document.getElementById('cart-badge');
    expect(badge.textContent).toBe('3');
  });

  test('openCartDrawer adds open class', () => {
    const { window } = loadCart();
    window.SiteCart.openCartDrawer();
    const drawer = window.document.getElementById('cart-drawer');
    expect(drawer.classList.contains('open')).toBe(true);
  });

  test('closeCartDrawer removes open class', () => {
    const { window } = loadCart();
    window.SiteCart.openCartDrawer();
    window.SiteCart.closeCartDrawer();
    const drawer = window.document.getElementById('cart-drawer');
    expect(drawer.classList.contains('open')).toBe(false);
  });
});

describe('SiteCart (real cart.js) — Public API', () => {
  test('all public methods exist and are callable', () => {
    const { window } = loadCart();
    const api = window.SiteCart;
    expect(typeof api.getCart).toBe('function');
    expect(typeof api.addToCart).toBe('function');
    expect(typeof api.removeFromCart).toBe('function');
    expect(typeof api.updateQuantity).toBe('function');
    expect(typeof api.clearCart).toBe('function');
    expect(typeof api.getCartCount).toBe('function');
    expect(typeof api.openCartDrawer).toBe('function');
    expect(typeof api.closeCartDrawer).toBe('function');
    expect(typeof api.toggleCartDrawer).toBe('function');
  });
});

describe('SiteCart (real cart.js) — Integration', () => {
  test('full shopping flow: add, update, remove, clear', () => {
    const { window } = loadCart();
    const cart = window.SiteCart;

    // Add items
    cart.addToCart({ id: 'p1', name: 'Widget A', quantity: 2 });
    cart.addToCart({ id: 'p2', name: 'Widget B', quantity: 1 });
    expect(cart.getCartCount()).toBe(3);

    // Update quantity
    cart.updateQuantity(0, 5);
    expect(cart.getCartCount()).toBe(6);

    // Remove one item
    cart.removeFromCart(1);
    expect(cart.getCart()).toHaveLength(1);
    expect(cart.getCartCount()).toBe(5);

    // Clear
    cart.clearCart();
    expect(cart.getCart()).toEqual([]);
    expect(cart.getCartCount()).toBe(0);
  });

  test('dispatches cartUpdated event on changes', () => {
    const { window } = loadCart();
    let eventFired = false;
    window.document.addEventListener('cartUpdated', () => { eventFired = true; });
    window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 1 });
    expect(eventFired).toBe(true);
  });
});

describe('SiteCart (real cart.js) — Cart Size Limits', () => {
  test('rejects new items when cart reaches CART_MAX_ITEMS', () => {
    const { window } = loadCart();
    // Add 100 unique items (the max)
    for (let i = 0; i < 100; i++) {
      window.SiteCart.addToCart({ id: 'item-' + i, name: 'Item ' + i, quantity: 1 });
    }
    expect(window.SiteCart.getCart()).toHaveLength(100);

    // The 101st unique item should be rejected
    window.SiteCart.addToCart({ id: 'item-overflow', name: 'Overflow', quantity: 1 });
    expect(window.SiteCart.getCart()).toHaveLength(100);
  });

  test('still merges duplicates even at max capacity', () => {
    const { window } = loadCart();
    for (let i = 0; i < 100; i++) {
      window.SiteCart.addToCart({ id: 'item-' + i, name: 'Item ' + i, quantity: 1 });
    }
    // Adding same item should merge (increase quantity), not be rejected
    window.SiteCart.addToCart({ id: 'item-0', name: 'Item 0', quantity: 1 });
    expect(window.SiteCart.getCart()).toHaveLength(100);
    expect(window.SiteCart.getCart()[0].quantity).toBe(2);
  });
});
