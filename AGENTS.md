# AI Agent Guide — Affiliate Website Template

This template is designed for AI agents to create unique affiliate websites.
Each site should feel genuinely original — different niche, different personality,
different visual identity.

## Step 0: Create Your Site Repository

Before doing anything else, create your own repo from this template.

**If the template is a GitHub Template Repository:**
1. Click "Use this template" → "Create a new repository" on GitHub
2. Name it something niche-specific (e.g., `indoor-herb-garden-store`)
3. Clone it locally: `git clone <your-repo-url> && cd <your-repo>`
4. Install: `npm install`

**If cloning manually:**
```bash
git clone https://github.com/skolez/affiliate-website-template.git my-niche-site
cd my-niche-site
rm -rf .git
git init && git add -A && git commit -m "Initial commit"
npm install
```

Then proceed with Task 1 below.

## How This Template Works

1. **site-config.json** is the single source of truth. Fill it in first.
2. **`npm run setup`** propagates config values into templates, CSS, and JS.
3. **Data files** (`products.json`, `store.json`) drive the store dynamically.
4. **Templates** use Nunjucks (`.njk`) with `{{ variable }}` syntax.
5. **Build** with `npm run build` (outputs to `_site/`), test with `npm test`.

## Agent Task Breakdown

These tasks are ordered by dependency. Complete them top-to-bottom.
Each task is sized for a single focused agent session.

---

### Task 1: Choose a Niche & Configure the Site
**Files:** `site-config.json`
**Effort:** Small

Pick a specific, profitable niche. Don't be generic — the more specific, the
better for SEO. Examples: "indoor herb gardening", "amateur telescope equipment",
"vintage vinyl turntable accessories", "cat puzzle feeders".

