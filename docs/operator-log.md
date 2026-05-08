# Operator Log — BSF Indoors

The running record of the indoor BSF rig that anchors this site. Chronological,
unedited, primary-source. Future articles cite from this; gear comparisons
trace back to entries here.

**Rule:** observations land in this log *as they happen*, even when conclusions
aren't ready. The rough-draft history is more valuable than a polished summary.

---

## Operator and location

- **Operator:** site builder, Cache Valley UT (per `site-config.json`)
- **Climate:** USDA Zone 5b, semi-arid, ~4,500 ft elevation. Long cold winters; outdoor BSF is non-viable Oct–April.
- **Rig location:** indoor utility / basement area, near electrical panel and water heater. Carpeted floor (legacy). Network gear in same room.
- **Considered alternatives:** spare bedroom (rejected — smell absorption, escapees, electrical load); server room (preferred long-term — already warm, ventilated, no carpet).

## Prior BSF experience (pre-2026)

The current indoor rig is not the operator's first BSF attempt. The history
across two states is the reason the site exists at all — every "why indoor?"
section in the editorial cites back to this experience.

### South Carolina — natural BSF endemic to climate

- Operator ordered initial BSF stock from a supplier late winter.
- Before the order arrived, **food waste left outside drew in BSF naturally.**
- Outdoor lure works in SC (USDA 7b/8a, hot humid summers, mild winters). BSF is endemic.
- **Lesson:** in BSF's natural range, you don't actually need to order the species. The lure handles it.

### Move to Idaho — same playbook, different result

- Same outdoor-food-waste lure attempted after the move.
- **Got house fly maggots instead of BSF.**
- Latitude is north of natural BSF range; outdoor populations are not present to recruit from.
- **This is the original "indoor or nothing" data point** for the operator and the foundational reason this site has its editorial position. *Outdoor BSF in Idaho/Cache Valley does not work* — which means a cold-climate BSF site has to be an indoor BSF site, period.

### First Idaho indoor attempt (pre-2026)

- Mail-ordered BSF larvae from Amazon. Worked through warm months.
- Cold weather arrived; needed to overwinter.
- **Plan:** feed most of the population to the chickens, retain ~50 individuals in a wine cooler to test whether a small population could overwinter under controlled conditions.
- **Outcome:** wife fed the entire colony to the chickens due to a miscommunication. Overwintering test never ran.
- **Lesson encoded:** label the chicken-feed bin and the breeding-stock bin distinctly. "These are the chicken bugs; those are the breeding bugs" needs to be a posted, labeled, agreed-upon household convention. (Yes, this is a real article waiting to be written.)

### 2026 spring restart — current cycle

- Ordered BSF stock early spring 2026, before nighttime temps were consistently above freezing.
- No outdoor option yet (nights still <40 °F); indoor rig not fully built when stock arrived.
- Pivoted to building the full indoor rig in real time: butterfly love cage, halogen worklight (UV filter removed), Inkbird thermostat, larvae bin with self-harvest ramp.
- **This is the cycle the rest of this log covers from here forward.**

### Lessons encoded from the full history

1. **Cache Valley / southern Idaho is outside natural BSF colonization range.** Outdoor lure attracts house flies, not BSF. Indoor or mail-order is the only viable path here. *(Editorial: anchor article — "Why outdoor BSF doesn't work in cold climates: an Idaho food-waste experiment.")*
2. **Mail-ordering BSF in early spring traps you in a gap year.** No outdoor option yet, indoor rig not yet built. Either match the order to outdoor viability (~late June–August in 5b) or have the indoor rig fully built at order time. *(Editorial: "When to mail-order BSF in a cold climate.")*
3. **Communicate the colony to the rest of the household.** Anything edible by chickens is at risk of becoming chicken food. Label everything. *(Editorial: the chicken-feed-incident post.)*
4. **40 °F overnight lows are below the BSF survival floor.** Even in 5b summer, viable outdoor windows are short (late June through August at best). The temperature regime that prevents natural colonization also prevents outdoor cage success. *(Editorial: "Can I just put my BSF cage outside? — what 40 °F nights actually do.")*

## Rig spec — as of 2026-04-26

### Hardware in service

