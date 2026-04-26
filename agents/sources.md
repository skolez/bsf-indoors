# Source Catalog

## Summary

| Category | # Sources | Coverage | Notes |
|----------|-----------|----------|-------|
| (none yet) | 0 | — | — |

## Sources

_No sources cataloged yet. Run the KB builder agent to begin discovery._

---

## How to Add Sources

When populating this catalog, follow the Phase 1a structure from `kb_builder.prompt.md`:

### Phase 1a Entry (Lightweight)
```markdown
### [Source Name]
- **URL:** [https://example.com]
- **Type:** [University / Government / Blog / Association / Book / Video / Community]
- **Category:** [See list in kb_builder.prompt.md]
- **Description:** [1-2 sentence summary]
- **Scores:** RAG Suitability: X/3 | Regional Relevance: X/3 | {{AUDIENCE}} Friendliness: X/3
- **Region Scope:** [universal / regional]
- **Climate Region:** [{{REGION}} / etc., if regional]
- **Zone Range:** [e.g., 5b–7a, if applicable]
- **Geographic Scope:** [States/markets, if regional]
```

### Phase 1b Entry (Enriched — Tier 1 sources only)
Add to Phase 1a entry:
```markdown
- **Topics Covered:** [List of 3-5 main topics]
- **RAG Value Rationale:** [Why this source is valuable for RAG: clear structure, authoritative, current, etc.]
- **Format & Update Frequency:** [Blog updated monthly / PDF evergreen / Video series ongoing / etc.]

#### Context Summary (500 words)
[Distilled, searchable summary of the source's key content, formatted for embeddings]
```
