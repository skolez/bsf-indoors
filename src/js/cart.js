/**
 * Affiliate Website Template - Shopping Cart System
 *
 * AI AGENT: This manages a client-side shopping cart that builds Amazon cart URLs
 * for checkout. You should NOT need to edit this file for most site customizations.
 *
 * The affiliate tag is read from <meta name="affiliate-tag"> in base.njk,
 * which is set by setup.js from site-config.json. Never hardcode it here.
 *
 * ASIN mappings connect product IDs to Amazon product identifiers.
 * Add your product ASIN mappings in the defaultAsinMap below.
 *
 * Amazon Cart URL format:
 *   https://www.amazon.com/gp/aws/cart/add.html?AssociateTag=TAG&ASIN.1=XXX&Quantity.1=1&...
 * Amazon supports up to ~50 ASINs per cart URL, but we cap at 40 to be safe.
 */

(function () {
  'use strict';

  var CART_STORAGE_KEY = 'site_cart';
  var ASIN_MAP_KEY = 'site_asin_map';
  var AMAZON_CART_LIMIT = 40;
  var CART_MAX_ITEMS = 100;
  var CART_MAX_BYTES = 512000; // 500KB limit to prevent localStorage quota abuse

  // Read affiliate tag from meta tag (set by base.njk from site-config.json)
  // This is the single source of truth — never hardcode the tag.
  var metaTag = document.querySelector('meta[name="affiliate-tag"]');
  var ASSOCIATE_TAG = (metaTag && metaTag.content) ? metaTag.content : '';

  if (!ASSOCIATE_TAG) {
    console.warn('[cart.js] No affiliate tag found. Set affiliate.tag in site-config.json and run npm run setup. Affiliate links will not track properly.');
  }

  // ─── Product ASIN Map ───────────────────────────────────────────────
  // The ASIN map is auto-generated from products.json and injected into the page
  // by base.njk as window.PRODUCT_ASIN_MAP. This is the single source of truth —
  // you only need to set ASINs in products.json, never here.
  //
  // For products with VARIANTS (e.g., size/color options), you can extend the map
  // by adding entries to window.PRODUCT_ASIN_MAP before cart.js loads:
  //   window.PRODUCT_ASIN_MAP['eyepiece-set'].variants = {
  //     'Size|25mm': 'B07S3Q4PWP',
  //     'Size|10mm': 'B07S3Q4PWZ'
  //   };
  var defaultAsinMap = window.PRODUCT_ASIN_MAP || {};

  // ─── Cart State ─────────────────────────────────────────────────────

  function getCart() {
    try {
      var data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      var json = JSON.stringify(cart);
      if (json.length > CART_MAX_BYTES) {
        console.warn('[cart.js] Cart data exceeds size limit. Not saving.');
        return;
      }
      localStorage.setItem(CART_STORAGE_KEY, json);
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        console.warn('[cart.js] localStorage quota exceeded.');
      }
    }
    updateCartBadge();
    dispatchCartUpdate();
  }

  function getAsinMap() {
    try {
      var data = localStorage.getItem(ASIN_MAP_KEY);
      return data ? JSON.parse(data) : defaultAsinMap;
    } catch (e) {
      return defaultAsinMap;
    }
  }

  function addToCart(item) {
    var cart = getCart();
    var existing = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id && cart[i].optionKey === item.optionKey) {
        existing = cart[i];
        break;
      }
    }
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      if (cart.length >= CART_MAX_ITEMS) {
        alert('Cart is full. Please checkout before adding more items.');
        return cart;
      }
      cart.push(item);
    }
    saveCart(cart);
    showCartNotification(item.name);
    return cart;
  }

  function removeFromCart(index) {
    var cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    return cart;
  }

  function updateQuantity(index, quantity) {
    var cart = getCart();
    if (quantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
    saveCart(cart);
    return cart;
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartCount() {
    var cart = getCart();
    var count = 0;
    for (var i = 0; i < cart.length; i++) {
      count += cart[i].quantity;
    }
    return count;
  }

  // ─── Amazon URL Builder ─────────────────────────────────────────────

  function buildAmazonCartUrl() {
    var cart = getCart();
    var asinMap = getAsinMap();
    var params = ['AssociateTag=' + encodeURIComponent(ASSOCIATE_TAG)];
    var asinIndex = 1;
    var noAsinItems = [];

    for (var i = 0; i < cart.length; i++) {
      if (asinIndex > AMAZON_CART_LIMIT) break;

      var item = cart[i];
      var asin = null;

      // Try to find ASIN: item.asin > map default > map variant > fallback to search
      if (item.asin) {
        asin = item.asin;
      } else if (asinMap[item.id]) {
        var mapping = asinMap[item.id];
        if (item.optionKey && mapping.variants && mapping.variants[item.optionKey]) {
          asin = mapping.variants[item.optionKey];
        } else {
          asin = mapping.asin || null;
        }
      }

      if (asin) {
        params.push('ASIN.' + asinIndex + '=' + encodeURIComponent(asin));
        params.push('Quantity.' + asinIndex + '=' + encodeURIComponent(item.quantity));
        asinIndex++;
      } else {
        noAsinItems.push(item);
      }
    }

    if (asinIndex > 1) {
      return {
        url: 'https://www.amazon.com/gp/aws/cart/add.html?' + params.join('&'),
        itemsWithAsin: asinIndex - 1,
        itemsWithoutAsin: noAsinItems,
        overflow: cart.length > AMAZON_CART_LIMIT
      };
    }

    // No ASINs found — fall back to Amazon search for first item
    if (cart.length > 0) {
      var searchTerm = cart[0].name;
      return {
        url: 'https://www.amazon.com/s?k=' + encodeURIComponent(searchTerm) + '&tag=' + encodeURIComponent(ASSOCIATE_TAG),
        itemsWithAsin: 0,
        itemsWithoutAsin: cart,
        overflow: false
      };
    }

    return null;
  }

  function buildAmazonSingleUrl(item) {
    var asinMap = getAsinMap();
    var asin = item.asin || null;

    if (!asin && asinMap[item.id]) {
      var mapping = asinMap[item.id];
      if (item.optionKey && mapping.variants && mapping.variants[item.optionKey]) {
        asin = mapping.variants[item.optionKey];
      } else {
        asin = mapping.asin || null;
      }
    }

    if (asin) {
      return 'https://www.amazon.com/dp/' + encodeURIComponent(asin) + '?tag=' + encodeURIComponent(ASSOCIATE_TAG);
    }

    // Fallback to search
    return 'https://www.amazon.com/s?k=' + encodeURIComponent(item.name) + '&tag=' + encodeURIComponent(ASSOCIATE_TAG);
  }

  // ─── UI Components ──────────────────────────────────────────────────

  function dispatchCartUpdate() {
    try {
      var event = new CustomEvent('cartUpdated', { detail: { cart: getCart() } });
      document.dispatchEvent(event);
    } catch (e) {
      // CustomEvent not supported in old browsers
    }
  }

  function updateCartBadge() {
    var badge = document.getElementById('cart-badge');
    var count = getCartCount();
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  function showCartNotification(productName) {
    var notification = document.getElementById('cart-notification');
    if (!notification) return;

    notification.innerHTML = '<span class="notif-check">&#10003;</span> <strong>' +
      escapeHtml(productName) + '</strong> added to cart';
    notification.classList.add('show');

    clearTimeout(notification._timeout);
    notification._timeout = setTimeout(function () {
      notification.classList.remove('show');
    }, 3000);
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function createCartIcon() {
    if (document.getElementById('cart-icon-wrap')) return;

    var wrap = document.createElement('div');
    wrap.id = 'cart-icon-wrap';
    wrap.innerHTML =
      '<a id="cart-icon" href="#" title="View Cart" aria-label="Shopping cart" role="button">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>' +
      '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>' +
      '</svg>' +
      '<span id="cart-badge" aria-label="items in cart">0</span>' +
      '</a>';

    document.body.appendChild(wrap);

    wrap.querySelector('#cart-icon').addEventListener('click', function (e) {
      e.preventDefault();
      toggleCartDrawer();
    });
  }

  function createCartNotification() {
    if (document.getElementById('cart-notification')) return;
    var notif = document.createElement('div');
    notif.id = 'cart-notification';
    notif.setAttribute('role', 'status');
    notif.setAttribute('aria-live', 'polite');
    document.body.appendChild(notif);
  }

  function createCartDrawer() {
    if (document.getElementById('cart-panel')) return;

    var drawer = document.createElement('div');
    drawer.id = 'cart-drawer';
    drawer.innerHTML =
      '<div id="cart-overlay"></div>' +
      '<div id="cart-panel">' +
      '<div id="cart-header">' +
      '<h3>Your Cart</h3>' +
      '<button id="cart-close" title="Close cart" aria-label="Close cart">&times;</button>' +
      '</div>' +
      '<div id="cart-items"></div>' +
      '<div id="cart-footer">' +
      '<div id="cart-total"></div>' +
      '<button id="cart-checkout" class="btn-checkout">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;vertical-align:middle">' +
      '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>' +
      '<polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>' +
      '</svg>' +
      'Checkout on Amazon</button>' +
      '<p id="cart-note">Items will be added to your Amazon cart for purchase</p>' +
      '</div>' +
      '</div>';

    document.body.appendChild(drawer);

    document.getElementById('cart-overlay').addEventListener('click', closeCartDrawer);
    document.getElementById('cart-close').addEventListener('click', closeCartDrawer);
    document.getElementById('cart-checkout').addEventListener('click', handleCheckout);
  }

  function toggleCartDrawer() {
    var drawer = document.getElementById('cart-drawer');
    if (drawer) {
      var isOpen = drawer.classList.contains('open');
      if (isOpen) {
        closeCartDrawer();
      } else {
        openCartDrawer();
      }
    }
  }

  function openCartDrawer() {
    renderCartItems();
    var drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    var drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function renderCartItems() {
    var container = document.getElementById('cart-items');
    var footer = document.getElementById('cart-footer');
    var totalEl = document.getElementById('cart-total');
    if (!container) return;

    var cart = getCart();

    if (cart.length === 0) {
      container.innerHTML =
        '<div class="cart-empty">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>' +
        '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>' +
        '</svg>' +
        '<p>Your cart is empty</p>' +
        '</div>';
      if (footer) footer.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = '';

    var html = '';
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
      var item = cart[i];
      var itemTotal = (item.price || 0) * item.quantity;
      total += itemTotal;
      var amazonUrl = buildAmazonSingleUrl(item);

      html +=
        '<div class="cart-item" data-index="' + i + '">' +
        '<div class="cart-item-image">' +
        (item.image ? '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.name) + '">' : '') +
        '</div>' +
        '<div class="cart-item-details">' +
        '<div class="cart-item-name">' + escapeHtml(item.name) + '</div>' +
        (item.options ? '<div class="cart-item-options">' + escapeHtml(item.options) + '</div>' : '') +
        '<div class="cart-item-price">' + formatPrice(item.price) + '</div>' +
        '<div class="cart-item-actions">' +
        '<div class="qty-controls">' +
        '<button class="qty-btn qty-minus" data-index="' + i + '" aria-label="Decrease quantity">-</button>' +
        '<span class="qty-value">' + item.quantity + '</span>' +
        '<button class="qty-btn qty-plus" data-index="' + i + '" aria-label="Increase quantity">+</button>' +
        '</div>' +
        '<a href="' + escapeHtml(amazonUrl) + '" target="_blank" rel="noopener sponsored" class="view-amazon" title="View on Amazon">View on Amazon</a>' +
        '<button class="remove-btn" data-index="' + i + '" title="Remove">Remove</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    }

    container.innerHTML = html;

    if (totalEl) {
      totalEl.innerHTML = '<strong>Estimated Total:</strong> ' + formatPrice(total) +
        '<br><small>Final price determined by Amazon at checkout</small>';
    }

    // Attach event listeners
    var minusBtns = container.querySelectorAll('.qty-minus');
    var plusBtns = container.querySelectorAll('.qty-plus');
    var removeBtns = container.querySelectorAll('.remove-btn');

    for (var j = 0; j < minusBtns.length; j++) {
      minusBtns[j].addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'), 10);
        var c = getCart();
        updateQuantity(idx, c[idx].quantity - 1);
        renderCartItems();
      });
    }
    for (var k = 0; k < plusBtns.length; k++) {
      plusBtns[k].addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'), 10);
        var c = getCart();
        updateQuantity(idx, c[idx].quantity + 1);
        renderCartItems();
      });
    }
    for (var l = 0; l < removeBtns.length; l++) {
      removeBtns[l].addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'), 10);
        removeFromCart(idx);
        renderCartItems();
      });
    }
  }

  function formatPrice(price) {
    if (!price && price !== 0) return '';
    return '$' + parseFloat(price).toFixed(2);
  }

  function handleCheckout() {
    var cart = getCart();
    if (cart.length === 0) return;

    var result = buildAmazonCartUrl();
    if (!result) return;

    if (result.overflow) {
      alert('You have more than ' + AMAZON_CART_LIMIT + ' items. Only the first ' + AMAZON_CART_LIMIT + ' will be added to your Amazon cart. Please checkout in batches.');
    }

    if (result.itemsWithoutAsin.length > 0 && result.itemsWithAsin > 0) {
      var names = [];
      for (var i = 0; i < result.itemsWithoutAsin.length; i++) {
        names.push(result.itemsWithoutAsin[i].name);
      }
      alert('Note: The following items are not yet linked to Amazon and will need to be found manually:\n\n- ' + names.join('\n- '));
    }

    submitToAmazon(result);
  }

  function submitToAmazon(result) {
    var params = result.url.split('?')[1];
    if (!params) { window.location.href = result.url; return; }

    var form = document.createElement('form');
    form.method = 'GET';
    form.action = 'https://www.amazon.com/gp/aws/cart/add.html';
    form.target = '_blank';
    form.rel = 'noopener';
    form.style.display = 'none';

    var pairs = params.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var kv = pairs[i].split('=');
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = decodeURIComponent(kv[0]);
      input.value = decodeURIComponent(kv[1] || '');
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    setTimeout(function () { document.body.removeChild(form); }, 100);
  }

  // ─── Product Page Integration ───────────────────────────────────────
  // AI AGENT: These functions wire up "Add to Cart" buttons on product detail pages.
  // They look for standard DOM elements by ID. If your product page uses different
  // element IDs, update the selectors below.

  function getProductSlug() {
    var path = window.location.pathname;
    var match = path.match(/\/store\/(p\d+)\//);
    return match ? match[1] : null;
  }

  function getProductInfo() {
    var titleEl = document.getElementById('wsite-com-product-title');
    if (!titleEl) return null;

    var name = titleEl.textContent.trim();

    var price = 0;
    var priceEl = document.querySelector('#wsite-com-product-price .wsite-com-product-price-amount');
    if (priceEl) {
      var priceText = priceEl.textContent.replace(/[^0-9.]/g, '');
      price = parseFloat(priceText) || 0;
    }

    var image = '';
    var imgEl = document.querySelector('#wsite-com-product-image-main img, .wsite-com-product-images img');
    if (imgEl) {
      image = imgEl.getAttribute('src') || '';
    }

    var options = [];
    var optionKey = '';
    var optionGroups = document.querySelectorAll('.wsite-com-product-option');
    for (var i = 0; i < optionGroups.length; i++) {
      var checked = optionGroups[i].querySelector('input[type="radio"]:checked');
      if (checked) {
        options.push(checked.value);
        optionKey += checked.value + '|';
      }
      var select = optionGroups[i].querySelector('select');
      if (select && select.value) {
        options.push(select.value);
        optionKey += select.value + '|';
      }
    }

    var qtyInput = document.getElementById('wsite-com-product-quantity-input');
    var quantity = 1;
    if (qtyInput) {
      quantity = parseInt(qtyInput.value, 10) || 1;
      if (quantity < 1) quantity = 1;
    }

    var slug = getProductSlug();

    var uuid = '';
    var reviewEl = document.querySelector('[data-product-uuid]');
    if (reviewEl) {
      uuid = reviewEl.getAttribute('data-product-uuid');
    }

    return {
      id: slug || uuid || name.replace(/\s+/g, '_').toLowerCase(),
      name: name,
      price: price,
      image: image,
      options: options.join(', '),
      optionKey: optionKey
    };
  }

  function wireProductPage() {
    var buyBtn = document.getElementById('wsite-com-product-add-to-cart');
    if (!buyBtn) return;

    buyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var info = getProductInfo();
      if (info) {
        addToCart({
          id: info.id,
          name: info.name,
          price: info.price,
          image: info.image,
          options: info.options,
          optionKey: info.optionKey,
          quantity: 1
        });
        openCartDrawer();
      }
    });
  }

  // ─── Public API ──────────────────────────────────────────────────────
  // AI AGENT: External code can interact with the cart via window.SiteCart.
  // Example: window.SiteCart.addToCart({ id: 'p1', name: 'Widget', quantity: 1, asin: 'B001...' })

  window.SiteCart = {
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateQuantity: updateQuantity,
    clearCart: clearCart,
    getCart: getCart,
    getCartCount: getCartCount,
    openCartDrawer: openCartDrawer,
    closeCartDrawer: closeCartDrawer,
    toggleCartDrawer: toggleCartDrawer
  };

  // ─── Initialize ─────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      createCartIcon();
      createCartNotification();
      createCartDrawer();
      updateCartBadge();
      wireProductPage();
    });
  } else {
    createCartIcon();
    createCartNotification();
    createCartDrawer();
    updateCartBadge();
    wireProductPage();
  }
})();
