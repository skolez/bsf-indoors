/**
 * Store Page — Data-driven product grid with filtering
 *
 * AI AGENT: This file powers the store page. Products and categories are injected
 * as JSON by the Eleventy template (store.njk). The category-to-product mapping is
 * auto-generated from product data — you don't need to wire it manually.
 *
 * The affiliate tag is read from <meta name="affiliate-tag"> in base.njk.
 *
 * To customize: change the card layout in renderProducts(), or add
 * sorting/search features.
 */
(function () {
  "use strict";

  // Read affiliate tag from meta tag (single source of truth)
  var metaTag = document.querySelector('meta[name="affiliate-tag"]');
  var AFFILIATE_TAG = (metaTag && metaTag.content) ? metaTag.content : "";

  var products = window.STORE_PRODUCTS || [];
  var storeData = window.STORE_CATEGORIES || {};
  var categories = storeData.categories || [];

  var gridEl = document.getElementById("product-grid");
  var welcomeEl = document.getElementById("store-welcome");
  var bcEl = document.getElementById("store-breadcrumb");
  if (!gridEl) return;

  // Build category-to-subcategory parent map
  var parentMap = {};
  categories.forEach(function (cat) {
    if (cat.subcategories) {
      cat.subcategories.forEach(function (sub) {
        parentMap[sub.id] = cat;
      });
    }
  });

  // Auto-generate category-to-product mapping from product data.
  // Each product's "category" field is used as the key.
  // No manual wiring needed — just set the "category" field in products.json.
  var catProductMap = {};
  products.forEach(function (p) {
    if (p.category) {
      if (!catProductMap[p.category]) {
        catProductMap[p.category] = [];
      }
      catProductMap[p.category].push(p.id);
    }
  });

  // Wire up sidebar buttons
  var allItems = document.querySelectorAll(".sb-item");
  allItems.forEach(function (item) {
    var btn = item.querySelector(":scope > .sb-btn");
    if (!btn) return;

    btn.addEventListener("click", function () {
      clearActive();
      item.classList.add("open");
      btn.classList.add("active");
      showCategory(btn.getAttribute("data-category"), btn.textContent.trim());
    });

    item.querySelectorAll(".sb-sub").forEach(function (sub) {
      sub.addEventListener("click", function () {
        clearActive();
        item.classList.add("open");
        btn.classList.add("active");
        sub.classList.add("active");
        showCategory(sub.getAttribute("data-category"), sub.textContent.trim(), btn.textContent.trim());
      });
    });
  });

  // Check for category in URL query params (e.g., /store/?category=kits)
  var urlParams = new URLSearchParams(window.location.search);
  var initialCategory = urlParams.get("category");
  if (initialCategory) {
    // Find the matching category name for breadcrumb
    var catObj = categories.find(function (c) { return c.id === initialCategory; });
    var catName = catObj ? catObj.name : initialCategory;
    showCategory(initialCategory, catName);
  }

  function clearActive() {
    allItems.forEach(function (el) {
      el.classList.remove("open");
      var b = el.querySelector(":scope > .sb-btn");
      if (b) b.classList.remove("active");
      el.querySelectorAll(".sb-sub").forEach(function (s) { s.classList.remove("active"); });
    });
  }

  function showCategory(catId, name, parentName) {
    if (welcomeEl) welcomeEl.style.display = "none";
    gridEl.style.display = "";

    if (bcEl) {
      var bc = '<a href="/store/">Store</a>';
      if (parentName) bc += " &rsaquo; " + esc(parentName);
      bc += " &rsaquo; " + esc(name);
      bcEl.innerHTML = bc;
    }

    // Filter products by category. Uses the auto-generated catProductMap.
    var matchIds = catProductMap[catId];
    var filtered = matchIds
      ? products.filter(function (p) { return matchIds.indexOf(p.id) !== -1; })
      : products.filter(function (p) { return p.category === catId; });

    renderProducts(filtered);

    // Announce to screen readers that content changed
    gridEl.setAttribute("aria-busy", "false");
  }

  function renderProducts(list) {
    gridEl.setAttribute("aria-busy", "true");
    if (!list.length) {
      gridEl.innerHTML = '<p style="color:#999;text-align:center;padding:40px">No products in this category yet.</p>';
      return;
    }
    var h = "";
    list.forEach(function (p) {
      // Build Amazon affiliate link: ASIN direct link or search fallback
      // rel="sponsored" required by FTC/Amazon for affiliate links
      var url = p.asin
        ? "https://www.amazon.com/dp/" + encodeURIComponent(p.asin) + "?tag=" + encodeURIComponent(AFFILIATE_TAG)
        : "https://www.amazon.com/s?k=" + encodeURIComponent(p.name) + "&tag=" + encodeURIComponent(AFFILIATE_TAG);

      h += '<a class="prod-card" href="' + url + '" target="_blank" rel="noopener sponsored">';
      if (p.image) {
        h += '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" width="190" height="190" loading="lazy"/>';
      } else {
        h += '<div class="prod-card-placeholder" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 16l5-5 3 3 4-4 6 6"/><circle cx="8.5" cy="8.5" r="1.5"/></svg></div>';
      }
      h += '<div class="prod-info"><div class="prod-name">' + esc(p.name) + "</div>";
      h += '<div class="prod-price">View on Amazon &rarr;</div>';
      h += "</div></a>";
    });
    gridEl.innerHTML = h;
  }

  // XSS protection: escape HTML special characters including quotes.
  // Safe for use in both text content and HTML attribute values.
  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.appendChild(document.createTextNode(s));
    return d.innerHTML.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
})();
