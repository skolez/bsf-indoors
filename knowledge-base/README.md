# Knowledge Base

This directory contains distilled, verified knowledge for your niche. It powers the RAG chatbot and serves as the authoritative reference for blog content.

## Structure

AI: Create subdirectories and files as you build out the knowledge base. Example structure:

```
/knowledge-base/
  /seasonal/          — Month-by-month calendar, seasonal tasks, timing guides
  /problems/          — Common problems, troubleshooting, solutions
  /beginner/          — Getting started guides, first-time timelines, FAQ
  /equipment/         — Equipment guides, buyer recommendations, budget estimates
  /regulations/       — Local/state regulations, licensing, compliance
  /[additional]/      — [Add niche-specific categories, e.g., /techniques, /science, /suppliers]
```

## File Format

Every knowledge base file should include this metadata header:

```markdown
**Region:** {{REGION}} | {{CLIMATE_ZONE}}
**Sources:** [list source numbers or names from agents/sources.md]
**Metadata:** topic={{TOPIC}} | season={{SEASON}} | difficulty=beginner|intermediate|advanced | region=universal|regional | confidence=high|medium|low | content_type=guide|reference|calendar|decision-tree
```

Example:
```markdown
**Region:** Utah (Cache Valley) | USDA Zone 6b
**Sources:** USU Extension #5, Beekeeping Association #12, Local Supplier #8
**Metadata:** topic=winterization | season=fall | difficulty=intermediate | region=regional | confidence=high | content_type=guide
```

### Metadata Definitions

- **topic:** Main subject of the content
- **season:** Applicable season(s): spring, summer, fall, winter, year-round, or specific months
- **difficulty:** Skill level required — beginner, intermediate, or advanced
- **region:** universal (applies everywhere) or regional (specific to {{REGION}} or {{CLIMATE_ZONE}})
- **confidence:** How confident you are in the information — high (multiple authoritative sources), medium (solid sources), low (limited sources, flagged for review)
- **content_type:** guide (how-to), reference (factual info), calendar (timing), decision-tree (process), FAQ, or other

## Quality Standards

- Every claim must trace to a cataloged source (see `agents/sources.md`)
- Regional advice clearly distinguished from universal
- Prefer recent + authoritative sources
- Safety warnings for any hazardous procedures
- Non-redundant — merge overlapping info with similar topics
- For regional content, note which {{REGION}} / {{CLIMATE_ZONE}} it applies to
- Update dates when content is refreshed

## Building Out Your KB

### Phase 1a: Source Discovery
As you catalog sources in `agents/sources.md`, you're building the foundation.

### Phase 2: Distillation
Extract key facts, procedures, and decision trees from sources into KB files. Normalize overlapping information.

### Phase 3: RAG Implementation
Once KB is stable, chunk files and embed them for vector search. See `EMBEDDING_SETUP.md` for implementation details.

## Example KB File Structure

```markdown
# [Topic Name]

**Region:** {{REGION}} | {{CLIMATE_ZONE}}
**Sources:** [List relevant sources]
**Metadata:** topic={{TOPIC}} | season={{SEASON}} | difficulty={{LEVEL}} | region={{SCOPE}} | confidence={{LEVEL}} | content_type={{TYPE}}

## Overview
[Brief intro, 2-3 sentences]

## Key Concepts
- **Concept 1:** [Definition and importance]
- **Concept 2:** [Definition and importance]

## How-To / Process
[If applicable: numbered steps, decision tree, or timeline]

## Common Mistakes
[List pitfalls and how to avoid them]

## Regional Notes for {{REGION}}
[Any region-specific variations, timing, or considerations]

## Related Topics
[Links to other KB files]

## References
[Citations to sources.md entries]
```

## Integration with Blog Content

KB files support blog writing by:
1. Providing authoritative, cited facts for blog posts
2. Enabling the RAG chatbot to answer user questions consistently
3. Serving as a shared source of truth across content
4. Reducing duplicated effort (write once, use many places)
5. Making updates easier (update KB file, all dependent content reflects change)

When writing blog posts, reference the relevant KB file:
> "As detailed in our knowledge base guide on [topic], {{REGION}} beekeepers should..."

## Keeping KB Fresh

- Review quarterly for outdated information
- Update metadata confidence scores as new sources emerge
- Add seasonal content in advance (e.g., add winter prep guide by August)
- Log conflicts and resolutions in `agents/conflicts.md`
- Increment KB version when major updates occur
