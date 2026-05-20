# Batch 6 — Service + City Matrix Pages
# Pest Control Inc · Las Vegas, NV

## Purpose
Build Tier 1 service+city matrix pages combining the highest-value
services with the highest-value locations.

## Source-of-Truth Docs
- docs/site-os/inputs/pci-build-context.md
- docs/site-os/inputs/pci-launch-readiness-site-build-list.md
- docs/site-os/no-fake-data-policy.md
- docs/site-os/file-scope-and-git-safety-policy.md
- docs/site-os/prompt-router-and-ai-depth-standard.md

## URL Pattern
/{service-slug}-{location-slug}/
Example: /scorpion-exterminator-henderson-nv/

## Tier 1 Matrix — Priority Services × Priority Locations

Priority services: Scorpion, Ant, Cockroach, Rodent, Termite, Spider,
Bed Bug, Emergency, Residential, Commercial

Priority locations: Henderson NV, North Las Vegas, Boulder City NV

> Note: Mesquite NV was previously listed as a priority location in this batch and has been **omitted** as of 2026-05-19 (the Mesquite city hub is out of scope, so its dependent matrix is out of scope). See implementation-log.md.

## Required Page Structure (per build list Phase 7 template)
1. H1 with service + location
2. Direct-answer opening paragraph
3. Location-specific pest problem section
4. Service-specific solution section
5. Why this service matters in this location
6. Residential or commercial relevance
7. Process section (4 steps)
8. Local trust section
9. Internal links: parent service page, parent location page,
   /free-estimate/, /contact/, related species pages
10. FAQ (minimum 5) with FAQPage schema
11. CTA section + form

## Required Schema
- LocalBusiness
- Service
- FAQPage
- BreadcrumbList

## Publishing Rule — No Thin Pages
Do not publish without:
- Unique H1, meta title, meta description
- Unique local intro paragraph
- Location-specific pest issues
- Service-specific explanation
- Visible FAQs
- Correct internal links
- Correct schema
- Clear CTA

## No-Fake-Data Rules
- Do not invent location-specific statistics
- Do not duplicate body copy from the parent service page
- Each page must have genuinely unique content