1. Open `site-config.json`
2. Fill in ALL fields — every `{{PLACEHOLDER}}` must be replaced
3. Choose a color theme that fits your niche personality (don't reuse defaults)
4. Pick Google Fonts that match your brand voice (update the font names)
5. Set your Amazon Associates affiliate tag
6. Run `npm run setup` to propagate values

**Be creative with:**
- Site name (memorable, brandable, niche-specific)
- Tagline (punchy, benefit-focused)
- Color palette (evoke the niche — earthy for gardening, techy for gadgets, etc.)
- Font choices (playful vs professional vs rustic — match your audience)

---

### Task 2: Define Categories & Products
**Files:** `src/_data/store.json`, `src/_data/products.json`
**Effort:** Medium

Research real Amazon products in your niche. Use actual ASINs.

1. Define 3-6 categories in `store.json` (with optional subcategories)
2. Add 10-30 products to `products.json` with real ASINs
3. Each product needs: id, name, asin, category, categoryName, price, description
4. Product images can use placeholder paths — add real images later

**Tips:**
- Categories should cover the niche's main product types
- Include a mix of price points (budget, mid-range, premium)
- Write descriptions that help buyers, not just list features
- Use subcategories for niches with lots of product variety

---

### Task 3: Customize the Homepage
**Files:** `src/index.njk`
**Effort:** Small

The homepage is the first impression. Make it compelling for your audience.

1. Write a hero section that speaks directly to your target audience
2. Populate the category grid with your actual categories from `store.json`
3. Update the "Why Shop With Us?" section with niche-specific value propositions
4. Add any niche-specific sections (seasonal tips, featured picks, etc.)

**Be creative with:**
- Hero copy (address a pain point your audience has)
- Category card icons and descriptions
- Value propositions (what makes YOUR recommendations trustworthy?)
- Page structure (add/remove sections as your niche demands)

---

### Task 4: Write the About & Contact Pages
**Files:** `src/about.njk`, `src/contact.njk`
**Effort:** Small

These pages build trust (critical for affiliate conversions).

1. Write a genuine-sounding founder story for the about page
2. Explain your expertise and why people should trust your recommendations
3. Set up the contact page with appropriate contact methods
4. Add niche-relevant FAQs to the contact page

---

### Task 4b: Run Knowledge Base Discovery (Phases 1a → 1b → 1c)
**Files:** `agents/sources.md`, `knowledge-base/tier1/`
**Effort:** Medium

Before writing blog content, build the knowledge base that will ground the site in real sources.

1. Run **Phase 1a discovery** first: catalog **30+ sources** in `agents/sources.md`
2. Then run **Phase 1b** to enrich Tier 1 sources
3. Then run **Phase 1c** to synthesize findings into `knowledge-base/tier1/`
4. **Do not start writing blog posts (Task 5) until Phase 1a is at least complete** — blog articles should cite real sources from the knowledge base

---

### Task 5: Write Blog Content
**Files:** `src/blog/*.md`
**Effort:** Large (do in multiple sessions)

Prerequisites: Complete Task 4b (KB Discovery) before writing articles. Use sources from `knowledge-base/` to inform and cite your content.

Blog content drives organic search traffic. Each post should target a keyword.

1. Check `seo-blog-templates/KEYWORD_CALENDAR.md` for keyword ideas
2. Use templates from `seo-blog-templates/templates/` as starting structures
3. Follow the content standards in `seo-blog-templates/CONTENT_GUIDE.md`
4. Create 3-5 initial posts targeting your niche's most searched terms

**Post types that work well for affiliate sites:**
- "Best X for Y" (e.g., "Best Telescopes for Beginners Under $300")
- How-to guides (e.g., "How to Set Up Your First Indoor Herb Garden")
- Product comparisons (e.g., "Product A vs Product B: Which Should You Buy?")
- Seasonal guides (e.g., "Spring Gardening Checklist: Everything You Need")

---

### Task 6: Customize Visual Design
**Files:** `src/css/style.css`, `src/css/store.css`, `src/_includes/base.njk`
**Effort:** Medium

Go beyond just changing colors. Make the site feel like a unique brand.

1. Update CSS variables in `:root` (already done if you ran setup)
2. Consider changing the layout approach (grid vs. flexbox arrangements)
3. Add custom visual elements that fit your niche
4. Ensure mobile responsiveness works for your content
5. Add favicon and OG image for your brand

**Be creative with:**
- Banner/header style (image? gradient? pattern?)
- Card designs (rounded? sharp? shadowed?)
- Typography combinations
- Hover effects and micro-interactions
- Color usage (don't just set variables — think about visual hierarchy)

---

### Task 7: Add Product Images & Brand Assets
**Files:** `src/images/`, `src/favicon.ico`, `src/favicon-16.png`, etc.
**Effort:** Medium

Products without images don't convert. Brand assets are required for social sharing.

1. Source images for each product in `products.json`
2. Optimize images (compress, resize to reasonable dimensions)
3. Place in `src/images/` and update `products.json` image paths

**Required brand assets (social sharing and search will break without these):**
- `src/images/og-image.png` — Open Graph image for social previews (1200x630px recommended)
- `src/favicon.ico` — Browser tab icon
- `src/favicon-16.png` — 16x16 favicon
- `src/favicon-32.png` — 32x32 favicon
- `src/favicon-192.png` — Android home screen icon (192x192)
- `src/apple-touch-icon.png` — iOS home screen icon (180x180)

---

### Task 8: Test & Deploy
**Files:** `wrangler.jsonc`, `.github/workflows/deploy.yml`
**Effort:** Small

**Testing:**
1. Run `npm run build` — verify clean build
2. Run `npm test` — all 197 tests should pass (build, data, cart, store, filters)
3. Check `_site/` output for correctness

**Deploy option A: GitHub Actions (recommended, automatic)**
1. Update `"name"` in `wrangler.jsonc` to your site slug (e.g., `"indoor-herb-garden"`)
2. Update `PROJECT_NAME` in `.github/workflows/deploy.yml` to match
3. Create the Cloudflare Pages project: `npx wrangler pages project create YOUR-SLUG`
4. Add two GitHub repository secrets (Settings > Secrets > Actions):
   - `CLOUDFLARE_API_TOKEN` — Create at Cloudflare dashboard > API Tokens > "Edit Cloudflare Pages"
   - `CLOUDFLARE_ACCOUNT_ID` — Found on Cloudflare dashboard right sidebar
5. Push to master/main — deploy runs automatically
6. Site goes live at `YOUR-SLUG.pages.dev`

**Deploy option B: Manual CLI deploy**
1. Install wrangler: `npm i -g wrangler` and authenticate: `wrangler login`
2. Run `npm run deploy` (builds, tests, and deploys in one command)

**Custom domain (optional):**
1. In Cloudflare Pages dashboard > your project > Custom domains
2. Add your domain and follow DNS instructions
3. HTTPS is automatic

---

## Architecture Decisions (Already Made)

These decisions are baked into the template so agents don't need to make them:

- **Static site generator:** Eleventy 3.x (simple, fast, template-agnostic)
- **Hosting:** Cloudflare Pages (free tier, global CDN, auto-HTTPS)
- **Affiliate network:** Amazon Associates (largest, most trusted)
- **Cart system:** Client-side localStorage with Amazon cart URL builder
- **Styling:** Vanilla CSS with CSS custom properties (no build step needed)
- **JavaScript:** Vanilla JS, no frameworks (fast, no dependencies)
- **SEO:** Built-in sitemap, robots.txt, OG tags, structured data, canonical URLs
- **Data format:** JSON for products/categories (easy for agents to generate)
- **CI/CD:** GitHub Actions → Cloudflare Pages (auto-deploy on push to main)
- **Branching:** Trunk-based development (see `.github/BRANCH_STRATEGY.md`)
- **Preview deploys:** Every PR gets a unique Cloudflare Pages preview URL
- **Node version:** Pinned in `.node-version` (used by CI and `nvm`)

## File Quick Reference

| What you want to do | File to edit |
|---|---|
| Change site name/colors/config | `site-config.json` then `npm run setup` |
| Add/edit products | `src/_data/products.json` |
| Add/edit categories | `src/_data/store.json` |
| Edit homepage | `src/index.njk` |
| Edit store page | `src/store.njk` |
| Write a blog post | `src/blog/your-post.md` |
| Change blog post layout | `src/_includes/post.njk` |
| Plan blog keywords | `seo-blog-templates/KEYWORD_CALENDAR.md` |
| Log a blocker | `BLOCKED.md` |
| Understand branching | `.github/BRANCH_STRATEGY.md` |
| Validate before pushing | `npm run validate` |
| Change page layout | `src/_includes/base.njk` |
| Change footer | `src/_includes/footer.njk` |
| Change styles | `src/css/style.css` |
| Add Eleventy filters | `.eleventy.js` |
| Change navigation | `site-config.json` → navigation array |

## When You're Blocked

If you can't complete a task (missing API key, need human decision, external
dependency, etc.), **don't silently fail**. Instead:

1. Add an entry to `BLOCKED.md` with the required fields
2. Continue with other unblocked tasks
3. At the start of each session, check `BLOCKED.md` for tasks you can now unblock

This lets other agents (or humans) pick up where you left off.

## ASIN Data: Single Source of Truth

Product ASINs live in **one place only**: `src/_data/products.json`.

The build pipeline automatically injects them into the page as `window.PRODUCT_ASIN_MAP`,
which `cart.js` reads at runtime. **Never duplicate ASINs in JavaScript files.**

For products with variants (e.g., size/color), extend the map in a page-level
script block before `cart.js` loads.

## Blog Pipeline

The blog system is fully wired:
- Write posts as `.md` files in `src/blog/`
- They automatically get the `post.njk` layout and `posts` tag (via `blog.json`)
- The blog index at `/blog/` lists all posts reverse-chronologically
- Each post gets Article structured data (JSON-LD) for rich search snippets
- Use templates in `seo-blog-templates/templates/` for structure
- Track keywords in `seo-blog-templates/KEYWORD_CALENDAR.md`

## Knowledge Base

The `knowledge-base/` directory stores distilled niche knowledge for RAG/content:
- `sources.md` — Catalog of all research sources
- `conflicts.md` — Conflicting info between sources and resolutions
- `tier1/` — Summarized authoritative source content
- See `knowledge-base/README.md` for the full build process

## Important Constraints

- **Never hardcode the affiliate tag** — it's injected via `<meta>` tag in `base.njk`
- **Never hardcode ASINs in JS** — they come from `products.json` via `window.PRODUCT_ASIN_MAP`
- **Always use `esc()` when rendering user/product data** — XSS protection
- **Keep JS vanilla** — no npm runtime dependencies, no frameworks
- **Test after changes** — `npm test` must pass before deploying
- **Log blockers** — use `BLOCKED.md` when you can't complete a task
