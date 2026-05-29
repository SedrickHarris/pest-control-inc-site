# Batch 3: Pest Species Pillar Pages
# Pest Control Inc · Las Vegas, NV
# Routing finalized: 2026-05-19
# Operator direction: build to final standard first time: no Level 3 pages, no retrofit passes

## Purpose
Build the 15 remaining individual pest species service pages. These are the
parent authority pages for all future service+location matrix pages.
(/ant-exterminator-las-vegas/ is already live, excluded from this batch.
Ant page retrofit to Level 4 is a separate scheduled task, see implementation log.)

## Source-of-Truth Docs
- docs/site-os/inputs/pci-build-context.md
- docs/site-os/inputs/pci-brand-style-reference.md
- docs/site-os/inputs/pci-launch-readiness-site-build-list.md
- docs/site-os/no-fake-data-policy.md
- docs/site-os/file-scope-and-git-safety-policy.md
- docs/site-os/service-business-conversion-layout.md
- docs/site-os/prompt-router-and-ai-depth-standard.md
- docs/site-os/high-value-page-enforcement-standard.md
- docs/site-os/pass-fail-page-quality-gates.md

## Routing Decision Log
Date: 2026-05-19
Basis 1: SERP audit confirmed active competitor pages on cockroach, rodent,
termite, spider, bed bug from Terminix, Orkin, Alta, Fischer's, Red Rock,
Fortified, Axis, Burns, and Progressive Pest Control.
Basis 2: Operator direction, all unbuilt species pages elevated to Level 4
minimum. No Level 3 pages in this batch. Every page gets full keyword map,
8+ FAQs, dedicated Why PCI section, competitor differentiation, Nevada-specific
content, Service schema, and pass/fail gate before commit.
Approved by: operator (2026-05-19 session).

## Pages in This Batch

| # | Pest | Route | AI Depth | Workflow |
|---|------|-------|----------|----------|
| 1 | Scorpion Exterminator Las Vegas | /scorpion-exterminator-las-vegas/ | **Level 5: Beyond-Elite** | Prompt A → approval → Prompt B → pass/fail gate |
| 2 | Cockroach Exterminator Las Vegas | /cockroach-exterminator-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 3 | Rodent Exterminator Las Vegas | /rodent-exterminator-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 4 | Termite Exterminator Las Vegas | /termite-exterminator-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 5 | Spider Exterminator Las Vegas | /spider-exterminator-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 6 | Bed Bug Exterminator Las Vegas | /bed-bug-exterminator-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 7 | Wasp Exterminator Las Vegas | /wasp-exterminator-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 8 | Bee Removal Las Vegas | /bee-removal-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 9 | Bird Removal Las Vegas | /bird-removal-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 10 | Earwig Exterminator Las Vegas | /earwig-exterminator-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 11 | Hornet Exterminator Las Vegas | /hornet-exterminator-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 12 | Miller Moth Exterminator Las Vegas | /miller-moth-exterminator-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 13 | Crane Fly Exterminator Las Vegas | /crane-fly-exterminator-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 14 | False Chinch Bug Exterminator Las Vegas | /false-chinch-bug-exterminator-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |
| 15 | Springtail Exterminator Las Vegas | /springtail-exterminator-las-vegas/ | **Level 4** | Keyword map → build → pass/fail gate |

## Level 5 Requirements: Scorpion Only

Scorpion is the highest-urgency, highest-search-volume, most locally-distinctive
pest keyword in Southern Nevada. Requires full two-step workflow:

### Prompt A (research and plan: no file changes)
Output and operator approval required before any build work begins:
- Keyword type map: primary, secondary, long-tail, local modifiers, AEO targets,
  transactional, informational, commercial comparison, entity/semantic terms
- Competitor content gap analysis vs Terminix, Orkin, Fischer's, Red Rock, Alta
- Section plan with rationale
- AEO FAQ map, minimum 10 Q/As grouped by category
- Internal link map

### Prompt B (implementation)
Implement the approved Prompt A plan only. No scope additions during build.

### Post-build
- Full pass/fail gate (all items below) before commit
- Implementation log entry

## Level 4 Requirements: All Other 14 Pages

### Pre-build (inline: no separate Prompt A)
Produce keyword map before drafting:
- Primary keywords, secondary keywords, long-tail terms
- Local modifiers (Las Vegas, Henderson, Clark County, Nevada)
- AEO question targets (minimum 8)
- Transactional terms (free estimate, exterminator, same-day, emergency)

### Required Page Sections: 10 sections minimum

**Section 1, H1**
Pest name + Las Vegas. One H1 per page.

**Section 2, Direct-answer opening paragraph**
What this pest is, why it matters specifically in Las Vegas / Southern Nevada /
Clark County. AEO-optimized. Speakable. Answers the search query in the first
two sentences.

**Section 3, Nevada-specific pest behavior**
Desert climate context, seasonal patterns, why this pest is a particular concern
in this region. No generic copy. Specific to Clark County conditions , 
monsoon season, desert heat, new construction, stucco and block homes, etc.

**Section 4, Health Conscious Service Program treatment**
IPM-based approach, exterior-first strategy, EPA-registered low-impact baits
and gels. Pet-safe, family-safe language. Links to
/about/health-conscious-service-program/ where built.

**Section 5, Dedicated Why PCI section**
Standalone section, not distributed callouts. Must include:
- 3-generation family-owned (not a national franchise)
- Nevada Department of Agriculture Pest Control License #4632
- National Pest Management Association (NPMA) member
- Licensed, insured, drug tested, and background checked technicians
- Money-back guarantee
- 30 minutes or less callback (business hours)
- 24/7 emergency service

