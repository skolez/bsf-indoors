# Affiliate Website Template

A production-ready template for building **niche authority affiliate websites** with **Eleventy** and **Cloudflare Pages**. Designed for AI agents to customize and deploy unique Amazon affiliate sites in any niche.

## Creating a New Site

### Option A: GitHub Template (Recommended)

1. Click **"Use this template"** → **"Create a new repository"** on GitHub
2. Name your repo (e.g., `indoor-herb-garden-store`)
3. Clone your new repo locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   cd YOUR-REPO-NAME
   npm install
   ```

### Option B: Manual Clone

```bash
git clone https://github.com/skolez/affiliate-website-template.git my-niche-site
cd my-niche-site
rm -rf .git
git init
git add -A && git commit -m "Initial commit from affiliate-website-template"
```

## Quick Start (5 Minutes)

### 1. Configure Your Site

Edit `site-config.json` — fill in **every** field:

```json
{
  "niche": "indoor herb gardening",
  "site": {
    "name": "Herb Garden Hub",
    "domain": "herbgardenhub.com",
    "tagline": "Grow fresh herbs year-round",
    "description": "Expert guides and curated products for indoor herb gardeners."
  },
  "affiliate": {
    "tag": "herbgarden-20"
  },
  "theme": {
    "primaryColor": "#2d6a4f",
    "accentColor": "#d4a373"
  }
}
```

### 2. Apply Configuration

```bash
npm run setup
```

This propagates your config into all templates, CSS, and data files.

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

### 4. Add Products

Edit `src/_data/products.json` with real Amazon products:

```json
[
  {
    "id": "herb-starter-kit",
    "name": "Indoor Herb Garden Starter Kit",
    "asin": "B08GKJL123",
    "category": "kits",
    "categoryName": "Starter Kits",
    "description": "Everything you need to start growing herbs indoors."
  }
]
```

Define categories in `src/_data/store.json`. Product-to-category mapping is automatic — just set the `category` field on each product.

### 5. Validate & Deploy

```bash
npm run validate    # Build + run all 197 tests
npm run deploy      # Build + test + deploy to Cloudflare Pages
```

## For AI Agents

Read **`AGENTS.md`** — it breaks the entire site setup into 8 bite-sized tasks with specific file paths and creative guidance. Designed for agents to work through sequentially.

## Project Structure

```
├── site-config.json              # Single source of truth — edit this first
├── AGENTS.md                     # AI agent task guide (start here if you're an agent)
├── BLOCKED.md                    # Blocked task tracker for agents
├── src/
│   ├── _data/                    # Products, categories, navigation, site config
│   │   ├── products.json         # Product catalog (drives the store)
│   │   ├── store.json            # Category definitions
│   │   ├── site.json             # Site metadata (populated by setup.js)
│   │   └── navigation.json       # Nav menu items
│   ├── _includes/                # Layouts and reusable components
│   │   ├── base.njk              # Master HTML layout (all pages)
│   │   ├── post.njk              # Blog post layout
│   │   └── footer.njk            # Footer component
│   ├── blog/                     # Blog posts (.md files)
│   ├── css/style.css             # Main stylesheet (CSS custom properties)
│   ├── js/
│   │   ├── cart.js               # Shopping cart → Amazon checkout
│   │   ├── store.js              # Product grid with category filtering
│   │   └── kits.js               # Bundle builder (optional, with YesCartGo)
│   └── *.njk                     # Page templates (index, store, about, etc.)
├── seo-blog-templates/           # Blog writing guides and keyword calendar
├── knowledge-base/               # Niche research for content creation
├── tests/                        # 197 tests (build, data, cart, store, filters)
├── .github/workflows/            # CI + deploy to Cloudflare Pages
└── wrangler.jsonc                # Cloudflare Pages config
```

## Key Commands

| Command | What it does |
|---|---|
| `npm run setup` | Apply site-config.json to all templates |
| `npm run dev` | Start dev server with live reload |
| `npm run build` | Build to `_site/` |
| `npm test` | Run all 197 tests |
| `npm run validate` | Build + test (pre-deploy check) |
| `npm run deploy` | Build + test + deploy to Cloudflare Pages |

## Deployment

### GitHub Actions (Automatic)

Push to `main` → CI runs → deploys to Cloudflare Pages. Setup:

1. Update `PROJECT_NAME` in `.github/workflows/deploy.yml`
2. Update `"name"` in `wrangler.jsonc` to match
3. Create Cloudflare Pages project: `npx wrangler pages project create YOUR-SLUG`
4. Add GitHub secrets: `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`
5. Push to main — site goes live at `YOUR-SLUG.pages.dev`

PRs get automatic **preview deploys** with a unique URL posted as a comment.

See `.github/BRANCH_STRATEGY.md` for branching guidance.

### Manual Deploy

```bash
npm run deploy
```

## How It Works

- **Products** in `products.json` drive the store page automatically
- **Categories** in `store.json` create the sidebar and homepage grid
- **ASINs** connect products to Amazon — set once in `products.json`, used everywhere
- **Affiliate tag** is set in `site-config.json`, injected via `<meta>` tag, read by JS at runtime
- **Blog posts** are Markdown files in `src/blog/` — they get the post layout and Article schema automatically
- **RSS feed** at `/feed.xml` syndicates blog content
- **Tests** validate build output, data integrity, security filters, and cart logic

## Documentation

| Doc | Purpose |
|---|---|
| `AGENTS.md` | Step-by-step task guide for AI agents |
| `CLAUDE.md` | Full technical reference |
| `BLOCKED.md` | Log blockers when stuck |
| `.github/BRANCH_STRATEGY.md` | Git branching guidance |
| `seo-blog-templates/CONTENT_GUIDE.md` | Blog writing standards |
| `seo-blog-templates/KEYWORD_CALENDAR.md` | Content planning calendar |

## License

MIT — Use freely for personal or commercial projects.
