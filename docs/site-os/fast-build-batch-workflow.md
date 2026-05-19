# Fast Build Batch Workflow

The default operating workflow for Site OS Master client website work. Streamlined for low-risk client polish so simple work ships fast. Multi-gate workflows are exception-only, reserved for true high-risk changes.

## Purpose

Fast Build Batch exists to reduce approval friction, protect profit margins, and prevent simple work from being routed through unnecessary multi-gate workflows.

Most weekly client website work after the initial build is low-risk polish — copy edits, wording cleanup, style updates, layout refinements, brand consistency passes, CTA tweaks, metadata updates, basic form embeds, basic consent placement, footer updates. Running each of these through a 4-message Gate 1 → Gate 2 → Gate 3 → commit cycle burns approval turns, slows delivery, delays deployment, and erodes the profitability of recurring client work without adding safety. Fast Build Batch collapses that cycle to a single inspect-implement-commit pass while preserving every existing R1–R3-5 safety discipline.

## Default Rule

**Fast mode is default. Multi-gate is exception-only.**

The default routing for any new batch of client website work is Fast Build Batch. Multi-gate (Gate 1 → Gate 2 → Gate 3) is selected only when the work explicitly matches the Multi-Gate criteria in § "Use Multi-Gate only for" below.

## Use Fast Build Batch For

- Copy changes
- Wording cleanup
- Style and brand polish
- Layout polish
- Component polish
- CTA changes
- Basic page edits
- SEO title and description updates
- Basic GHL form embed swaps
- Basic consent / link placement
- Contact detail updates
- Footer and header updates
- Simple redirects when the target is already known

## Fast Build Batch Process

1. Inspect exact files
2. Apply approved changes
3. Run `npm run lint`
4. Run `npm run type-check`
5. Run `npm run build`
6. Commit approved files only (explicit per-file `git add <path>` per `docs/file-scope-and-git-safety-policy.md` §5)
7. Deploy only when the batch is meaningful — defer the deploy decision until enough is batched to be worth shipping

The single commit approval at the end of the batch replaces the Gate 1 inspection approval, Gate 2 plan approval, and Gate 3 implementation approval that multi-gate would require.

## Fast Integration Checklist (basic forms)

Use when wiring a confirmed third-party form (for example, a GoHighLevel embed) into an existing placeholder. Not multi-gate.

1. Confirm the embed code or endpoint URL with the owner
2. Replace the placeholder
3. Confirm consent and link placement near the form
4. Run `npm run build`
5. Test render in browser
6. Test a real lead submission if possible
7. Commit and deploy

## Fast Compliance Checklist (basic legal / consent placement)

Use when adding owner-approved legal or consent text near a form, or linking the approved Privacy Policy and Terms. Not multi-gate.

1. Confirm the required text with the owner or legal counsel
2. Add the text near the form
3. Link the approved Privacy Policy and Terms
4. Run `npm run build`
5. Commit and deploy

## Use Multi-Gate Only For

Multi-gate (Gate 1 → Gate 2 → Gate 3) is reserved exclusively for high-risk work that touches any of:

