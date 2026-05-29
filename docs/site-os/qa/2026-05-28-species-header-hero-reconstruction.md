# QA — Batch A: 9 Species Pages Header / Main / H1 Reconstruction

Date: 2026-05-28
Severity: High (broken document structure + dead site nav)
Status: Complete &mdash; all 9 pages reconstructed, verified, committed; awaiting push approval
Scope: Batch A of the multi-batch top-of-page reconstruction effort. Remaining batches noted at the end.

---

## Phase A re-entry summary

- `git status`: clean, branch in sync with `origin/main`.
- Implementation log tail: most recent entry is the **2026-05-28 anim-ready Reveal Halt** (commit `016d8e0`) where Fix A null-guarded the mobile-nav handlers on 11 pages and Fix B (restore the missing `<header>` markup) was STOPPED per spec STOP conditions. This batch resumes that stopped Fix B for the 9 species pages that overlap with that set.
- Most recent QA file: `2026-05-28-anim-reveal-halt-fix.md`.

---

## Step 0 &mdash; signature confirmation

| File | `<header>` | `<main>` | `<h1>` | `<body>` | form-card aria | `<h2 class="form-card-title">` | Verdict |
|---|---|---|---|---|---|---|---|
| `bird-removal-las-vegas/index.html` | 0 | 0 | 0 | **MISSING** | present | 1 | matches signature |
| `bee-removal-las-vegas/index.html` | 0 | 0 | 0 | **MISSING** | present | 1 | matches signature |
| `bed-bug-exterminator-las-vegas/index.html` | 0 | 0 | 0 | present | present | 1 | matches signature |
| `hornet-exterminator-las-vegas/index.html` | 0 | 0 | 0 | present | present | 1 | matches signature |
| `wasp-exterminator-las-vegas/index.html` | 0 | 0 | 0 | present | present | 1 | matches signature |
| `miller-moth-exterminator-las-vegas/index.html` | 0 | 0 | 0 | present | present | 1 | matches signature |
| `earwig-exterminator-las-vegas/index.html` | 0 | 0 | 0 | present | present | 1 | matches signature |
| `crane-fly-exterminator-las-vegas/index.html` | 0 | 0 | 0 | present | present | 1 | matches signature |
| `false-chinch-bug-exterminator-las-vegas/index.html` | 0 | 0 | 0 | present | present | 1 | matches signature |
| `scorpion-exterminator-las-vegas/index.html` (canonical reference) | 1 | 1 | 1 | present | present | 1 | full canonical scaffold |

All 9 target pages match the failure signature; the canonical reference has the full scaffold the script copies from.

Pre-existing observation: every one of the 9 already had an *orphan* `</main>` closing tag immediately before `<footer>` (leftover from incomplete generation). That orphan now pairs cleanly with the `<main id="main-content">` opener this batch adds &mdash; no extra `</main>` insertion was needed.

---

## What changed per page

Per page (one bulk Node script, all 9 processed in one pass):

1. **`<body>` open tag** &mdash; added to bird-removal and bee-removal (the two pages where it was missing). The other 7 already had it.
2. **Skip link** &mdash; `<a href="#main-content" class="skip-link">Skip to main content</a>` added immediately inside `<body>`.
3. **Top bar** &mdash; full canonical block; the `top-bar-text` is the only per-page variant. See Per-Page Values table below.
4. **`<header class="header">`** &mdash; full canonical header copied from scorpion: container, logo `<img>` (existing `images/logos/pest-control-inc-logo-transparent-background.png`), hamburger button (`id="hamburger-btn"`, with three `.ham-line` spans), desktop `<nav>` with the same site-wide links and Free Estimate CTA.
5. **Mobile-nav overlay** &mdash; `<div id="mobile-nav" class="mobile-nav-overlay">` with mobile-nav-close, mobile-nav-links nav, mobile-nav-cta, mobile-nav-phone. The handler-guard fix from commit `016d8e0` is still in place and the handlers will now find the elements they expect.
6. **`<main id="main-content">`** &mdash; opener added right after the mobile-nav overlay. Pairs with the pre-existing orphan `</main>` just before `<footer>`.
7. **Hero (Section 01)** &mdash; new first section inside `<main>`, structured exactly like canonical:
   - `<section class="hero">` &rarr; `<div class="container">` &rarr; `<nav class="breadcrumb">` (Home / Pest Control Las Vegas / per-page) &rarr; `<div class="hero-inner">`
   - LEFT column `<div>` with hero-eyebrow (site-wide credential line), `<h1>`, `<p class="hero-sub" id="<pest>-speakable">`, hero-ctas (phone + Free Estimate), hero-trust list (5 items)
   - RIGHT column: the **existing** form-card `<aside>` (already in position immediately below `</head>` in every file) becomes the RIGHT column &mdash; not moved or duplicated, just structurally reframed by the inserted opening tags above it
