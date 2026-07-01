# Content Audit — Togwaarde

**Date:** 2026-07-02 · **Scope:** all user-facing copy (homepage, ~15 kennisbank articles, calculator UI, `lib/tog-constants.ts`). Every verifiable factual claim was extracted and the high-stakes ones checked against primary sources.

## Sources used for verification
- Lullaby Trust — room temperature (16–20°C), TOG-per-temperature, hot-weather guidance: https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/room-temperature/ and https://www.lullabytrust.org.uk/baby-safety/travel-and-weather/hot-weather/
- JGZ-richtlijn Preventie Wiegendood (RIVM/NCJ): https://www.jgzrichtlijnen.nl/richtlijn/jgz-richtlijn-preventie-wiegendood/
- Wiegendood cijfers NL 2022–2024 (VeiligheidNL / AJN / CBS): ~39 (2022), 41 (2023), 35 (2024) vs ~25 historically; data contested (missing cause-of-death forms in >50% of 2024 cases).
- EN 16781:2018 (TOG test standard for infant sleep products) — real standard.

## Findings & actions

| # | Claim | Location | Verdict | Action |
|---|-------|----------|---------|--------|
| 1 | "SIDS Preventie" trust badge + feature card | `app/page.jsx` | Overclaim (tool informs, is not a certified prevention intervention) | **FIXED** → "Veilig Slapen" |
| 2 | "TOG 2.5 voor koude winternachten (15-18°C)" | `app/page.jsx:157` | Below own 16°C safety minimum | **FIXED** → 16-18°C |
| 3 | "2022-2024: stijging van 50%, 25-39 gevallen/jr (3 p/mnd)" | `app/kennisbank/wiegendood-preventie:76` | Roughly right but one-sided; data is publicly contested | **FIXED** → correct figures (~35-41 vs ~25) + "cijfers zijn onzeker" caveat |

## Claims VERIFIED CORRECT — do not "fix" these
- **SIDS risk "factor 38"** (`wiegendood-preventie:164`) — real: JGZ-richtlijn gives OR **38.0** (95% CI 3.2–452) for a duvet covering head + body. Legitimate and sourced. Factor 3.9 for dekbed is likewise defensible.
- **"BAP beveelt 20-22°C aan"** — a prior audit pass flagged this as a typo (AAP). **It does not exist in the codebase.** Line 414 correctly states adults prefer 20–22°C which is too warm for babies. No change needed.
- Room temp 16–20°C (ideaal 18°C), TOG-per-temp table, max 4.0 TOG, HIGH_TOG_WARNING 3.5, no loose blankets <12 months, neck-check method, premature warmer-temp guidance, 1984→2004 SIDS decline (120→9 per 100k), 60%-male — all align with NHS / Lullaby Trust / RIVM / VeiligheidNL / JGZ.

## Remaining (low priority, not yet changed)
- Superlative "De meest complete TOG calculator van Nederland" (`app/page.jsx`) — unverifiable puffery; low risk.
- Product price ranges in `baby-slaapzak-koopgids` — illustrative; fine if kept as estimates.
- Experimental/dead pages (`app/old`, `app/v2`, `app/reverse`) still contain the old "SIDS Preventie" wording — not live, left untouched.

## Overall
Core TOG/temperature/safety guidance is sound and well-aligned with authoritative sources. Fixes above closed the only real overclaim (badge) and one internal inconsistency (15°C). No fabricated statistics of note on this site.
