# Batch 4 — City & Tier 2 Location Pages
# Pest Control Inc · Las Vegas, NV

## Purpose
Build the Tier 1 and Tier 2 city location hub pages. These are parent
authority pages for neighborhood and service+location matrix pages.

## Source-of-Truth Docs
- docs/site-os/inputs/pci-build-context.md
- docs/site-os/inputs/pci-launch-readiness-site-build-list.md
- docs/site-os/no-fake-data-policy.md
- docs/site-os/file-scope-and-git-safety-policy.md
- docs/site-os/prompt-router-and-ai-depth-standard.md

## Pages in This Batch

### Tier 1 Cities
| Route | AI Depth |
|-------|----------|
| /pest-control-henderson-nv/ | Level 3 |
| /pest-control-north-las-vegas/ | Level 3 |
| /pest-control-boulder-city-nv/ | Level 3 |

> Note: `/pest-control-mesquite-nv/` was previously listed in this batch and has been **omitted** as of 2026-05-19. See implementation-log.md.

### Tier 2 Areas
| Route | AI Depth |
|-------|----------|
| /pest-control-henderson-nv/ | Level 3 |
| /pest-control-paradise-nv/ | Level 3 |
| /pest-control-spring-valley-nv/ | Level 3 |
| /pest-control-enterprise-nv/ | Level 3 |
| /pest-control-sunrise-manor-nv/ | Level 3 |

## Required Page Structure (every city page)
1. H1 with service + city
2. Direct-answer paragraph
3. Local pest threats specific to that city/area
4. How PCI serves this area
5. Services section with internal links to species pages
6. Trust and credentials section
7. Internal links to parent residential hub and /free-estimate/
8. FAQ (minimum 5, city-localized) with FAQPage schema
9. CTA section

## No-Fake-Data Rules
- Do not invent neighborhood-specific pest statistics
- Do not claim PCI has an office in every city — they operate from Las Vegas
- Service area coverage is all of Clark County NV — confirmed

## Business Constants
- Phone: (702) 228-4394
- License: NV #4632
