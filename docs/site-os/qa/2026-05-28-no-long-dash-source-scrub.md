# QA: No Long Dash Rule + Build Source Scrub

Date: 2026-05-28
Severity: Medium (standards / build-source hygiene)
Status: Complete, 20 files changed, committed; awaiting push approval
Scope: codify the no-long-dash rule in standards docs, scrub em/en dashes from build prompts and reference docs. No HTML page edits.

---

## Phase A re-entry

- `git status`: clean, in sync with `origin/main`.
- Implementation log tail: most recent entry is the **h1 quick win for 4 service pages** (commit `10254ae`). Remaining batches listed: Batch B (5 city hubs), Batch C (26 Phase 10.5 neighborhoods), form-card-title consistency pass.
- Most recent QA file: `2026-05-28-h1-quickwin-4-pages.md`.

---

## Step 0: files with em or en dashes under docs/site-os/prompts/** and docs/site-os/reference/**

18 files flagged. Per-file em / en dash counts before this pass:

| File | em | en |
|---|---|---|
| `docs/site-os/prompts/build/batch-2-core-brand-pages-prompt.md` | 13 | 0 |
| `docs/site-os/prompts/build/batch-3-service-pages-prompt.md` | 60 | 1 |
| `docs/site-os/prompts/build/batch-4-city-location-pages-prompt.md` | 3 | 0 |
| `docs/site-os/prompts/build/batch-5-neighborhood-pages-prompt.md` | 1 | 0 |
| `docs/site-os/prompts/build/batch-6-service-city-matrix-prompt.md` | 3 | 0 |
| `docs/site-os/prompts/content/content-strengthening-prompt.md` | 1 | 0 |
| `docs/site-os/prompts/content/seo-aeo-content-generation-prompt.md` | 1 | 0 |
| `docs/site-os/prompts/qa/page-qa-prompt.md` | 1 | 0 |
| `docs/site-os/prompts/qa/pre-commit-qa-prompt.md` | 1 | 0 |
| `docs/site-os/prompts/qa/seo-aeo-qa-prompt.md` | 1 | 0 |
| `docs/site-os/prompts/seo-aeo/aeo-gap-analysis-prompt.md` | 1 | 0 |
| `docs/site-os/prompts/seo-aeo/serp-analysis-prompt.md` | 1 | 0 |
| `docs/site-os/prompts/updates/content-gap-fix-prompt.md` | 1 | 0 |
| `docs/site-os/prompts/updates/content-update-prompt.md` | 1 | 0 |
| `docs/site-os/reference/client-build-prompt-index.md` | 1 | 0 |
| `docs/site-os/reference/pci-page-pattern-reference.md` | 83 | 6 |
| `docs/site-os/reference/seo-aeo-content-standards.md` | 1 | 0 |
| `docs/site-os/reference/service-business-design-standards.md` | 1 | 0 |
| **Total** | **174** | **7** |

Note: the script's first pass counted 85 em / 12 en on `pci-page-pattern-reference.md` after partial entity normalization; the original on-disk count differs slightly because some entities were already counted under both literal and entity patterns. The final scrub achieved zero either way.

---

## Task 1: hard rule added to `docs/site-os/inputs/pci-brand-style-reference.md`

New top-level section inserted between **ENTITY PHRASES** and **PAGES BUILT** (line 770):

> `## PUNCTUATION: NO LONG DASHES (HARD RULE)`

Contains:
- A single declarative sentence: customer-facing content must never contain em or en dashes.
- A "Forbidden characters" table listing the marks with their literal and HTML-entity forms (labeled as negative examples).
- Five customer-facing contexts the rule applies to: visible text, `alt` / `aria-label` / `title` / `meta description` / `twitter:description` / `og:description` attributes, and JSON-LD `@graph` string values.
- Replacement guidance: comma, colon, period, or parentheses for breaks; the word `to` for ranges; no hyphen substitution unless a real compound modifier.
- Dev-comment exemption with grep-consistency recommendation.
- A runnable grep that pairs with the gate.

---

## Task 2: enforceable gate added to `docs/site-os/pass-fail-page-quality-gates.md`

New section inserted between **Copy Cleanup Gate** and **Schema Quality Gate** (line 93):

> `## Long-Dash FAIL Condition (em + en)`

