# BSF Indoors

## Project Context

- **Site:** bsfindoors.com
- **Region:** Cache Valley, Utah, USDA 5b, semi-arid, ~4,500 ft elevation, long cold winters
- **Audience:** Backyard/homestead operators in cold climates who want a year-round BSFL colony for chicken/fish feed, composting, and frass — without an outdoor or greenhouse setup
- **Niche:** indoor black soldier fly (BSF) farming
- **Affiliate Tag:** See `site-config.json` under `affiliate.tag` (required for Amazon Associates)

## Quick Start

```bash
npm install                 # Install dependencies
npm run dev                 # Start dev server (localhost:8080)
npm run build               # Build to _site/
npm test                    # Run test suite
npm run setup               # Apply site-config.json to all templates
```

## Project Structure

```
affiliate-website-template/
├── site-config.json           # Single source of truth for all niche-specific config
├── .eleventy.js               # Eleventy configuration
├── src/
│   ├── _data/                 # Global data files (products.json, store.json, navigation.json)
│   ├── _includes/             # Layouts and reusable template components
│   ├── blog/                  # Blog posts (.md or .njk with frontmatter)
│   ├── css/                   # Stylesheets (processed and copied to _site)
│   ├── js/                    # Client-side JavaScript modules
│   │   ├── cart.js            # Affiliate cart system (localStorage + Amazon URL builder)
│   │   ├── store.js           # Data-driven product grid and filtering
│   │   └── kits.js            # Kit/bundle builder with YesCartGo price checking (optional)
│   ├── images/                # Product images, graphics
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── agents/                    # AI agent prompts and status tracking
│   ├── kb_builder.prompt.md   # Knowledge base builder prompt
│   └── status.md              # Phase tracking and run logs
├── knowledge-base/            # Distilled knowledge for RAG chatbot
│   ├── sources.md             # Catalog of all sources discovered
│   ├── conflicts.md           # Conflicting information between sources
│   └── tier1/                 # Tier 1 sources with summaries
├── seo-blog-templates/        # Blog content templates and standards
│   ├── CONTENT_GUIDE.md       # Writing standards and checklist
│   ├── KEYWORD_CALENDAR.md    # Target keywords and publish dates
│   └── templates/             # Ready-to-use blog post templates
├── AGENTS.md                  # AI agent task guide (start here if you're an AI agent)
├── BLOCKED.md                 # Blocked task tracker for agents
├── scripts/                   # Build and setup scripts
├── tests/                     # Jest test suite
└── wrangler.jsonc            # Cloudflare Workers configuration (for deployment)
```

## Configuration

### site-config.json — The Single Source of Truth

Edit `site-config.json` to define your entire site. Every placeholder (like `BSF Indoors`) must be filled in:

```json
{
  "site": {
    "name": "Your Site Name",
    "domain": "example.com",
    "tagline": "Your brief tagline",
    "description": "Full site description for SEO"
  },
  "region": {
    "name": "Your Region",
    "climateZone": "USDA Zone 6b, semi-arid, etc.",
    "states": ["UT", "ID"]
  },
  "audience": {
    "primary": "Beginner to intermediate [your niche]",
    "secondary": "Other interested groups"
  },
  "affiliate": {
    "tag": "yoursite-20",
    "yescartgo": {
      "enabled": false,
      "apiBase": "https://yescartgo.skolez.workers.dev"
    }
  },
  "theme": {
    "primaryColor": "#2c5f2d",
    "accentColor": "#e07b39",
    "fontBody": "'Lato', 'Helvetica Neue', Arial, sans-serif"
  },
  "seo": {
    "defaultAuthor": "Your Name",
    "defaultKeywords": "keyword1, keyword2, keyword3"
  }
}
```

After editing, run:

```bash
npm run setup  # Applies site-config.json to all templates
```

## Adding Products

### 1. Edit `src/_data/products.json`

Create or update with product objects:

