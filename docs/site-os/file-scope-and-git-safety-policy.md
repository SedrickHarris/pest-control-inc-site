# File-Scope and Git Safety Policy

A standalone universal policy covering file-scope discipline, correct-repo working directory rules, staging and commit discipline, push safety, force-push restrictions, and cross-repo separation. Applies to every Site OS Master client build regardless of session, stack, or workflow mode.

## Purpose

Prevent scope drift, accidental file changes, accidental cross-repo modifications, dirty-tree commits, force-push damage to protected branches, and lossy Git operations during multi-phase client builds.

This policy is the canonical reference for Git safety and file-scope discipline. It consolidates rules previously embedded in the standing approval rule template (session-scoped) and the deploy workflow checklist (deploy-specific) into a single universal home that other docs and sessions can cross-reference.

## When to Use

This policy applies to every Site OS Master client build. There is no opt-in step and no session-scoped framing. The rules below are the baseline for:

- Strategy sessions that read or modify files in either Site OS Master or a client repo
- Build phases that produce code, docs, or configuration changes
- Deploy sequences (in addition to `checklists/deploy-workflow-checklist.md`)
- Standing-approval-active sessions (in addition to `docs/standing-approval-rule-template.md`)
- One-off ad-hoc edits and quick fixes

The policy applies regardless of which workflow mode (Fast, Core, Beyond-Elite, Full Competitive Build) governs the current phase.

## 1. Core File-Scope Principles

1. Each phase declares an exact file list before any edit begins
2. Edits stay inside the declared file list — no scope drift
3. If new file targets emerge mid-phase, pause and surface them before editing
4. Validate the diff after each edit set; do not stage anything if the diff reveals unexpected files
5. Treat the approved scope as a contract — narrowing is acceptable; expanding requires explicit re-approval

## 2. Correct Repo Discipline

Site OS Master and client repos serve different purposes:

- **Site OS Master** (`site-os-master/`) is the workflow and prompt source-of-truth. It has no production website. Do not deploy from here. Do not modify Site OS Master files while in the middle of a client-build session unless Site OS Master itself is the explicit target.
- **Client site repo** (`client-sites/<client>/`) contains the client website code and client-specific Site OS artifacts (per `docs/client-repo-doc-structure.md`). All client website changes, builds, and deploys happen here.

Rules:

- Before any file write, verify the current working directory matches the intended repo
- If multiple client repos exist on the same machine, double-check the client identity before editing
- Never modify a different repo than the one approved for the current phase

## 3. Windows Chained-`cd` Rule

On Windows, the shell harness used by Claude Code resets the current working directory between command invocations. Every command that depends on a specific repo must explicitly `cd` into that repo as part of the same invocation:

```
cd "C:\path\to\<repo>"; <command>
```

Verify cwd after any `cd` if there is any doubt:

```
cd "C:\path\to\<repo>"; pwd
```

This applies to all `git`, `npm`, build, deploy, and other CLI commands.

## 4. Git Status Checks Before Work

Before any edit, commit, push, or deploy, run these verification commands and confirm the output matches expectations:

- `git status` — confirm working tree state (clean before a new phase starts; expected modifications before staging)
- `git rev-parse --short HEAD` — confirm HEAD matches the intended baseline
- `git log --oneline -<n>` — confirm recent commits match the build history
- `git diff --name-only` — confirm tracked-file modifications
- `git ls-files --others --exclude-standard` — confirm untracked files

If any output is unexpected, pause and surface the discrepancy before proceeding.

## 5. Explicit Staging Rules

Stage only explicitly-named files. Use one of these patterns:

```
git add path/to/file1
git add path/to/file1 path/to/file2 path/to/file3
```

Never use:

- `git add .`
- `git add -A`
- `git add *`
- `git add :/`

Even when the working tree only contains expected modifications, explicit file paths prevent accidental staging of untracked or unrelated changes that may appear between status check and stage. The principle is "only explicitly-named files" — apply it to any wildcard pattern not listed above.

After staging, verify scope before commit:

```
git diff --cached --name-only
git diff --cached --stat
```

The cached-name-only output must exactly match the approved file scope. If it does not, unstage and re-stage explicitly.

## 6. Commit Safety Rules

