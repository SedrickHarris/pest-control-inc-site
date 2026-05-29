# Pest Control Inc: Client Build Prompt Index

## When to use which prompt

| Stage | Prompt |
|-------|--------|
| Build Phase 1 gap pages + About cluster | prompts/build/batch-2-core-brand-pages-prompt.md |
| Build pest species pillar pages | prompts/build/batch-3-service-pages-prompt.md |
| Build city location hub pages | prompts/build/batch-4-city-location-pages-prompt.md |
| Build neighborhood pages | prompts/build/batch-5-neighborhood-pages-prompt.md |
| Build service+city matrix pages | prompts/build/batch-6-service-city-matrix-prompt.md |
| Draft SEO/AEO content for a page | prompts/content/seo-aeo-content-generation-prompt.md |
| Strengthen weak page content | prompts/content/content-strengthening-prompt.md |
| Analyze SERP before writing | prompts/seo-aeo/serp-analysis-prompt.md |
| AEO gap audit after build | prompts/seo-aeo/aeo-gap-analysis-prompt.md |
| QA a built page (structure/design/a11y) | prompts/qa/page-qa-prompt.md |
| QA SEO/AEO on a built page | prompts/qa/seo-aeo-qa-prompt.md |
| Final safety check before commit | prompts/qa/pre-commit-qa-prompt.md |
| Fix content gaps from QA report | prompts/updates/content-gap-fix-prompt.md |
| Update business data (phone/hours/CTAs) | prompts/updates/content-update-prompt.md |

## Routing Rules
- High-value pages (homepage, /free-estimate/, /contact/, hubs, species pillars)
  require individual prompts per docs/site-os/prompt-router-and-ai-depth-standard.md
- Batch prompts are for setup, scaffolding, legal, utility pages only
- When in doubt: read prompt-router-and-ai-depth-standard.md first

## Source of Truth
- Build context: docs/site-os/inputs/pci-build-context.md
- Page list + build order: docs/site-os/inputs/pci-launch-readiness-site-build-list.md
- Brand + style: docs/site-os/inputs/pci-brand-style-reference.md
- No-fake-data: docs/site-os/no-fake-data-policy.md