```json
[
  {
    "id": "product-001",
    "name": "Beginner Kit",
    "asin": "B0A1B2C3D4",
    "image": "/images/beginner-kit.jpg",
    "price": 89.99,
    "category": "kits",
    "categoryName": "Kits & Bundles",
    "description": "Complete starter pack for beginners"
  }
]
```

**Required fields:**
- `id` — Unique identifier
- `name` — Display name
- `asin` — Amazon Standard Identification Number (used for affiliate links)
- `category` — Category ID (must exist in `store.json`)
- `categoryName` — Human-readable category name

### 2. Ensure Category Exists in `src/_data/store.json`

```json
{
  "categories": [
    {
      "id": "kits",
      "name": "Kits & Bundles"
    },
    {
      "id": "tools",
      "name": "Tools & Equipment"
    }
  ]
}
```

### 3. Map Categories in `src/js/store.js`

Update the `catProductMap` object to link category IDs to products:

```javascript
const catProductMap = {
  kits: ['product-001', 'product-002'],
  tools: ['product-003', 'product-004']
};
```

### 4. Update ASIN Mappings in `src/js/cart.js`

The cart system builds Amazon affiliate URLs using ASIN mappings:

```javascript
const defaultAsinMap = {
  'product-001': 'B0A1B2C3D4',
  'product-002': 'B0A5B6C7D8'
};
```

## Adding Categories

1. **Edit `src/_data/store.json`** — Add to the `categories` array
2. **Update `src/js/store.js`** — Add mappings in `catProductMap`
3. **Update navigation** — Add category link to `site-config.json` if needed

## Writing Blog Content

### Content Standards

Check `seo-blog-templates/CONTENT_GUIDE.md` for:
- Word count targets ({{CONTENT_LENGTH}})
- H2/H3 structure requirements
- Internal linking checklist
- Call-to-action (CTA) placement
- Image optimization guidelines

### Creating Posts

1. **Choose a template** — Browse `seo-blog-templates/templates/` for structure examples
2. **Create file** — Add `.md` or `.njk` to `src/blog/` with front matter:

```markdown
---
title: "Your Post Title"
description: "Meta description under 160 characters"
date: 2026-04-04
author: BSF Indoors
tags: ["beginner", "how-to"]
---

Your content here...
```

3. **Target keywords** — Check `seo-blog-templates/KEYWORD_CALENDAR.md` for target keywords and publish dates
4. **Internal links** — Link to related posts and product pages
5. **Include CTAs** — Link to relevant products in your store

### File Locations

- **Blog posts:** `src/blog/post-title.md`
- **Blog layout:** `src/_layouts/post.njk` (automatically applied via front matter)
- **Blog index:** `src/blog/index.njk` (lists all posts)

## Knowledge Base Builder

The knowledge base builder helps AI agents build a distilled, conflict-free reference of your niche.

### Phases

**Phase 1a (Discovery):**
- Breadth-first catalog of 30+ sources
- Lightweight metadata only
- Use WebSearch only
- Commit to `agents/sources.md`

**Phase 1b (Enrichment):**
- Summarize Tier 1 sources (500 words each)
- WebFetch allowed, limit 3-4 per run
- Enrich conflict areas
- Update `agents/status.md`

**Phase 1c (Synthesis):**
- Build consolidated knowledge base in `knowledge-base/tier1/`
- One markdown file per key topic
- Reference all sources
- Resolve conflicts in `knowledge-base/conflicts.md`

### Agent Files

- **Prompt:** `agents/kb_builder.prompt.md` — Full instructions for knowledge base discovery
- **Status:** `agents/status.md` — Phase tracking, run timestamps, next actions
- **Sources:** `agents/sources.md` — Catalog of all discovered sources
- **Conflicts:** `knowledge-base/conflicts.md` — Conflicting info between sources

### Scheduled Task Guidelines