Contains:
- Explicit FAIL condition spanning visible text, attributes, and JSON-LD.
- Forbidden marks list (literal + HTML entities; labeled negative examples).
- Comment exemption (`<!-- ... -->`).
- Runnable site-wide grep:
  ```
  grep -rnE '—|&mdash;|&#8212;|&#x2014;|–|&ndash;|&#8211;|&#x2013;' --include="*.html" . | grep -v '<!--'
  ```
- Single-file grep for development use.
- Cross-reference to the brand-style-reference rule for replacement guidance.

The existing "Copy Cleanup Gate" was left untouched (its checklist already lists em dashes as forbidden; the new section adds the enforceable detail without disturbing the older language).

---

## Task 3: scrub of 18 prompt/reference files

Substitution rules applied (a Node script):

- Em dash with surrounding spaces in a heading or table-cell line → `: `
- Em dash with surrounding spaces in prose → `, `
- Bare em dash → `: ` (heading/table) or `, ` (prose)
- En dash between two range-looking tokens (digits, words, times, dates) → ` to `
- En dash elsewhere → `-`
- HTML entities (`&mdash;`, `&#8212;`, `&#x2014;`, `&ndash;`, `&#8211;`, `&#x2013;`) normalized to literal first, then handled by the same rules.

Per-file before / after counts:

| File | em before | em after | en before | en after |
|---|---|---|---|---|
| batch-2-core-brand-pages-prompt.md | 13 | 0 | 0 | 0 |
| batch-3-service-pages-prompt.md | 63 | 0 | 1 | 0 |
| batch-4-city-location-pages-prompt.md | 3 | 0 | 0 | 0 |
| batch-5-neighborhood-pages-prompt.md | 1 | 0 | 0 | 0 |
| batch-6-service-city-matrix-prompt.md | 3 | 0 | 0 | 0 |
| content-strengthening-prompt.md | 1 | 0 | 0 | 0 |
| seo-aeo-content-generation-prompt.md | 1 | 0 | 0 | 0 |
| page-qa-prompt.md | 1 | 0 | 0 | 0 |
| pre-commit-qa-prompt.md | 1 | 0 | 0 | 0 |
| seo-aeo-qa-prompt.md | 1 | 0 | 0 | 0 |
| aeo-gap-analysis-prompt.md | 1 | 0 | 0 | 0 |
| serp-analysis-prompt.md | 1 | 0 | 0 | 0 |
| content-gap-fix-prompt.md | 1 | 0 | 0 | 0 |
| content-update-prompt.md | 1 | 0 | 0 | 0 |
| client-build-prompt-index.md | 1 | 0 | 0 | 0 |
| pci-page-pattern-reference.md | 85 | 0 | 12 | 0 |
| seo-aeo-content-standards.md | 1 | 0 | 0 | 0 |
| service-business-design-standards.md | 1 | 0 | 0 | 0 |
| **Total** | **179** | **0** | **13** | **0** |

(Counts are taken after one pass of entity normalization, which is why the totals match the script output rather than the Step 0 raw greps. The on-disk verification grep is the binding number: zero dashes remain.)

### Retained negative examples (explicitly labeled, intentional)

None inside the scrub scope. Every dash listed in the new sections of `pci-brand-style-reference.md` and `pass-fail-page-quality-gates.md` is a labeled negative example (the forbidden-character tables) inside files that were not in the scrub scope. These are intentional and necessary to define the rule; without them the rule would not be enforceable.

---

## Verification

```
find docs/site-os/prompts docs/site-os/reference -type f \( -name "*.md" -o -name "*.txt" \) \
  | xargs grep -lnE '—|&mdash;|&#8212;|&#x2014;|–|&ndash;|&#8211;|&#x2013;'
```
Zero output. Pass.

Manual spot-check across the heavy files (batch-2 / batch-3 / pci-page-pattern-reference): titles read naturally (`Batch 2: Core Brand & Conversion Pages`), table cells read naturally (`Conversion: Level 4`), prose breaks read naturally (`Do not claim PCI has an office in every city, they operate from Las Vegas`). No instruction or example changed in meaning, only in punctuation.

---

## Out of scope (recorded for follow-up)

- The **content sweep on the 76 customer-facing HTML pages** is the next step. The scan that originally flagged this work counted ~3,400 em dashes and ~479 en dashes site-wide. Now that the source documents no longer teach future builds to emit dashes, the content sweep on the built HTML will hold. The runnable grep in the new gate is the verification mechanism for that sweep.
- The brand-style-reference and pass-fail-page-quality-gates documents themselves still contain dashes outside the new sections. They were out of scope for this scrub; they are not build sources that teach future generations to emit dashes. Optional cleanup later.
