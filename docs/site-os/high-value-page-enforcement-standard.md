# High-Value Page Enforcement Standard

A standalone universal standard imposing stricter execution requirements on high-value pages than on batch scaffold pages.

## Purpose

High-value pages require stricter execution than batch scaffold pages.

Batch scaffolding is appropriate for routine, repeatable, low-risk page work (legal placeholders, utility pages, project setup, shared components). It is not appropriate for the pages that carry the business's conversion, ranking, and trust load.

## High-Value Pages

High-value pages include:

- homepage
- free quote page
- contact page
- services hub
- locations hub
- about page
- FAQ hub
- core service pages
- core location pages
- service + location pages
- landing pages
- revenue-critical blog / pillar pages

If a page is in this list, the rules below apply by default. To bypass them, the operator must request and receive explicit approval, recorded in the implementation log.

## Mandatory Two-Step Workflow

For high-value pages, prefer the two-step workflow:

### Prompt A: Research and plan

- Research, analysis, content gap plan, section plan, FAQ plan
- No file changes
- Output is reviewed and approved before Prompt B begins

### Prompt B: Implementation, validation, schema sync, QA report

- Implement the approved plan from Prompt A
- Validate (lint, type-check, build)
- Update FAQ JSON-LD to match visible text exactly
- Return the post-build pass/fail gate

A single combined prompt may be used only if it contains mandatory pre-build checkpoints and the pass/fail gate from `docs/pass-fail-page-quality-gates.md`. A bare batch prompt without checkpoints is not acceptable for high-value pages.

## Mandatory Pre-Build Deliverables

Before implementation, output:

1. Page type classification
2. AI depth level
3. Correct prompt selected (from `docs/prompt-router-and-ai-depth-standard.md`)
4. Keyword type map (from `docs/keyword-research-and-aeo-depth-standard.md`)
5. Keyword target map (specifically which keywords go where on the page)
6. AEO FAQ map (full Q/A list, grouped by category for the FAQ hub)
7. Current content analysis (what already exists, where it falls short)
8. Content gap list (named gaps, prioritized)
9. Implementation plan (sections to add, change, or remove; file scope; validation sequence)
10. Required QA checklist (referenced from `docs/pass-fail-page-quality-gates.md`)

If any of items 1–10 are missing, stop and return:

```
INCOMPLETE: Required pre-build deliverables missing.
```

List the specific missing item(s).

## Mandatory Post-Build Proof

After implementation, prove all of the following before reporting success:

1. Required sections exist (against the implementation plan)
2. Required FAQ count is met (per page type minimums in the spec)
3. `FAQPage` JSON-LD matches visible FAQ text exactly
4. Metadata is unique and optimized (per-page `title`, `description`, `canonical`)
5. Internal links are present (3–8 per high-value page)
6. CTA text is visible in both source and built HTML
7. Customer-facing banned copy patterns removed (no em dashes, no double hyphens, no fake claims)
8. No fake claims added (reviews, ratings, licenses, insurance, awards, years in business, pricing guarantees, emergency or 24/7 claims)
9. `npm run lint` passed
10. `npm run type-check` passed
11. `npm run build` passed
12. Static output confirmed when applicable (Cloudflare Pages or equivalent static export)

If any proof item fails, return:

```
FAIL: Page quality gate not satisfied.
```

List the specific failures.

## Approval Required to Bypass

To use a broad batch prompt for a high-value page, the operator must:

1. Name the high-value page explicitly
2. Explain why the two-step workflow is not appropriate for this case
3. Receive explicit approval from the project owner (recorded in the implementation log)
4. Run the post-build pass/fail gate anyway

Without all four, the routing standard rejects the build.

## Implementation Log Requirement

Every high-value page build appends an entry to the client repo's `docs/site-os/implementation-log.md` documenting:

- Page type
- AI depth selected
- Prompt(s) used (Prompt A + Prompt B, or single approved combined prompt)
- Keyword map summary
- AEO FAQ count and category groups
- Content gaps identified and fixed
- Validation results
- Pass/fail gate result
- Remaining TODOs

## Related Files

- `docs/prompt-router-and-ai-depth-standard.md` — selects the prompt and depth this enforcement runs on
- `docs/keyword-research-and-aeo-depth-standard.md` — the research depth this enforcement requires
- `docs/pass-fail-page-quality-gates.md` — the gate this enforcement returns
- `docs/no-fake-data-policy.md` — applies to every claim made under this enforcement
- `docs/service-business-conversion-layout.md` — applies to conversion pages handled under this standard
- `docs/service-card-image-placeholder-standard.md` — applies to card surfaces handled under this standard
- `docs/fast-build-batch-workflow.md` — batch prompts retain their place for non-high-value work

---

Site OS Master — High-Value Page Enforcement Standard v1.0
Status: Adopted 2026-05-17
Reason for creation: prevent broad batch prompts from producing thin or incomplete high-value pages by requiring pre-build research deliverables and post-build proof gates.
