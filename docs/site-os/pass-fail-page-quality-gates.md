# Pass/Fail Page Quality Gates

A standalone universal pass/fail checklist for high-value page builds. Every high-value page build must end with this gate.

## Purpose

Every high-value page build must end with a pass/fail checklist. If any required item is unchecked, the build returns FAIL with the specific list of items to fix.

This gate prevents the failure mode where a page is "technically complete" but ships thin content, broken CTAs, missing FAQs, schema drift, fake claims, or banned copy patterns.

## When to Use

Run this gate at the end of every high-value page build, before commit. Specifically:

- After completing the homepage
- After completing the free quote page
- After completing the contact page
- After completing the services hub or locations hub
- After completing the about page
- After completing the FAQ hub
- After completing any core service, location, or service + location page
- After completing a revenue-critical landing page
- After completing any high-value content gap fix

Low-value utility pages (legal placeholders, thank-you confirmations) use a lighter checklist.

## Required PASS/FAIL Gate

Return PASS only if all are true:

- [ ] Correct page-type prompt was used (per `docs/prompt-router-and-ai-depth-standard.md`)
- [ ] Correct AI depth level was selected (Level 1–6)
- [ ] Keyword types were identified (per `docs/keyword-research-and-aeo-depth-standard.md`)
- [ ] Keyword map was created
- [ ] AEO FAQ research was completed
- [ ] Content analysis was completed
- [ ] Content gaps were identified
- [ ] Content gaps were fixed
- [ ] Required section structure exists
- [ ] Required FAQ count is met (per page type)
- [ ] FAQ schema matches visible FAQ text exactly
- [ ] Metadata is unique and optimized (per-page `title`, `description`, `canonical`)
- [ ] Internal links are present (3+ outbound on most high-value pages)
- [ ] CTA text is visible in both source and built HTML
- [ ] No customer-facing em dashes remain
- [ ] No customer-facing double hyphens remain
- [ ] No fake claims were added
- [ ] No fake review/rating/testimonial schema added
- [ ] No fake `LocalBusiness` street address on service-area-only businesses
- [ ] `npm run lint` passed
- [ ] `npm run type-check` passed
- [ ] `npm run build` passed
- [ ] Static export files were confirmed when applicable

If any item is unchecked, return FAIL and list exactly what must be fixed.

## Visual CTA Gate

For all conversion pages, verify:

- [ ] Button labels exist in source files
- [ ] Button labels exist in built HTML (`grep "<label-text>" out/<route>.html` returns matches)
- [ ] Text color contrasts with background (WCAG AA minimum, 4.5:1 for body text, 3:1 for large text)
- [ ] Hover states preserve readability
- [ ] Global anchor styles do not override CTA text color via cascade
- [ ] Mobile menu CTAs remain readable at 375px viewport

Cascade-defense note: prefer Tailwind built-in color utilities (`text-white`, `border-white`) over custom `@theme` color tokens (`text-brand-white`) in CTA classes. The built-in utilities are generated regardless of `@theme` configuration changes and resist cascade-layer regressions.

## Copy Cleanup Gate

Customer-facing content must not contain:

- [ ] Em dashes (`—`, U+2014)
- [ ] Double hyphens (`--`)
- [ ] Fake claims (reviews, ratings, testimonials, licenses, insurance, awards, certifications, years in business, before/after results, pricing guarantees, emergency claims, same-day claims, 24/7 claims)
- [ ] Placeholder claims shown as final
- [ ] Schema-only FAQs (Q/A in JSON-LD that isn't in visible text)
- [ ] Unsupported service or location claims (cities not in the verified service area, services not offered)
- [ ] Hidden text (`display: none`, `visibility: hidden`, `color: transparent` on substantive content)

Verification commands:

```
grep -R "—" app components lib            # source-side em dash check
grep -R " -- " app components lib         # source-side double hyphen check
grep "—" out/*.html                       # built-HTML em dash check
grep " -- " out/*.html                    # built-HTML double hyphen check
```

Em dashes inside developer-only source comments (CSS comments, JSDoc, inline JS comments) are not customer-facing and are explicitly allowed.

## Schema Quality Gate

- [ ] `FAQPage` JSON-LD `mainEntity` array generated from the same source as visible FAQ
- [ ] Every `acceptedAnswer.text` matches its visible answer exactly
- [ ] `BreadcrumbList` JSON-LD reflects visible breadcrumb hierarchy (when breadcrumbs are present)
- [ ] `LocalBusiness` or `Organization` JSON-LD omits `streetAddress` for service-area-only businesses
- [ ] No `AggregateRating` or `Review` schema unless owner-supplied verified review data + visible matching content
- [ ] No `Offer` with hardcoded `price` unless owner-confirmed
- [ ] No `HowTo` schema unless visible numbered steps exist and match exactly

## Light Utility Gate (for non–high-value pages)

For legal pages, thank-you pages, and utility surfaces:

- [ ] Visible "Draft" / placeholder notice if copy is not owner-approved
- [ ] `TODO-VERIFY` comments mark every field awaiting owner data
- [ ] No SEO over-optimization
- [ ] No FAQ schema unless a real visible FAQ section exists
- [ ] No fake claims
- [ ] Lint, type-check, build pass

## Output Format

After running the gate, return:

```
PASS / FAIL Gate Result
Status: PASS | FAIL
Page: <route>
Page type: <type>
AI depth: <Level 1–6>

Required gate (24 items): <count>/<total> checked
Visual CTA gate (6 items): <count>/<total> checked
Copy cleanup gate (7 items): <count>/<total> checked
Schema quality gate (7 items): <count>/<total> checked

Failures (if any):
- ...

Required fixes before PASS:
- ...
```

## Related Files

- `docs/prompt-router-and-ai-depth-standard.md` — routing this gate is invoked by
- `docs/keyword-research-and-aeo-depth-standard.md` — research depth this gate verifies
- `docs/high-value-page-enforcement-standard.md` — pre-build deliverables this gate checks for
- `docs/no-fake-data-policy.md` — fabrication rules this gate enforces
- `docs/service-business-conversion-layout.md` — conversion-layout standard verified for hero/CTA pages
- `docs/service-card-image-placeholder-standard.md` — card-image standard verified for card-grid pages
- `docs/fast-build-batch-workflow.md` — Fast Build Batch retains its place for the lighter utility gate

---

Site OS Master — Pass/Fail Page Quality Gates v1.0
Status: Adopted 2026-05-17
Reason for creation: codify the pre-commit verification ritual for high-value pages so builds cannot ship "technically complete" but quality-light, and so failures return a specific actionable list rather than ambiguous "needs review."