8. **Form-card title demotion** &mdash; `<h2 class="form-card-title">Free X Inspection</h2>` &rarr; `<p class="form-card-title">Free X Inspection</p>`. Same class, same styling, no longer a heading. Keeps the document outline at a single h1 followed by topical h2s.

The existing closing tags `</div></div></section>` that already sat after the form-card aside now correctly close `hero-inner`, `container`, and the hero `<section>`. Nothing below the hero was edited.

---

## Per-page values written (no invented content)

| File | top-bar emergency text | breadcrumb tail | `<h1>` | speakable id |
|---|---|---|---|---|
| bird-removal | 24/7 Bird & Pigeon Emergency | Bird & Pigeon Removal | Bird & Pigeon Removal *Las Vegas* | `bird-speakable` |
| bee-removal | 24/7 Bee Emergency | Bee Removal | Bee Removal *Las Vegas* | `bee-speakable` |
| bed-bug | 24/7 Bed Bug Emergency | Bed Bug Exterminator | Bed Bug Exterminator *Las Vegas* | `bedbug-speakable` |
| hornet | 24/7 Hornet Emergency | Hornet Exterminator | Hornet Exterminator *Las Vegas* | `hornet-speakable` |
| wasp | 24/7 Wasp Emergency | Wasp Exterminator | Wasp Exterminator *Las Vegas* | `wasp-speakable` |
| miller-moth | 24/7 Moth Emergency | Miller Moth Exterminator | Miller Moth Exterminator *Las Vegas* | `moth-speakable` |
| earwig | 24/7 Earwig Emergency | Earwig Exterminator | Earwig Exterminator *Las Vegas* | `earwig-speakable` |
| crane-fly | 24/7 Crane Fly Emergency | Crane Fly Exterminator | Crane Fly Exterminator *Las Vegas* | `cranefly-speakable` |
| false-chinch | 24/7 Nuisance Pest Emergency | False Chinch Bug Control | False Chinch Bug Control *Las Vegas* | `false-chinch-speakable` |

Hero-sub copy was condensed from each page's existing AEO intro paragraph and the standard entity phrases (`Health Conscious Service Program`, `3-generation family-owned`, `License #4632`, `money-back guarantee`, `30-minute callback`). No invented stats, no invented EPA numbers, no named individuals, no founding year. Every entity phrase was already present multiple times on each page (HCSP appeared 2&ndash;11 times per page before this edit).

---

## Verification results

### Structural (per spec VERIFY items 1&ndash;4)

| File | header | main open | main close | h1 | form# | form-card-title h2 | form-card-title p | `<body>` |
|---|---|---|---|---|---|---|---|---|
| bird-removal | 1 | 1 | 1 | 1 | 1 | 0 | 1 | yes |
| bee-removal | 1 | 1 | 1 | 1 | 1 | 0 | 1 | yes |
| bed-bug | 1 | 1 | 1 | 1 | 1 | 0 | 1 | yes |
| hornet | 1 | 1 | 1 | 1 | 1 | 0 | 1 | yes |
| wasp | 1 | 1 | 1 | 1 | 1 | 0 | 1 | yes |
| miller-moth | 1 | 1 | 1 | 1 | 1 | 0 | 1 | yes |
| earwig | 1 | 1 | 1 | 1 | 1 | 0 | 1 | yes |
| crane-fly | 1 | 1 | 1 | 1 | 1 | 0 | 1 | yes |
| false-chinch | 1 | 1 | 1 | 1 | 1 | 0 | 1 | yes |

All 9 pages: one `<header>`, one `<main id="main-content">`, one matching `</main>`, one `<h1>`, exactly one `id="estimate-form"` (form-card not duplicated), `<h2 class="form-card-title">` count zero, `<p class="form-card-title">` count one, `<body>` present.

### Heading outline (per SEO heading rules)

| File | h1 | h2 | h3 | first heading is `<h1>`? |
|---|---|---|---|---|
| bird-removal | 1 | 9 | 10 | yes |
| bee-removal | 1 | 9 | 5 | yes |
| bed-bug | 1 | 9 | 2 | yes |
| hornet | 1 | 9 | 6 | yes |
| wasp | 1 | 9 | 4 | yes |
| miller-moth | 1 | 9 | 14 | yes |
| earwig | 1 | 9 | 6 | yes |
| crane-fly | 1 | 9 | 5 | yes |
| false-chinch | 1 | 9 | 9 | yes |

Exactly one `<h1>` per page, always the first heading in document order. The 9 `<h2 class="section-title">` items (Section 02 through Section 10) remain as content section headings &mdash; no skipped levels. The form-card title is no longer an `<h2>` so it no longer breaks the outline.

### Mobile-nav handlers (paired with commit 016d8e0)

| File | `id="hamburger-btn"` | `id="mobile-nav"` |
|---|---|---|
| all 9 | 1 each | 1 each |

The null-guarded handlers from `016d8e0` now have the elements they were looking for. The reveal-halt cause is removed and the hamburger menu becomes functional.

### Integrity (per spec VERIFY item 5)

