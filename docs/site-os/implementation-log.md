# Pest Control Inc — Site OS Implementation Log

## Log Format
One entry per batch or major session.

---

### 2026-05-18 — Site OS Scaffold + Input Files

- Scaffold: docs/site-os/{inputs,outputs,qa,changelog} created
- Inputs committed: pci-launch-readiness-site-build-list.md, page-list.md,
  pci-brand-style-reference.md, pci-build-context.md
- QA note: soft-404 catch-all (open issue)
- HEAD at commit: fc6d937
- .gitignore fix: build/ → /build/

---

### 2026-05-18 — Client-Side Prompt System Adopted

- Source standard: docs/client-repo-prompt-system-standard.md (Site OS Master)
- Files created: 10 workflow/policy docs, 5 batch build prompts (PCI-adapted),
  9 verbatim prompts, 3 reference docs, 3 checklists, 1 decision doc,
  implementation-log.md
- No app code or constants changed
- Ready for review before commit

---

### 2026-05-19 — Batch 2 Phase 1 — Soft-404 Fix + Utility Pages

- Pages built: 6
  - _redirects (repo root) — Cloudflare Pages catch-all, true 404 for unmatched paths
  - 404.html — branded 404 page, noindex
  - thank-you/index.html — post-submission confirmation, noindex
  - privacy-policy/index.html — legal Level 1, TODO-VERIFY: effective date + legal review
  - terms-of-use/index.html — legal Level 1, TODO-VERIFY: effective date + legal review
  - sitemap/index.html — HTML sitemap with coming-soon states
- Workflow: Fast Build Batch — Light Utility Gate PASS
- Cloudflare Pages publish directory: / (repo root — confirmed in dashboard)
- Commit: b31ac61 — pushed ✅

Open items:
- TODO-VERIFY: effective date + legal review on both legal pages before launch
- LAUNCH BLOCKER: /free-estimate/ and /contact/ — awaiting form handler endpoint

---

### 2026-05-19 — Batch 2 Phase 1 — Post-Deploy Verification

- Staging verification: all 8 routes confirmed live on pestcontrolinc-site.pages.dev
- HEAD at verification: 6b840ea

| Route | Status | Notes |
|---|---|---|
| /this-page-cannot-exist-zzzqqq/ | 404 ✅ | catch-all working |
| /scorpion-exterminator-las-vegas/ | 404 ✅ | unbuilt page returns real 404 |
| /ant-exterminator-las-vegas/ | 200 ✅ | built page serves normally |
| /404.html | 308 → 200 ✅ | Cloudflare strips .html — expected |
| /thank-you/ | 200 ✅ | |
| /privacy-policy/ | 200 ✅ | |
| /terms-of-use/ | 200 ✅ | |
| /sitemap/ | 200 ✅ | |

- Production (www.pestcontrolinc.net): still on WP Engine — platform migration required
  before any repo pages are live to real users. Tracked in
  docs/site-os/qa/2026-05-18-soft-404-catch-all.md.

#### Batch 2 session commit log
- b31ac61 feat(batch-2): add 404, _redirects catch-all, thank-you, privacy-policy, terms-of-use, sitemap pages
- e2eb4ba docs(site-os): update implementation log and soft-404 QA note with production platform finding
- 6b840ea fix(batch-2): normalize en-dash and middot entities to literal Unicode in Batch 2 pages

#### Remaining Batch 2 pages (next session)
- /reviews/ — Trust Level 3 — no blockers
- /specials/ — Offer Level 3 — no blockers
- /free-estimate/ — Conversion Level 4 — LAUNCH BLOCKER: awaiting form handler endpoint
- /contact/ — Conversion Level 4 — LAUNCH BLOCKER: awaiting form handler endpoint

---

### 2026-05-19 — Batch 3 Routing Finalized — All Species Pages Level 4 Minimum

