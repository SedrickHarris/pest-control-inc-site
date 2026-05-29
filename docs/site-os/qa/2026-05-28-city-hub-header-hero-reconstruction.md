# QA: Batch B — City-Hub Header / Main / Hero Reconstruction

Date: 2026-05-28
Severity: High (5 high-traffic city hubs had no `<h1>`, no `<header>`, no `<main>`, no hero — SEO + a11y + conversion blocker)
Status: Complete; one commit prepared; awaiting push approval
Scope: 5 city-hub pages — north-las-vegas, boulder-city, enterprise, paradise, spring-valley.

---

## Phase A re-entry

- `git status`: clean.
- Implementation log tail: most recent entry is the about/eco-friendly image wiring (commit `8ff0a38`, pushed). The standing next batch is Batch B (this work).
- Latest QA: `qa/2026-05-28-about-ecofriendly-image-wiring.md`.

---

## Step 0 — Re-confirm (read-only)

Confirmed the orphaned-hero pattern on all 5 targets and verified the henderson canonical reference has a true hero (not just landmarks).

| Page | body | header | main | h1 | hero | form-card | first heading | title prefix |
|---|---|---|---|---|---|---|---|---|
| pest-control-henderson-nv (canonical) | yes | 1 | 1 | 1 | **1** | 1 | `<h1>` | "Pest Control Henderson NV" |
| pest-control-sunrise-manor-nv (canonical cross-check) | yes | 1 | 1 | 1 | **1** | 1 | `<h1>` | "Pest Control Sunrise Manor NV" |
| pest-control-north-las-vegas | yes | **0** | **0** | **0** | **0** | 1 | `<h2>` | "Pest Control North Las Vegas" |
| pest-control-boulder-city-nv | yes | **0** | **0** | **0** | **0** | 1 | `<h2>` | "Pest Control Boulder City NV" |
| pest-control-enterprise-nv | yes | **0** | **0** | **0** | **0** | 1 | `<h2>` | "Pest Control Enterprise NV" |
| pest-control-paradise-nv | yes | **0** | **0** | **0** | **0** | 1 | `<h2>` | "Pest Control Paradise NV" |
| pest-control-spring-valley-nv | yes | **0** | **0** | **0** | **0** | 1 | `<h2>` | "Pest Control Spring Valley NV" |

Henderson's hero presence confirmed by direct read of `<section class="hero">` at line 466, containing breadcrumb + hero-inner with the canonical eyebrow/h1/sub/intro/ctas/trust left column and form-card aside right column.

### Pre-existing orphan tags discovered

Each target page already contained the *closing* halves of the missing scaffold:

- after the orphan `<aside class="form-card">…</aside>`: `</div></div></section>` (3 orphan closes — exactly matches the 3 opens I would add: `<div class="hero-inner">`, `<div class="container">`, `<section class="hero">`)
- before `<footer>`: orphan `</main>` (matches the `<main id="main-content">` I would add)

This let the transformation be additive only — no existing closing tag had to be added, moved, or rebalanced.

### Form id continuity

All 5 pages use `<form id="estimate-form">` (matching henderson). The JS handler binds by id; moving the form-card into the new hero-inner right column does not affect the binding.

| Page | Form id | Input prefix |
|---|---|---|
| north-las-vegas | `estimate-form` | `nlv-` |
| boulder-city | `estimate-form` | `bc-` |
| enterprise | `estimate-form` | `ent-` |
| paradise | `estimate-form` | `par-` |
| spring-valley | `estimate-form` | `sv-` |

---

## The transformation (applied to each of the 5 pages)

A Node script with a city-data table applied 7 changes per page in one pass:

1. **Top-bar** added with page-specific city framing: `24/7 Pest Emergency, <City> & Clark County, NV` + phone + `Free First Service` badge.
2. **`<header class="header">`** added verbatim from canonical (logo + hamburger + nav + Free Estimate CTA).
3. **`<div id="mobile-nav" class="mobile-nav-overlay">`** added verbatim from canonical (close button + 5 nav links + Free Estimate CTA + phone). `closeMobileNav()` handler is already defined site-wide and is already guarded for missing elements.
4. **`<main id="main-content">`** opened. Closing tag already present as a pre-existing orphan just before `<footer>` on each page — no new closing tag added; the orphan now binds to a real open.
5. **`<section class="hero">`** opened with `<div class="container">`, breadcrumb (`Home / Las Vegas Pest Control / <City>`), `<div class="hero-inner">`, and the LEFT-column `<div>` containing eyebrow, h1, sub, intro, CTAs, trust signals. Same 3 closing tags already existed as orphans after the form-card aside — no new closes added.
6. **Form-card aside MOVED** into the hero-inner's RIGHT column by the additive insertion: since the form-card was already at the position the hero-inner's right column needs to occupy, the inject was placed *before* the aside, leaving it in place. Zero duplication: each page still has exactly one `<div class="form-card">`.
7. **Form-card title demoted** from `<h2 class="form-card-title">Free <City> Inspection</h2>` to `<p class="form-card-title">Free <City> Inspection</p>` — same class, same text, same styling. The form-card title is a UI label, not a topical section, so removing it from the heading outline allows the page's outline to start cleanly with the new h1.

### Per-page hero copy

All hero copy was condensed from each page's existing intro paragraphs; every noun, pest name, neighborhood, and entity phrase is already present in the page's below-hero content. No new claims were introduced.