| Component | Spec / model | Status | Notes |
|---|---|---|---|
| Larvae bin | Standard plastic tote with integrated self-harvest migration ramp | **In service** | Substrate = brown shredded material (likely aspen/paper bedding) over food scraps. Frass accumulating. |
| Mating / love cage | Pop-up mesh butterfly tent, **48"H × 24"W × 24"D** (~16 cu ft, ~450 L), nylon/polyester mesh | **In service** | Sub-1.5 m vertical flight column (80% of literature benchmark), but adequate for ≤200 adults. |
| Halogen worklight | Stand-style halogen, **UV filter glass removed** to pass UVA | **❌ Failed** | See "Failures" log entry 2026-04-26. |
| LED worklight | Standard work-area LED (white spectrum, no UVA channel) | **In service (stopgap)** | Bridge until SPR AgTech arrives. Expected to underperform for mating; OK for warmth + day/night cue. |
| Inkbird thermostat outlet | Inkbird ITC-style, set point **84 °F (28.9 °C)** | **In service** | Currently in the lamp circuit. To be moved to the heat circuit (CHE/heat mat) once SPR AgTech is in place. |
| Govee hygrometer/thermometer | Standalone ambient sensor | **In service** | Reading room ambient, not cage interior. Cage-interior sensor not yet acquired. |
| Pupation Tupperware | Clear plastic, mesh-holes lid, Mylar bag at bottom, **no bedding** | **In service (degraded)** | Some prepupae developed off-smell + wigglies (probable mixed late-larvae or phorid contamination). |

### Hardware on order

| Component | Spec | ETA | Notes |
|---|---|---|---|
| **SPR AgTech BSF mating light** (EVO Conversion Systems) | Multi-channel LED tuned to BSF photoreceptor sensitivity per Hoc 2019; production-grade research lamp | TBD (in transit) | $180. Co-developed via Tomberlin (TX A&M / EVO) — the research-grade implementation of the Tomberlin & Sheppard 2010 + Hoc 2019/2020 literature. **Highest-leverage upgrade in this entire build.** |

### Hardware recommended but not yet acquired

| Component | Why it's needed | Priority |
|---|---|---|
| Ceramic heat emitter (CHE) + ceramic socket | Decoupled heat source so the Inkbird controls heat, not the light. Killed the halogen via thermal cycling. | **High** — pair with SPR AgTech arrival |
| Mechanical wall-plug timer | Light circuit on fixed daily 12L:12D schedule, independent of thermostat | **High** |
| Cage-interior hygrometer | Cage RH is currently unknown. Room is 28%; cage may be much higher post-bin-move, but unmeasured. | **Medium** |
| Cool-mist evaporative humidifier | Room ambient humidification (room currently 28% RH, peaks down to 11%) | **Low** — cage may self-humidify now that the bin is inside it |
| Cardboard oviposition strips | Corrugated cardboard 1×4 in pieces, 4–5 stacked, suspended above bin's wet feedstock | **High — today action item** |

### Environmental conditions on record

| Reading | Value | Source | Notes |
|---|---|---|---|
| Room ambient temp | **71.7 °F** | Govee | Min 66.7, max 83.3 |
| Room ambient RH | **28%** | Govee | Min **11%**, max 53% — extremely dry, well below BSF target |
| Cage target temp | **84 °F (28.9 °C)** | Inkbird SV | In BSF mating sweet spot |
| Cage actual temp | **Tracking 80 °F (~27 °C)** as of last read | Inkbird PV | Within mating range |
| Cage actual RH | Unknown | — | Need interior hygrometer |

---

## Cycle log

### 2026-04-26 — Initial firsthand documentation begins

- 5 reference photos archived (`src/images/setup/`, manifest in `docs/setup-photos.md`):
  worklight with UV filter removed, mesh love cage, self-harvest ramp with prepupae,
  larvae bin with feedstock, prepupae closeup.
- Self-harvest already underway. Prepupae visible crawling up the migration ramp.
- Photos: also archived environmental setup shots — Inkbird display, lamp on chair beside cage, Govee reading.

### 2026-04-26 — Pupation chamber set up

