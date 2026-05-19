# No-Fake-Data Policy

A standalone universal policy preventing invented or unsupported data across schema, copy, CTAs, reviews, ratings, trust signals, business credentials, listings, addresses, phone numbers, service claims, images, APIs, and external data sources. Applies to every Site OS Master client build regardless of session, stack, workflow mode, or page type.

## Purpose

Prevent fabricated, invented, scraped-without-consent, or auto-pulled-without-verification data from appearing in production client websites — in body copy, structured data (schema), CTAs, trust signals, images, or external integrations.

This policy consolidates rules previously distributed across the Client Intake Gate "Do Not Fabricate Rule" (intake-scoped), per-prompt fabrication-prevention sections (all 20 prompts), per-checklist no-fake rules, and inline code rules (for example, the 702Xchange `lib/data/listings.ts` header). The new doc provides a single discoverable home for cross-reference. It does not replace any existing rule — it consolidates and extends.

## When to Use

This policy applies to every Site OS Master client build. There is no opt-in step. The rules apply to:

- Strategy sessions (keyword strategy, page outline, gap fix, etc.)
- Content drafting and editing
- Code implementation (component props, data files, copy strings)
- Schema markup generation (LocalBusiness, AggregateRating, Review, etc.)
- Image and media decisions (logos, photos, before/after, hero images)
- External integrations (Places API, GBP API, third-party reviews, social proof widgets)
- CTA wording (urgency, scarcity, social-proof counters)
- Competitor analysis (SERP findings, market-share claims)
- Directory and listings work (business records, addresses, phones)

The policy applies regardless of workflow mode (Fast, Core, Beyond-Elite, Full Competitive Build) or page type (homepage, service, location, category, directory, business profile, blog).

## Core No-Fake-Data Principles

1. **Verified data only.** Any data presented to end users must come from a verifiable source: client-confirmed, owner-provided, publicly documented, or generated programmatically from approved source data.
2. **Schema matches visible content.** Structured data may only mark up content that is also visible on the page. Schema must reflect verified facts, not aspirational or invented claims.
3. **No invention to fill gaps.** When verified data is missing, do not substitute plausible-looking placeholder values into production surfaces. Use the missing-data handling framework in the next section.
4. **No auto-pulls without owner consent.** External data sources (Places API, GBP API, third-party review aggregators, social-graph APIs) must not auto-populate production data without explicit owner approval and a verified data path.
5. **Stop and surface, do not guess.** When a fact is unclear or contested, pause and surface the ambiguity for owner decision.

## How to Handle Missing Data

This policy does not define its own data-status state machine. Use the framework already established in `efficiency-governor/client-intake-gate.md`:

- **CONFIRMED** — Data is verified by the project owner and ready to use
- **APPROVED PLACEHOLDER** — Data is missing but the project owner has explicitly approved placeholder content for the build
- **MISSING — FLAGGED** — Data is missing; no placeholder approval exists; field becomes a Prompt 06 TODO and a launch blocker until resolved

In code, mark MISSING — FLAGGED fields with `// TODO-<TIER>-<NUMBER>:` or `// FLAG-<TIER>-<NUMBER>:` comments. In copy, surface unresolved items in Carry-Forward Items sections. In schema, omit the field entirely (do not emit empty or placeholder schema values).

See `efficiency-governor/client-intake-gate.md` for the full intake checklist, Launch Blocker Reference, and Prompt 05 Summary Output Block that drives this framework.

## 1. Business Identity and Credentials

Do not invent:

- Legal business name
- Public-facing brand name (when different from legal name)
- Years in business
- Licenses (including license numbers, license states, license types)
- Insurance status (including insurance carriers, policy numbers, coverage limits)
- Certifications and accreditations
- Awards and recognitions
- Industry association memberships

Verified data may be used in body copy, schema (`legalName`, `foundingDate`, `award`, `hasCredential`), and trust signals. Unverified items must be MISSING — FLAGGED.

## 2. Contact Data

Do not invent:

