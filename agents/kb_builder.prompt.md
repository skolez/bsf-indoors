# {{NICHE}} Knowledge Base Builder Agent (RAG-Optimized)

## Persistence & State Management
- **Status File:** Always check `@agents/status.md` at the start of a run.
- **Update State:** Before ending a session, update `status.md` with:
  - Current Phase (1, 2, or 3)
  - Percentage completion of the current phase
  - Specific "Next Steps" for the next scheduled run
- **Self-Correction:** If `status.md` indicates Phase 1 is "Stable" or "Complete," automatically initiate Phase 2 logic.

## Objective
Continuously build, validate, and improve a high-quality {{NICHE}} knowledge base for a RAG chatbot serving:

- Primary region: {{REGION}}
- Primary climate: {{CLIMATE_ZONE}}
- Audience: {{AUDIENCE}}
- Site: {{DOMAIN}}

This agent runs periodically and improves the dataset incrementally.

### Regionalization Strategy
Content is tagged as `universal` or `regional` to support future multi-region expansion.

**Scope types:**
- **Universal:** Core concepts, fundamentals, best practices applicable across all regions and climates.
- **Regional:** Seasonal calendars, timing windows, local regulations, regional suppliers, climate-specific methods — varies by geographic region.

**Climate regions** (primary filter at query time):

| Region ID | Name | Zones | Key Traits |
|---|---|---|---|
| `region-1` | {{REGION}} — {{CLIMATE_ZONE}} | [Add USDA zones] | **Primary region.** [Key characteristics: altitude, seasons, climate patterns, etc.] |
| `region-2` | [Region name] | [Add zones] | [Key characteristics] |
| `region-3` | [Region name] | [Add zones] | [Key characteristics] |

**AI: Customize these regions for your niche. For indoor hobbies, replace zones with skill-level or market regions. For outdoor activities, focus on climate zones, elevation, and seasonal variations. For products/services, consider geographic markets, regulations, and availability.**

**Tagging model** — every source gets:
- `region_scope`: `universal` or `regional`
- `climate_region` (if regional): one or more region IDs from the table above
- `zone_range` (if regional): e.g. `[5b–7a]` or `[Beginner–Advanced]`
- `states_markets` (if regional): e.g. `[UT, ID, MT]` or `[North America, EU]`

**Expansion priority:** Build outward from primary `{{REGION}}` → neighboring regions → national coverage (as applicable to niche).

---

## Phase 1: Source Discovery & Curation

### Sub-Phases

#### Phase 1a: Discovery (Breadth-First)
Catalog as many sources as possible with lightweight metadata. Do NOT deep-dive individual sources.

Per source, record only:
- Name
- URL
- Type (e.g., university, government, blog, association, book, video, etc.)
- Category (from list below)
- 1-sentence description
- Scores (1-3): RAG Suitability, Regional Relevance, {{AUDIENCE}} Friendliness
- Region scope: `universal` or `regional`
- Climate region (if regional): e.g. `{{REGION}}`
- Zone range (if regional): e.g. `[5b–7a]` or skill level equivalent
- Geographic scope (if regional): e.g. `UT, ID, MT`

Target: 30+ sources across all categories before moving to Phase 1b.
Batch 4-5 categories per run to ensure progress.

#### Phase 1b: Enrichment (Depth on Tier 1 only)
Once 30+ sources cataloged, enrich Tier 1 sources only:
- Full metadata (topics, format, update frequency, RAG value rationale)
- 500-word Context Summary for the RAG engine
- If source contains a PDF, extract and summarize its table of contents
- Cross-reference critical advice against authoritative sources; log discrepancies in `conflicts.md`

---

## Iterative Loop (Every Run)

### A. Load Existing Data
- Read `sources.md` if present

### B. Deduplicate
- Merge duplicates
- Improve existing entries

### C. Gap Analysis
Identify weak/missing:
- Categories
- {{REGION}} relevance
- Seasonal guidance
- Technical depth
- {{AUDIENCE}} onboarding

### D. Targeted Search
Prioritize filling gaps

---

## Fact Validation

- Cross-check critical info with 2+ sources when possible
- Prefer:
  - University extensions / academic institutions
  - Government agencies
  - Scientific sources
  - Industry organizations

Flag:
- Conflicts
- Outdated practices

---

## Categories (REQUIRED — work in batch order)

### Batch 1 (highest value — do first)
1. University extensions / educational institutions
2. Government agencies / official bodies
3. Regional/seasonal guides
4. Primary concern area (e.g., pests, equipment, techniques)

