# Knowledge Base Conflicts

<!-- AI AGENT: Document conflicting information between sources here.
     When two authoritative sources disagree, record both positions
     and note which source you're following and why.

     This file is referenced by the knowledge base builder (agents/kb_builder.prompt.md).
-->

## Format

```
### [Topic of Conflict]
- **Source A** ([name]): [What they say]
- **Source B** ([name]): [What they say]
- **Resolution:** [Which source we follow and why, or "unresolved"]
- **Impact:** [How this affects our content/recommendations]
```

## Active Conflicts

### 1. Optimal humidity for adult mating cage
- **Symton ("Intensive BSF Farming")** — "Humidity should be around 50%."
- **Sheppard et al. 2002 (canonical rearing)** — RH 70%.
- **Various reviews** — RH 30–90% supports mating; >60% recommended to *enhance* it.
- **Resolution:** unresolved; almost certainly an interaction with temperature and air movement. Working assumption for content: target 60–70% RH (broadest overlap), but flag the range explicitly. Phase 1b should look for a controlled study that varies T × RH together.
- **Impact:** Affects the love-cage care guide and the hygrometer recommendation in the store.

### 2. Minimum temperature for mating
- **Various sources** — "above 23 °C all the time."
- **Other reviews** — 25–35 °C optimal range; below 24 °C mating drops sharply.
- **Park 2020 (tropical baseline)** — observed mating up to 40 °C+.
- **Resolution:** Treat 27 °C as the working setpoint (matches Sheppard 2002), with 25 °C as the floor. Below 24 °C, expect mating to fall off a cliff. The Cache Valley operator should size a heat mat / room temperature accordingly.
- **Impact:** Drives the temperature-control gear recommendation; affects whether a heat mat alone is enough or a room-level setpoint is needed.

### 3. "Indoor cold-climate breeding is feasible for the lay person"
- **Some practitioner sources** — flatly say no, recommend re-ordering BSF eggs every spring.
- **Tomberlin lab + Diener et al. + Oonincx et al.** — published replicable indoor protocols using off-the-shelf components.
- **Operator firsthand** — has a working indoor colony with a butterfly cage + halogen worklight + heat mat.
- **Resolution:** Practitioner pessimism predates the published light-source work and is now outdated. The site's editorial position: indoor breeding *is* feasible with the right light + temperature, and the operator's rig is the proof-of-concept.
- **Impact:** Defines the entire site's editorial angle. Worth its own pillar post once enough firsthand data has accumulated.

### 4. Self-harvest ramp angle
- **Bertinetti et al. 2022 (dedicated locomotion study)** — 45° works; characterizes prepupa locomotion specifically.
- **Various commercial designs (ProtaPod, etc.)** — typically 30–40° to reduce slippage.
- **Resolution:** Use 35–45° as the published range. Operator's ramp (visible in `src/images/setup/self-harvest-ramp-prepupae.jpg`) appears to be in this range. Phase 1c should measure it explicitly.
- **Impact:** Affects DIY ramp build-guide content and the self-harvest-bin product recommendation.

## Resolved Conflicts

_None yet._