- Phone numbers (primary, secondary, emergency, after-hours)
- Email addresses (general, sales, support)
- Street addresses (especially for service-area-only businesses)
- City / state / ZIP (when the address itself is unverified)
- Business hours (regular, holiday, exception, emergency, same-day, 24/7)

Service-area-only businesses must not display or schema-mark a street address (per existing `schemas/localbusiness-schema-template.md` rule). Use service-area information only.

Hours must come from owner confirmation. Do not infer hours from adjacent businesses or industry norms.

## 3. Service Data

Do not invent:

- Service descriptions beyond what the owner has confirmed
- Service areas (named cities, counties, ZIP ranges, mile radii)
- Pricing claims (flat rates, hourly rates, ranges, "starting at" prices)
- Response time claims ("response within 30 minutes", "same-day service")
- Emergency, after-hours, or 24/7 availability claims
- Capacity or volume claims ("over 10,000 jobs completed")

Programmatic content (per-service-area page generation, per-service description templates) is acceptable when the source data is verified — see the Programmatic Content Rule after §12 below.

## 4. Reviews and Ratings

Do not invent:

- Customer testimonials (copy, attribution, photos)
- Star ratings (5-star, 4.9-star, etc.)
- Review counts ("rated 4.9 by 1,200+ customers")
- Aggregate ratings displayed in body copy or schema
- Review excerpts attributed to named or unnamed customers
- Before/after evidence framed as customer outcomes

Only owner-approved verified reviews may appear on the site. See §7 Schema Markup for the AggregateRating and Review schema-specific guidance.

## 5. Trust Signals

Do not invent:

- Partner badges ("Trusted by", "Featured in", "As seen on")
- Press mentions
- Industry accreditations
- "Used by Fortune 500" or similar customer-class claims
- Logo walls of customer brands
- Money-back guarantees, satisfaction guarantees, warranties (unless owner-confirmed terms exist)

Trust signals must be verifiable. Linking out to verifiable sources (for example, a real press article URL) is preferred over assertion alone.

## 6. Performance Claims

Do not invent:

- Analytics results (traffic, impressions, clicks, conversion rates)
- Lead counts or revenue figures
- Ranking positions ("ranked #1 on Google for...")
- Market share claims
- Year-over-year growth percentages
- Conversion-rate improvements attributed to specific changes

Performance claims must come from owner-supplied analytics with documented source (GSC, GA4, CRM, etc.). Do not estimate, extrapolate, or interpolate.

## 7. Schema Markup

Schema must match visible content. Do not emit:

- AggregateRating with invented ratingValue or reviewCount
- Review with invented author, datePublished, or reviewBody
- LocalBusiness with invented address (especially for service-area businesses), telephone, openingHours, priceRange
- Service with invented offers, areaServed, hasOfferCatalog
- Organization with invented foundingDate, employees, award
- FAQPage with answers that do not appear visibly on the page
- BreadcrumbList that does not match the actual navigation hierarchy

Schema-validation rule: every property emitted in JSON-LD must correspond to verified data and (where applicable) visible page content.

### AggregateRating / Review Schema Guidance

**Do not use** (fake example — never emit any of these):

```json
{
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "127"
}
```

```json
{
  "@type": "Review",
  "author": { "@type": "Person", "name": "Sarah K." },
  "reviewRating": { "@type": "Rating", "ratingValue": "5" },
  "reviewBody": "Best service in town!",
  "datePublished": "2025-01-15"
}
```

Both of the above are fake unless every field (ratingValue, reviewCount, author, reviewRating, reviewBody, datePublished) corresponds to verified owner-supplied data AND the review is visibly displayed on the page.

**Acceptable when owner provides verified real review data and visible content matches schema** (owner-approved example using `<verified ...>` placeholder syntax):

```json
{
  "@type": "AggregateRating",
  "ratingValue": "<verified average from owner-supplied review export>",
  "reviewCount": "<verified count from owner-supplied review export>",
  "bestRating": "5",
  "worstRating": "1"
}
```

