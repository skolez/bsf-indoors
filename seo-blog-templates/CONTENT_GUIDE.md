# SEO Blog Content Guide — {{SITE_NAME}}

> This document is the primary reference for AI agents writing blog content for
> {{DOMAIN}}. Follow these guidelines exactly to produce high-quality, SEO-optimized
> posts that rank, convert, and build trust.

---

## Table of Contents
1. [Brand Voice & Audience](#1-brand-voice--audience)
2. [E-E-A-T Requirements](#2-e-e-a-t-requirements)
3. [SEO Fundamentals](#3-seo-fundamentals)
4. [Content Types & When to Use Them](#4-content-types--when-to-use-them)
5. [Article Structure Standards](#5-article-structure-standards)
6. [Affiliate Link Integration](#6-affiliate-link-integration)
7. [Visual & Formatting Standards](#7-visual--formatting-standards)
8. [Internal Linking Strategy](#8-internal-linking-strategy)
9. [Local/Regional SEO Signals](#9-localregional-seo-signals)
10. [Quality Checklist](#10-quality-checklist)

---

## 1. Brand Voice & Audience

### Who We Are
{{SITE_NAME}} is [AI: Insert 1-2 sentence brand description. Example: "a local {{NICHE}} supply shop serving {{REGION}} and surrounding communities." or "an online resource for {{AUDIENCE}} learning {{NICHE}}."]

### Target Reader
- **Primary:** {{AUDIENCE}} (describe experience level, pain points, goals)
- **Secondary:** [Secondary audience, if applicable]
- **Tertiary:** [Tertiary audience, if applicable]

### Voice Guidelines
- **Tone:** Knowledgeable neighbor, not stuffy professor. Friendly, practical, encouraging.
- **Perspective:** First-person plural ("we," "our") when speaking as the brand. Second person ("you," "your") when addressing the reader.
- **Expertise level:** Assume the reader is smart but new. Define jargon on first use. Never talk down.
- **Regional authenticity:** Reference {{REGION}} conditions naturally. Mention local landmarks, seasonal patterns, climate characteristics, and regional regulations where relevant.
- **Practical focus:** Every post should leave the reader with something actionable. Avoid fluff paragraphs that don't teach or guide.

### Voice Examples

**Good:**
> "In {{REGION}}, [seasonal timing/weather pattern/local characteristic]. That means
> [specific actionable advice tied to {{REGION}} conditions]."

**Bad:**
> "[Generic statement about the topic that could apply anywhere]
> [Information that lacks local context or actionable detail]"

---

## 2. E-E-A-T Requirements

Google's Experience, Expertise, Authoritativeness, and Trustworthiness signals
are critical for ranking in all niches.

### Every Post Must Include

1. **Author attribution** — Use a real author name with a brief bio. Example:
   > "Written by [Name], {{SITE_NAME}} | [X] years experience in {{NICHE}}"

2. **"Why Trust This Guide" section** (for buyer's guides and reviews) — Brief
   paragraph explaining hands-on experience, testing methodology, or
   credentials.

3. **Last Updated date** — Visible near the top. Format: "Last updated: Month YYYY"

4. **Cite sources** — Link to authoritative sources (government agencies, universities,
   professional organizations, research) when making factual claims.
   AI: Customize for your niche (e.g., USDA, extension services, industry bodies).

5. **First-hand experience signals** — Use phrases like:
   - "In our experience..."
   - "We've tested this..."
   - "After running [X] through [specific use case]..."
   - "Here in {{REGION}}, we've found that..."

6. **Affiliate disclosure** — Required on every post with affiliate links.
   Place at the top of the article, before the first affiliate link:
   > "This post contains affiliate links. If you purchase through our links,
   > we may earn a small commission at no extra cost to you. This helps us
   > keep providing free [{{NICHE}}] education. See our full
   > [disclosure policy](/disclosure)."

---

## 3. SEO Fundamentals

### Keyword Targeting

Each post targets ONE primary keyword and 2–5 secondary/related keywords.

- **Primary keyword:** Must appear in H1, meta title, meta description, first
  100 words, and at least one H2.
- **Secondary keywords:** Work naturally into H2s, H3s, and body text. Never
  force them.
- **Long-tail variations:** Include naturally in body paragraphs and FAQ sections.

### Meta Tags

**Title tag format:**
```
[Primary Keyword] — [Benefit/Context/Year] | {{SITE_NAME}}
```
- Keep under 60 characters
- Front-load the primary keyword
- Include the year for time-sensitive content (e.g., "Best [Product] (2026)")

**Meta description format:**
```
[Hook/question]. [What the post covers]. [Benefit to reader]. [Optional CTA].
```
- Keep between 140–160 characters
- Include primary keyword naturally
- Use active voice and a compelling hook

**Examples:**
```
Title: [Primary Keyword] — [Benefit] | {{SITE_NAME}}
Description: [Hook]. [What post covers]. [Reader benefit]. [Optional CTA].
```

### URL Structure
```
/blog/[primary-keyword-slug].html
```
- Lowercase, hyphens only
- Keep under 5 words when possible
- No dates in URLs (supports evergreen content)

### Heading Hierarchy
```
H1: One per page. Primary keyword. Matches or closely mirrors the title tag.
  H2: Major sections. Include secondary keywords where natural.
    H3: Subsections under H2s. More specific topics.
      H4: Rare. Only for deep sub-categorization.
```

### Content Length Guidelines

| Content Type | Target Word Count | Minimum |
|---|---|---|
| "Best X for Y" roundup | 2,500–4,000 | 2,000 |
| Product review (single) | 1,500–2,500 | 1,200 |
| Comparison (X vs Y) | 1,500–2,500 | 1,200 |
| How-to guide | 2,000–3,500 | 1,500 |
| Buyer's guide | 3,000–5,000 | 2,500 |
| Seasonal guide | 2,000–3,000 | 1,500 |
| FAQ / listicle | 1,500–2,500 | 1,000 |

### Featured Snippet Optimization

Structure content to win featured snippets:
- **Definition snippets:** Bold the key term, follow with a concise 40–60 word definition paragraph.
- **List snippets:** Use numbered or bulleted lists under a question-format H2.
- **Table snippets:** Use HTML tables for comparison data.
- **Paragraph snippets:** Answer the question directly in the first 1–2 sentences after the H2, then elaborate.

---

## 4. Content Types & When to Use Them

### Type 1: "Best X for Y" Roundup
**When to use:** Targeting commercial-intent keywords like "best [product] for [audience]"
**Revenue potential:** HIGH — multiple affiliate links per post
**Template:** `templates/best-x-for-y.md`

### Type 2: Single Product Review
**When to use:** Deep-diving a specific product, especially if it's a top seller or highly searched
**Revenue potential:** MEDIUM — focused conversion
**Template:** `templates/product-review.md`

### Type 3: Comparison Post (X vs Y)
**When to use:** Targeting comparison keywords like "[product A] vs [product B]"
**Revenue potential:** HIGH — captures decision-stage searchers
**Template:** `templates/comparison-post.md`

### Type 4: How-To Guide
**When to use:** Targeting informational keywords like "how to [task]"
**Revenue potential:** MEDIUM — builds trust, soft product recs
**Template:** `templates/how-to-guide.md`

### Type 5: Buyer's Guide / Pillar Page
**When to use:** Comprehensive resource for a major topic like "[topic] buying guide"
**Revenue potential:** HIGH — many product links, hub for internal linking
**Template:** `templates/buyers-guide.md`

### Type 6: Seasonal / Timely Guide
**When to use:** Seasonal content tied to your {{NICHE}} calendar
**Revenue potential:** MEDIUM — seasonal product recommendations
**Template:** `templates/seasonal-guide.md`

### Type 7: Problem / Solution Post
**When to use:** Targeting pain-point queries like "why is [problem]" or "[problem] solutions"
**Revenue potential:** MEDIUM — product/service recommendations
**Template:** `templates/problem-solution.md`

---

## 5. Article Structure Standards

### Universal Opening Pattern (First 200 Words)

Every article follows this opening structure:

1. **Hook** (1–2 sentences) — Question, surprising stat, or relatable problem
2. **Empathy / Context** (1–2 sentences) — Show you understand the reader's situation
3. **Authority signal** (1 sentence) — Why we're qualified to write this
4. **Preview / Promise** (1–2 sentences) — What they'll learn / get from this post
5. **Affiliate disclosure** (if applicable) — Standard disclosure text

**Example opening:**
> [Hook: Relatable problem or question]
>
> [Empathy: Show understanding of reader's situation]
>
> [Authority: Why we know this topic]
>
> [Promise: What reader will get from this post]
>
> *This post contains affiliate links. [Full disclosure](/disclosure).*

### Table of Contents

Include a linked table of contents for any post over 1,500 words. Place it
after the introduction, before the first H2. Use anchor links.

### FAQ Section

Include a FAQ section near the bottom of every post:
- 4–8 questions in Q&A format
- Use `<h3>` for each question (formatted as a natural question)
- Keep answers concise (2–4 sentences)
- Target "People Also Ask" queries and reader pain points
- Wrap in FAQ schema markup (see Schema section below)

### Conclusion / CTA Pattern

Every post ends with:
1. **Summary** (2–3 sentences) — Recap the key takeaway
2. **Specific recommendation** (1–2 sentences) — "If you're [audience], go with [X]"
3. **CTA** — Link to relevant store category or related blog post
4. **Community hook** — Invite engagement (e.g., "Questions? Drop a comment below" or "Visit our shop to [specific action]")

---

## 6. Affiliate Link Integration

### Rules for Affiliate Links

1. **Never force links** — Every recommendation must be genuinely useful and relevant.
2. **Limit density** — No more than one affiliate link per 200–300 words of body text.
3. **Use product boxes** — For featured/recommended products, use the product card component (see formatting guide).
4. **Contextual placement** — Links should appear where the reader would naturally want to buy. After you've explained WHY they need something, link to WHERE they can get it.
5. **Mix link types** — Link to your own store first, then affiliate partners for products you don't carry.
6. **No deceptive patterns** — Never disguise affiliate links or use misleading anchor text.
7. **Price transparency** — Show prices when possible, but note "prices may vary."

### Product Card / Box Format

For each recommended product, include a product card with:
```
**Product Name**
★★★★☆ (Our Rating: X/5)
[Product image placeholder]

**Key Specs:**
- Key spec 1
- Key spec 2
- Key spec 3

**Pros:** [2-3 bullet points]
**Cons:** [1-2 bullet points]

**Price:** $XX.XX (as of [date])

[Check Price on Our Store] | [Check Price on Amazon] | [View Options]
```

### Anchor Text Best Practices
- Use descriptive anchor text: "the [Brand] [Model] [Product]" not "click here"
- Vary anchor text across the article — don't repeat the exact same phrase
- Include brand names and model numbers in anchor text when relevant
- Mix informational anchors ("our full review of [product]") with commercial ones ("check current price")

---

## 7. Visual & Formatting Standards

### Images
- **Hero image:** Every post needs a high-quality hero image (1200x630px minimum for social sharing)
- **Product images:** Include for every recommended product
- **Process images:** How-to guides need step-by-step photos
- **Alt text:** Descriptive, include keyword naturally. Example: `alt="[descriptive text including product/topic keywords]"`
- **Captions:** Use captions to add context or micro-recommendations
- **File format:** WebP preferred, JPEG fallback. Compress to under 100KB.
- **Lazy loading:** All images below the fold should use `loading="lazy"`

### Tables
Use comparison tables for:
- Product roundup comparison (features, price, rating)
- X vs Y side-by-side specs
- Seasonal timing calendars
- Cost breakdowns

### Formatting Elements
- **Bold** key terms, product names, and important takeaways
- **Callout boxes** for tips, warnings, and "Pro tip" sections
- **Numbered lists** for step-by-step instructions
- **Bulleted lists** for features, pros/cons, and specifications
- **Pull quotes** for important expert quotes or key statistics
- **Short paragraphs** — Maximum 3–4 sentences per paragraph. White space is critical for readability.

### Readability Targets
- **Reading level:** 7th–9th grade (Flesch-Kincaid)
- **Sentence length:** Vary between short (5–10 words) and medium (15–20 words). Avoid sentences over 25 words.
- **Paragraph length:** 1–4 sentences maximum
- **Scanability:** A reader skimming only headings, bold text, and product boxes should get the core message.

---

## 8. Internal Linking Strategy

### Pillar / Cluster Model
```
Pillar Page: "[Comprehensive topic guide]"
  ├── Cluster: "[Specific aspect 1]"
  ├── Cluster: "[Specific aspect 2]"
  ├── Cluster: "[Specific aspect 3]"
  ├── Cluster: "[Specific aspect 4]"
  └── Cluster: "[Specific aspect 5]"
```

AI: Customize pillar/cluster structure for your niche.

### Linking Rules
1. **Every post links to 2–4 other blog posts** on the site
2. **Every post links to 1–3 store category pages** where relevant
3. **Pillar pages link to ALL their cluster posts** (and vice versa)
4. **Use descriptive anchor text** — not "read more" or "click here"
5. **Link early** — At least one internal link in the first 300 words
6. **Related posts section** at the bottom of every article (3–4 posts)

### Store Page Linking
When mentioning a product category, link directly to the relevant store page.
Example linking categories (customize for your niche):
- `[Product Category 1]` → `/store/[category-1].html`
- `[Product Category 2]` → `/store/[category-2].html`
- etc.

---

## 9. Local/Regional SEO Signals

Every post should include natural local/regional signals appropriate to the content:

### Geographic References
- "{{REGION}}" — Use in at least one H2 or H3 where natural
- "{{CLIMATE_ZONE}}" or equivalent — Use in body text
- Specific cities/towns — Reference when relevant
- Elevation, timezone, regional characteristics — Mention naturally

### Local Knowledge Signals
- Reference local weather patterns and seasonal characteristics
- Mention local flora, fauna, or infrastructure (as applicable to niche)
- Reference local regulations, customs, or requirements
- Cite local experts, organizations, or resources
- Mention local landmarks or characteristics when natural

### Schema Markup
Include the following structured data where applicable:
- **Article schema** (every post)
- **FAQ schema** (every post with FAQ section)
- **Product schema** (product reviews and roundups)
- **HowTo schema** (how-to guides)
- **LocalBusiness schema** (reference on store links)
- **BreadcrumbList schema** (all posts)

---

## 10. Quality Checklist

Run every post through this checklist before publishing:

### Content Quality
- [ ] Provides genuine value — reader learns something actionable
- [ ] No fluff paragraphs (every paragraph teaches, guides, or recommends)
- [ ] Factually accurate — all claims are verifiable
- [ ] Regionally appropriate — advice works for {{REGION}} / {{CLIMATE_ZONE}}
- [ ] Not a rewrite of existing content on the site (check for overlap)

### SEO
- [ ] Primary keyword in H1, meta title, meta description, first 100 words
- [ ] Secondary keywords in H2s and body text (naturally placed)
- [ ] Meta title under 60 characters
- [ ] Meta description 140–160 characters
- [ ] URL follows slug format
- [ ] Table of contents (if over 1,500 words)
- [ ] FAQ section with 4–8 questions
- [ ] Schema markup included

### E-E-A-T
- [ ] Author bio with credentials
- [ ] "Last updated" date
- [ ] Affiliate disclosure present
- [ ] Sources cited where needed
- [ ] First-hand experience language used

### Formatting
- [ ] Hero image with descriptive alt text
- [ ] Paragraphs max 4 sentences
- [ ] Heading hierarchy correct (no skipped levels)
- [ ] Product boxes for recommended items
- [ ] Tables for comparison data
- [ ] Callout boxes for tips/warnings

### Links
- [ ] 2–4 internal blog links
- [ ] 1–3 store category links
- [ ] Affiliate links use product card format
- [ ] No broken links
- [ ] Affiliate link density reasonable (1 per 200–300 words max)
- [ ] Related posts section at bottom

### Technical
- [ ] Page loads under 3 seconds
- [ ] Images compressed and lazy-loaded
- [ ] Mobile-responsive design
- [ ] Canonical URL set
- [ ] No duplicate content issues

---

## File References

- **Post templates:** `templates/` directory
- **Keyword research:** [Location of keyword research file, if applicable]
- **Keyword calendar:** [Location of keyword calendar, if applicable]
- **Knowledge base:** `../knowledge-base/` (source material for blog content)