- Real listing data
- `lib/data/listings.ts`
- Schema validity changes
- Custom backend or API logic
- Custom webhook logic
- Payment collection
- Authentication or user accounts
- Database changes
- Package or config file changes (`package.json`, `package-lock.json`, `wrangler.jsonc`, `open-next.config.ts`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`)
- Cloudflare or Wrangler config changes
- Major routing logic changes
- Unclear compliance risk
- Large deployment or release planning

If the work matches any item above, run full Gate 1 → Gate 2 → Gate 3. If the work does not match any item above, run Fast Build Batch.

## Anti-Waste Rules

- Do not create Gate 1, Gate 2, Gate 3 cycles for simple wording, style, or brand polish
- Do not split a proven repeated pattern into many small approval cycles
- Do not keep polishing wording when deployment, forms, listings, or launch blockers are pending
- Do not update `docs/prompt-master-status.md` for every small workflow patch
- Do not over-document work that is already validated by lint, type-check, and build

## Output Format for Fast Build Batch

A Fast Build Batch report produces exactly:

1. Files changed
2. Changes made
3. Verification results (lint, type-check, build)
4. Commit message
5. Deploy recommendation
6. Remaining real blockers only

No separate Gate 1 inspection report, no separate Gate 2 plan, no separate Gate 3 implementation report. The Fast Build Batch report is all three combined into one.

## Working Examples

- **702Xchange brand and style polish** → Fast Build Batch
- **702Xchange wording cleanup after the migration pattern is proven** → Fast Build Batch
- **GoHighLevel embed replacement with an owner-provided URL** → Fast Integration Checklist
- **Basic consent text placement near a form** → Fast Compliance Checklist
- **Seed listings into `lib/data/listings.ts`** → Multi-Gate
- **Schema changes** (`lib/schema/*`, JSON-LD field shape, structured-data validity) → Multi-Gate
- **Cloudflare or Wrangler config changes** → Multi-Gate

## Required Discipline (Applies Inside Every Mode)

The following remain in force inside Fast Build Batch, Fast Integration Checklist, Fast Compliance Checklist, and Multi-Gate:

- File-scope discipline per `docs/file-scope-and-git-safety-policy.md` — explicit per-file `git add <path>`, never `git add .` or `git add -A`
- No-fake-data discipline per `docs/no-fake-data-policy.md` — no invented data, schema must match visible content, no auto-pulls without owner consent
- Hard Stop List from `docs/standing-approval-rule-template.md` always applies
- Service-business conversion layout per `docs/service-business-conversion-layout.md` — when iterating hero or primary CTA sections on a service-based business build, default to the two-column conversion layout (content left, form/placeholder right, expanded container) unless the page is explicitly non-conversion (blog, legal, about, 404, etc.)
- Service card image placeholder per `docs/service-card-image-placeholder-standard.md` — when iterating service cards on a service-based business build (homepage previews, services hub, related services, location grids, landing page service cards, reusable ServiceCard components), every card must include a visual image placeholder area at the top using brand tokens; no fake / auto-pulled / stock imagery per `docs/no-fake-data-policy.md` §8–§9
- Client repo prompt and documentation system per `docs/client-repo-prompt-system-standard.md` — every client website repo must carry the full `docs/site-os/` prompt structure (build, content, seo-aeo, qa, updates, reference, checklists, decisions) so the repo is self-sufficient for ongoing builds, content work, SEO/AEO improvement, gap fixes, updates, and QA without depending on Claude Project memory or master-repo access; install at new-client startup via `prompts/client-repo-prompt-system-setup-prompt.md`
- Prompt routing and AI depth selection per `docs/prompt-router-and-ai-depth-standard.md` — every page build (including ones running under Fast Build Batch) must classify page type, page value, and select the correct prompt + AI depth before drafting; high-value pages route to individual prompts, not batch prompts (see Batch Prompt Limitation Rule below)
- High-value page enforcement per `docs/high-value-page-enforcement-standard.md` — pre-build deliverables (keyword map, AEO FAQ map, content gap list, implementation plan) and post-build pass/fail gate are mandatory for high-value pages
- Pass/fail page quality gate per `docs/pass-fail-page-quality-gates.md` — every high-value page build returns PASS or FAIL with the specific list of failures; no commits on FAIL
- Build-before-deploy per `checklists/deploy-workflow-checklist.md` if a deploy is approved separately
- Post-deploy verification per `checklists/post-deploy-production-verification-checklist.md` after every deploy

Speed comes from skipping unnecessary planning ceremony, not from skipping safety.

## Batch Prompt Limitation Rule

Batch prompts are not the default for high-value pages.

Batch prompts are appropriate for:

- Project setup
- Shared components
- Legal / utility pages
- Low-risk scaffolding
- Commit / QA workflows

Batch prompts are not appropriate for:

- Homepage
- Free quote page
- Contact page
- Services hub
- Locations hub
- About page
- FAQ hub
- Core service pages
- Core location pages
- Service + location pages
- Revenue-critical landing pages

…unless explicitly approved by the project owner and recorded in the implementation log. For high-value pages, route to the individual prompts in `prompts/individual-homepage-*-prompt.md`, `prompts/conversion-page-*-prompt.md`, `prompts/seo-aeo-service-page-*-prompt.md`, `prompts/local-seo-location-page-*-prompt.md`, or `prompts/aeo-faq-hub-prompt.md` per `docs/prompt-router-and-ai-depth-standard.md`. Even when a batch prompt is approved for a high-value page, the pass/fail gate from `docs/pass-fail-page-quality-gates.md` still runs.

## Cross-references

- `docs/standing-approval-rule-template.md` — Hard Stop List that the routing rules above inherit unchanged
- `docs/file-scope-and-git-safety-policy.md` — explicit per-file `git add` discipline that applies inside every mode
- `docs/no-fake-data-policy.md` — fabrication-prevention rules that apply inside every mode
- `docs/service-business-conversion-layout.md` — universal two-column hero/CTA layout standard for service-based business builds; applies inside Fast Build Batch and Multi-Gate
- `docs/service-card-image-placeholder-standard.md` — universal service-card image-placeholder standard for service-based business builds; applies inside Fast Build Batch and Multi-Gate
- `docs/client-repo-prompt-system-standard.md` — universal client-side prompt and documentation system standard; required at every client repo from startup so build, content, SEO/AEO, gap-fix, update, and QA workflows operate without master-repo dependence
- `prompts/client-repo-prompt-system-setup-prompt.md` — copy-paste-ready Claude Code prompt that installs the client-side system per the standard above
- `docs/prompt-router-and-ai-depth-standard.md` — universal page-type routing and AI depth selection; required before any page work, including under Fast Build Batch
- `docs/keyword-research-and-aeo-depth-standard.md` — keyword type and AEO question research required before high-value page writing
- `docs/high-value-page-enforcement-standard.md` — pre-build deliverables and post-build proof for high-value pages
- `docs/pass-fail-page-quality-gates.md` — universal pass/fail gate for high-value page builds
- `docs/new-client-startup-workflow.md` — first-time onboarding; initial client builds use Multi-Gate because pattern, data, and stack decisions are all new
- `docs/continue-existing-client-workflow.md` — resume workflow; the routing rules above determine Fast Build Batch vs. Multi-Gate per session
- `checklists/deploy-workflow-checklist.md` — required when a deploy is approved separately
- `checklists/post-deploy-production-verification-checklist.md` — required after every deploy

---

Site OS Master — Fast Build Batch Workflow v1.0
Status: Tier R4 Final Readiness Patch — implemented 2026-05-17
Reason for creation: prevent wasted time and money by making Fast Build Batch the default workflow for low-risk client website work and reserving multi-gate workflows only for true high-risk changes
