# Agent Status

## Current Phase
Phase 1a — Discovery (**Complete**, ready for Phase 1b)

## Progress
- Sources cataloged: **45** (target was 30+)
- Sources enriched (Phase 1b): 0
- Categories covered: light/cage/ramp/feedstock all hit; weakest = ramp (1 dedicated paper)

## Last Run
- Date: 2026-04-26
- Run by: scaffold-bootstrap session (operator: skolez, branch: claude/setup-bsf-project-IS0A6)
- Method: 8 WebSearch queries against peer-reviewed, extension, NGO, and practitioner sources
- Output: agents/sources.md, knowledge-base/conflicts.md (initial)

## Next Steps (Phase 1b — Enrichment)

Priority Tier 1 sources to summarize first (500 words each, in `knowledge-base/tier1/`):

1. **Tomberlin & Sheppard 2010** (PMC3029228) — light source primer; the post that other articles will cite
2. **Bertinetti et al. 2022** (PMC8879302) — only dedicated prepupae-locomotion paper; must read before writing the self-harvest guide
3. **Diener et al. — small-scale year-round rearing** — title alone makes it the cornerstone; covers C+F together
4. **Sheppard et al. 2002** (J. Med. Entomology) — canonical rearing methodology; ground truth for T/RH numbers
5. **Eawag Step-by-Step Biowaste Processing Guide (2nd ed.)** — closest thing to a field manual; will inform the indoor-bin posts

Secondary Phase 1b targets:

6. Hoc et al. 2019 (photoreceptor sensitivity) — needed to write the "why halogen with UV pass works" explainer
7. Oonincx et al. 2018 (PMC5968407) — small-scale indoor focus, fills gaps Tomberlin doesn't cover
8. Gold et al. 2024 (moisture-control with dry materials) — directly answers operator's bin-substrate question

## Open Tasks Surfaced During Phase 1a

- Resolve humidity conflict (50% vs 60% vs 30–90%) — see knowledge-base/conflicts.md #1
- Resolve mating-temperature minimum (23 °C, 24 °C, 25 °C all cited) — conflicts.md #2
- Resolve "indoor cold-climate breeding is/isn't feasible for laypeople" — conflicts.md #3
- Phase 1b should attempt to find a UF/IFAS or Texas A&M-published indoor-rearing protocol PDF (likely via Tomberlin lab) — Phase 1a only surfaced the species fact sheet

## Constraints Followed

- WebSearch only this run; no WebFetch (Phase 1a per kb_builder.prompt.md)
- One-task-per-run discipline: discovery only, no synthesis or distillation
