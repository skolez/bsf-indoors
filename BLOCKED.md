# Blocked Tasks

<!-- AI AGENT: Use this file to surface tasks you cannot complete.
     When you encounter a blocker, add an entry below instead of silently failing.
     Another agent (or a human) will pick these up and resolve them.

     Format: Copy the template below and fill in the fields.
     Mark entries as RESOLVED when fixed (don't delete them — they're useful context).
-->

## How to Use This File

When an agent gets stuck on a task, it should:
1. Stop working on the blocked task
2. Add an entry below with the required fields
3. Continue with other unblocked tasks
4. Check this file at the start of each session for tasks it can unblock

## Entry Template

```
### [SHORT DESCRIPTION]
- **Status:** BLOCKED | RESOLVED
- **Blocked since:** YYYY-MM-DD
- **Resolved:** YYYY-MM-DD (if resolved)
- **Blocking task:** What were you trying to do?
- **Blocker:** What specifically prevented you?
- **What's needed:** What would unblock this? (API key, human decision, external dependency, etc.)
- **Workaround:** Is there a temporary workaround? (optional)
- **Files involved:** List relevant file paths
```

## Active Blockers

<!-- AI AGENT: Add new blocked tasks here. Keep them in reverse chronological order. -->

### Real product ASINs and prices for store catalog
- **Status:** BLOCKED
- **Blocked since:** 2026-04-26
- **Blocking task:** Populate `src/_data/products.json` with real Amazon products so the store and cart system can produce working affiliate links.
- **Blocker:** Each gear category needs hands-on review before linking — the operator's own rig is the differentiator and "we recommend X because we use it" is the brand promise. Currently 7 placeholder products with no ASIN/price.
- **What's needed:** For each placeholder ID (`halogen-worklight`, `reptile-uvb-bulb`, `butterfly-mesh-cage`, `self-harvest-bin`, `aspen-bedding`, `digital-hygrometer`, `uv-lux-meter`): pick the actual model in use, look up ASIN, capture price snapshot, swap into products.json. Add a starter-kits bundle entry once 3+ are real.
- **Workaround:** Build still passes — affiliate links currently fall back to Amazon search, which is acceptable until publishing. Do **not** deploy to production with placeholder products.
- **Files involved:** `src/_data/products.json`, `src/_data/store.json`

### Cloudflare Pages project + GitHub secrets
- **Status:** BLOCKED
- **Blocked since:** 2026-04-26
- **Blocking task:** Auto-deploy on push to `main` via the existing `.github/workflows/deploy.yml`.
- **Blocker:** Pages project named `bsf-indoors` does not exist yet, and `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` secrets are not set on the GitHub repo.
- **What's needed:** Run `npx wrangler pages project create bsf-indoors` from an authenticated environment, then add the two secrets in GitHub repo settings.
- **Files involved:** `wrangler.jsonc`, `.github/workflows/deploy.yml`

### Domain registration: bsfindoors.com
- **Status:** BLOCKED
- **Blocked since:** 2026-04-26
- **Blocking task:** Lock the brand and start domain age accruing for SEO (per portfolio roadmap in `../farmable-insects/README.md` Phase 1).
- **Blocker:** Domain has not been registered yet.
- **What's needed:** Confirm `bsfindoors.com` is available, register it (or pick the closest brandable alternative and update `site-config.json` + `wrangler.jsonc`).
- **Files involved:** `site-config.json` (`site.domain`)

### Brand assets (favicon, OG image)
- **Status:** BLOCKED
- **Blocked since:** 2026-04-26
- **Blocking task:** Social sharing previews and browser tab icon.
- **Blocker:** No `favicon.ico`, `apple-touch-icon.png`, or `og-image.png` in `src/images/`. Template's AGENTS.md Task 7 calls these out as required.
- **What's needed:** Generate from a BSF-themed mark (suggested: dark-blue iridescent fly silhouette on cream). 1200x630 OG image; standard favicon set.
- **Files involved:** `src/favicon.ico`, `src/favicon-16.png`, `src/favicon-32.png`, `src/favicon-192.png`, `src/apple-touch-icon.png`, `src/images/og-image.png`

## Resolved

<!-- AI AGENT: Move resolved blockers here with the resolution details. -->

_No resolved blockers yet._
