# QA: Temporary Blog Neutralization

Date: 2026-05-28
Severity: Medium (internal-link integrity, crawl quality)
Status: Complete; one commit prepared; awaiting push approval
Scope: hide every customer-facing `/blog/` link until the deferred blog ships, preserving markup verbatim for later restoration.

---

## Phase A re-entry

- `git status`: clean (the two pre-existing untracked `images/about/` and `images/ipm-diagrams/` dirs are unrelated work).
- Implementation log tail: most recent entry is the long-dash gate fix + comma-splice remediation (commit `f62d427`, pushed). That entry names "Batch B (5 city hubs)" as the next batch — this task interleaves ahead of it because dead `/blog/` links currently hit the custom 404 from the homepage's most prominent below-the-fold section, which hurts crawl quality and trust today.
- Latest QA: `qa/2026-05-28-gate-fix-and-splice-remediation.md`.

---

## Step 0 — read-only baseline

| Check | Result |
|---|---|
| `/blog/` directory in repo | absent |
| `/blog/why-scorpions-worse-after-rain/` | absent |
| `/blog/common-las-vegas-pests-summer/` | absent |
| `/blog/how-to-keep-pests-out-of-home-las-vegas/` | absent |
| Homepage `<section class="blog-section">` boundaries (HEAD) | lines 901–940; section-header `<!-- ══ SECTION 11: BLOG ══ -->` on line 900; next sibling `<section class="emergency-banner">` on line 943 |
| `<!--` or `-->` sequences inside lines 901–940 | 0 (no nested-comment risk) |
| `--` sequences inside lines 901–940 (HTML-comment-illegal) | 0 |
| JSON-LD blocks inside the section | 0 (only schema.org *microdata* via `itemtype` on the 3 Article cards; the page's single `<script type="application/ld+json">` block lives at line 387, well above the blog section) |
| Pages with footer `<li><a href="/blog/">Pest Control Blog</a></li>` link | **20** (not the ~76 the spec expected) |
| Total HTML pages site-wide | 76 — the remaining 56 already lack the footer link, so no edit needed |
| Footer link markup pattern across the 20 pages | **identical**: 10-space indent + `<li><a href="/blog/">Pest Control Blog</a></li>` between `<li><a href="/reviews/">Customer Reviews</a></li>` and `<li><a href="/contact/">Contact Us</a></li>` |

The 20 pages with a footer `/blog/` link:

```
index.html
about/index.html
about/guarantee/index.html
about/health-conscious-service-program/index.html
about/mission/index.html
ant-exterminator-las-vegas/index.html
commercial-pest-control-las-vegas/index.html
commercial-pest-control-las-vegas/hoa/index.html
commercial-pest-control-las-vegas/hotels/index.html
commercial-pest-control-las-vegas/landlord-pest-control-responsibilities/index.html
commercial-pest-control-las-vegas/offices/index.html
commercial-pest-control-las-vegas/pest-impact-on-business/index.html
commercial-pest-control-las-vegas/property-managers/index.html
commercial-pest-control-las-vegas/retail/index.html
emergency-pest-control-las-vegas/index.html
pest-control-las-vegas/index.html
pest-control-las-vegas/apartments/index.html
pest-control-las-vegas/eco-friendly/index.html
pest-control-las-vegas/plans-and-pricing/index.html
service-areas/index.html
```

### Finding the spec did not list (surfaced and handled)

In addition to the two link sources the spec named, the verification gate ("zero non-commented `href="/blog"` site-wide") uncovered a third dead-link site: an in-content `<div class="seasonal-blog-links">` block on `pest-control-las-vegas/index.html` (lines 1060–1063 at HEAD) holding two `<a>` links to the same non-existent articles the homepage section links to. Structurally identical to the homepage case (a content block linking to deferred articles), so the same neutralization pattern was applied. Flagged here because the spec did not name it; the fix was in-scope under the spec's stated intent ("zero customer-facing links 404") and the explicit verification gate. No other source surfaced.

---

## Task 1 — Homepage blog section: commented out

`index.html` lines 901–940 (the entire `<section class="blog-section">…</section>`) wrapped in an HTML comment with a restore marker. Section-header comment on the line above and adjacent sections (faq above, emergency-banner below) are untouched.

Pattern applied:

```html
<!-- ══ SECTION 11: BLOG ══ -->
<!-- TODO(blog): section hidden until /blog/ + articles are built. Restore verbatim when live.
     Blocked on: 3 articles + /blog/ index + 3 featured images (1200×675).
     Original section preserved byte-for-byte inside the comment below. -->
<!--
<section class="blog-section" aria-labelledby="blog-h2">
  …40 lines preserved verbatim, including:
  - "Seasonal Guides & Pest Prevention Tips" h2
  - "All Articles → /blog/" btn-secondary
  - 3 <article class="blog-card"> entries with their headlines, excerpts,
    "Read Article" links, schema.org/Article microdata, and the 3
    "[ 1200×675 Featured Image ]" placeholders.
</section>
-->
```

Result: section no longer renders, the 3 `Article` microdata blocks no longer appear in the rendered DOM (correct — those articles do not exist), the 3 image placeholders are preserved inside the comment and will be replaced with real 1200×675 featured images when the blog ships.

## Task 2 — Footer link: neutralized on 20 pages

The single-line footer entry was replaced site-wide (20 pages) with a TODO marker + commented original on the same indent level. Pattern applied identically to every page:

```html
          <!-- TODO(blog): footer link hidden until /blog/ ships. Restore verbatim when live. -->
          <!-- <li><a href="/blog/">Pest Control Blog</a></li> -->
```

Surrounding footer `<li>` items (Customer Reviews above, Contact Us below) are untouched; footer column count, layout, and styling unchanged.

## Task 1.5 (spec-extension) — LV hub in-content block: neutralized

`pest-control-las-vegas/index.html` lines 1060–1063 (the `<div class="seasonal-blog-links">…</div>` block containing the two `<a href="/blog/...">` links) wrapped in an HTML comment with a TODO marker:

```html
    <!-- TODO(blog): seasonal-blog-links block hidden until /blog/ + articles ship. Restore verbatim when live. -->
    <!--
    <div class="seasonal-blog-links">
      <a href="/blog/why-scorpions-worse-after-rain/">Why scorpions are worse after rain in Las Vegas</a>
      <a href="/blog/common-las-vegas-pests-summer/">What pests are common in Las Vegas summer</a>
    </div>
    -->
```

---

## Verification

| Gate | Method | Result |
|---|---|---|
| 1. Site-wide live `href="/blog"` (outside comments) | strip every `<!-- … -->` block, count remaining hits | **0** |
| 2a. Homepage `class="blog-section"` in non-comment DOM | strip comments, scan for the class | **absent** (PASS) |
| 2b. faq-section and emergency-banner intact and adjacent | locate both substrings | both present |
| 3. Comment open/close balance on `index.html` | count `<!--` and `-->` | 24/24 (balanced) |
| 4. JSON-LD blocks parse | iterate every page, strip comments, `JSON.parse` each `<script type="application/ld+json">` body | **171/171 PASS** |
| 5. No customer-facing em/en dashes introduced | comment-aware gate detector from `pass-fail-page-quality-gates.md` | `TOTAL: 0`, exit 0 |

---

## Stop conditions

None triggered. The display-style fallback (style="display:none") was not needed: every neutralized region was free of nested `<!--`, `-->`, and `--` sequences, so plain HTML comment wrapping was safe. The footer markup was structurally identical across all 20 pages, so a single replacement pattern fit cleanly.

---

## Restore instructions (when the blog ships)

When the blog batch (3 articles + `/blog/` index + 3 featured images) is built and ready:

1. `index.html`: delete the lines containing `<!-- TODO(blog): section hidden …`, the bare `<!--` line below it, and the closing `-->` line after `</section>`. The original 40-line `<section class="blog-section">…</section>` block is preserved unmodified between them. **Before un-commenting, replace the 3 `[ 1200×675 Featured Image ]` placeholder `<div class="blog-img">` blocks** with real `<img>` tags pointing to the 3 featured images (1200×675, JPEG/WebP, alt text matching each article headline).
2. `pest-control-las-vegas/index.html` (footer): delete the two TODO/comment-wrapper lines around `<li><a href="/blog/">Pest Control Blog</a></li>`. Repeat across the same 20 pages listed in Step 0.
3. `pest-control-las-vegas/index.html` (seasonal-blog-links in-content block): delete the surrounding TODO comment, the bare `<!--`, and the closing `-->`. The original 4-line `<div class="seasonal-blog-links">` block is preserved unmodified between them.
4. Re-run the no-long-dash gate detector and a fresh site-wide `node -e "…/href=\"\\/blog/…"` count to confirm the new live links resolve to real pages (no longer 404).

A grep for `TODO(blog):` finds every restoration site in one sweep:

```
grep -rn "TODO(blog):" --include="*.html"
```

---

## Follow-up

- The blog build itself (3 articles + `/blog/` index + 3 featured images at 1200×675) is the next deferred batch. The 3 image placeholders travel with that batch — they are preserved inside the homepage comment and will need real assets at restore time.
- The standing next batch per the prior implementation log remains Batch B (5 city hubs header/main/hero reconstruction); this neutralization slid in ahead of it as a quick 404-elimination pass.