- Commit only after validation passes (lint, type-check, build, QA — per the phase's validation requirements)
- Use a commit message that matches the surrounding repo's commit style (typically conventional commits: `feat(scope):`, `fix(scope):`, `docs(scope):`, `chore(scope):`)
- Verify the commit landed cleanly:

```
git rev-parse --short HEAD
git show --stat --name-only <new-hash>
```

- Never amend a previously-pushed commit
- Never rewrite history on a shared branch (rebase, squash, reset --hard) without explicit approval

## 7. Push Safety Rules

- Push only after the commit succeeds locally
- Use the simplest form: `git push origin <branch>` (typically `git push origin main`)
- Confirm the push transcript matches the expected ref update: `<old-hash>..<new-hash>  <branch> -> <branch>`
- Confirm post-push state:

```
git status
git rev-parse --short HEAD
```

Both should show clean tree and the new HEAD synchronized with the remote.

## 8. Force-Push Policy

**Never force-push to `main` or `master`.** These branches represent the canonical production history of the repo and must never be rewritten.

Force-push to other branches may be governed by project convention:

- Some projects also protect `production`, `release/*`, or `develop` — never force-push these without explicit approval
- Feature branches (typically `feature/*`, `feat/*`) and personal branches may allow force-push per the team's branching convention
- When in doubt, ask before force-pushing any branch

If a force-push to `main`/`master` is genuinely necessary (e.g., to remove a secret accidentally committed), it requires explicit owner approval, must be coordinated with all repo users, and should be followed by remote backup verification.

## 9. Dirty Working Tree Rules

A clean working tree is the default precondition for starting a new phase.

- Before starting a new phase, confirm `git status` reads `nothing to commit, working tree clean`
- If the tree is dirty, surface every modified or untracked path before proceeding
- Do not start a new phase on top of unrelated dirty changes — finish or stash them first
- Do not commit if the staged scope does not match the approved scope
- Do not stash and silently discard changes — surface them for explicit decision

## 10. Stop Conditions

Stop and pause for explicit approval if any of the following are true:

- The intended HEAD does not match the actual HEAD
- The working tree is dirty in unexpected ways
- A staged file is outside the approved scope
- A required validation (lint, type-check, build) failed
- A push attempts to update a protected branch with a force-push
- Cross-repo state has changed unexpectedly
- Any planned write would touch a file outside the approved scope
- Any planned operation would delete files without explicit approval

## 11. Cross-Repo Separation

Two repos are commonly involved in a Site OS Master client build:

- Site OS Master at the SOM filesystem path
- The client site repo at the client filesystem path

These repos must remain separate:

- Do not modify Site OS Master from inside a client-build session unless Site OS Master itself is the explicit target of the current phase
- Do not modify a different client repo from inside the current client-build session
- After every phase, verify the unaffected repo's `git status` and HEAD are unchanged

When a phase legitimately spans both repos (rare), declare it explicitly in Gate 1, gate Gate 2 plan against both repos, and stage / commit each repo separately with its own scoped file list. Never stage files from both repos in a single `git add` command (each repo has its own `.git` directory and separate working tree — Git will refuse the operation, but the intent itself is a scope-discipline failure).

Paste-ready unaffected-repo verification commands are in §14 below.

## 12. Copy-Paste-Ready Verification Commands

All commands use the chained-`cd` pattern required on Windows.

### Pre-phase baseline check (run from the target repo)

```
cd "<repo>"; git status
cd "<repo>"; git rev-parse --short HEAD
cd "<repo>"; git log --oneline -5
```

### Pre-commit scope verification (after edits, before staging)

```
cd "<repo>"; git diff --name-only
cd "<repo>"; git diff --stat
cd "<repo>"; git ls-files --others --exclude-standard
```

### Post-stage scope verification (after `git add <files>`, before commit)

```
cd "<repo>"; git diff --cached --name-only
cd "<repo>"; git diff --cached --stat
```

### Post-commit and post-push verification

```
cd "<repo>"; git status
cd "<repo>"; git rev-parse --short HEAD
cd "<repo>"; git show --stat --name-only <new-hash>
```

### Unaffected-repo verification (when running in one repo, confirm the other repo is untouched)

```
cd "<other-repo>"; git status
cd "<other-repo>"; git rev-parse --short HEAD
```

Run the unaffected-repo verification both before starting a phase (to confirm baseline) and after each commit (to confirm no accidental cross-repo modification).

## Related Files

- `CLAUDE.md` — establishes higher-level Site OS Master behavior and editing discipline; this policy doc covers Git safety and file-scope specifics
- `docs/standing-approval-rule-template.md` — session-scoped rule that defers low-risk approvals; depends on this policy for its file-scope and Git safety baseline
- `checklists/deploy-workflow-checklist.md` — applies this policy specifically to production deploy operations
- `checklists/post-deploy-production-verification-checklist.md` — applies this policy specifically to post-deploy verification operations
- `docs/client-repo-doc-structure.md` — defines the Site OS Master / client repo separation pattern this policy enforces

---

Site OS Master — File-Scope and Git Safety Policy v1.0
Status: Tier R3-1 Final Readiness Patch — implemented 2026-05-17
Reason for creation: consolidate file-scope and Git safety rules into a standalone universal policy proven across the 702Xchange and Site OS Master build sessions on 2026-05-17
