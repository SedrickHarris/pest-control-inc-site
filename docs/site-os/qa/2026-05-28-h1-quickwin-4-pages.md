# QA — Quick Win: `<h1>` + Hero Reconstruction on 4 Service Pages

Date: 2026-05-28
Severity: High (SEO; pages had no `<h1>`)
Status: Complete &mdash; 4 pages updated, verified, committed; awaiting push approval
Scope: Quick-win pass alongside Batch A. Surfaced a discrepancy with the spec's premise; rerouted with owner approval; resolved.

---

## Phase A re-entry

- `git status`: clean, in sync with `origin/main`.
- Implementation log tail: most recent entry is **Batch A: Top-of-Page Reconstruction on 9 Species Pages** (commit `849636f`). This quick win was named in that entry's "Remaining batches" section, with the note: *"Worth double-checking `rodent` since it was also used as the secondary canonical reference in this batch."*
- Most recent QA file: `2026-05-28-species-header-hero-reconstruction.md`.

---

## Spec premise vs on-disk state &mdash; rerouted with owner approval

The spec said *"These 4 pages already have `<header>`, `<main>`, and a hero section, but are missing an `<h1>` entirely (the only structural gap on them)."*

Step 0 confirmed `<header>` and `<main>` were present on all 4. **The hero section was not.** Every one of the 4 pages had the same orphaned-hero pattern as the 9 species pages from Batch A: `<main id="main-content">` directly followed by the form-card `<aside>` with 6-space indentation, and the closing tags `</div></div></section>` after `</aside>` that would have closed `hero-inner` / `container` / `section.hero` if the opening tags had been there.

| File | `<header>` | `<main>` | `<section class="hero">` | `<h1>` | `<h2 class="form-card-title">` | hero-inner / breadcrumb / LEFT column |
|---|---|---|---|---|---|---|
| `cockroach-exterminator-las-vegas/index.html` | 1 | 1 | **0** | **0** | 1 | **MISSING** |
| `rodent-exterminator-las-vegas/index.html` | 1 | 1 | **0** | **0** | 1 | **MISSING** |
| `spider-exterminator-las-vegas/index.html` | 1 | 1 | **0** | **0** | 1 | **MISSING** |
| `termite-exterminator-las-vegas/index.html` | 1 | 1 | **0** | **0** | 1 | **MISSING** |

Because the LEFT content column did not exist, the spec's instruction "Insert exactly ONE `<h1>` into the hero-inner LEFT content column" could not be executed as written. Surfaced to owner with three options; owner chose: **"Run Batch A on them"** &mdash; apply the same hero scaffold used on the 9 species pages.

These 4 pages already had `<body>`, top-bar, `<header>`, mobile-nav, and `<main>` (unlike the species pages, where bird and bee were also missing `<body>`). So only the **hero block + form-card-title demotion** were applied; the rest of the canonical scaffold was already in place.

---

## What changed per page

For each of the 4:
1. Hero block inserted between `<main id="main-content">` and the existing form-card `<aside>`:
   - `<section class="hero">` &rarr; `<div class="container">` &rarr; `<nav class="breadcrumb">` (Home / Pest Control Las Vegas / per-page) &rarr; `<div class="hero-inner">` &rarr; LEFT column `<div>` with hero-eyebrow, `<h1>`, `<p class="hero-sub" id="<pest>-speakable">`, hero-ctas, hero-trust
   - The RIGHT column is the existing `<aside>` &mdash; not moved, not duplicated; the pre-existing orphan `</div></div></section>` after `</aside>` now correctly closes hero-inner / container / section
2. `<h2 class="form-card-title">Free X Inspection</h2>` &rarr; `<p class="form-card-title">Free X Inspection</p>`

No other edits.

### Per-page `<h1>` chosen (derived from page `<title>` / slug, primary keyword + geo, &le; 60 chars)

| File | h1 | `<title>` reference |
|---|---|---|
| cockroach | `Cockroach Exterminator <em>Las Vegas</em>` | "Cockroach Exterminator Las Vegas \| Pest Control Inc \| License #4632" |
| rodent | `Rodent Exterminator <em>Las Vegas</em>` | "Rodent Exterminator Las Vegas \| Rat & Mouse Control \| Pest Control Inc" |
| spider | `Spider Exterminator <em>Las Vegas</em>` | "Spider Exterminator Las Vegas \| Black Widow Control \| Pest Control Inc" |
| termite | `Termite Exterminator <em>Las Vegas</em>` | "Termite Exterminator Las Vegas \| Pest Control Inc \| License #4632" |

Hero-sub copy was condensed from each page's existing AEO intro paragraph and the standard entity phrases (`Health Conscious Service Program`, `3-generation family-owned`, `License #4632`, `money-back guarantee`, `30-minute callback`). No new claims or fabricated stats.

---

## Verification results

| File | jsonLd | meta | link | scriptSrc | below-hero | h1 | hero | h2 | h3 | fc-h2 | fc-p | first heading |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| cockroach | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged | 1 | 1 | 9 | 1 | 0 | 1 | `<h1>` |
| rodent | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged | 1 | 1 | 11 | 1 | 0 | 1 | `<h1>` |
| spider | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged | 1 | 1 | 9 | 2 | 0 | 1 | `<h1>` |
| termite | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged | 1 | 1 | 9 | 1 | 0 | 1 | `<h1>` |

- Exactly one `<h1>` per page, always the first heading in document order
- Exactly one `<section class="hero">` per page
- Form-card title is now `<p>`, no `<h2 class="form-card-title">` remaining
- Heading outline: h1 first, then content-section h2s, then h3s &mdash; no skipped levels
- Integrity: JSON-LD / `<meta>` / `<link>` / external `<script src>` counts unchanged on all 4
- Below-hero content (from `<section class="trust-bar"` onwards through `</main>`) byte-identical to HEAD (line endings normalized for the compare)

`rodent` specifically now has `h1: 1` &mdash; closes the contradiction noted in the Batch A log entry where `rodent` was used as the secondary canonical reference while being itself h1-less.

---

## Remaining batches

- **Batch B** &mdash; 5 city hubs (same orphaned-hero pattern as Batch A and this quick win)
- **Batch C** &mdash; 26 Phase 10.5 neighborhood pages (also same pattern; overlaps with the long-running "Header markup repair" TODO)
- **Consistency pass** &mdash; reconcile `<h2 class="form-card-title">` (other live pages) vs `<p class="form-card-title">` (Batch A + this quick win); recommend the demotion site-wide
