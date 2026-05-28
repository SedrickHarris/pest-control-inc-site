# QA — anim-ready Reveal Halt Fix (Fix A applied; Fix B stopped)

Date: 2026-05-28
Severity: High (visitor-visible content rendered blank on 11 pages)
Status: Fix A complete and verified; Fix B stopped per spec STOP conditions

---

## Diagnosis confirmation (Step 0)

All 11 affected pages match the failure signature exactly. Reference page (rodent) has the expected markup that lets the script complete.

| File | anim-ready class refs | `.anim-ready{opacity:0` | `.anim-visible{opacity:1` | unguarded `getElementById('hamburger-btn').addEventListener` | `id="hamburger-btn"` | `id="mobile-nav"` |
|---|---|---|---|---|---|---|
| `bird-removal-las-vegas/index.html` | 21 | 1 | 1 | 1 | **0** | **0** |
| `bee-removal-las-vegas/index.html` | 16 | 1 | 1 | 1 | **0** | **0** |
| `bed-bug-exterminator-las-vegas/index.html` | 9 | 1 | 1 | 1 | **0** | **0** |
| `hornet-exterminator-las-vegas/index.html` | 19 | 1 | 1 | 1 | **0** | **0** |
| `wasp-exterminator-las-vegas/index.html` | 16 | 1 | 1 | 1 | **0** | **0** |
| `miller-moth-exterminator-las-vegas/index.html` | 23 | 1 | 1 | 1 | **0** | **0** |
| `earwig-exterminator-las-vegas/index.html` | 21 | 1 | 1 | 1 | **0** | **0** |
| `crane-fly-exterminator-las-vegas/index.html` | 18 | 1 | 1 | 1 | **0** | **0** |
| `false-chinch-bug-exterminator-las-vegas/index.html` | 12 | 1 | 1 | 1 | **0** | **0** |
| `pest-control-north-las-vegas/index.html` | 2 | 1 | 1 | 1 | **0** | **0** |
| `pest-control-boulder-city-nv/index.html` | 2 | 1 | 1 | 1 | **0** | **0** |
| `rodent-exterminator-las-vegas/index.html` (reference) | 17 | 1 | 1 | 1 (latent risk; spec asks not to edit) | **1** | **1** |

All 11 fit the spec's failure signature; the reference is the only sampled page with the required markup.

---

## Fix A applied (mobile-nav handler null-guards)

For each of the 11 pages, the inline `<script>` was edited so that no mobile-nav DOM lookup can halt the script when the element is missing.

Four changes per file:

1. `openMobileNav()` body — added `if (!btn || !overlay) return;` immediately after the `var overlay` declaration
2. `closeMobileNav()` body — same
3. Hamburger click `addEventListener` — converted to
   ```js
   var _hb = document.getElementById('hamburger-btn');
   if (_hb) _hb.addEventListener('click', function() { … });
   ```
4. Mobile-nav click `addEventListener` — converted to
   ```js
   var _mn = document.getElementById('mobile-nav');
   if (_mn) _mn.addEventListener('click', function(e) { … });
   ```

Script-format variants handled:
- 10 of 11 use the multi-line script format (one statement per line)
- 1 of 11 uses the compact single-line format (`bed-bug-exterminator-las-vegas/index.html`)

Line endings handled:
- Bug pages are CRLF-dominant; 2 city hubs are LF; the script applied a CRLF-tolerant regex.

### Sample diff (representative — `bird-removal-las-vegas/index.html`)

```
@@ -1136,6 +1136,7 @@ function openMobileNav() {
   var btn = document.getElementById('hamburger-btn');
   var overlay = document.getElementById('mobile-nav');
+  if (!btn || !overlay) return;
   btn.classList.add('open');
@@ -1145,16 +1149,19 @@ function closeMobileNav() {
   var btn = document.getElementById('hamburger-btn');
   var overlay = document.getElementById('mobile-nav');
+  if (!btn || !overlay) return;
   btn.classList.remove('open');
   …
-document.getElementById('hamburger-btn').addEventListener('click', function() {
+var _hb = document.getElementById('hamburger-btn');
+if (_hb) _hb.addEventListener('click', function() {
   this.classList.contains('open') ? closeMobileNav() : openMobileNav();
 });
-document.getElementById('mobile-nav').addEventListener('click', function(e) {
+var _mn = document.getElementById('mobile-nav');
+if (_mn) _mn.addEventListener('click', function(e) {
   if (e.target === this) closeMobileNav();
 });
```