| File | JSON-LD | `<meta>` | `<link>` | external `<script src>` | below-hero content |
|---|---|---|---|---|---|
| bird-removal | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged |
| bee-removal | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged |
| bed-bug | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged |
| hornet | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged |
| wasp | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged |
| miller-moth | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged |
| earwig | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged |
| crane-fly | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged |
| false-chinch | 1&rarr;1 | 16&rarr;16 | 10&rarr;10 | 1&rarr;1 | unchanged |

Below-hero invariant: the content from `<section class="aeo-section">` through `</main>` was byte-compared HEAD vs current (with line endings normalized to handle Git's LF/CRLF roundtrip). Every one of the 9 pages: identical. The only edits below the hero are the form-card-title `<h2>`&rarr;`<p>` swap, which sits *inside* the form-card aside, *inside* the hero &mdash; not in the below-hero region.

### Browser test
No local server or staging preview reachable from this environment. Recommend manual confirmation on bird-removal: header renders, hamburger opens the menu, the `<h1>` shows above the form, and Sections 02&ndash;10 render unchanged.

---

## Form-card-title note (intentional drift from canonical, recorded per spec)

The canonical reference (`scorpion-exterminator-las-vegas/index.html`) still uses `<h2 class="form-card-title">Free Scorpion Inspection</h2>`. This batch demotes the equivalent on the 9 species pages to `<p class="form-card-title">` because the lead-form card title is a UI label, not a topical section, and an `<h2>` there breaks the heading outline (would produce two competing top-level content headings: the lead form title and the actual first content section).

Per spec: do **not** edit the canonical pages in this pass. The 4 working species pages (`scorpion`, `cockroach`, `rodent`, `spider`, `termite` &mdash; whichever are in the working/canonical set) plus any other live page using `<h2 class="form-card-title">` should be reconciled in a later consistency pass. After this batch, the species pages and the canonical pages will be inconsistent on this single point: target pages use `<p>`, canonical pages use `<h2>`. Flagging.

---

## Sample diff (representative &mdash; `bird-removal-las-vegas/index.html`)

```diff
@@ -454,6 +454,77 @@ </style>
 </head>
+<body>
+<a href="#main-content" class="skip-link">Skip to main content</a>
+
+<!-- TOP BAR -->
+<div class="top-bar">
+  <span class="top-bar-text">24/7 Bird &amp; Pigeon Emergency &mdash; Las Vegas &amp; Clark County, NV</span>
+  <a href="tel:+17022284394" class="top-bar-phone">📞 (702) 228-4394</a>
+  <a href="/specials/" class="top-bar-badge">Free First Service →</a>
+</div>
+
+<!-- HEADER --> (logo + hamburger + desktop nav)
+<!-- MOBILE NAV --> (#mobile-nav overlay)
+
+<main id="main-content">
+
+<!-- SECTION 01 — HERO -->
+<section class="hero">
+  <div class="container">
+    <nav class="breadcrumb">…Home / Pest Control Las Vegas / Bird & Pigeon Removal…</nav>
+    <div class="hero-inner">
+      <div>
+        <span class="hero-eyebrow">…credential line…</span>
+        <h1>Bird & Pigeon Removal <em>Las Vegas</em></h1>
+        <p class="hero-sub" id="bird-speakable">Pest Control Inc removes feral pigeons…</p>
+        <div class="hero-ctas">…</div>
+        <div class="hero-trust" role="list">…5 items…</div>
+      </div>
+      <!-- RIGHT: FORM -->
       <aside aria-label="Request a free bird inspection">
         <div class="form-card">
-          <h2 class="form-card-title">Free Bird Inspection</h2>
+          <p class="form-card-title">Free Bird Inspection</p>
           …
@@ … </aside>
     </div>
   </div>
 </section>
```

(Full per-page diffs are visible via `git show 78a78e?` once committed; only the scaffold + hero + the h2&rarr;p line change.)

---

## Remaining batches (logged for next passes)

- **Batch B &mdash; 5 city hubs:** `pest-control-north-las-vegas`, `pest-control-boulder-city-nv`, plus the 3 other city hubs not yet header-fixed (per the original 40-page audit; specific list to confirm at batch start).
- **Batch C &mdash; 26 neighborhood pages:** the Phase 10.5 batch already on the implementation-log open-TODO list. These pages share the same "no header, no body open" pattern.
- **Quick win &mdash; 4 h1-only pages:** `cockroach`, `rodent`, `spider`, `termite` &mdash; need an `<h1>` added inside their existing hero LEFT column. No scaffold work, just the heading. (Note that `rodent` was *also* the canonical reference for the scaffold here; if `rodent` is actually missing an `<h1>`, that contradicts its canonical status &mdash; double-check at batch start.)
- **Consistency pass &mdash; form-card-title tag:** reconcile the 9 demoted `<p>`s here with the canonical `<h2>`s on the working pages. Recommend the demotion, but defer to owner.
