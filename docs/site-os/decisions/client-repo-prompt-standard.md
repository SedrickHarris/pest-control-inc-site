# Decision: Client-Side Site OS Prompt System Adopted
# Pest Control Inc · pest-control-inc-site

Date: 2026-05-18
Decision: Adopt the full client-side Site OS prompt and documentation system
Source standard: docs/client-repo-prompt-system-standard.md (Site OS Master)

## What Was Installed

### Root workflow and policy docs (docs/site-os/)
- fast-build-batch-workflow.md
- file-scope-and-git-safety-policy.md
- no-fake-data-policy.md
- service-business-conversion-layout.md
- service-card-image-placeholder-standard.md
- prompt-router-and-ai-depth-standard.md
- keyword-research-and-aeo-depth-standard.md
- high-value-page-enforcement-standard.md
- pass-fail-page-quality-gates.md
- standing-approval-rule-template.md

### Build prompts (docs/site-os/prompts/build/)
- batch-2-core-brand-pages-prompt.md (PCI-adapted)
- batch-3-service-pages-prompt.md (PCI-adapted)
- batch-4-city-location-pages-prompt.md (PCI-adapted)
- batch-5-neighborhood-pages-prompt.md (PCI-adapted)
- batch-6-service-city-matrix-prompt.md (PCI-adapted)

### Content prompts (docs/site-os/prompts/content/)
- seo-aeo-content-generation-prompt.md (verbatim)
- content-strengthening-prompt.md (verbatim)

### SEO/AEO prompts (docs/site-os/prompts/seo-aeo/)
- serp-analysis-prompt.md (verbatim)
- aeo-gap-analysis-prompt.md (verbatim)

### QA prompts (docs/site-os/prompts/qa/)
- page-qa-prompt.md (verbatim)
- seo-aeo-qa-prompt.md (verbatim)
- pre-commit-qa-prompt.md (verbatim with PCI phone/email)

### Update prompts (docs/site-os/prompts/updates/)
- content-gap-fix-prompt.md (verbatim)
- content-update-prompt.md (verbatim)

### Reference docs (docs/site-os/reference/)
- client-build-prompt-index.md (PCI-adapted)
- seo-aeo-content-standards.md
- service-business-design-standards.md

### Checklists (docs/site-os/checklists/)
- page-before-build-checklist.md
- page-after-build-checklist.md
- content-quality-checklist.md

## Rationale
- Session memory is not portable across Claude sessions
- Site OS Master may not always be open in another window
- The client repo must be self-sufficient for any operator to continue
  build, content, QA, and update work without re-deriving the system

## Maintenance
Site OS Master changes do not auto-update this repo.
When opening a new major batch, check docs/prompt-master-status.md in
Site OS Master for R-N patches since the last session and apply relevant
updates via: chore(site-os): sync prompts from master