```json
{
  "@type": "Review",
  "author": { "@type": "Person", "name": "<verified reviewer name as provided by owner with consent>" },
  "reviewRating": { "@type": "Rating", "ratingValue": "<verified rating>" },
  "reviewBody": "<verified review text as published with consent>",
  "datePublished": "<verified ISO 8601 date>"
}
```

These are acceptable only when all four conditions hold:

1. The owner has provided the source data
2. Each reviewer has consented to public attribution (or attribution is anonymized with consent)
3. The review text appears visibly on the page (per Google's structured data guidelines)
4. The aggregate rating matches the actual sum/average of the displayed reviews

If any of those conditions fail, omit the schema entirely. Do not emit a partial or placeholder version.

## 8. Image and Media

Do not use:

- Stock photos misrepresenting the actual business location, team, or past work
- AI-generated logos for real businesses (the business owns its real brand identity; do not generate substitutes)
- AI-generated photos of staff, customers, or completed jobs
- Fake before/after photos
- Photos of competitors' work attributed to this business
- Generic "happy customer" stock imagery framed as actual customers

Acceptable:

- Owner-supplied photos with explicit usage rights
- Generic decorative imagery clearly framed as decorative (not as proof)
- Placeholder UI elements (icon placeholders, neutral logo silhouettes) that do not imply real content — for example, the 702Xchange BusinessCard initials block and `image-placeholder` icon fallback used when no real logo exists

## 9. External Data Sources

Do not auto-pull production data from:

- Google Places API (especially business name, hours, ratings, reviews, photos) without explicit owner approval and a verified data path
- Google Business Profile (GBP) scraping or API without explicit owner consent
- Third-party review aggregators (Yelp, BBB, Trustpilot, etc.) without owner consent and license to display
- Social-graph APIs (LinkedIn, Twitter, Facebook) for fact-population
- Public-records databases without owner consent for the specific use

When external integrations are explicitly approved by the owner, document:

- The data source
- The owner's consent (date, scope)
- The verification path (how data freshness is maintained)
- The fallback when the source becomes unavailable

## 10. Listings and Directory Data

For directory-style sites (multiple businesses listed, business profile pages, location/category browse hubs):

- Do not create fake business listings to seed the directory
- Do not scrape business records from public sources without owner consent
- Do not auto-generate business records from AI models
- Do not invent listing data fields (claim status, verification status, premium tier, featured flag) for seed-data purposes
- Do not invent fake addresses or phone numbers in listings
- Do not invent fake reviews or ratings in listings
- No Places API or automatic Google review pulls unless explicitly approved by the owner
- Use owner/manual entry as the preferred MVP path
- When listings are added in bulk from a verified source (for example, a CSV the owner provides), each listing must be verifiable

The 702Xchange MVP follows this rule operationally: `LISTINGS = []` until real owner-confirmed seed data lands. The `lib/data/listings.ts` file header reads: "Do not invent business names, phones, addresses, hours, reviews, ratings, or claims."

## 11. CTAs and Social Proof

Do not invent:

- Urgency claims ("Only 3 spots left this week!")
- Scarcity claims ("Just 2 left in stock!")
- Social-proof counters ("Join 10,000+ customers", "Used by 5,000 businesses")
- Recent-activity widgets ("Sarah from Vegas booked 5 minutes ago")
- Trust-bar customer-logo walls (covered in §5 Trust Signals)
- "Limited time" offers without owner-confirmed end dates

CTAs may use verified counts, real customer testimonials with consent, and owner-confirmed time-limited offers.

## 12. Competitor Claims

Do not invent:

- Competitor SERP findings (rankings, traffic estimates, backlink counts)
- Competitor market share or revenue figures
- Comparison tables that misrepresent competitor capabilities
- "We're faster/cheaper/better than [Competitor]" without verifiable basis
- Negative claims about competitors (legal risk plus fabrication risk)

Competitor analysis in strategy prompts (08 SERP, 09 entity, 11 SERP, 14 template eval, 15 page variant battle, 18 page moat) must distinguish "verified competitor data" (from real SERP inspection, real public content) from "estimated" (clearly labeled) from "inferred" (clearly labeled).

## Programmatic Content Rule

Programmatic content generation applies across many of the categories above (most often §3 Service Data, §10 Listings, and per-location / per-category page generation). It is treated as a transversal rule rather than belonging to any single category.

Programmatic content is **allowed** when:

- The source data is verified (per §1 through §12 above)
- The template renders the source data faithfully
- The result is reviewed for surface errors (empty fields, broken templates, missing context)

Programmatic content is **not allowed** when:

- The source data is invented or unverified
- The template renders plausible-looking but fabricated facts
- The pattern would produce identical-sounding content across many pages that appears human-authored

Example acceptable: per-location page generation that interpolates a verified service-area list into a template.

Example not acceptable: auto-generating per-business profile pages with invented descriptions, hours, or ratings.

## Stop Conditions

Stop and pause for explicit owner / project-lead approval if any of the following are true:

- A required fact is not CONFIRMED and no APPROVED PLACEHOLDER exists
- A schema field is about to be emitted with an invented value
- An external API call would auto-populate production data
- A fake review, rating, testimonial, or trust signal is about to land
- An image of unclear provenance is about to be added to public/
- A competitor claim cannot be verified against a real source
- A CTA implies urgency, scarcity, or social proof without verifiable basis
- Any field would require fabrication to complete

When a stop condition trips, surface the specific item to the owner and use the Client Intake Gate framework to mark it MISSING — FLAGGED.

## Copy-Paste-Ready Review Checklist

Use this list when reviewing a page, schema block, or component for fake-data risk:

- [ ] Every business identity / credential claim is CONFIRMED or APPROVED PLACEHOLDER
- [ ] Phone, email, address, hours are owner-confirmed
- [ ] Service areas, pricing, response-time, and availability claims are owner-confirmed
- [ ] No invented reviews, ratings, testimonials, or review counts anywhere in body copy or schema
- [ ] AggregateRating / Review schema only emitted with verified owner-supplied data + visible matching content
- [ ] No invented trust signals, partner badges, press mentions, or "as seen on" claims
- [ ] No invented analytics, conversion rates, ranking claims, or performance figures
- [ ] All schema markup matches visible content; no fields with invented values
- [ ] No fake or AI-generated photos of real business, staff, customers, or past work
- [ ] No external API auto-pulls without explicit owner approval and verified data path
- [ ] Directory listings (if applicable) are owner-confirmed; no fake/scraped/AI-generated records
- [ ] No fake urgency, scarcity, or social-proof counters
- [ ] Competitor claims are sourced from verifiable SERP / public data
- [ ] Programmatic content uses verified source data only
- [ ] Every MISSING — FLAGGED item is marked with a TODO/FLAG comment in code and carried forward to the next workflow phase

## Related Files

- `efficiency-governor/client-intake-gate.md` — defines the CONFIRMED / APPROVED PLACEHOLDER / MISSING — FLAGGED status framework this policy cross-references for missing-data handling
- `docs/standing-approval-rule-template.md` — Hard Stop List includes "editing lib/data/listings.ts or adding real listing data" as an action requiring explicit approval
- `docs/file-scope-and-git-safety-policy.md` — scope discipline that prevents accidental introduction of fake data via wrong-file edits
- `schemas/localbusiness-schema-template.md` — schema-specific rule about not inventing or exposing a public street address for service-area-only businesses
- `checklists/launch-readiness-checklist.md` — pre-launch verification catches fake-data issues before publish
- `checklists/page-before-build-checklist.md` — strategy-phase fake-data prevention
- `checklists/page-after-build-checklist.md` — post-implementation fake-data verification

---

Site OS Master — No-Fake-Data Policy v1.0
Status: Tier R3-3 Final Readiness Patch — implemented 2026-05-17
Reason for creation: consolidate fabrication-prevention rules distributed across Client Intake Gate, all 20 prompts, all checklists, and the inline 702Xchange lib/data/listings.ts rule into a single discoverable universal policy