### Batch 2
5. Best practices / management guides
6. Regulations / compliance
7. Beginner guides / how-to content
8. Associations / professional organizations

### Batch 3
9. Equipment / supplies / tools
10. Processing / production / application
11. Core science / fundamentals
12. General authoritative sites

### Batch 4 (lower priority)
13. Specialized / niche topics
14. Books / PDFs
15. Magazines / journals
16. Podcasts / videos
17. Community / Q&A forums
18. Value-added / advanced topics

Commit and push after completing each batch. Update `status.md` with each commit.

---

## Output

### `sources.md`

Include:

#### Summary Table

| Category | # Sources | Coverage | Notes |

#### Per Source (Phase 1a — lightweight):
- Name
- URL
- Type
- Category
- 1-sentence description
- Scores (RAG / Regional / {{AUDIENCE}}, each 1-3)
- Region scope (`universal` or `regional`)
- Climate region, zone range, geographic scope (if regional)

#### Per Source (Phase 1b — enriched, Tier 1 only):
- All Phase 1a fields, plus:
- Topics covered
- RAG value rationale
- Format & update frequency
- 500-word Context Summary

---

## Ingestion Priority

At end:

- Tier 1 (immediate)
- Tier 2
- Tier 3

Based on:
- RAG suitability
- Regional relevance
- {{AUDIENCE}} usefulness

---

## Phase 2: Knowledge Base Distillation

### Trigger
- Strong coverage across categories
- Stable source set
- Minimal gaps

---

### Responsibilities

#### 1. Extract Core Knowledge
- Procedures
- Decision trees
- Thresholds
- Seasonal actions
- Regional variations

#### 2. Normalize
- Merge overlapping info
- Resolve conflicts
- Prefer regional + recent + authoritative

---

### Structure Output
```
/knowledge-base/
  /seasonal/
  /problems/
  /beginner/
  /equipment/
  /regulations/
  /[additional categories per niche]
```

---

### Content Rules
- Clear
- Non-redundant
- Structured
- Region-aware

---

### Add Metadata
- Topic
- Season / timing
- Difficulty
- Region scope
- Confidence level

---

### Canonical Answers

Generate answers for:
- Top 3 frequently asked questions
- Critical {{AUDIENCE}} pain points
- Regional decision trees

---

### Continuous Improvement
- Update with new info
- Refine clarity

---

## Phase 3: RAG Implementation

### Trigger
- Knowledge base complete
- Canonical answers exist
- Low churn

---

### Responsibilities

#### 1. Chunking
- 300–800 tokens
- One idea per chunk
- Semantic splits only

---

#### 2. Metadata
- category
- topic
- season / timing
- region
- difficulty
- confidence
- content_type

---

#### 3. Embeddings
- Use consistent model
- Re-embed on changes

---

#### 4. Hybrid Retrieval

Layer 1:
- Distilled knowledge

Layer 2:
- Raw sources

---

#### 5. Query Routing
Classify:
- Topic
- Intent
- Experience level

Filter chunks accordingly

---

#### 6. Answer Generation
- Prefer canonical answers
- Add supporting context
- Ensure consistency

---

#### 7. Evaluation Loop
Track:
- Accuracy
- Gaps
- Failures

Improve:
- Content
- Chunking
- Metadata

---

#### 8. Edge Cases
Handle:
- Missing info
- Conflicts
- Outdated practices

---

## Output Artifacts

- `/knowledge-base/`
- `/chunks.json`
- `/retrieval-config.json`
- `/evaluation-log.md`

---

## Optimization Priorities

1. Precision over recall
2. Canonical coverage
3. Regional accuracy
4. Low duplication

---

## Execution Priorities

Phase 1:
- Discovery focused

Phase 2:
- 70% distillation
- 30% discovery

Phase 3:
- 60% retrieval optimization
- 25% refinement
- 15% new sources

---

## End Goal

A complete system that:

- Answers most {{NICHE}} questions without raw sources
- Is accurate and consistent
- Is optimized for {{REGION}} conditions
- Improves continuously

---

## Search Strategy

Use queries like:

- "{{REGION}} {{NICHE}} [specific topic]"
- "[Concern area] {{CLIMATE_ZONE}} / [climate type]"
- "[Authority type] {{NICHE}} guide / PDF"
- "[Key problem] solutions [{{AUDIENCE}}]"

Prioritize:
- .edu / academic institutions
- .gov / government sources
- recognized authorities / organizations
- peer-reviewed research

---

## Constraints

- Prefer scrapable content
- Avoid login-gated sites
- Avoid SEO spam
- Verify sources are current and maintained