- Trigger: operator direction — "do it right the first time instead of coming back later"
- SERP audit confirmed active competitor pages on cockroach, rodent, termite, spider,
  bed bug from Terminix, Orkin, Alta, Fischer's, Red Rock, Fortified, Axis, Burns,
  and Progressive Pest Control
- Claude Code audit of /ant-exterminator-las-vegas/ confirmed the existing ant page
  passes the 9-section / 4-schema spec floor with one gap (no dedicated Why PCI section)
  and one schema flag (AggregateRating reviewCount 65 should be 30 — Google only)
- Decision: all 15 unbuilt species pages elevated to Level 4 minimum — no Level 3 pages
  in Batch 3
- Scorpion remains Level 5 (unchanged)
- Ant page retrofit (Why PCI section, extended FAQs, reviewCount fix) scheduled as
  separate task after Batch 3 is complete
- File updated: docs/site-os/prompts/build/batch-3-service-pages-prompt.md

#### Final Batch 3 routing table

| Page | Final Depth | Change from original |
|---|---|---|
| /scorpion-exterminator-las-vegas/ | Level 5 | Unchanged |
| /cockroach-exterminator-las-vegas/ | Level 4 | Elevated from Level 3 |
| /rodent-exterminator-las-vegas/ | Level 4 | Elevated from Level 3 |
| /termite-exterminator-las-vegas/ | Level 4 | Elevated from Level 3 |
| /spider-exterminator-las-vegas/ | Level 4 | Elevated from Level 3 |
| /bed-bug-exterminator-las-vegas/ | Level 4 | Elevated from Level 3 |
| /wasp-exterminator-las-vegas/ | Level 4 | Elevated from Level 3 |
| /bee-removal-las-vegas/ | Level 4 | Elevated from Level 3 |
| /bird-removal-las-vegas/ | Level 4 | Elevated from Level 3 |
| /earwig-exterminator-las-vegas/ | Level 4 | Elevated from Level 3 |
| /hornet-exterminator-las-vegas/ | Level 4 | Elevated from Level 3 |
| /miller-moth-exterminator-las-vegas/ | Level 4 | Elevated from Level 3 |
| /crane-fly-exterminator-las-vegas/ | Level 4 | Elevated from Level 3 |
| /false-chinch-bug-exterminator-las-vegas/ | Level 4 | Elevated from Level 3 |
| /springtail-exterminator-las-vegas/ | Level 4 | Elevated from Level 3 |

#### Level 4 standard applied to all pages
- 10 required sections (up from 9-section floor)
- Dedicated Why PCI section (new requirement)
- Competitor differentiation section (new requirement)
- Minimum 8 FAQs (up from 5)
- Full pass/fail gate before every commit
- AggregateRating: Google 5.0 / reviewCount 30 only

#### Ant page open items (retrofit — separate task)
- Add dedicated Why PCI section
- Add competitor differentiation section
- Extend FAQs to 8+ minimum
- Fix AggregateRating reviewCount: 65 → 30 (Google only)
- Schedule after Batch 3 complete

---

### 2026-05-19 — Batch 3 Build: /termite-exterminator-las-vegas/

- Route: /termite-exterminator-las-vegas/
- AI Depth: Level 4
- Commit: 18705e4
- File: termite-exterminator-las-vegas/index.html (947 lines)

#### Keyword map (top primary)
1. termite exterminator las vegas
2. subterranean termite treatment las vegas
3. drywood termite las vegas / WDI inspection las vegas

#### Pass/fail gate — ALL PASS
- Sections: 12 `<section>` blocks present (exceeds 10-section minimum)
- FAQ visible count: 9
- FAQ schema Question count: 9 (matches exactly)
- Schema types: LocalBusiness, Service, FAQPage, BreadcrumbList, HowTo (5 entities — all 4 required + HowTo)
- AggregateRating reviewCount: "30" (Google only — single match)
- Canonical: https://pestcontrolinc.net/termite-exterminator-las-vegas/
- Phone `(702) 228-4394`: 18 instances (hero, trust bar, form card, signs callout, why-CTA, final CTA, footer)
- `tel:+17022284394`: 15 instances
- robots: index, follow
- aria-current="page": 2 locations (related-pages chip + footer Termite Control link)
- TODO-LAUNCH-BLOCKER: 1 (form placeholder)
- Raw em-dashes: 0 (all `&mdash;`)
- Raw en-dashes: 0 (all `&ndash;`)
- No-fake-data: founding year CLEAN, EPA registration CLEAN, pricing CLEAN
- No named individuals

