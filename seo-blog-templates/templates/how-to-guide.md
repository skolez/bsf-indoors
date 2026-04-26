# Template: How-To Guide

> Use this template for instructional keywords like "how to [task]" or
> "step-by-step guide to [process]". These posts build authority and trust,
> capture informational-intent traffic, and drive soft affiliate conversions.

---

## Target Metrics
- **Word count:** 2,000–3,500
- **Steps/sections:** 5–10 main steps
- **Affiliate links:** 3–6 (tools, supplies, products mentioned)
- **Internal links:** 3–5 (related guides, product reviews, buying guides)
- **Time to read:** 10–15 minutes

---

## Structure

### Meta Tags
```html
<title>How to {{TASK}} — Step-by-Step Guide for {{AUDIENCE}} | {{SITE_NAME}}</title>
<meta name="description" content="Learn how to {{TASK}} with our step-by-step guide. We cover [key steps], tips for {{REGION}}, and common mistakes to avoid.">
```

**Title formulas:**
- "How to {{TASK}} — Step-by-Step Guide for {{AUDIENCE}}"
- "How to {{TASK}} in {{CLIMATE_ZONE}} [or {{REGION}}]"
- "{{TASK}}: Complete Guide for Beginners"
- "Step-by-Step: How to {{TASK}} [for specific use case]"

---

### Article Layout

```
[Affiliate Disclosure — if including product recommendations]

## [H1: How to {{TASK}} — Step-by-Step Guide for {{AUDIENCE}}]

[Hero image — showing final result or the task in progress]

### Introduction (100–150 words)
- Hook: "Want to learn how to {{TASK}}?"
- Why it matters: Why {{AUDIENCE}} should care about this skill
- What you'll learn: Overview of steps/process
- Time required: "This takes [X hours/days/weeks]"
- Difficulty level: "Suitable for [beginner/intermediate/advanced]"

### Table of Contents
[If post over 1,500 words, include linked TOC with all H2 sections]

---

## [H2: What You'll Need]

### [H3: Tools & Equipment]
- Tool 1: [Brief description and why needed]
- Tool 2: [Description]
- Tool 3: [Description]
- [Add affiliate links for recommended tools where applicable]

### [H3: Materials & Supplies]
- Material 1: [Brief description]
- Material 2: [Description]
- [Add product recommendations with links]

### [H3: Optional But Helpful]
- Optional item 1: [Why it helps]
- Optional item 2: [Why it helps]

---

## [H2: Preparation]

[1–3 paragraphs covering setup, planning, or prerequisite steps]

### [H3: [Subtask 1: Prep Step]]
[2–4 sentences explaining this stage and why it matters]

### [H3: [Subtask 2: Prep Step]]
[2–4 sentences]

---

## [H2: The Process — [Number] Steps]

### [H3: Step 1: {{FIRST_TASK}}]

[1–2 sentences describing what you're doing and why]

**How to:**
1. [Specific action 1]
2. [Specific action 2]
3. [Specific action 3]

**Tips:**
- Tip 1
- Tip 2

**Common mistake:** [Mistake to avoid] — [Why it's a problem]

[Optional: image or diagram showing this step]

---

### [H3: Step 2: {{NEXT_TASK}}]

[Repeat structure for each major step]

---

### [H3: Step 3: {{NEXT_TASK}}]

[Repeat]

---

[Continue for all major steps — typically 5–10 steps for comprehensive guides]

---

## [H2: {{REGION}}-Specific Considerations]

[2–3 paragraphs or subsections on how to adapt the process for {{REGION}}/{{CLIMATE_ZONE}}]

### [H3: Timing & Seasonal Adjustments]
[How seasonal factors affect the process in {{REGION}}]

### [H3: Climate Adaptations]
[How weather/climate impacts the task]

### [H3: Local Regulations or Requirements]
[Any {{REGION}}-specific rules, permits, or considerations]

---

## [H2: Troubleshooting]

### [H3: Problem 1: [Common issue]]
**Symptoms:** [What goes wrong]
**Solution:** [How to fix it or prevent it]

### [H3: Problem 2: [Common issue]]
**Symptoms:** [What goes wrong]
**Solution:** [How to fix it]

### [H3: Problem 3: [Common issue]]
**Symptoms:** [What goes wrong]
**Solution:** [How to fix it]

---

## [H2: After You've Finished]

### [H3: Maintenance & Care]
[How to maintain the result of this task]

### [H3: Next Steps]
[What to do after completing this task — related tasks or advanced techniques]

[Link to related how-to guides or advanced topics]

---

## [H2: Frequently Asked Questions]

### [H3: How long does {{TASK}} take?]
[Answer with time estimate and variables that affect duration]

### [H3: What's the most common mistake?]
[Answer with prevention tips]

### [H3: Do I need [specific tool/skill]?]
[Answer about alternatives or whether it's essential]

### [H3: Can I [variation of task] instead?]
[Answer about alternative approaches]

### [H3: What if [common problem] happens?]
[Reference the troubleshooting section]

### [H3: Is {{TASK}} suitable for {{AUDIENCE}}?]
[Answer with qualifications and difficulty level]

---

## [H2: Conclusion]

[2–3 sentences summarizing the process and key takeaway]

[Specific encouragement for {{AUDIENCE}}: "If you're [audience type], you can [task] in [timeframe]."]

[CTA: "Ready to get started? Check out our [resource/product/guide] to [related action]."]

[Community hook: "Have questions? Drop a comment below" or "Visit our shop to pick up [supplies]"]

---

## Related Posts
- [Link to related how-to guide (more advanced or related task)]
- [Link to buying guide for tools/supplies mentioned]
- [Link to product reviews for recommended tools]
- [Link to troubleshooting or problem-solution post]

---

## Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to {{TASK}}",
  "description": "[Meta description or intro]",
  "image": "[Hero image URL]",
  "estimatedDuration": "PT[Hours]H",
  "totalTime": "PT[Hours]H",
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "[Material/Supply 1]"
    },
    {
      "@type": "HowToSupply",
      "name": "[Material/Supply 2]"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "[Tool 1]"
    },
    {
      "@type": "HowToTool",
      "name": "[Tool 2]"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Step 1: [Step Title]",
      "text": "[Step description]",
      "image": "[Optional step image URL]"
    },
    {
      "@type": "HowToStep",
      "name": "Step 2: [Step Title]",
      "text": "[Step description]"
    }
  ]
}
```

Also include **Article** schema with author, datePublished, dateModified.

---

## Title Examples (Generic)

- "How to {{TASK}} — Step-by-Step Guide for {{AUDIENCE}}"
- "How to {{TASK}}: Complete Guide [for {{REGION}}]"
- "Step-by-Step: How to {{TASK}} [Like a Professional]"
- "{{TASK}}: What You Need to Know [for {{AUDIENCE}}]"

---

## Key Principles

1. **Be clear and specific** — Every step should be actionable and unambiguous.
2. **Show your work** — Include images or diagrams of key steps when possible.
3. **Anticipate problems** — Include troubleshooting section addressing common mistakes.
4. **Link to tools/supplies** — Recommend specific products with affiliate links where relevant.
5. **Consider skill level** — Use language appropriate for {{AUDIENCE}}; define technical terms.
6. **Include {{REGION}} context** — Adapt the guide for {{REGION}} / {{CLIMATE_ZONE}} conditions.
7. **Estimate time honestly** — Give realistic time expectations and variables that affect duration.
8. **Update regularly** — Refresh guidance quarterly; update "last updated" date when significant changes occur.
9. **Link to related content** — Connect to buying guides, reviews, and other how-to posts.
