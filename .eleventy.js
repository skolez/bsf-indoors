/**
 * Eleventy Configuration
 *
 * AI AGENT: This is the build configuration. It controls how Eleventy
 * transforms src/ into _site/. Key extension points:
 *
 * - addPassthroughCopy(): Files copied as-is (CSS, JS, images)
 * - addFilter(): Template filters ({{ value | filterName }})
 * - addShortcode(): Template shortcodes ({% shortcodeName %})
 * - addCollection(): Custom content collections
 *
 * When adding new features, consider whether they should be:
 * - A filter (transforms a value inline)
 * - A shortcode (generates HTML output)
 * - A collection (groups pages for listing)
 */
module.exports = function (eleventyConfig) {

  // ===== PASSTHROUGH COPY =====
  // These files get copied as-is to _site/ without processing
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/favicon-16.png");
  eleventyConfig.addPassthroughCopy("src/favicon-32.png");
  eleventyConfig.addPassthroughCopy("src/favicon-192.png");
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");

  // ===== FILTERS =====

  // Date filter for sitemap and blog posts
  // Usage: {{ page.date | date("%Y-%m-%d") }}
  eleventyConfig.addFilter("date", (date, format) => {
    const d = (date === "now" || !date) ? new Date() : (date instanceof Date ? date : new Date(date));
    if (isNaN(d.getTime())) return "";
    if (format === "%Y-%m-%d" || format === "Y-m-d") {
      return d.toISOString().split("T")[0];
    }
    return d.toISOString();
  });

  // Store slug filter: convert product name to URL-safe slug
  // Usage: {{ "My Product Name" | storeSlug }}
  eleventyConfig.addFilter("storeSlug", (str) => {
    return str.replace(/[&]/g, "_&_").replace(/\s+/g, "_").replace(/['']/g, "'");
  });

  // Safe JSON dump for use inside <script> tags.
  // Escapes </ sequences to prevent </script> from terminating the block.
  // Usage: {{ data | safeDump | safe }}
  eleventyConfig.addFilter("safeDump", (value) => {
    return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
  });

  // JSON-LD safe dump: outputs a value as JSON for structured data.
  // Uses the same escaping to prevent script block breakout.
  // Usage: {{ product | jsonld | safe }}
  eleventyConfig.addFilter("jsonld", (value) => {
    return JSON.stringify(value, null, 2).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
  });

  // Strip internal "_agentNote", "_agentInstructions", "_comment" fields from data
  // before dumping to HTML. Prevents leaking agent guidance into production pages.
  // Usage: {{ products | cleanData | dump | safe }}
  eleventyConfig.addFilter("cleanData", (data) => {
    if (Array.isArray(data)) {
      return data.map((item) => {
        if (typeof item !== "object" || item === null) return item;
        const cleaned = {};
        for (const [key, value] of Object.entries(item)) {
          if (!key.startsWith("_")) cleaned[key] = value;
        }
        return cleaned;
      });
    }
    if (typeof data === "object" && data !== null) {
      const cleaned = {};
      for (const [key, value] of Object.entries(data)) {
        if (!key.startsWith("_")) cleaned[key] = value;
      }
      return cleaned;
    }
    return data;
  });

  // ===== DATA VALIDATION =====
  // Warn at build time if products reference categories that don't exist in store.json.
  // This catches silent failures where products would never appear in the store sidebar.
  eleventyConfig.on("eleventy.before", () => {
    try {
      const fs = require("fs");
      const path = require("path");
      const productsPath = path.resolve(__dirname, "src/_data/products.json");
      const storePath = path.resolve(__dirname, "src/_data/store.json");
      if (!fs.existsSync(productsPath) || !fs.existsSync(storePath)) return;

      const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
      const store = JSON.parse(fs.readFileSync(storePath, "utf-8"));
      const categoryIds = new Set();
      (store.categories || []).forEach((cat) => {
        categoryIds.add(cat.id);
        (cat.subcategories || []).forEach((sub) => categoryIds.add(sub.id));
      });

      if (categoryIds.size === 0 || products.length === 0) return;

      products.forEach((p) => {
        if (p.category && !categoryIds.has(p.category)) {
          console.warn(`[warning] Product "${p.name || p.id}" has category "${p.category}" which does not exist in store.json. It will not appear in the store sidebar.`);
        }
        if (!p.asin && p.id && !p.id.startsWith("example-")) {
          console.warn(`[warning] Product "${p.name || p.id}" has no ASIN. Affiliate links will fall back to Amazon search.`);
        }
      });
    } catch (e) {
      // Non-fatal — validation is best-effort
    }
  });

  // ===== SHORTCODES =====

  // Year shortcode: always shows current year
  // Usage: {% year %}
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // AI AGENT: Add more shortcodes as your site grows. Ideas:
  //   {% affiliateLink asin="B001..." text="Buy Now" %}
  //   {% productCard id="product-001" %}
  //   {% callout type="tip" %} Content {% endcallout %}
  //   {% priceCheck asin="B001..." %}

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
