# Standing Approval Rule Template

A reusable session-scoped workflow rule that reduces yes/no friction between low-risk internal workflow gates while preserving explicit approval requirements for high-risk actions.

## Purpose

Reduce yes/no friction between low-risk internal workflow gates (Gate 1 → Gate 2 → Gate 3 → Prompt 07 QA → file-scoped commit → file-scoped push) while preserving explicit approval requirements for deploys, package installs, route changes, lib/data edits, image assets, external service wiring, and other high-risk actions.

The rule emerged during the 702Xchange Tier 6A through Tier 7A-1 build sessions on 2026-05-17 and proved durable across multiple commits, deploys, and content patches. See `docs/prompt-master-status.md` Tier R2 appendix for the build-session timeline.

The rule is session-scoped — it does not persist across sessions and must be re-invoked explicitly each time it applies.

## When to Use

- Multi-phase build sessions where the user is actively present and reviewing
- Phases where each commit stays inside a small, explicitly-approved file scope
- Phases where lint, type-check, and build are reliable and run quickly
- Builds where the user wants Claude to advance through Gate 1 → commit → push without typing "yes" or "1" between each step
- Builds where commit messages can be derived from the approved scope

## When NOT to Use

- First-time work in an unfamiliar repo or stack
- Sessions where the user is not actively present and reviewing
- Any phase touching forbidden surfaces from the Hard Stop List below
- Phases where validation (lint, type-check, build) is unreliable or slow
- Phases where the scope is ambiguous or evolving mid-session
- High-stakes deploys or production releases — always pause for explicit approval

## Low-Risk Conditions Required Before Standing Approval Applies

Standing approval applies to a phase only when ALL of the following are true:

1. The planned work stays inside the exact approved file scope
2. The working tree is clean before the phase starts
3. Gate 1 finds no blockers
4. Gate 2 matches the approved scope and does not introduce new file targets
5. Gate 3 passes lint, type-check, and build
6. Prompt 07 QA passes
7. Prompt 08 is not required
8. No package install is needed
9. No deploy command is needed
10. No app route, metadata, schema, sitemap, robots, canonical, Cloudflare config, lib/data, public asset, docs, or business logic changes are introduced unless explicitly approved in the prompt

If any condition is false, the rule does not apply for that phase. Pause and ask for explicit approval.

## Hard Stop List — You Must Still Pause For Explicit Approval Before

Even when standing approval is in effect, the following actions always require a separate explicit approval message:

- Running `npm install`
- Running `npm audit fix`
- Running `npm run cf:deploy` (or any deploy script)
- Running `wrangler deploy`
- Editing `package.json` or `package-lock.json`
- Editing Cloudflare config (`wrangler.jsonc`, `open-next.config.ts`, `next.config.mjs`, `postcss.config.mjs`)
- Editing app routes (any `app/**` page, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`), metadata, schema, sitemap, robots, or canonical logic
- Editing `lib/data/listings.ts` or adding real listing data
- Adding image assets to `public/`
- Adding API integrations
- Adding GHL, Supabase, Stripe, Places API, GBP API, or any external service wiring
- Creating new pages or changing routing
- Making any change outside the approved file scope for the current phase
- Committing if validation (lint, type-check, build) fails
- Using `git add .`
- Using `git add -A`
- Force-pushing to any protected branch
- Deleting files
- Modifying Site OS Master repo from inside a client-build session
- Modifying a different client repo from inside the current client-build session

## File-Scope Discipline

Standing approval depends on rigorous file-scope discipline:

- Each phase must declare an exact file list before Gate 2 plan begins
- Gate 2 plan must not introduce file targets that were not in the Gate 1 scope
- Gate 3 implementation must touch only those exact files
- Staging must use explicit per-file `git add <file>` invocations
- If a Gate 3 diff reveals an unexpected file modification, stop and report before staging anything

## Git Staging and Commit Rules

When standing approval is in effect:

- Stage only explicitly approved files (one `git add <file>` invocation per file, or one `git add <file1> <file2>` invocation listing all approved files explicitly)
- Verify staged scope via `git diff --cached --name-only` before commit
- Commit only after Prompt 07 QA passes (or equivalent validation)
- Use a commit message derived from the approved scope (typically a conventional-commit prefix matching the surrounding repo's commit style)
- Push only after commit succeeds locally
- Confirm `git status` is clean and `git rev-parse --short HEAD` matches the new commit after push completes

## Deployment Exceptions

Standing approval does not extend to production deployment. Deploys always require explicit approval, even if all other low-risk conditions hold.

When a deploy is approved separately, follow `checklists/deploy-workflow-checklist.md` (build before deploy, never `cf:deploy` alone) and then run `checklists/post-deploy-production-verification-checklist.md` to verify production content matches source.

## Session-Scoped Nature

Standing approval is invoked per session. It does not persist across session boundaries. It does not transfer between Claude conversations.

To re-invoke in a new session, the user must explicitly re-state the rule. The recommended language is in the next section.

## Copy-Paste-Ready Standing Approval Language

The user may copy the following template into the first relevant prompt of a session to invoke the standing approval rule:

```
Standing approval rule for this session:

For this [CLIENT/PROJECT] build session, you may proceed automatically from Gate 1 → Gate 2 → Gate 3 → Prompt 07 QA → commit/push when all of the following are true:

1. The planned work stays inside the exact approved file scope.
2. The working tree is clean before the phase starts.
3. Gate 1 finds no blockers.
4. Gate 2 matches the approved scope and does not introduce new file targets.
5. Gate 3 passes lint, type-check, and build.
6. Prompt 07 QA passes.
7. Prompt 08 is not required.
8. No package install is needed.
9. No deploy command is needed.
10. No app route, metadata, schema, sitemap, robots, canonical, Cloudflare config, lib/data, public asset, docs, or business logic changes are introduced unless explicitly approved in the prompt.

You do not need to ask me to type yes/1 between these low-risk internal workflow steps.

However, you must still stop and ask for explicit approval before:
- running npm install
- running npm audit fix
- running npm run cf:deploy
- running wrangler deploy
- editing package.json or package-lock.json
- editing Cloudflare config
- editing app routes, metadata, schema, sitemap, robots, or canonical logic
- editing lib/data/listings.ts or adding real listing data
- adding image assets
- adding API integrations
- adding GHL, Supabase, Stripe, Places API, GBP API, or external service wiring
- creating new pages or changing routing
- making changes outside the approved file scope
- committing if validation fails
- using git add .
- using git add -A
- force pushing
- deleting files

Commit rules:
- Stage only explicitly approved files.
- Use file-specific git add commands only.
- Commit only after Prompt 07 QA passes.
- Push only after commit succeeds.
- Never deploy unless I explicitly say deploy.
```

## Cross-References

- `checklists/deploy-workflow-checklist.md` — deploys require explicit approval; this checklist governs the procedure once approval is granted
- `checklists/post-deploy-production-verification-checklist.md` — required after every deploy regardless of standing approval status
- `efficiency-governor/client-intake-gate.md` — must clear before any standing approval phase begins on a new client build
- `docs/client-repo-doc-structure.md` — recommended target for storing client-specific approvals, outputs, QA reports, and changelog entries

---

Site OS Master — Standing Approval Rule Template v1.0
Status: Tier R2 Final Readiness Patch — implemented 2026-05-17
Reason for creation: codify the standing approval pattern proven during the 702Xchange Tier 6A through Tier 7A-1 build sessions on 2026-05-17
