# Branching Strategy

## Overview

This template uses **trunk-based development** — a simple, fast workflow
designed for AI agents and solo operators.

```
main (or master)          ← production, auto-deploys
  └── feature-branch      ← work happens here, merged via PR
        └── preview URL   ← Cloudflare Pages preview on every PR
```

## How It Works

1. **`main`** (or `master`) is the production branch. Every push triggers a deploy.
2. **Feature branches** are where work happens. Name them descriptively:
   - `add-fishing-products`
   - `blog/best-telescopes-2026`
   - `fix/cart-badge-count`
3. **Pull requests** from feature branches to main trigger:
   - CI (build + 197 tests)
   - Preview deploy to a unique URL (posted as PR comment)
4. **Merge to main** triggers production deploy (only if CI passed).

## For AI Agents

**Simple workflow (small changes):**
```bash
# Make changes on a branch
git checkout -b add-products
# ... edit files ...
git add -A && git commit -m "Add 15 fishing products"
git push -u origin add-products
# Create PR, wait for preview, merge
```

**Even simpler (if you're the sole operator):**
```bash
# Push directly to main (CI + deploy runs automatically)
git add -A && git commit -m "Add 15 fishing products"
git push
```

Direct pushes to main work fine for solo agents. PRs are recommended when:
- You want to preview changes before they go live
- Multiple agents/humans are working on the same site
- You're making large structural changes

## Branch Protection (Optional)

For higher-value sites, enable branch protection on `main`:

1. GitHub repo > Settings > Branches > Add rule
2. Branch name pattern: `main`
3. Recommended settings:
   - [x] Require a pull request before merging
   - [x] Require status checks to pass (select "build-and-test")
   - [x] Require branches to be up to date before merging

This forces all changes through PRs with passing CI — prevents broken deploys.

## Why Trunk-Based?

- **Simplicity:** One branch to think about. No develop/staging/release branches.
- **Speed:** Changes go live in minutes, not days.
- **Rollback:** Cloudflare Pages keeps every deploy. Roll back in the dashboard instantly.
- **Agent-friendly:** Cheap agents work in single sessions. Complex branching confuses them.
- **Static sites:** No database migrations, no breaking API changes. If the build passes and tests are green, it's safe to deploy.

## What About Staging?

Cloudflare Pages preview deploys on PRs ARE your staging environment. Every PR
gets a unique URL like `add-products.your-site.pages.dev`. Check it, then merge.

No separate staging branch or environment needed.