| Page | h1 | hero-intro |
|---|---|---|
| north-las-vegas | "Pest Control in **North Las Vegas, NV**" | "North Las Vegas combines newer master-planned communities like Aliante, Tule Springs, and Valley Vista with older neighborhoods near the I-15 corridor, producing year-round pressure from bark scorpions, subterranean termites, German cockroaches, and rodents. Pest Control Inc serves all of North Las Vegas with the Health Conscious Service Program, backed by a money-back guarantee." |
| boulder-city | "Pest Control in **Boulder City, NV**" | "Boulder City's older housing stock and proximity to Lake Mead and Sloan Canyon drive year-round pressure from subterranean and drywood termites, bed bugs, bark scorpions, and Argentine ants. Pest Control Inc serves all of Boulder City with the Health Conscious Service Program, backed by a money-back guarantee." |
| enterprise | "Pest Control in **Enterprise, NV**" | "Enterprise's rapid residential growth and active year-round construction displace established scorpions, subterranean termites, and rodents into newly built homes, alongside steady German cockroach, Argentine ant, black widow, and roof rat pressure across the area. Pest Control Inc serves all of Enterprise with the Health Conscious Service Program, backed by a money-back guarantee." |
| paradise | "Pest Control in **Paradise, NV**" | "Paradise combines residential neighborhoods like Silverado Ranch, Paradise Valley, and the UNLV corridor with one of the highest-density hospitality zones in the world, producing German cockroach and bed bug pressure that migrates from commercial sites into nearby residences alongside year-round bark scorpion, roof rat, Argentine ant, and black widow activity. Pest Control Inc serves all of Paradise with the Health Conscious Service Program, backed by a money-back guarantee." |
| spring-valley | "Pest Control in **Spring Valley, NV**" | "Spring Valley's size and residential density make it one of the most active pest-service areas in the Las Vegas Valley, with year-round pressure from scorpions, German and American cockroaches, carpenter and fire ants, rodents, and documented Africanized honeybee activity across Clark County. Pest Control Inc serves all of Spring Valley with the Health Conscious Service Program, backed by a money-back guarantee." |

Eyebrow (all 5): `<City> · Clark County, NV · License #4632` — matches henderson's pattern.
Hero-sub (all 5): `3-Generation Family-Owned · Licensed · Money-Back Guarantee` — identical to henderson.
Hero-ctas + 5 trust items: identical to henderson, no inflation (Google 5.0 rating is the documented figure on the trust bar; no review-count claim is added).

### Breadcrumb parent

Henderson's existing breadcrumb uses `Las Vegas Pest Control` → `/pest-control-las-vegas/` as the parent (not `/service-areas/`). Per spec ("Match henderson's exact breadcrumb markup/parent; if henderson uses a different parent, copy henderson's"), the 5 new breadcrumbs follow the same pattern: `Home / Las Vegas Pest Control / Pest Control <City> NV`.

---

## Verification

| Gate | Method | Result |
|---|---|---|
| Per-page: exactly one `<header>`, one `<main id="main-content">` (open + close balanced), one `<h1>`; first heading is h1; `<body>` present | regex tag counts | 5/5 PASS |
| Per-page: exactly one `class="form-card"` (no duplicate) | count | 5/5 PASS — one form-card per page |
| Form-card-title demoted: zero `<h2 class="form-card-title">`, one `<p class="form-card-title">` | count | 5/5 PASS |
| Mobile-nav: `id="hamburger-btn"` and `id="mobile-nav"` present | count | 5/5 PASS (1 each) |
| Form id preserved (`id="estimate-form"`) so JS handler still binds | grep | 5/5 PASS |
| JSON-LD on target pages parses | strip comments + `JSON.parse` | 5/5 blocks parse |
| Meta / link / external `<script src>` / JSON-LD-block counts vs HEAD | per-page count comparison | 5/5 PASS (16 meta, 10 link, 1 script[src], 1 JSON-LD on each page — all unchanged) |
| Below-hero region (`<section class="trust-bar">` onward, up to but not including `<footer>`) byte-identical vs HEAD | LF-normalized string equality (raw bytes differ only because Windows checkout writes CRLF; Git normalizes on stage) | 5/5 PASS |
| Comment-aware no-long-dash gate, site-wide | Node detector from `pass-fail-page-quality-gates.md` | TOTAL: 0, exit 0 |

### Heading outline (informational)

After this commit every target page has exactly one h1 (the first heading), the form-card-title is no longer counted, and the page's content sections begin with h2. The site's pre-existing pattern jumps from h2 (section title) to h4 (footer column titles) on these pages — a pre-existing skip identical to henderson and unchanged by this commit, since the rule prohibits below-hero edits. Surfacing here for future cleanup; not in scope for Batch B.

---

## Stop conditions

None triggered. The orphan close tags discovered at Step 0 made the transformation purely additive; no below-hero content was edited; no new fact was introduced into hero copy (every noun in each hero-intro is already used in the same page's below-hero copy); JSON-LD remained valid; the no-long-dash gate stays at 0.

---

## Next step

Batch C: 26 neighborhood pages (Level 3). Reference pages for the neighborhood pattern are `pest-control-las-vegas/apartments/index.html` and `pest-control-las-vegas/eco-friendly/index.html`, plus the recently-retrofitted `pest-control-las-vegas/southern-highlands/index.html` (see commit `00328d4`). Breadcrumb pattern for neighborhoods: `Home / <City Hub> / <Neighborhood>` (e.g. `Home / Pest Control Las Vegas / Southern Highlands`). The 5 city hubs corrected in this commit are now valid parents for those breadcrumbs.