#### Termite-specific page additions vs scorpion template
- Section 5 (Damage + Warning): 3-card damage grid + critical "do not disturb" warning callout
- Section 6 (Signs): navy-background signs section with numbered list + Las Vegas year-round activity callout
- Trust bar item 5: "WDI Reports" (VA / FHA / Conventional) — replaces scorpion's generic 24/7 line
- Hero trust chip: "WDI Reports Available" — supports lender-driven search intent
- HowTo schema step 3 specifically calls out WDI report availability for VA/FHA/conventional
- Form select includes "WDI report needed for home sale or refinance" option

#### Open TODOs
- Form endpoint not wired (disabled fields + TODO-LAUNCH-BLOCKER comment) — site-wide launch blocker
- /spider-exterminator-las-vegas/ linked as pending chip (next-up after termite per build order)
- OG image asset: /assets/images/og-termite-exterminator-las-vegas.jpg — placeholder URL, asset not yet produced
- /about/health-conscious-service-program/ linked from program section — destination page not yet built

#### Next page per build order
- /spider-exterminator-las-vegas/ — Level 4

---

### 2026-05-19 — Batch 3 Build: /spider-exterminator-las-vegas/

- Route: /spider-exterminator-las-vegas/
- AI Depth: Level 4
- Commit: a5bcd7d
- File: spider-exterminator-las-vegas/index.html (965 lines)

#### Keyword map (top primary)
1. spider exterminator las vegas
2. black widow exterminator las vegas / black widow control
3. brown recluse las vegas (accuracy-corrective informational intent)

#### Pass/fail gate — ALL PASS
- Sections: 12 `<section>` blocks present (exceeds 10-section minimum)
- FAQ visible count: 9
- FAQ schema Question count: 9 (matches exactly)
- Schema types: LocalBusiness, Service, FAQPage, BreadcrumbList, HowTo (5 entities — all 4 required + HowTo)
- AggregateRating reviewCount: "30" (Google only — single match)
- Canonical: https://pestcontrolinc.net/spider-exterminator-las-vegas/
- Phone `(702) 228-4394`: 20 instances
- `tel:+17022284394`: 16 instances
- robots: index, follow
- aria-current="page": 2 locations (related-pages chip + footer Spider Control link)
- TODO-LAUNCH-BLOCKER: 1 (form placeholder)
- Raw em-dashes: 0 (all `&mdash;`)
- Raw en-dashes: 0
- No-fake-data: founding year CLEAN, EPA registration CLEAN, pricing CLEAN
- No named individuals
- **ACCURACY CHECK PASS:** "brown recluse not established in Las Vegas" stated explicitly in 4 locations — AEO opening paragraph, AEO callout card 2, species card 2, and FAQ Q2 schema + visible body

#### Spider-specific page additions vs scorpion template
- AEO section adds two-card callout grid below the answer block: medical-risk callout (black widow) and myth-correction callout (brown recluse not established) — supports both safety intent and misinformation correction in one viewport
- New Section 5 ("Spiders as indicator species") with custom `.indicator-feature` callout block including a visual food chain (`Outdoor Lighting / Irrigation → Crickets / Cockroaches / Silverfish → Spiders`) — content angle competitors do not address
- Black widow handling warning in form-card-alt and signs-note ("Do not handle even if dead — venom remains potent")
- Trust bar item 5: "24/7 Black Widow Emergency" — emergency framing specific to spider page
- Section 4 (Species) uses 3-card layout matching scorpion pattern; card 3 ("neutral" variant) introduced for harmless indicator-species spiders

