/**
 * Kit Builder — Shows curated kits with live Amazon prices
 *
 * AI AGENT: Kits are curated bundles of products. Each kit has component items
 * with ASINs. The widget shows live prices via YesCartGo API and lets users
 * customize which items to include before sending to Amazon cart.
 *
 * The affiliate tag is read from <meta name="affiliate-tag"> in base.njk.
 * The YesCartGo API base URL is read from site-config.json (via setup.js).
 *
 * To add kits: define them in the KITS object below with ASINs for each item.
 */
(function () {
  'use strict';

  // Read affiliate tag from meta tag (single source of truth)
  var metaTag = document.querySelector('meta[name="affiliate-tag"]');
  var ASSOCIATE_TAG = (metaTag && metaTag.content) ? metaTag.content : '';

  // AI AGENT: YesCartGo provides live price checking for kit bundles.
  // Set window.YESCARTGO_ENABLED = true and optionally window.YESCARTGO_API_BASE
  // before this script loads to enable it. Without it, kits render without prices.
  var YESCARTGO_ENABLED = window.YESCARTGO_ENABLED || false;
  var API_BASE = window.YESCARTGO_API_BASE || 'https://yescartgo.skolez.workers.dev';
  var CHECK_API = API_BASE + '/api/check?asins=';
  var TRACK_API = API_BASE + '/api/track';

  // AI AGENT: Define your kits here. Each kit is a curated bundle.
  // Format: 'product-slug': { name: string, items: [{ asin, name, qty }] }
  //
  // Example:
  //   'p1': {
  //     name: 'Beginner Telescope Bundle',
  //     items: [
  //       { asin: 'B00R465YGS', name: 'Celestron PowerSeeker 127EQ', qty: 1 },
  //       { asin: 'B07S3Q4PWP', name: 'Barlow Lens 2x', qty: 1 },
  //       { asin: 'B001U2BEIC', name: 'Moon Filter', qty: 1 }
  //     ]
  //   }
  var KITS = {};

  function esc(s) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(s));
    return d.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function makeInput(name, value) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    return input;
  }

  function init() {
    var path = window.location.pathname;
    var match = path.match(/\/store\/(p\d+)\//);
    if (!match) return;

    var slug = match[1];
    var kit = KITS[slug];
    if (!kit) return;

    var buyDiv = document.getElementById('wsite-com-product-buy');
    if (!buyDiv) return;

    var container = document.createElement('div');
    container.id = 'kit-widget';
    container.style.cssText = 'margin-top:20px;font-family:Lato,Arial,sans-serif';
    buyDiv.parentNode.insertBefore(container, buyDiv.nextSibling);

    // Fetch live prices from YesCartGo
    var asins = kit.items.map(function (i) { return i.asin; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
    var url = CHECK_API + encodeURIComponent(asins.join(','));

    if (YESCARTGO_ENABLED) {
      container.innerHTML = '<div style="padding:16px;background:#f9f7f4;border-radius:8px;border:1px solid #e5e0d8;color:#999;font-size:13px">Loading kit components &amp; prices...</div>';

      fetch(url).then(function (r) { return r.json(); }).then(function (data) {
        renderWidget(container, kit, data);
      }).catch(function (err) {
        console.warn('[kits.js] Failed to fetch prices from YesCartGo:', err.message || err);
        renderWidget(container, kit, {});
      });
    } else {
      // Render without prices when YesCartGo is disabled
      renderWidget(container, kit, {});
    }
  }

  function renderWidget(container, kit, priceData) {
    var checked = kit.items.map(function () { return true; });
    render();

    function render() {
      var total = 0;
      var hasPrices = false;

      var rows = kit.items.map(function (item, i) {
        var info = priceData[item.asin];
        var unitPrice = info && info.price ? info.price : null;
        var linePrice = unitPrice ? unitPrice * item.qty : null;
        if (linePrice && checked[i]) { total += linePrice; hasPrices = true; }

        return '<div class="kit-item' + (checked[i] ? '' : ' off') + '" data-i="' + i + '" style="display:flex;align-items:center;gap:10px;padding:10px 16px;cursor:pointer;transition:background .1s;border-bottom:1px solid #f0ece6">'
          + '<input type="checkbox"' + (checked[i] ? ' checked' : '') + ' data-i="' + i + '" style="width:16px;height:16px;accent-color:#f0a030;cursor:pointer;flex-shrink:0">'
          + '<span style="flex:1;font-size:13px;color:' + (checked[i] ? '#333' : '#bbb') + ';' + (checked[i] ? '' : 'text-decoration:line-through') + '">'
          + '<strong style="color:' + (checked[i] ? '#aa5922' : '#ccc') + '">' + item.qty + 'x</strong> '
          + esc(item.name) + '</span>'
          + (linePrice ? '<span style="font-size:12px;color:#999;font-family:monospace;' + (checked[i] ? '' : 'opacity:0.4') + '">$' + linePrice.toFixed(2) + '</span>' : '')
          + '<a href="https://www.amazon.com/dp/' + encodeURIComponent(item.asin) + '?tag=' + encodeURIComponent(ASSOCIATE_TAG) + '" target="_blank" rel="noopener" title="View on Amazon" style="font-size:11px;color:#999;text-decoration:none;padding:2px 5px;border:1px solid #e5e0d8;border-radius:4px;background:#faf8f5">&#8599;</a>'
          + '</div>';
      }).join('');

      var selectedCount = checked.filter(Boolean).length;
      var selectedTotal = 0;
      kit.items.forEach(function (item, i) {
        if (checked[i] && priceData[item.asin] && priceData[item.asin].price) {
          selectedTotal += priceData[item.asin].price * item.qty;
        }
      });

      container.innerHTML = '<div style="background:#fff;border:1px solid #e5e0d8;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06)">'
        + '<div style="padding:16px 20px 14px;border-bottom:1px solid #f0ece6;background:#f9f7f4">'
        + '<div style="font-size:15px;font-weight:600;color:#333;margin:0 0 2px">' + esc(kit.name) + '</div>'
        + '<div style="font-size:12px;color:#999">' + kit.items.length + ' items — uncheck items you already have</div>'
        + '</div>'
        + '<div>' + rows + '</div>'
        + '<div style="padding:14px 20px 16px;border-top:1px solid #f0ece6">'
        + (hasPrices ? '<div style="font-size:12px;color:#999;font-family:monospace;text-align:right;margin-bottom:10px">Est. total: $' + selectedTotal.toFixed(2) + '</div>' : '')
        + '<button id="kit-cart-btn" style="display:block;width:100%;padding:12px;background:#f0a030;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;font-family:Lato,sans-serif;transition:opacity .15s">'
        + 'Send ' + selectedCount + ' Item' + (selectedCount !== 1 ? 's' : '') + ' to Amazon Cart</button>'
        + '<div style="font-size:11px;color:#b0a99f;text-align:center;margin-top:8px">As an Amazon Associate I earn from qualifying purchases.</div>'
        + '</div></div>';

      // Wire up checkbox toggling
      container.querySelectorAll('.kit-item').forEach(function (row) {
        row.addEventListener('click', function (e) {
          if (e.target.tagName === 'A') return;
          var idx = parseInt(this.getAttribute('data-i'));
          if (e.target.tagName !== 'INPUT') checked[idx] = !checked[idx];
          else checked[idx] = e.target.checked;
          render();
        });
      });

      // Wire up Send to Amazon Cart
      document.getElementById('kit-cart-btn').addEventListener('click', function () {
        var selected = kit.items.filter(function (_, i) { return checked[i]; });
        if (!selected.length) { alert('Select at least one item.'); return; }

        // Build Amazon cart URL
        var params = ['AssociateTag=' + encodeURIComponent(ASSOCIATE_TAG)];
        selected.forEach(function (item, i) {
          params.push('ASIN.' + (i + 1) + '=' + encodeURIComponent(item.asin));
          params.push('Quantity.' + (i + 1) + '=' + item.qty);
        });
        var cartUrl = 'https://www.amazon.com/gp/aws/cart/add.html?' + params.join('&');

        // Track via YesCartGo (optional analytics, only when enabled)
        if (YESCARTGO_ENABLED) {
          try {
            fetch(TRACK_API, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                event: 'cart_click',
                tag: ASSOCIATE_TAG,
                list_title: kit.name,
                items_count: selected.length
              }),
              keepalive: true
            });
          } catch (e) {
            console.warn('[kits.js] Failed to send analytics:', e.message || e);
          }
        }

        // Submit via form for reliability
        var form = document.createElement('form');
        form.method = 'GET';
        form.action = 'https://www.amazon.com/gp/aws/cart/add.html';
        form.target = '_blank';
        form.style.display = 'none';
        form.appendChild(makeInput('AssociateTag', ASSOCIATE_TAG));
        selected.forEach(function (item, idx) {
          form.appendChild(makeInput('ASIN.' + (idx + 1), item.asin));
          form.appendChild(makeInput('Quantity.' + (idx + 1), item.qty));
        });
        document.body.appendChild(form);
        form.submit();
        setTimeout(function () { document.body.removeChild(form); }, 100);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