**Section 6, Competitor differentiation**
What PCI offers that national chains (Terminix, Orkin) cannot:
local family ownership, technician accountability, Health Conscious Service
Program, direct callback promise. No fake claims. No named competitor attacks , 
contrast on attributes only.

**Section 7, 4-step process**
1. Free inspection and species identification
2. Targeted treatment (Health Conscious Service Program)
3. Follow-up confirmation visit
4. Ongoing protection / guarantee

**Section 8, Internal links**
- /pest-control-las-vegas/ (residential hub)
- /free-estimate/
- /contact/
- Minimum 3 related species pages (link pending if not yet built, use
  aria-disabled="true" and class="pending" as per ant page pattern)

**Section 9, FAQ section**
Minimum 8 visible Q/As. FAQPage JSON-LD must match visible text exactly , 
every question and answer in schema must appear on the page. Questions must cover:
- What this pest is / looks like in Las Vegas
- Health or property damage risks
- DIY vs professional treatment
- Signs of infestation
- How PCI treats this pest
- How to request an estimate / cost process (always direct to free estimate , 
  never invent pricing)
- Service area confirmation
- Guarantee and what happens if pests return

**Section 10, Final CTA**
Get Free Estimate → /free-estimate/ + (702) 228-4394 + form.
Form: use placeholder (disabled fields, TODO-LAUNCH-BLOCKER comment) until
form handler endpoint is confirmed. Do not invent or hard-code an endpoint.

### Required Schema: every Level 4 page
- `LocalBusiness`, full: address, telephone, email, hours, geo,
  aggregateRating (Google 5.0 / reviewCount 30 / bestRating 5 / worstRating 1)
- `Service`, serviceType, provider (@id to LocalBusiness), areaServed
  (Clark County, NV), description
- `FAQPage`, mainEntity array; every Q/A must match visible page text exactly
- `BreadcrumbList`, position 1 Home, position 2 current page

### Pass/Fail Gate: required before every commit

Run all checks. Do not commit on any FAIL.

- [ ] All 10 sections present and non-empty
- [ ] FAQ visible count ≥ 8
- [ ] FAQPage schema Q/A count matches visible FAQ count exactly
- [ ] All 4 required schema types present
- [ ] AggregateRating reviewCount = 30 (Google only, not aggregated)
- [ ] Canonical correct: `https://pestcontrolinc.net/[slug]/`
- [ ] Phone `(702) 228-4394` present in hero, trust bar, and footer
- [ ] `tel:+17022284394` on all phone links
- [ ] No raw em-dashes, all `, `
- [ ] No raw en-dashes, all `-`
- [ ] `robots: index, follow` (not noindex)
- [ ] `aria-current="page"` on correct nav and footer links
- [ ] No fake data: no invented stats, EPA numbers, product names, pricing,
      founding year, named individuals, or review counts beyond confirmed scores
- [ ] No specific founding year anywhere on the page
- [ ] No named individuals anywhere on the page
- [ ] Internal links: unbuilt species pages marked pending (aria-disabled),
      built pages link correctly

## No-Fake-Data Rules

- Do not state specific product names or EPA registration numbers
- Do not invent treatment success rates, infestation statistics, or case outcomes
- Do not invent pricing, always direct to free estimate
- Do not claim specific response times beyond confirmed 30-minute callback
  during business hours
- AggregateRating: Google 5.0 / reviewCount 30 only, do not combine platforms
- Review testimonials: only if owner-confirmed as genuine submitted reviews
- No named individuals on any page
- No specific founding year, "3-generation family-owned" only

## Business Constants

- Phone: (702) 228-4394, tel:+17022284394
- Email: info@pestcontrolinc.net
- Address: 3642 N Rancho Dr, Suite #102, Las Vegas, NV 89130
- License: Nevada Department of Agriculture Pest Control License #4632
- NPMA: National Pest Management Association member
- Program: Health Conscious Service Program
- Guarantee: money-back guarantee
- Callback: 30 minutes or less (business hours)
- Emergency: 24/7
- Primary CTA: Get Free Estimate → /free-estimate/
- Secondary CTA: Call (702) 228-4394 → tel:+17022284394

## Build Order

Strict priority sequence, do not skip ahead.

1.  Scorpion   , Level 5, Prompt A first, approval required before building
2.  Cockroach  , Level 4
3.  Rodent     , Level 4
4.  Termite    , Level 4
5.  Spider     , Level 4
6.  Bed Bug    , Level 4
7.  Wasp       , Level 4
8.  Bee        , Level 4
9.  Bird/Pigeon, Level 4
10. Earwig     , Level 4
11. Hornet     , Level 4
12. Miller Moth, Level 4
13. Crane Fly  , Level 4
14. False Chinch Bug, Level 4
15. Springtail , Level 4

## Ant Page Retrofit (separate task: not in this batch)

/ant-exterminator-las-vegas/ predates the Level 4 elevation decision. Retrofit
pass is scheduled after Batch 3 is complete. Adds:
- Dedicated Why PCI section (Section 5)
- Competitor differentiation section (Section 6)
- Extended FAQs to 8+ minimum
- AggregateRating reviewCount corrected from 65 to 30 (Google only)
Track completion in implementation log.

## Implementation Log Requirement

Every page built under this batch appends an entry to
docs/site-os/implementation-log.md recording:
- Page route and AI depth
- Keyword map summary (top 3 primary keywords)
- FAQ count visible / FAQ count in schema (must match)
- Pass/fail gate result, list any failures
- Commit hash after push
- Open TODOs (form endpoint, image placeholders, pending internal links)

---

Batch 3, Pest Species Pillar Pages, Pest Control Inc
Routing finalized: 2026-05-19
All 15 unbuilt species pages: Level 4
Scorpion: Level 5
No Level 3 pages in Batch 3
Operator direction: build to final standard first time
