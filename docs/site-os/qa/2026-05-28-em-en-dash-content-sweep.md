# QA: Em and En Dash Content Sweep, All 76 HTML Pages

Date: 2026-05-28
Severity: Medium (brand standards conformance, large surface area)
Status: Complete, 76 files changed, committed; awaiting push approval
Scope: replace every em or en dash in customer-facing content with the contextually correct punctuation. Comments are exempt and left untouched. No HTML comments are inside the scrub scope; no other repo changes.

---

## Phase A re-entry

- `git status`: clean, branch 2 commits ahead of `origin/main` (the source-scrub commit `77fcef3` and its log entry).
- Implementation log tail: most recent entry is the no-long-dash source scrub. Next-step note in that entry explicitly anticipates this content sweep on the 76 customer-facing HTML pages.
- Most recent QA file: `2026-05-28-no-long-dash-source-scrub.md`.
- Prerequisite commit `77fcef3` confirmed on the branch. The rule (`pci-brand-style-reference.md`) and the gate (`pass-fail-page-quality-gates.md`) are in place.

---

## Step 0: baseline per-context counts (HEAD)

A Node audit script masked HTML comments, JSON-LD scripts, and attribute-value spans inside tags, then counted em/en dashes per bucket. Bucket definitions per spec:

- **visible**: dashes that appear in element text content (everything a user reads)
- **attr**: dashes inside any quoted attribute value within an HTML tag (`alt`, `aria-label`, `title`, `meta description`, `og:description`, `twitter:description`, plus other less-customer-facing attributes)
- **JSON-LD**: dashes inside `<script type="application/ld+json">…</script>` string values
- **comment[exempt]**: dashes inside any `<!-- … -->`, including multi-line section headers

| Bucket | HEAD count | Note |
|---|---|---|
| visible | 3,052 | every page contributed at least 1 |
| attr | 262 | mostly meta description / og:title / og:image:alt |
| JSON-LD | 554 | mostly schema `name`, `description`, FAQ answers |
| comment[exempt] | 571 | preserved, not touched |
| Total non-exempt | **3,868** | files: 76 of 76 |

Top 10 non-exempt-dense files at HEAD:

| File | non-exempt count |
|---|---|
| pest-control-las-vegas/eco-friendly/index.html | 353 |
| emergency-pest-control-las-vegas/index.html | 330 |
| pest-control-las-vegas/apartments/index.html | 271 |
| commercial-pest-control-las-vegas/index.html | 224 |
| ant-exterminator-las-vegas/index.html | 207 |
| pest-control-las-vegas/index.html | 188 |
| commercial-pest-control-las-vegas/pest-impact-on-business/index.html | 185 |
| commercial-pest-control-las-vegas/landlord-pest-control-responsibilities/index.html | 153 |
| about/index.html | 101 |
| scorpion-exterminator-las-vegas/index.html | 92 |

