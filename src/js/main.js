/**
 * Affiliate Website Template — Main JS
 *
 * AI AGENT: This handles mobile menu toggle and sticky header.
 * These are core interactions — you can extend this file with
 * additional global behaviors (e.g., scroll-to-top button, lazy loading).
 */
(function () {
  "use strict";

  // Mobile menu toggle
  // Links to checkbox with id #mobile-trigger for CSS-only mobile menu
  var trigger = document.getElementById("mobile-trigger");
  if (trigger) {
    trigger.addEventListener("change", function () {
      document.body.classList.toggle("menu-open", this.checked);
    });
  }

  // Sticky header with throttled scroll listener
  var headerWrap = document.getElementById("header-wrap");
  if (headerWrap) {
    var stickyOffset = headerWrap.offsetTop + headerWrap.offsetHeight;
    var ticking = false;

    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          headerWrap.classList.toggle("stuck", window.pageYOffset > stickyOffset);
          ticking = false;
        });
        ticking = true;
      }
    });
  }
})();
