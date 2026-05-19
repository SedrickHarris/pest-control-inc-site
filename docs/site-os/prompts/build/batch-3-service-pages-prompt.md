# Batch 3 — Pest Species Pillar Pages
# Pest Control Inc · Las Vegas, NV

## Purpose
Build the 16 individual pest species service pages. These are the parent
authority pages for all future service+location matrix pages.

## Source-of-Truth Docs
- docs/site-os/inputs/pci-build-context.md
- docs/site-os/inputs/pci-brand-style-reference.md
- docs/site-os/inputs/pci-launch-readiness-site-build-list.md
- docs/site-os/no-fake-data-policy.md
- docs/site-os/file-scope-and-git-safety-policy.md
- docs/site-os/service-business-conversion-layout.md
- docs/site-os/prompt-router-and-ai-depth-standard.md

## Pages in This Batch

| # | Pest | Route | AI Depth |
|---|------|-------|----------|
| 1 | Scorpion Exterminator Las Vegas | /scorpion-exterminator-las-vegas/ | Level 5 — highest local priority |
| 2 | Ant Exterminator Las Vegas | /ant-exterminator-las-vegas/ | Level 3 |
| 3 | Cockroach Exterminator Las Vegas | /cockroach-exterminator-las-vegas/ | Level 3 |
| 4 | Rodent Exterminator Las Vegas | /rodent-exterminator-las-vegas/ | Level 3 |
| 5 | Termite Exterminator Las Vegas | /termite-exterminator-las-vegas/ | Level 3 |
| 6 | Spider Exterminator Las Vegas | /spider-exterminator-las-vegas/ | Level 3 |
| 7 | Bed Bug Exterminator Las Vegas | /bed-bug-exterminator-las-vegas/ | Level 3 |
| 8 | Wasp Exterminator Las Vegas | /wasp-exterminator-las-vegas/ | Level 3 |
| 9 | Bee Removal Las Vegas | /bee-removal-las-vegas/ | Level 3 |
| 10 | Bird Removal Las Vegas | /bird-removal-las-vegas/ | Level 3 |
| 11 | Earwig Exterminator Las Vegas | /earwig-exterminator-las-vegas/ | Level 3 |
| 12 | Miller Moth Exterminator Las Vegas | /miller-moth-exterminator-las-vegas/ | Level 3 |
| 13 | Hornet Exterminator Las Vegas | /hornet-exterminator-las-vegas/ | Level 3 |
| 14 | Crane Fly Exterminator Las Vegas | /crane-fly-exterminator-las-vegas/ | Level 3 |
| 15 | False Chinch Bug Exterminator Las Vegas | /false-chinch-bug-exterminator-las-vegas/ | Level 3 |
| 16 | Springtail Exterminator Las Vegas | /springtail-exterminator-las-vegas/ | Level 3 |

## Required Page Structure (every species page)
1. H1 with pest + Las Vegas
2. Direct-answer opening paragraph (what it is, why it matters in Las Vegas)
3. Nevada-specific pest behavior section
4. Health Conscious Service Program treatment section
5. Why PCI trust section
6. Process section (4 steps)
7. Internal links to parent hubs and related species
8. FAQ section (minimum 5 Q/As) with FAQPage schema
9. CTA section + form

## Required Schema (every species page)
- LocalBusiness
- Service
- FAQPage
- BreadcrumbList

## No-Fake-Data Rules
- Do not state specific product names or EPA numbers
- Do not invent treatment success rates or response time guarantees
  beyond what is confirmed in pci-build-context.md
- Scorpion page: Arizona bark scorpion facts are accurate and verifiable —
  use them; do not exaggerate venom claims

## Business Constants
- Phone: (702) 228-4394
- Primary CTA: Get Free Estimate → /free-estimate/
- License: NV #4632