#### Open TODOs
- Form endpoint not wired (disabled fields + TODO-LAUNCH-BLOCKER comment) — site-wide launch blocker
- /termite-exterminator-las-vegas/ now built but appears as pending chip per content brief — verify intentionally or update next build
- /bed-bug-exterminator-las-vegas/ linked as pending chip (next-up per build order)
- OG image asset: /assets/images/og-spider-exterminator-las-vegas.jpg — placeholder URL, asset not yet produced
- /about/health-conscious-service-program/ linked from program section — destination page not yet built

#### Next page per build order
- /bed-bug-exterminator-las-vegas/ — Level 4

---

### 2026-05-19 — Batch 3 Build: /bed-bug-exterminator-las-vegas/

- Route: /bed-bug-exterminator-las-vegas/
- AI Depth: Level 4
- Commit: aeceb16
- File: bed-bug-exterminator-las-vegas/index.html (939 lines)

#### Keyword map (top primary)
1. bed bug exterminator las vegas
2. bed bug heat treatment las vegas
3. bed bug treatment las vegas / apartment + multi-unit intent

#### Pass/fail gate — ALL PASS (with policy judgment call documented below)
- Sections: 12 `<section>` blocks present (exceeds 10-section minimum)
- FAQ visible count: 9
- FAQ schema Question count: 9 (matches exactly)
- Schema types: LocalBusiness, Service, FAQPage, BreadcrumbList, HowTo (5 entities)
- AggregateRating reviewCount: "30" (Google only — single match)
- Canonical: https://pestcontrolinc.net/bed-bug-exterminator-las-vegas/
- Phone `(702) 228-4394`: 15 instances
- `tel:+17022284394`: 12 instances
- robots: index, follow
- aria-current="page": 2 locations (related-pages chip + footer Bed Bug Control link)
- TODO-LAUNCH-BLOCKER: 1
- Raw em-dashes: 0 (all `&mdash;`)
- Raw en-dashes: 0 (all `&ndash;`)
- No-fake-data: founding year CLEAN, EPA registration CLEAN, pricing CLEAN
- No named individuals

#### Bed-bug-specific policy enforcement (excluded from free-first-service offer)
- Top bar badge: links to `/free-estimate/` (not `/specials/`); copy reads "Free Inspection &rarr;" (not "Free First Service &rarr;")
- Hero CTAs: secondary CTA copy is "Free Inspection &rarr;" not "Free First Service"
- Footer Company column: `/specials/` link removed from this page only
- Zero `href="/specials/"` links anywhere in the document
- Zero visitor-visible "Free First Service" copy
- **HTML comments retained at top of `<body>` and above `<footer>` documenting the policy decision** — these are not visitor-visible and serve to prevent future developers from accidentally re-adding the specials link/badge. Spirit-reading of the policy. If strict reading required, strip in follow-up.

#### Bed-bug-specific page additions vs scorpion template
- New Section 4 "Why Las Vegas Has a Bed Bug Problem" with 3 risk-factor cards (tourism, multi-unit housing, used furniture) — supports both informational intent and reinfestation-prevention education
- New Section 5 "Identification" with a 2-column layout: appearance card (blue-light callout) + numbered signs list — visually distinct from species cards used on other pages
- New Section 6 "Treatment Options" with a dark-navy 2-card comparison (heat vs chemical) including tag chips per method and a closing "How PCI recommends" callout
- Trust bar item 5: "Heat & Chemical Treatment Options" — supports both treatment-search intents
- Form select includes apartment/multi-unit and commercial options; "Confirmed bed bugs &mdash; need treatment" listed first
- Heading copy: "Suspect Bed Bugs? Don't Spray &mdash; Confirm First." — anti-DIY framing reinforces the AEO opening