---

## Verification results (post-Fix A)

| File | jsonLd | meta | link | scriptSrc | anim-ready refs | unguarded hb | unguarded mn |
|---|---|---|---|---|---|---|---|
| bird-removal-las-vegas | 1→1 | 16→16 | 10→10 | 1→1 | 21→21 | 0 | 0 |
| bee-removal-las-vegas | 1→1 | 16→16 | 10→10 | 1→1 | 16→16 | 0 | 0 |
| bed-bug-exterminator-las-vegas | 1→1 | 16→16 | 10→10 | 1→1 | 9→9 | 0 | 0 |
| hornet-exterminator-las-vegas | 1→1 | 16→16 | 10→10 | 1→1 | 19→19 | 0 | 0 |
| wasp-exterminator-las-vegas | 1→1 | 16→16 | 10→10 | 1→1 | 16→16 | 0 | 0 |
| miller-moth-exterminator-las-vegas | 1→1 | 16→16 | 10→10 | 1→1 | 23→23 | 0 | 0 |
| earwig-exterminator-las-vegas | 1→1 | 16→16 | 10→10 | 1→1 | 21→21 | 0 | 0 |
| crane-fly-exterminator-las-vegas | 1→1 | 16→16 | 10→10 | 1→1 | 18→18 | 0 | 0 |
| false-chinch-bug-exterminator-las-vegas | 1→1 | 16→16 | 10→10 | 1→1 | 12→12 | 0 | 0 |
| pest-control-north-las-vegas | 1→1 | 16→16 | 10→10 | 1→1 | 2→2 | 0 | 0 |
| pest-control-boulder-city-nv | 1→1 | 16→16 | 10→10 | 1→1 | 2→2 | 0 | 0 |

- All 11 files: JSON-LD / meta / link / external script-src counts unchanged ✓
- All 11 files: anim-ready class reference count unchanged ✓
- All 11 files: zero remaining unguarded `getElementById('hamburger-btn').addEventListener` ✓
- All 11 files: zero remaining unguarded `getElementById('mobile-nav').addEventListener` ✓

Per spec: "This change alone must restore all hidden content." Fix A is the critical content-restoring change.

### Browser test
No local server or staging preview reachable from this environment. The static checks above (regex verification + integrity audit) are the substitute. Recommend manual confirmation that the three sections on `bird-removal-las-vegas` (WHY THIS MATTERS / DETERRENT & EXCLUSION / WHERE PIGEONS ROOST) now render after deploy.

---

## Fix B: STOPPED per spec STOP conditions

The 11 pages do not just *differ structurally* from the reference; they lack the structural elements the spec's Fix B markup expects to sit inside. Surfacing rather than forcing:

### Structural state of the 11 (pre-fix HEAD)
| File | `<body>` open tag | `<header class="header">` | `<main>` open tag |
|---|---|---|---|
| `bird-removal-las-vegas/index.html` | **MISSING** | MISSING | MISSING |
| `bee-removal-las-vegas/index.html` | **MISSING** | MISSING | MISSING |
| `bed-bug-exterminator-las-vegas/index.html` | present | MISSING | MISSING |
| `hornet-exterminator-las-vegas/index.html` | present | MISSING | MISSING |
| `wasp-exterminator-las-vegas/index.html` | present | MISSING | MISSING |
| `miller-moth-exterminator-las-vegas/index.html` | present | MISSING | MISSING |
| `earwig-exterminator-las-vegas/index.html` | present | MISSING | MISSING |
| `crane-fly-exterminator-las-vegas/index.html` | present | MISSING | MISSING |
| `false-chinch-bug-exterminator-las-vegas/index.html` | present | MISSING | MISSING |
| `pest-control-north-las-vegas/index.html` | present | MISSING | MISSING |
| `pest-control-boulder-city-nv/index.html` | present | MISSING | MISSING |