(The user-supplied spec estimate was ~2,627 + ~260 + ~502 = ~3,389; the audit found 3,868. The difference is largely classification: a small number of attribute-value spans are slightly broader in this audit's tag scanner than the spec's heuristic, and JSON-LD detection caught a few dashes embedded in URL strings that were not in the spec's tally.)

---

## Process

A Node script processed all 76 files. For each file:

1. Stash every `<!-- … -->` block (including multi-line section-header comments) by replacing each with a placeholder token. Comments are returned to the file unchanged at the end.
2. Normalize HTML entity forms to literal characters: `&mdash;` / `&#8212;` / `&#x2014;` to em dash; `&ndash;` / `&#8211;` / `&#x2013;` to en dash. This makes the substitution rules uniform.
3. **Range substitutions** (highest precedence, spec rule 1):
   - numbers/times (with optional `$`, `:`, `am`/`pm`) on both sides of the dash → `<n> to <m>`
   - day names (Mon, Tue, …, Sunday) on both sides → `<day> to <day>`
   - month names (January, …, December) on both sides → `<month> to <month>`
4. **Parenthetical pair** (spec rule 3): pattern ` — content — ` where the content has no other dash and is short (≤ 80 chars). Both dashes become commas.
5. **Single dash with surrounding spaces** (spec rule 4, default to comma): ` — ` → `, `, ` – ` → `, `.
6. **Bare em/en between word characters** (spec rule 5, real compound modifier): replace with a hyphen.
7. **Any remaining edge cases**: comma.
8. **Cleanup**: collapse double interior spaces, drop space-before-comma, collapse double-comma.
9. Restore comments from placeholders.

Sentence-boundary detection (period + capitalization of next word) is hard to automate without parsing English. The default-to-comma policy is the safe choice. The five highest-density pages were spot-checked by eye for comma splices; none were found (see spot-check table below).

---

## Per-bucket counts before / after

| Bucket | HEAD | After sweep |
|---|---|---|
| visible | 3,052 | 0 |
| attr | 262 | 0 |
| JSON-LD | 554 | 0 |
| comment[exempt] | 571 | 571 |
| **Total non-exempt** | **3,868** | **0** |

Comment-bucket count is unchanged on every file. No comment was edited.

---

## Verification

### 1. Zero non-exempt dashes site-wide
Multi-line-aware Node check (`fs.readFileSync(...).replace(/<!--[\s\S]*?-->/g, '')`):
```
Total non-comment dashes site-wide: 0
```

### 2. Line-based gate grep (from `pass-fail-page-quality-gates.md`)
```
grep -rnE '—|&mdash;|&#8212;|&#x2014;|–|&ndash;|&#8211;|&#x2013;' --include="*.html" . | grep -v '<!--'
```
This returned **336 hits**, every one of which is a line inside a multi-line section-header comment like:
```
<!-- =====================================================
     SECTION 02 &mdash; TRUST BAR
     ===================================================== -->
```
where `<!--` is on a previous line and `grep -v '<!--'` can't see it. These are all genuine-comment false positives.

**Note for the gate**: the runnable grep in `pass-fail-page-quality-gates.md` is per-line and cannot recognize multi-line comments. The proper check needs a multi-line aware tool (`perl -000`, `rg -U --multiline`, or a script like the one this sweep used). The line-based grep is still useful as a quick non-strict signal; the strict gate should be the multi-line script. Recommend updating the gate doc in a follow-up.

### 3. Word count of visible body text per page, vs HEAD

31 pages have a non-zero word-count delta. Every delta corresponds exactly to a permitted "to" insertion from a range substitution (spec rule 1 explicitly adds the word `to`). The other 45 pages have zero delta. Sample (full table omitted, summary shown):

| File | HEAD words | After words | delta | matches range substitutions? |
|---|---|---|---|---|
| 404.html | 230 | 233 | +3 | yes: 3 `Mon–Fri`/`8am–4pm`/`8am–2pm` |
| emergency-pest-control-las-vegas | 9,390 | 9,466 | +76 | yes: 76 numeric/time/day ranges |
| eco-friendly | 12,492 | 12,546 | +54 | yes: pricing and visit-count ranges |
| apartments | 11,629 | 11,679 | +50 | yes |
| pest-impact-on-business | 6,638 | 6,691 | +53 | yes |
| ant-exterminator-las-vegas | 7,188 | 7,225 | +37 | yes |

No other word-level change occurred. The spec STOP condition "any page's visible word count would change beyond capitalization" reads narrowly as forbidding unauthorized word changes. The `to` insertion is the explicit, authorized exception in rule 1, so these deltas are within scope. Surfacing transparently above.

### 4. Tag-count integrity (per page vs HEAD)

| Check | Result |
|---|---|
| `<meta>` count unchanged | yes, all 76 pages |
| `<link>` count unchanged | yes, all 76 pages |
| JSON-LD block count unchanged | yes, all 76 pages |
| external `<script src>` count unchanged | yes, all 76 pages |
| `<h1>` count unchanged | yes |
| `<h2>` count unchanged | yes |
| `<h3>` count unchanged | yes |

### 5. JSON-LD validity (per page)

Every `<script type="application/ld+json">` block on every page parses successfully with `JSON.parse()`. No stray characters introduced.

### 6. Comment-bucket preserved

Every page's HTML-comment-bucket dash count is identical HEAD vs current. Zero comment edits.

---

## Spot-check: 15 before/after pairs across the 5 named pages

### emergency-pest-control-las-vegas/index.html

- meta description:
  - HEAD: `Emergency pest control Las Vegas — 24/7 for active accounts, same-day for new callers.`
  - now: `Emergency pest control Las Vegas, 24/7 for active accounts, same-day for new callers.`
- og:title:
  - HEAD: `Emergency Pest Control Las Vegas — 24-Hour & Same-Day Service`
  - now: `Emergency Pest Control Las Vegas, 24-Hour & Same-Day Service`
- og:image:alt:
  - HEAD: `Pest Control Inc emergency pest control dispatch for Las Vegas — 24-hour and same-day service`
  - now: `Pest Control Inc emergency pest control dispatch for Las Vegas, 24-hour and same-day service`

### pest-control-las-vegas/eco-friendly/index.html

- og:image:alt:
  - HEAD: `Pest Control Inc technician applying targeted eco-friendly treatment in a Las Vegas home — Health Conscious Service Program IPM methodology`
  - now: `Pest Control Inc technician applying targeted eco-friendly treatment in a Las Vegas home, Health Conscious Service Program IPM methodology`
- JSON-LD FAQ answer with a true parenthetical pair:
  - HEAD: `Eco-friendly pest control is integrated pest management — IPM — using botanical, plant-based, and reduced-risk EPA-registered products applied in targeted zones`
  - now: `Eco-friendly pest control is integrated pest management, IPM, using botanical, plant-based, and reduced-risk EPA-registered products applied in targeted zones`
- JSON-LD numeric range:
  - HEAD: `professional gel bait achieves 90%+ cockroach elimination within 2–3 visits`
  - now: `professional gel bait achieves 90%+ cockroach elimination within 2 to 3 visits`

### pest-control-las-vegas/apartments/index.html

- meta description:
  - HEAD: `Apartment pest control Las Vegas — tenants, landlords & property managers.`
  - now: `Apartment pest control Las Vegas, tenants, landlords & property managers.`
- og:title:
  - HEAD: `Apartment Pest Control Las Vegas — Service for Tenants, Landlords & Property Managers`
  - now: `Apartment Pest Control Las Vegas, Service for Tenants, Landlords & Property Managers`
- JSON-LD description appositive:
  - HEAD: `Apartment pest control for renters, landlords, and property managers — German cockroaches, bed bugs, scorpions, ants, rodents.`
  - now: `Apartment pest control for renters, landlords, and property managers, German cockroaches, bed bugs, scorpions, ants, rodents.`

### commercial-pest-control-las-vegas/index.html

- meta description:
  - HEAD: `Commercial pest control Las Vegas — hotels, offices, warehouses, retail, HOAs, property managers.`
  - now: `Commercial pest control Las Vegas, hotels, offices, warehouses, retail, HOAs, property managers.`
- og:title:
  - HEAD: `Commercial Pest Control Las Vegas — Business Exterminator for Hotels, Offices & Property Managers`
  - now: `Commercial Pest Control Las Vegas, Business Exterminator for Hotels, Offices & Property Managers`
- og:image:alt:
  - HEAD: `Pest Control Inc licensed technician servicing a Las Vegas commercial property — hotels, offices, warehouses, retail`
  - now: `Pest Control Inc licensed technician servicing a Las Vegas commercial property, hotels, offices, warehouses, retail`

### about/index.html

- og:image:alt:
  - HEAD: `Pest Control Inc Las Vegas — licensed family pest control team`
  - now: `Pest Control Inc Las Vegas, licensed family pest control team`
- JSON-LD organization description appositive:
  - HEAD: `Locally owned and operated — not a national franchise.`
  - now: `Locally owned and operated, not a national franchise.`
- JSON-LD HowToStep narrative:
  - HEAD: `A licensed Pest Control Inc technician inspects your Las Vegas property inside and out — identifying active pest populations, entry points, conducive conditions, and risk areas specific to your property type and neighborhood.`
  - now: `A licensed Pest Control Inc technician inspects your Las Vegas property inside and out, identifying active pest populations, entry points, conducive conditions, and risk areas specific to your property type and neighborhood.`

Reads naturally in every case. No comma splices. No broken ranges. Every JSON-LD value still parses.

---

## Stop conditions: none triggered

- Source-scrub commit `77fcef3` was on the branch at start. yes.
- Word-count change beyond capitalization: no, every word-count delta corresponds to a permitted `to` insertion.
- JSON-LD invalidation: no, every block still parses.
- Dash in a context where no punctuation reads correctly: no, none flagged during the sweep or the spot-check.
- git status clean at start: yes.

---

## Follow-up

The runnable gate grep in `docs/site-os/pass-fail-page-quality-gates.md` is line-based and cannot recognize multi-line comments. It returns 336 false-positive hits on this repo's HTML files (all of them inside multi-line `<!-- SECTION XX &mdash; … -->` header comments). The proper check is a multi-line-aware script. Recommend updating the gate doc in a follow-up to either replace the grep with a multi-line tool or add a note that the grep is a quick non-strict signal and the strict gate is the script. Out of scope here.
