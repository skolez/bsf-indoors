# Template: Single Product Review

> Use this template for deep-dive reviews of individual products, especially
> high-search-volume items or bestsellers in your niche. These posts capture
> readers in "research mode" and build trust through detailed analysis.

---

## Target Metrics
- **Word count:** 1,500–2,500
- **Products featured:** 1 primary + 2–3 alternatives
- **Affiliate links:** 3–5
- **Internal links:** 2–3
- **Time to read:** 7–10 minutes

---

## Structure

### Meta Tags
```html
<title>{{PRODUCT}} Name Review — [Primary Benefit/Use Case] | {{SITE_NAME}}</title>
<meta name="description" content="Is the {{PRODUCT}} Name worth it? We tested it with {{AUDIENCE}} and found [key finding]. Read our full review covering features, pros, cons, and {{REGION}} performance.">
```

**Title formulas:**
- "{{PRODUCT}} Name Review — [Is it worth it? / Complete analysis / Expert verdict]"
- "[Brand] {{PRODUCT}} Name Review ({{YEAR}}) — [Verdict for {{AUDIENCE}}]"
- "{{PRODUCT}} Name Review: [Key advantage/verdict for use case]"

---

### Article Layout

```
[Affiliate Disclosure]

## [H1: {{PRODUCT}} Name Review — [Verdict for {{AUDIENCE}}]]

[Hero image — product in use or lifestyle context]

### Introduction (100–150 words)
- Hook: Common question or pain point
- What the product is (1 sentence)
- Why you tested it
- Your verdict upfront (spoiler — readers want to know your conclusion)
- "Read on for our full analysis" / overview of what's coming

---

## [H2: Product Overview]

### [H3: What Is It?]
[1–2 paragraphs describing the product, intended use, and who it's for]

### [H3: Key Specs]
- Spec 1: [value]
- Spec 2: [value]
- Spec 3: [value]
- Spec 4: [value]

**Price:** $XX.XX (as of [date])
**Availability:** [Where to buy — our store, Amazon, other retailers]

---

## [H2: The {{PRODUCT}} in Action — Our Testing]

[2–3 paragraphs describing your hands-on experience with the product]

### [H3: Testing Setup / Context]
- {{REGION}} conditions: [How location/climate affected testing]
- {{AUDIENCE}} perspective: [How we approached testing for your target user]
- Testing duration: [How long you tested it]

### [H3: What We Liked]

**Advantage 1: [Specific benefit]**
[2–3 sentences explaining why this matters and your experience]

**Advantage 2: [Specific benefit]**
[2–3 sentences]

**Advantage 3: [Specific benefit]**
[2–3 sentences]

**Advantage 4: [Specific benefit]**
[2–3 sentences — optional]

---

## [H2: What We Didn't Like]

**Drawback 1: [Specific limitation]**
[2–3 sentences explaining the issue and its impact]

**Drawback 2: [Specific limitation]**
[2–3 sentences]

**Drawback 3: [Specific limitation]** (if significant)
[2–3 sentences]

---

## [H2: Comparison — How It Stacks Up]

### [H3: {{PRODUCT}} vs. [Competitor A]]
[2–3 sentence comparison; link to comparison post if available]

### [H3: {{PRODUCT}} vs. [Competitor B]]
[2–3 sentence comparison]

### [H3: Value for Money]
[1–2 sentences on price-to-value ratio]

---

## [H2: Best For]

[Specific user profile or use case for whom this product is ideal]

**This {{PRODUCT}} is best for {{AUDIENCE}} who [specific need/situation].**

### [H3: Who Should Buy It?]
- {{AUDIENCE}} type 1
- {{AUDIENCE}} type 2
- {{AUDIENCE}} type 3

### [H3: Who Should Look Elsewhere?]
- Different use case 1 — [recommendation]
- Different need 2 — [recommendation]

---

## [H2: {{REGION}} Considerations]

[2–3 paragraphs on how this product performs in {{REGION}}/{{CLIMATE_ZONE}} conditions]

- Seasonal considerations: [How it performs across your region's seasons]
- Climate factors: [Heat/cold/humidity/altitude impact]
- Local availability: [Where to get it in {{REGION}}]

---

## [H2: Care & Maintenance]

### [H3: How to [Use/Maintain/Extend Life]]
[Step-by-step or bullet list of maintenance/usage tips]

### [H3: Warranty & Support]
- Warranty period: [Duration and coverage]
- Replacement policy: [What's covered]
- Customer support: [How responsive / helpful]

---

## [H2: Frequently Asked Questions]

### [H3: Is {{PRODUCT}} worth the money?]
[Answer based on your testing]

### [H3: How long does {{PRODUCT}} last?]
[Durability/lifespan answer based on experience]

### [H3: Where's the best place to buy {{PRODUCT}}?]
[Answer with links to your store and alternative sellers]

### [H3: What's the return policy?]
[Answer about ease of returns]

### [H3: [Common question specific to {{AUDIENCE}}]]
[Answer]

---

## [H2: Our Verdict]

### [H3: Rating: X/5 Stars]

**Summary:** [1 sentence — your overall verdict]

**Best For:** [User type]
**Price:** [Value assessment]
**Durability:** [Expected lifespan]

**Bottom Line:** [2–3 sentences summarizing the review and who should buy it]

---

## [H2: Where to Buy]

- **Our Store:** [Link and price if you carry it]
- **Amazon:** [Link with current pricing note]
- **Direct from Manufacturer:** [Link]

*Prices vary by retailer and may change. [Last updated: Month YYYY]*

---

## Related Posts
- [Link to comparison post: "{{PRODUCT}} vs. [Alternative]"]
- [Link to best-x-for-y post in this category]
- [Link to how-to guide on using this type of product]

---

## Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "name": "{{PRODUCT}} Name Review",
  "author": {
    "@type": "Person",
    "name": "[Author Name]"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "X",
    "bestRating": "5",
    "worstRating": "1"
  },
  "reviewBody": "[Review summary]",
  "datePublished": "[ISO date]",
  "itemReviewed": {
    "@type": "Product",
    "name": "{{PRODUCT}} Name",
    "image": "[product image URL]"
  }
}
```

Also include **Product** schema with name, description, rating, price, and availability.

---

## Title Examples (Generic)

- "{{PRODUCT}} Name Review — [Is it worth the money?]"
- "[Brand] {{PRODUCT}} Name Review ({{YEAR}}) — [Verdict]"
- "{{PRODUCT}} Name: Is It [Best/Right/Worth It] for {{AUDIENCE}}?"
- "[Product] Review — Pros, Cons, and {{REGION}} Performance"

---

## Key Principles

1. **Lead with your verdict** — Don't bury the lede. Readers want to know upfront: is this product good or not?
2. **Be specific about experience** — "We tested this for [X months] in {{REGION}} conditions with {{AUDIENCE}} users."
3. **Balance pros and cons** — Every product has tradeoffs. Being honest builds trust.
4. **Include regional context** — How does this perform in {{REGION}}/{{CLIMATE_ZONE}}?
5. **Answer the question** — The title/meta description should prompt specific questions; answer them in the review.
6. **Update pricing regularly** — Review prices quarterly; update "last updated" date when you do.
7. **Provide alternatives** — Always mention 2–3 comparable products and link to deeper comparison posts.