- Tupperware lined with **Mylar bag at bottom, no bedding** (operator's choice — wanted to avoid cardboard becoming an unwanted oviposition site once chamber went into the cage).
- Mesh-holes lid for ventilation.
- Prepupae transferred from bin as they self-harvested.
- Reasoning at the time: pupae would form cases on smooth Mylar; easier adult transfer to cage; no ovi-attractant. Validated against `Bertinetti et al. 2022` (low-light + dry shelter sufficient to trigger pupation).

### 2026-04-26 — Surprise: live adults already flying *in the bin*

- Prior to lamp setup, operator observed live BSF adults flying *inside* the larvae bin — not the pupation chamber, not the cage.
- Interpretation: parallel cohort had pupated in-place (dark drier corners of the bin) rather than self-harvesting. Eclosed on its own timeline.
- **Operational decision:** moved the entire larvae bin **into the love cage**, consolidating from a 3-zone setup (bin / pupation / cage) to a 1-zone integrated cycle.
- Trade-off captured: less control, less yield-per-cycle, but more resilient + matches how long-running hobbyist colonies tend to converge.

### 2026-04-26 — Pupation Tupperware showing problems

- Some prepupae **developed off-smell**; some specimens **wiggling** (atypical — healthy prepupae are immobile).
- Most likely interpretations:
  1. Some prepupae died and are rotting (drives smell + may have attracted phorid fly larvae)
  2. Late-stage larvae accidentally collected with prepupae are starving in the food-free chamber
  3. Phorid contamination (the wigglers may not be BSF at all)
- **Action:** triage recommended — sort hard/dark/dry healthy prepupae from soft/slimy dead ones; return any cream-colored late larvae to the bin; toss any unidentified small wrigglers (probable phorids).
- **Alternative path chosen:** since the bin is now in the cage anyway, dump the whole pupation chamber into the bin. Live larvae compost the dead prepupae; healthy prepupae continue pupating in situ.

### 2026-04-26 — Halogen worklight died

- Bare-bulb halogen (UV filter glass removed) stopped working.
- Failure modes ranked by probability:
  1. **Inkbird cycling killed it.** The lamp was on the heat-control circuit. Tight thermal swing → frequent on/off → inrush current at each restart → halogen filament fatigue. **Most likely cause.**
  2. **Skin-oil contamination on the bare quartz envelope.** Removing the UV filter glass meant working near the bulb; even a single fingerprint causes hot-spot rupture.
  3. Normal end-of-life — bare halogens run hotter and have shorter lives than enclosed; 100–500 hours common.
  4. Thermal shock from a draft or cool air blast.
- **Stopgap deployed:** standard LED worklight (no UV channel — expected to underperform for mating, acceptable for warmth + day/night cue). Inkbird left in place but expected to be repurposed when SPR AgTech arrives.
- **Lesson logged:** never put a halogen on a feedback-loop thermostat. Halogens want one of two things: (a) a fixed timer, never the thermostat circuit, or (b) replacement with an LED that doesn't care about cycling. Decouple heat from light.

### 2026-04-26 — SPR AgTech (EVO Conversion Systems) ordered

- $180. Production-grade BSF-tuned multi-channel LED.
- Direct lineage to Tomberlin & Sheppard 2010 (foundational artificial-light paper) + Hoc 2019/2020 (photoreceptor sensitivity / 4-light comparison) — papers already in the Tier 1 source catalog.
- This is the highest-leverage upgrade on the rig: Hoc 2020 head-to-head testing showed BSF-tuned LED beat halogen, quartz-iodine, and rare-earth lamps on inseminated-female yield.
- Plan when it arrives:
  1. Read EVO setup docs first; follow their distance / photoperiod / mounting numbers (production data, not theoretical).
  2. Verify UV output at cage height with the planned UV/lux meter.
  3. Decouple heat from light — wall→timer→SPR AgTech (light), wall→Inkbird→CHE/heat mat (heat). Two circuits, one job each.
  4. Keep LED worklight as failover backup.

---

## What's working

- ✅ **Larvae bin and self-harvest ramp** — prepupae are migrating up the ramp on their own per `Bertinetti et al. 2022` predictions.
- ✅ **Self-cycling colony** — surprise emergence of adults *inside the bin* shows the colony can complete the cycle without intervention. Indicates the broader environment is in spec.
- ✅ **Inkbird thermostat** — tracking cage at 80 °F vs. setpoint 84 °F. Hardware working, just needs to be moved off the lamp circuit.
- ✅ **Govee monitoring** — surfacing the dry-air problem (28% RH, min 11%) that would otherwise be invisible.
- ✅ **Operator's instincts** — moving the bin into the cage when adults appeared was the correct call (compresses timeline, leverages existing oviposition smell, lets the cage capture the next generation).
- ✅ **Mesh cage size** (48×24×24 in, ~16 cu ft) — adequate for ≤200 adults; 80% of the literature 1.5 m flight-column benchmark.
- ✅ **Inkbird setpoint** — 84 °F is in the documented BSF mating sweet spot (Sheppard 2002, 25–32 °C).

## What's not working / unresolved

- ❌ **Halogen worklight failed** — root-cause-likely is Inkbird cycling on a halogen. Replacement (SPR AgTech) en route. **Lesson encoded into rig design:** never put a halogen on a thermostat circuit.
- ❌ **Room ambient RH at 28% (peaks down to 11%)** — drastically below BSF mating range (50–60%). The bin moving into the cage may self-correct this for the cage interior (bin moisture evaporates inside the mesh), but unmeasured. Need cage-interior hygrometer to confirm.
- ❌ **Pupation Tupperware degraded** — off-smell + wigglies indicate some combination of dead prepupae + late-larvae starvation + possible phorid contamination. Pupation chamber ended up dumped into bin/cage; chamber-only approach may not be reattempted.
- ❌ **LED worklight as light source for mating** — pure visible-spectrum LEDs lack UVA. Mating success on this stopgap will likely be noticeably lower than on either the original halogen or (when it arrives) the SPR AgTech. Acceptable for the days between halogen-death and SPR-arrival, not as a long-term solution.
- ⚠️ **Cage on carpet** — staining and spillage risk; minor but should be addressed before next cycle (vinyl drop cloth or wipeable tray).
- ⚠️ **In-bin pupation surprise** — colony has less observability than assumed. A parallel cohort was already cycling without operator awareness. Need to inspect the bin more frequently (gently) to catch this earlier.

## Open questions

- What's the actual cage interior humidity right now (post bin-move)?
- How many adults are currently in the cage?
- Is mating occurring under the LED worklight stopgap? (Watch for cardboard oviposition strips being used as evidence.)
- When SPR AgTech arrives, what's its specified distance, photoperiod, and UV output? (Will verify against the Hoc 2019 spectral data.)
- What killed the halogen specifically? (Visual forensic on the dead bulb: cloudy envelope = skin oil; black/sooty = end-of-life; cracked = thermal shock.)

---

## Editorial mining — observations → articles

The operator log is the article archive. Each cycle of the colony produces multiple
publishable observations. Mapped to the keyword calendar
(`seo-blog-templates/KEYWORD_CALENDAR.md`):

| Observation | Article it feeds | Tier in keyword calendar |
|---|---|---|
| Halogen-with-UV-filter-removed → death by Inkbird cycling | "Why we removed the UV filter from a worklight (and the safety we added back)" + comparison post | T1 + T2 |
| LED worklight as stopgap → expected mating drop-off | Lights-compared pillar (halogen / LED / SPR AgTech / reptile UVB) | T1 + T2 |
| 28% room RH vs. 50–60% target → moving bin into cage to self-humidify | "Indoor BSF in 28% humidity" + "BSF in cold-climate dry air" | T1 + T4 |
| In-bin pupation surprise → colony self-cycling | "Self-harvesting prepupae: what we saw in week one" | T1 |
| Pupation Tupperware off-smell → triage / consolidation decision | "Pupation chamber: bedding vs. no bedding" + failure-mode addendum | T1 |
| 48×24×24 cage size adequate for hobbyist scale | "The indoor mating cage: 48×24×24 in a cold-climate basement" | T1 |
| Inkbird + halogen incompatibility | "Light cycle: timer, thermostat, and why pulsing the lamp is a bad idea" | T1 |
| Network gear in same room → humidity strategy | "BSF + your network rack: humidifying a cage without wrecking electronics" | T4 |

This is the differentiator: **eight articles' worth of substantive content from
~24 hours of one operator's real cycle.** Aggregator sites can't produce this.

---

*Last updated: 2026-04-26. Keep appending — do not rewrite history.*