All 11 lack `<header>` entirely. All 11 lack an opening `<main>` tag. 2 of 11 also lack an opening `<body>` tag. The CSS for `.header`, `.header-inner`, `.top-bar`, `.skip-link`, `.nav`, `.nav-cta`, `.hamburger`, and `.mobile-nav-*` is all present and dormant.

### Spec STOP conditions triggered

1. **"a page's header can't take the reference markup safely"** — there is no header on any of the 11. Verbatim insertion of rodent's `<header>…</header>` block alone would change `<a>` counts and add nav-link text; inserting it inside a properly-formed `<header>` requires creating that wrapper first.
2. **"any integrity-check count would change as a side effect of the edit"** — Fix B is defined as adding the `<button id="hamburger-btn">`, the hamburger lines, the desktop `<nav>` (logo + 6 nav links + Free Estimate CTA), the `<div id="mobile-nav">` overlay (5 nav links + CTA + phone), and aria-labels. This necessarily adds text to body sections; the integrity check item 4 ("total word/content count of body sections… UNCHANGED") cannot be satisfied.
3. **"the fix would require new CSS, new nav items, or any invented content"** — top-bar text in the reference is "24/7 Rodent Emergency — Las Vegas & Clark County, NV", which is pest-specific. The 11 pages do not contain that exact phrase, nor a generic substitute, in their existing body content. Reusing "24/7 Pest Emergency" (which is present on cockroach and termite pages) would be cross-page borrowing rather than "already present elsewhere on the same page."

### What Fix B would deliver if relaxed
The site nav links (Residential / Commercial / Emergency / About / Contact / Free Estimate), the phone `(702) 228-4394`, and the logo image (`/images/logos/pest-control-inc-logo-transparent-background.png`) all exist elsewhere on every one of the 11 pages (footer, trust bar, or form), so the *content* in the inserted markup is not invented in the editorial sense — only the *integrity-count* invariant breaks.

### Recommendation
Treat Fix B as a separate task with relaxed integrity rules: explicitly authorize adding nav/header content on pages that have none, choose the top-bar text policy (generic "24/7 Pest Emergency" vs page-specific "Bird & Pigeon Emergency" etc.), and run it as its own commit. The 11 pages overlap with — but are not the same as — the 26 Phase 10.5 pages already on the log's "Header markup repair" TODO list; combining the two passes into one header-restoration sweep would be efficient.

---

## Follow-up: missing `<h1>` on every one of the 11

The spec asked for a report of which of the 11 lack an `<h1>`, noting bird-removal as one example. Confirmed: **all 11 pages have zero `<h1>` elements** (`grep -c '<h1\b'` returns 0 on each). Recommended as a content-task follow-up, not part of this fix.

| File | `<h1>` count |
|---|---|
| bird-removal-las-vegas | 0 |
| bee-removal-las-vegas | 0 |
| bed-bug-exterminator-las-vegas | 0 |
| hornet-exterminator-las-vegas | 0 |
| wasp-exterminator-las-vegas | 0 |
| miller-moth-exterminator-las-vegas | 0 |
| earwig-exterminator-las-vegas | 0 |
| crane-fly-exterminator-las-vegas | 0 |
| false-chinch-bug-exterminator-las-vegas | 0 |
| pest-control-north-las-vegas | 0 |
| pest-control-boulder-city-nv | 0 |

---

## Latent risk noted (not fixed per spec)

The 19 *working* anim-ready pages (rodent, scorpion, cockroach, etc.) also use the same unguarded `getElementById('hamburger-btn').addEventListener` pattern. They render correctly today only because they happen to have the markup. If any of them ever loses the `id="hamburger-btn"` or `id="mobile-nav"` element, they will hit the same content-halt bug. Per spec: "If you observe they also use unguarded handlers (latent risk, currently harmless because they have the element), note it as a recommended follow-up — do not edit them here." Logged.