#### Open TODOs
- Form endpoint not wired (TODO-LAUNCH-BLOCKER comment present) — site-wide launch blocker
- /termite-exterminator-las-vegas/ and /spider-exterminator-las-vegas/ both now built but appear as pending chips per content brief — verify intentionally or update next build
- OG image asset: /assets/images/og-bed-bug-exterminator-las-vegas.jpg — placeholder URL
- /about/health-conscious-service-program/ linked from program section — destination page not yet built

#### Policy enforcement open item
- Confirm with operator whether HTML-comment references to "specials" and "free first service" (used to document policy compliance) are acceptable or must be stripped. Current implementation keeps them as defensive documentation. Easy revert if strict reading is preferred.

#### Next page per build order
- /wasp-exterminator-las-vegas/ — Level 4

---

### 2026-05-19 — Batch 3 Build: /wasp-exterminator-las-vegas/

- Route: /wasp-exterminator-las-vegas/
- AI Depth: Level 4
- Commit: ba99350
- File: wasp-exterminator-las-vegas/index.html

#### Keyword map (top primary)
1. wasp exterminator las vegas
2. yellow jacket nest removal las vegas
3. paper wasp removal las vegas

#### Pass/fail gate — ALL PASS
- Sections: 12 `<section>` blocks present (exceeds 10-section minimum)
- FAQ visible count: 8
- FAQ schema Question count: 8 (matches exactly)
- Schema types: LocalBusiness, Service, FAQPage, BreadcrumbList, HowTo (5 entities)
- AggregateRating reviewCount: "30" (Google only — single match)
- Canonical: https://pestcontrolinc.net/wasp-exterminator-las-vegas/
- Phone `(702) 228-4394`: 18 instances
- `tel:+17022284394`: 14 instances
- robots: index, follow
- aria-current="page": 2 locations (related-pages chip + footer Wasp Control link)
- TODO-LAUNCH-BLOCKER: 1 (form placeholder)
- Raw em-dashes: 0 (all `&mdash;`)
- Raw en-dashes: 0
- No-fake-data: founding year CLEAN, EPA registration CLEAN, pricing CLEAN
- No named individuals
- **SCOPE CHECK PASS:** no substantive bee or hornet content — only quick differentiators ("Wasps are not bees", "Unlike honey bees, wasps do not lose their stinger") and explicit cross-page links: Section 4 intro paragraph routes to `/bee-removal-las-vegas/` and `/hornet-exterminator-las-vegas/`; both also appear as pending chips in Section 10

#### Wasp-specific page additions vs scorpion template
- AEO section adds two-card callout grid below the answer block: high-risk yellow-jacket alarm-pheromone callout and allergic-reaction (anaphylaxis) callout — supports stinger-safety AEO intent
- New Section 4 uses 2-card species layout (not 3-card) — wasp brief explicitly limits to yellow jacket and paper wasp
- New Section 5 "Danger + Do Not" with two-column layout: left column is a 4-item danger-points list with orange left-border cards; right column is a navy "Do Not" card with X-marker list + active-nest emergency call-to-action subcard — combines two-distinct-but-related safety blocks in one section
- New Section 6 "Where Wasps Nest in Las Vegas" with 8 numbered location cards on a 4-column grid — replaces the scorpion page's 6 "risk factor" cards; content is more actionable (inspection-checklist framing) than abstract risk-factor framing
- Trust bar item 5: "24/7 Wasp Emergency" — emergency framing specific to wasp page
- Form select includes both species-specific options ("Yellow jackets in ground or wall void", "Paper wasps under eaves or patio cover") and a sting-occurred option

#### Open TODOs
- Form endpoint not wired (TODO-LAUNCH-BLOCKER comment present) — site-wide launch blocker
- /bee-removal-las-vegas/ and /hornet-exterminator-las-vegas/ linked as pending chips (next-up per build order — bee is next per Batch 3 sequence)
- OG image asset: /assets/images/og-wasp-exterminator-las-vegas.jpg — placeholder URL, asset not yet produced
- /about/health-conscious-service-program/ linked from program section — destination page not yet built

#### Next page per build order
- /bee-removal-las-vegas/ — Level 4