- **One task per run** — Keep runs focused (~15–20 minutes)
- **Short, iterative cycles** — Discover, enrich, synthesize in phases
- **Commit before stopping** — Update `agents/status.md` and push
- **WebFetch sparingly** — 3–4 per run to avoid rate limiting

## Cart System

### How It Works

1. **Client-side:** `src/js/cart.js` manages a localStorage shopping cart
2. **ASIN Mapping:** Products stored by ID; ASIN lookup happens at checkout
3. **Affiliate URL Building:** Cart redirects to Amazon Associates affiliate link with:
   - All ASINs as URL parameters
   - Your affiliate tag appended
   - Pre-populated Amazon cart

### Example Cart Flow

```javascript
// User adds product to cart
addToCart({ id: 'product-001', name: 'Beginner Kit' });

// Cart stored in localStorage
// localStorage.cart = [{ id: 'product-001', ... }]

// User clicks "Buy on Amazon"
// cart.js looks up ASIN: 'B0A1B2C3D4'
// Redirects to:
// https://amazon.com/gp/cart/view.html?asin=B0A1B2C3D4&tag=yoursite-20
```

## Deployment

### GitHub Actions CI/CD (Recommended)

The template includes two GitHub Actions workflows:

- **`.github/workflows/ci.yml`** — Runs on every push and PR. Builds, tests, verifies output.
- **`.github/workflows/deploy.yml`** — Deploys to Cloudflare Pages on push to master/main.

**Setup (one-time per site):**
1. Update `"name"` in `wrangler.jsonc` to your site slug
2. Update `PROJECT_NAME` in `.github/workflows/deploy.yml` to match
3. Create the Pages project: `npx wrangler pages project create YOUR-SLUG`
4. Add GitHub secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
5. Push to master — auto-deploys to `YOUR-SLUG.pages.dev`

### Manual CLI Deploy

```bash
npm run deploy    # Builds, tests, and deploys in one command
```

Or step by step:
```bash
npm run build
npm test
wrangler pages deploy _site
```

### Environment Variables

Add to Cloudflare Pages project settings (if using YesCartGo):

```
YESCARTGO_API_BASE=https://yescartgo.skolez.workers.dev
```

### Custom Domain

1. Update `site-config.json` with domain
2. Configure DNS in Cloudflare dashboard
3. Pages automatically handles HTTPS

## Testing

Run Jest test suite:

```bash
npm test
```

### Test Locations

- **Cart tests:** Validate ASIN mapping, URL building, cart state
- **Store tests:** Validate product filtering, category navigation
- **Template tests:** Verify Eleventy builds without errors

## Directory Reference for AI Agents

When an AI agent (like yourself) needs to add features, here are key locations:

- **Add filters/shortcodes:** `.eleventy.js`
- **Add global data:** `src/_data/*.json`
- **Add layouts:** `src/_layouts/*.njk`
- **Add components:** `src/_includes/*.njk`
- **Add styles:** `src/css/*.css`
- **Add scripts:** `src/js/*.js`
- **Add blog posts:** `src/blog/*.md`
- **Update config:** `site-config.json` (then run `npm run setup`)

## Troubleshooting

### Dev server won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build fails with template errors
- Check for unclosed tags in `src/_layouts/*.njk`
- Verify Nunjucks syntax in front matter
- Run `npm run build` to see full error

### Products not showing in store
- Verify `id` in `products.json` matches `catProductMap` in `store.js`
- Check `category` matches an entry in `store.json`
- ASIN must exist in `cart.js` defaultAsinMap

### Cart not redirecting to Amazon
- Verify affiliate tag in `site-config.json`
- Check ASIN is in `defaultAsinMap`
- Browser may block redirect if JavaScript is disabled

## Credits

Based on the architecture of [Cache Valley Bee Supply](https://cachevalleybees.com), a successful niche authority site built with this template. Learn from real-world implementation and adapt this template for your own niche.

## License

MIT — Use freely for personal or commercial projects.
