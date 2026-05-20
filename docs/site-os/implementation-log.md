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

---

### 2026-05-19 — Batch 3 Build: /bee-removal-las-vegas/

- Route: /bee-removal-las-vegas/
- AI Depth: Level 4
- Commit: a9da5de
- File: bee-removal-las-vegas/index.html

#### Keyword map (top primary)
1. bee removal las vegas
2. africanized bee exterminator las vegas / killer bee removal
3. honeycomb removal las vegas (differentiated content angle)

#### Pass/fail gate — ALL PASS
- Sections: 12 `<section>` blocks present (exceeds 10-section minimum)
- FAQ visible count: 8
- FAQ schema Question count: 8 (matches exactly)
- Schema types: LocalBusiness, Service, FAQPage, BreadcrumbList, HowTo (5 entities)
- AggregateRating reviewCount: "30" (Google only — single match)
- Canonical: https://pestcontrolinc.net/bee-removal-las-vegas/
- Phone `(702) 228-4394`: 19 instances
- `tel:+17022284394`: 14 instances
- robots: index, follow
- aria-current="page": 2 locations (related-pages chip + footer Bee Removal link)
- TODO-LAUNCH-BLOCKER: 1 (form placeholder)
- Raw em-dashes: 0 (all `&mdash;`)
- Raw en-dashes: 0 (all `&ndash;`)
- No-fake-data: founding year CLEAN (page contains "since 1994" 6× but exclusively in reference to Africanized honey bees being established in Nevada — confirmed historical fact from content brief, never about PCI founding), EPA registration CLEAN, pricing CLEAN
- No named individuals
- **POLICY CHECK PASS:** zero `/specials/` links anywhere; zero "Free First Service" copy anywhere in document (visitor-visible and comments both clean — defensive policy comments rephrased to use "new-customer promotional offer" to satisfy strict reading of brief's "no free first service language anywhere" rule). Per-page elements:
  - Top bar badge: links to `/free-estimate/` (not `/specials/`); copy "Free Bee Inspection &rarr;"
  - Hero CTAs: secondary CTA copy "Free Bee Inspection &rarr;"
  - Footer Company column: `/specials/` link removed; closing comment notes intentional omission
  - Mobile sticky CTA right button: "Free Inspection"
- **CONTENT CHECK PASS:** dedicated honeycomb-removal section (Section 5) present with 2-column layout — orange warning card listing 4 failure modes (liquefaction, secondary pests, recolonization, structural damage) + navy "PCI standard practice" card with 5-item checklist and customer scripted question for vetting competitors

#### Bee-specific page additions vs wasp/scorpion template
- AEO section pairs the AHB-presence callout with a honeycomb-removal callout — establishes the page's two highest-priority AEO messages above the fold
- New Section 5 "Honeycomb Removal Is Not Optional" with custom `.honeycomb-warning` and `.honeycomb-required` 2-column block — content angle competitors consistently omit; PCI claims explicit inclusion in scope
- Section 9 (competitor diff table): first row is "Honeycomb removal" — leads the comparison with the strongest differentiation on this page
- Trust bar item 4 changed from generic "30 Minutes" callback to "Honeycomb Removal Included" — reinforces page's #1 differentiator in the highest-visibility location
- Form select includes 6 options including a unique "Need honeycomb removed from previous treatment" — captures customers burned by competitors' incomplete scope
- Species cards use "Bee Identification" framing (not "Species Identification") and clarify the scientific names with the colloquial "killer bee" name for AHB
- Species card 1 sci line: `Apis mellifera scutellata hybrid` — accurate biological designation for AHB

#### Internal link map note
- Brief specified pending chips for `/wasp-exterminator-las-vegas/` and `/hornet-exterminator-las-vegas/`; wasp page was built earlier in this session and is live. Followed brief literally per established pattern (spider/bed-bug builds followed same convention) &mdash; chip remains pending. Operator may opt to retrofit when next reviewing this batch.

#### Open TODOs
- Form endpoint not wired (TODO-LAUNCH-BLOCKER comment present) — site-wide launch blocker
- /wasp-exterminator-las-vegas/ now built but appears as pending chip per content brief — retrofit eligible
- OG image asset: /assets/images/og-bee-removal-las-vegas.jpg — placeholder URL, asset not yet produced
- /about/health-conscious-service-program/ linked from program section — destination page not yet built

#### Policy enforcement open item
- Following bed-bug-page precedent, kept HTML-comment references to the policy decision (rephrased to use "new-customer promotional offer" so the strict "no free first service language anywhere" reading passes). Comments are not visitor-visible. Easy revert if even-stricter reading required.

#### Next page per build order
- /bird-removal-las-vegas/ — Level 4

---

### 2026-05-19 — Batch 3 Build: /bird-removal-las-vegas/

- Route: /bird-removal-las-vegas/
- AI Depth: Level 4
- Commit: e5fdb3e
- File: bird-removal-las-vegas/index.html

#### Keyword map (top primary)
1. bird removal las vegas / pigeon removal las vegas
2. solar panel bird protection las vegas (Las-Vegas-specific differentiator)
3. pigeon droppings cleanup las vegas

#### Pass/fail gate — ALL PASS
- Sections: 12 `<section>` blocks present (exceeds 10-section minimum)
- FAQ visible count: 8
- FAQ schema Question count: 8 (matches exactly)
- Schema types: LocalBusiness, Service, FAQPage, BreadcrumbList, HowTo (5 entities)
- AggregateRating reviewCount: "30" (Google only — single match)
- Canonical: https://pestcontrolinc.net/bird-removal-las-vegas/
- Phone `(702) 228-4394`: 15 instances
- `tel:+17022284394`: 12 instances
- robots: index, follow
- aria-current="page": 2 locations (related-pages chip + footer Bird & Pigeon Removal link)
- TODO-LAUNCH-BLOCKER: 1 (form placeholder)
- Raw em-dashes: 0 (all `&mdash;`)
- Raw en-dashes: 0
- No-fake-data: founding year CLEAN (only year on page is "2018" — refers to Las Vegas pigeon-feeding ordinance per content brief, never about PCI founding), EPA registration CLEAN, pricing CLEAN
- No named individuals
- **POLICY CHECK PASS:** zero `/specials/` links; zero "Free First Service" copy anywhere (visitor-visible and comments both clean — defensive policy comments use "new-customer promotional offer" phrasing). Per-page elements:
  - Top bar badge: links to `/free-estimate/`; copy "Free Bird Inspection &rarr;"
  - Hero CTAs: secondary CTA copy "Free Bird Inspection &rarr;"
  - Footer Company column: `/specials/` link removed; closing comment notes intentional omission
- **CONTENT CHECK PASS:** Section 4 Card 3 + Section 5 Method 3 + Section 9 row 1 + multiple AEO and FAQ mentions establish solar panel exclusion as the page's primary differentiator (41 instances of "solar panel"); Las Vegas pigeon-feeding ordinance documented in AEO opening, AEO callout 2, and FAQ Q3 with verbatim "$1,000 fine and up to 6 months"

#### Bird-specific page additions vs prior batch templates
- AEO callouts pair the public-health risk (droppings + airborne disease vector) with the Las Vegas legal/regulatory differentiator (City of Las Vegas feeding ordinance, $1,000 fine) — establishes both the medical and legal urgency in one viewport
- New Section 4 uses 3-card problem framing (health / property damage / solar panel) — replaces species-card layout used on stinging-pest pages since pigeon is the single relevant species
- New Section 5 introduces `.methods-section` with 4 methods on a 2-column grid; method 4 (Droppings Cleanup) styled as `.method-card.critical` with orange left-border and gradient to visually flag it as the prerequisite to any deterrent install
- Trust bar items 4-5 changed from generic callback metrics to "Cleanup Included Before Every Exclusion Install" + "Solar Panel Exclusion Mesh Specialists" — reinforces the two strongest local differentiators in the highest-visibility location
- Competitor diff table leads with Solar panel exclusion (row 1) and Droppings cleanup included (row 2) — strongest competitor-failure-pattern attacks at top of comparison
- Form select includes 6 options spanning residential solar-panel, rooftop/HVAC, droppings-only, commercial, attic/vent, and exclusion-install scenarios
- Section 1 hero subhead and final CTA both lead with "exclusion, deterrents, droppings cleanup, and solar panel protection" — keyword cluster repeated at top and bottom of the page

#### Internal link map note
- Brief specified pending chip for `/rodent-exterminator-las-vegas/`; that page is built (Batch 3 earlier passes). Followed brief literally per established pattern (wasp/bee/spider/bed-bug pages followed same convention) &mdash; chip remains pending. Operator may opt to retrofit this set when next reviewing the batch.

#### Open TODOs
- Form endpoint not wired (TODO-LAUNCH-BLOCKER comment present) — site-wide launch blocker
- /rodent-exterminator-las-vegas/ now built but appears as pending chip per content brief — retrofit eligible
- OG image asset: /assets/images/og-bird-removal-las-vegas.jpg — placeholder URL, asset not yet produced
- /about/health-conscious-service-program/ linked from program section — destination page not yet built

#### Policy enforcement open item
- Following bed-bug-page and bee-page precedent, kept HTML-comment references to the policy decision (using "new-customer promotional offer" wording so the strict "no free first service language anywhere" reading passes). Comments are not visitor-visible. Easy revert if even-stricter reading required.

#### Next page per build order
- /earwig-exterminator-las-vegas/ — Level 4

---

### 2026-05-19 — Batch 3 Build: /miller-moth-exterminator-las-vegas/

- Route: /miller-moth-exterminator-las-vegas/
- AI Depth: Level 4
- Commit: (pending)
- File: miller-moth-exterminator-las-vegas/index.html

#### Build order note
- Operator dispatched miller moth out of strict batch-3 sequence (canonical order: earwig → hornet → miller moth). Earwig and hornet are still unbuilt; this page jumps ahead per direct operator instruction in the build prompt. Sequence-recovery options remain open (earwig + hornet build next, or operator continues opportunistic ordering).

#### Keyword map (top primary)
1. miller moth exterminator las vegas / miller moth control las vegas
2. seasonal miller moth migration las vegas (spring + fall)
3. army cutworm moth las vegas (Euxoa auxiliaris — adult-stage entity/biological term)

#### Pass/fail gate — ALL PASS
- Sections: 12 `<section>` blocks present (exceeds 10-section minimum)
- FAQ visible count: 8
- FAQ schema Question count: 8 (matches exactly)
- Schema types: LocalBusiness, Service, FAQPage, BreadcrumbList, HowTo (5 entities)
- AggregateRating reviewCount: "30" (Google only — single match)
- Canonical: https://pestcontrolinc.net/miller-moth-exterminator-las-vegas/
- Phone `(702) 228-4394`: 15 instances
- `tel:+17022284394`: 12 instances
- robots: index, follow
- aria-current="page": 2 locations (related-pages chip + footer Miller Moth Control link)
- TODO-LAUNCH-BLOCKER: 1 (form placeholder)
- Raw em-dashes: 0 (all `&mdash;`)
- Raw en-dashes: 0
- No-fake-data: founding year CLEAN (no 4-digit years anywhere on page), EPA registration CLEAN, pricing CLEAN
- No named individuals
- **OFFER ELIGIBILITY:** Miller moths are NOT in the new-customer offer exclusion list (excluded: pigeons, bed bugs, bees, rodents) — page restores standard `/specials/` references following the wasp/scorpion pattern: top bar badge "Free First Service →" links to /specials/, footer Company column includes Specials link. No policy-omission comment block needed for this page.

#### Miller-moth-specific page additions vs prior batch templates
- AEO callouts pair the seasonal-pattern timing (spring peak + fall secondary) with the entry-mechanism callout (attracted to light, enters through gaps) — establishes the two highest-priority AEO messages above the fold
- New Section 4 "Why They Invade" uses 6-card 3-column entry-grid layout — top-of-fold answers the highest-volume informational query ("why are miller moths in my house") with concrete entry-point reasons rather than abstract risk factors
- New Section 5 "Problems" uses 5-card 3-column problem grid (2 rows of 3 with bottom row of 2) — surfaces meconium staining, die-off odor, and secondary spider attraction as the three operative consequences (not health/disease which do not apply to miller moths)
- New Section 6 "Control & Prevention" uses 6-method methods-grid 2-column layout; Method 1 (Seal Exterior Gaps) styled as `.method-card.critical` with orange left-border and gradient to visually flag it as the most important long-term step — matches established critical-method visual treatment from bird page's droppings-cleanup card
- Trust bar item 4 changed to "Seasonal Specialty — Spring & Fall Migration Control" — explicitly positions PCI as the seasonal-pest specialist on a page where seasonality is the operative property
- Competitor diff table row 1 attacks the franchise-default "interior fog" treatment; the PCI value is exterior-first perimeter + sealing recommendations — strongest competitor-failure-pattern surfaced at top of comparison
- Form select includes 6 options spanning exterior-doorway, indoor-lights, meconium-staining, wall-void-odor, garage-seal, and commercial scenarios — captures both pre-migration prevention and post-migration cleanup search intent
- Final CTA copy explicitly mentions "Entry point sealing recommendations included on every inspection" — reinforces the page's most-differentiating service step

#### Internal link map note
- Brief specified live chips for scorpion, ant, pest-control-las-vegas, free-estimate, contact — all routed correctly
- Brief specified pending chip for `/crane-fly-exterminator-las-vegas/` — page is not yet built (Batch 3 item #13, follows miller moth in canonical order); chip is correctly marked pending per brief
- Operator should be aware that next-after-miller-moth in the SEQUENCE is crane fly per Batch 3 build order, even though earwig + hornet are still unbuilt from earlier in the sequence

#### Open TODOs
- Form endpoint not wired (TODO-LAUNCH-BLOCKER comment present) — site-wide launch blocker
- /earwig-exterminator-las-vegas/ and /hornet-exterminator-las-vegas/ — still unbuilt (skipped in sequence to reach miller moth)
- /crane-fly-exterminator-las-vegas/ — referenced as pending chip per brief; not yet built (next in canonical sequence after miller moth)
- OG image asset: /assets/images/og-miller-moth-exterminator-las-vegas.jpg — placeholder URL, asset not yet produced
- /about/health-conscious-service-program/ linked from program section — destination page not yet built

#### Next page per build order (sequence recovery options)
- Operator choice — canonical Batch 3 order skips back to earwig → hornet, then crane fly. Alternative: continue opportunistic ordering at operator dispatch.

---

### 2026-05-19 — Batch 3 Build: /crane-fly-exterminator-las-vegas/

- Route: /crane-fly-exterminator-las-vegas/
- AI Depth: Level 4
- Commit: f8bf0e7
- File: crane-fly-exterminator-las-vegas/index.html

#### Build order note
- Operator dispatched crane fly immediately after miller moth, again out of strict batch-3 sequence (canonical order: earwig → hornet → miller moth → crane fly; earwig and hornet are still unbuilt). Continues the opportunistic-ordering pattern established in the previous turn.

#### Keyword map (top primary)
1. crane fly exterminator las vegas / crane fly control las vegas
2. leatherjacket lawn damage / leatherjacket turf treatment las vegas (the actual damaging-stage keyword cluster)
3. mosquito hawk myth / "do crane flies bite" (high-volume informational AEO target with myth-correction angle)

#### Pass/fail gate — ALL PASS
- Sections: 12 `<section>` blocks present (exceeds 10-section minimum)
- FAQ visible count: 8
- FAQ schema Question count: 8 (matches exactly)
- Schema types: LocalBusiness, Service, FAQPage, BreadcrumbList, HowTo (5 entities)
- AggregateRating reviewCount: "30" (Google only — single match)
- Canonical: https://pestcontrolinc.net/crane-fly-exterminator-las-vegas/
- Phone `(702) 228-4394`: 15 instances
- `tel:+17022284394`: 12 instances
- robots: index, follow
- aria-current="page": 2 locations (related-pages chip + footer Crane Fly Control link)
- TODO-LAUNCH-BLOCKER: 1 (form placeholder)
- Raw em-dashes: 0 (all `&mdash;`)
- Raw en-dashes: 0
- No-fake-data: founding year CLEAN (no 4-digit years on page), EPA registration CLEAN, pricing CLEAN
- No named individuals
- **ACCURACY CHECK PASS:** "do not bite" appears 8× across page (hero, AEO body, AEO callout, two-stage adult card body + bullet, FAQ Q1, Q2, Q3 — every section that mentions crane fly behavior); "eat mosquitoes" / "mosquito hawk" myth-correction appears 8× (AEO callout 1 leads with this as the page's primary AEO correction, adult-stage card subtitle and bullet repeat it, FAQ Q1 and Q2 reinforce it). Both required accuracy facts saturate the page.
- **OFFER ELIGIBILITY:** Crane flies are NOT in the new-customer offer exclusion list (excluded: pigeons, bed bugs, bees, rodents) — standard `/specials/` references used: top bar badge "Free First Service →" links to /specials/, footer Company column includes Specials link. Follows wasp/miller-moth/scorpion pattern.

#### Crane-fly-specific page additions vs prior batch templates
- AEO callouts pair the "mosquito hawk myth" correction (does not bite, does not eat mosquitoes) with the "real damage is leatherjackets" callout — establishes the page's two highest-priority AEO messages as a myth/reality contrast above the fold
- New Section 4 "Two-Stage Pest" uses a unique `.stage-grid` 2-column layout pairing an adult-stage card (blue top accent, checkmark bullets — harmless attributes) against a larva-stage card (orange top accent, warning bullets — damaging attributes). Reframes the page around the biological reality that the conspicuous adult and the damaging stage are completely different. Visual contrast reinforces the page's core educational message.
- New Section 5 "Signs of Larvae Damage" uses 5-card numbered `.signs-grid` 5-column layout — diagnostic checklist framing (homeowner identifies leatherjacket vs other turf issues themselves) rather than abstract risk-factor framing
- New Section 6 "Where Crane Flies Are Found" uses 5-card `.locations-grid` 5-column layout; the indoor-locations card uses an orange left-border variant to visually distinguish it from the four turf/outdoor locations
- Trust bar item 4 changed to "Turf Treatment Included — Targeted Leatherjacket Control" — explicitly positions PCI as the turf-treating specialist; competitor diff row 1 attacks the franchise default of "adult perimeter spray only; no turf inspection or leatherjacket treatment"
- Form select includes 6 options spanning lawn-damage-suspected, bird-following-turf, indoor adults, pool/irrigation-proximity, spongy-turf, and commercial scenarios — captures both lawn-damage and indoor-adult search intent
- Final CTA headline reframed to "Ready to Protect Your Las Vegas Lawn From Leatherjackets?" — leading with the damaging-stage keyword rather than the adult-stage keyword (consistent with the page's positioning that the lawn-damage angle is the highest-value conversion driver)

#### Internal link map note
- Brief specified live chips for scorpion, ant, pest-control-las-vegas, free-estimate, contact — all routed correctly
- Brief specified pending chips for `/miller-moth-exterminator-las-vegas/` AND `/earwig-exterminator-las-vegas/`. Miller moth was built earlier in this session and is live; earwig is still unbuilt. Followed brief literally per established pattern (wasp/bee/bird/miller-moth pages followed same convention — live page chips left as `pending` when brief specified, retrofit eligible)
- Operator should be aware that earwig + hornet are both still unbuilt from canonical Batch 3 order; if returning to sequence the next pages would be earwig → hornet → false chinch bug → springtail

#### Open TODOs
- Form endpoint not wired (TODO-LAUNCH-BLOCKER comment present) — site-wide launch blocker
- /earwig-exterminator-las-vegas/ and /hornet-exterminator-las-vegas/ — still unbuilt; canonical Batch 3 sequence not yet recovered
- /miller-moth-exterminator-las-vegas/ now built but appears as pending chip per content brief — retrofit eligible
- OG image asset: /assets/images/og-crane-fly-exterminator-las-vegas.jpg — placeholder URL, asset not yet produced
- /about/health-conscious-service-program/ linked from program section — destination page not yet built

#### Next page per build order (sequence recovery options)
- Operator choice — canonical Batch 3 order would now resume with earwig → hornet → false chinch bug → springtail. Alternative: continue opportunistic ordering at operator dispatch.

---

### 2026-05-19 — Batch 3 Build: /false-chinch-bug-exterminator-las-vegas/ (combined false chinch bug + springtail)

- Route: /false-chinch-bug-exterminator-las-vegas/
- AI Depth: Level 4
- Commit: 3ba7179
- File: false-chinch-bug-exterminator-las-vegas/index.html

#### Scope / consolidation note
- **Two species consolidated onto one page per content brief.** Original Batch 3 list had 14 (false chinch bug) and 15 (springtail) as separate pages. Operator-direct content brief consolidated them onto the false-chinch-bug slug under H1 "False Chinch Bug & Springtail Control Las Vegas." Reason: both are minor nuisance pests with no medical significance; one combined page produces a more useful resource than two thin pages. Springtail-only URL (/springtail-exterminator-las-vegas/) is now unused per this consolidation; no separate page is planned.
- **Build order:** Continued opportunistic ordering (operator dispatched false chinch bug after crane fly, again ahead of canonical sequence — earwig and hornet remain unbuilt).

#### Keyword map (top primary)
1. false chinch bug exterminator las vegas / "tiny bugs on house las vegas" (mass-migration AEO target)
2. springtails las vegas / "tiny jumping bugs in bathroom" (flea-misidentification AEO target)
3. nuisance pest control las vegas (combined positioning keyword)

#### Pass/fail gate — ALL PASS
- Sections: 12 `<section>` blocks present (exceeds 10-section minimum)
- FAQ visible count: 8
- FAQ schema Question count: 8 (matches exactly)
- FAQ categories: 4 (False Chinch Bugs · Springtails · Treatment · Getting Started) — brief specified 4 categories; this is the only Batch 3 page so far with 4 FAQ categories instead of 3
- Schema types: LocalBusiness, Service, FAQPage, BreadcrumbList, HowTo (5 entities)
- AggregateRating reviewCount: "30" (Google only — single match)
- Canonical: https://pestcontrolinc.net/false-chinch-bug-exterminator-las-vegas/
- Phone `(702) 228-4394`: 15 instances
- `tel:+17022284394`: 12 instances
- robots: index, follow
- aria-current="page": 2 locations (related-pages chip + footer "False Chinch Bug & Springtail" link)
- TODO-LAUNCH-BLOCKER: 1 (form placeholder)
- Raw em-dashes: 0 (initial pass found 2 in CSS comments — fixed to ASCII hyphens; all visitor-visible em-dashes use `&mdash;`)
- Raw en-dashes: 0
- 4-digit-year regex flagged "2022" but this is a CSS unicode escape sequence `\2022` for the bullet character (•), not a year reference. No actual founding year, EPA registration, pricing, or named individuals appear anywhere on the page. CLEAN.
- **ACCURACY CHECK PASS:** "harmless to humans" appears in hero, AEO opening, and FAQ Q1 (both species described as harmless). "do not bite" appears 10× across page — false chinch bug card, springtail card, AEO callouts, FAQ Q1, Q3, Q4, Q7. Springtail-vs-flea misidentification correction (springtails do not bite) hit in FAQ Q3, Q4 and species card. Both species explicitly stated as harmless multiple times.
- **OFFER ELIGIBILITY:** Neither false chinch bugs nor springtails appear in the new-customer offer exclusion list (excluded: pigeons, bed bugs, bees, rodents) — standard `/specials/` references used: top bar badge links to /specials/, footer Company column includes Specials link.

#### Combined-page specific design decisions
- Hero subhead positions the page around the misidentification angle ("two of Las Vegas's most commonly misidentified nuisance pests") &mdash; reframes the page as a diagnostic resource rather than a single-species service page
- AEO callouts use a paired-species pattern: callout 1 covers false chinch bug mass migration; callout 2 covers springtail moisture-indicator behavior. Both callouts hit the page's primary AEO query at the same time.
- New Section 4 "Species Identification" uses a custom `.species-grid` 2-column layout — false chinch bug card (tan top accent, checkmark bullets) paired with springtail card (blue top accent, checkmark bullets). Scientific names italicized below each species title. Color coding (tan vs blue) is reused consistently in Sections 5 and 6.
- New Section 5 "Signs & Identification" uses a 2-column `.signs-grid` &mdash; tan/blue left borders match the species color coding. Bulleted sign-checklists give homeowners the diagnostic markers for self-identification before calling.
- New Section 6 "Control Approach" uses a 2-column `.control-grid` with numbered control-steps lists per species. Springtail card has an additional `.control-card-emphasis` highlighted note: "Eliminating the moisture source is the most important step. Treatment without moisture reduction reliably allows springtails to return." &mdash; reinforces the page's most-differentiating control insight
- Trust bar item 4 changed to "Free Pest ID &mdash; Species Confirmation Included" &mdash; explicitly positions species confirmation as a free service (relevant on a combined-species page where misidentification is the operative homeowner pain point)
- Competitor diff table row 1 attacks "generic perimeter spray on both species; no moisture-source assessment or species confirmation" &mdash; surfaces the species-matched-strategy differentiator at the top of the comparison
- Form select has 6 options including a "Not sure which species &mdash; need ID inspection" option, capturing visitors who arrive at the page without a confirmed pest ID

#### Internal link map note
- Brief specified live chips for scorpion, ant, pest-control-las-vegas, free-estimate, contact &mdash; all routed correctly
- Brief specified pending chips for `/earwig-exterminator-las-vegas/` AND `/crane-fly-exterminator-las-vegas/`. Crane fly was built in the previous turn this session and is live; earwig is still unbuilt. Followed brief literally per established pattern (wasp/bee/bird/miller-moth/crane-fly pages followed same convention &mdash; brief-pending chips kept pending even when page is now built; retrofit eligible)

#### Open TODOs
- Form endpoint not wired (TODO-LAUNCH-BLOCKER comment present) &mdash; site-wide launch blocker
- /earwig-exterminator-las-vegas/ and /hornet-exterminator-las-vegas/ &mdash; still unbuilt from canonical Batch 3 sequence
- /crane-fly-exterminator-las-vegas/ now built but appears as pending chip per content brief &mdash; retrofit eligible
- /springtail-exterminator-las-vegas/ is no longer planned as a separate page per consolidation decision &mdash; any references in routing or sitemap docs should redirect to this combined page
- OG image asset: /assets/images/og-false-chinch-bug-exterminator-las-vegas.jpg &mdash; placeholder URL, asset not yet produced
- /about/health-conscious-service-program/ linked from program section &mdash; destination page not yet built

#### Batch 3 status after this build
- Built: cockroach, rodent, termite, spider, bed bug, wasp, bee, bird, miller moth, crane fly, false-chinch-bug-+-springtail (combined) = 11 pages
- Unbuilt: earwig, hornet (springtail folded into combined page)
- Pending operator decision: continue with earwig + hornet, or close out batch with the consolidation accepted as final

#### Next page per build order (sequence recovery options)
- Operator choice &mdash; remaining canonical Batch 3 items are earwig and hornet only. Alternative: declare batch substantively complete pending operator approval of the springtail consolidation.

---

### 2026-05-19 &mdash; Batch 3 Build: /earwig-exterminator-las-vegas/

- Route: /earwig-exterminator-las-vegas/
- AI Depth: Level 4
- Commit: 50f4589
- File: earwig-exterminator-las-vegas/index.html

#### Build order note
- Operator dispatched earwig immediately after false-chinch-bug, partially recovering canonical sequence (earwig was item #10 in original Batch 3 order; built after #11-15). Hornet (item #11) remains as the only unbuilt page in Batch 3 if the springtail consolidation is accepted.

#### Keyword map (top primary)
1. earwig exterminator las vegas / earwig control las vegas
2. "are earwigs dangerous" / "do earwigs bite" (myth-correction AEO target)
3. earwig garden damage / earwigs eating plants (garden-pest secondary intent)

#### Pass/fail gate &mdash; ALL PASS
- Sections: 12 `<section>` blocks present (exceeds 10-section minimum)
- FAQ visible count: 8
- FAQ schema Question count: 8 (matches exactly)
- Schema types: LocalBusiness, Service, FAQPage, BreadcrumbList, HowTo (5 entities)
- AggregateRating reviewCount: "30" (Google only &mdash; single match)
- Canonical: https://pestcontrolinc.net/earwig-exterminator-las-vegas/
- Phone `(702) 228-4394`: 17 instances
- `tel:+17022284394`: 13 instances
- robots: index, follow
- aria-current="page": 2 locations (related-pages chip + footer Earwig Control link)
- TODO-LAUNCH-BLOCKER: 1 (form placeholder)
- Raw em-dashes: 0 (CSS comments use ASCII hyphens from the start &mdash; lesson applied from prior false-chinch-bug build where CSS comments tripped the gate)
- Raw en-dashes: 0
- No-fake-data: founding year CLEAN (zero 4-digit-year matches; CSS bullet escape uses `\2713` checkmark in program-points, no `\2022` regex collision), EPA registration CLEAN, pricing CLEAN
- No named individuals
- **ACCURACY CHECK PASS:** Ear-crawling myth and "lay eggs in brains" myth explicitly stated as false in AEO opening, AEO callout 1, and FAQ Q1. Pinch rarely breaks skin stated in AEO callout 1 and FAQ Q1. "Rarely bite humans" appears in hero, AEO opening, AEO callout, and FAQ Q1 &mdash; myth-correction saturates the page's primary informational AEO target.
- **OFFER ELIGIBILITY:** Earwigs are NOT in the new-customer offer exclusion list (excluded: pigeons, bed bugs, bees, rodents) &mdash; standard `/specials/` references used: top bar badge "Free First Service &rarr;" links to /specials/, footer Company column includes Specials link.

#### Earwig-specific page additions vs prior batch templates
- AEO callouts pair the ear-crawling myth correction (callout 1, navy/blue cool tone) with the heat-driven moisture-seeking behavior (callout 2, warm orange) &mdash; establishes both the myth correction and the "why they get inside" context above the fold
- New Section 4 "Where Earwigs Hide" uses the `.harborage-grid` 3-column 6-card layout with a custom `.harborage-card.indoor` variant: indoor harborage cards (bathrooms/kitchens, garages/utility, foundation-gap-entry) get an orange top-border accent while outdoor harborage cards (mulch/rock, irrigation valve boxes, patio furniture) get the standard blue accent &mdash; gives the homeowner a quick at-a-glance separation of where to look for indoor vs outdoor problems
- New Section 5 "Damage and Nuisance" uses a 3-card problem grid with three distinct framings: garden-damage card (tan accent, plant icon), indoor-nuisance card (orange accent, mouse-pest icon for secondary pests), and underlying-signal card (blue accent, droplet icon) &mdash; reframes earwig presence as a moisture-and-entry-point signal rather than a pest in isolation
- New Section 6 "Signs of Infestation" uses a 3-column 6-card `.signs-grid` with numbered round badges and left-border accents &mdash; 6 diagnostic markers per content brief
- Trust bar item 4 changed to "Exterior-First IPM &mdash; Outdoor Harborage Targeted" &mdash; positions the differentiating treatment angle (most franchises spray inside, PCI treats outdoor harborage) in the highest-visibility location
- Competitor diff table row 1 attacks the franchise-default "generic interior spray" approach with PCI's exterior-first-IPM-targeting-harborage value
- Form select includes 6 options spanning bathroom/kitchen, garage/utility, garden damage, landscape rock/mulch, pool/irrigation, and commercial recurring scenarios &mdash; captures both nuisance-indoor and garden-damage search intent
- Hero subhead and final CTA both lead with "bathrooms, kitchens, garages, and around irrigation systems" &mdash; the four most common Las Vegas earwig locations repeated at top and bottom of page

#### Internal link map note
- Brief specified live chips for scorpion, ant, pest-control-las-vegas, free-estimate, contact &mdash; all routed correctly
- Brief specified pending chip for `/springtail-exterminator-las-vegas/`. Per the false-chinch-bug consolidation decision in the previous turn, the springtail standalone URL is no longer planned &mdash; springtail content is now folded into /false-chinch-bug-exterminator-las-vegas/. **Decision:** chip remains pending per brief literal pattern (consistent with how prior builds handled "brief said pending but page exists" cases). Operator may opt to retrofit this chip to link to the combined false-chinch-bug page if that consolidation is finalized.

#### Open TODOs
- Form endpoint not wired (TODO-LAUNCH-BLOCKER comment present) &mdash; site-wide launch blocker
- /hornet-exterminator-las-vegas/ &mdash; remaining unbuilt page in canonical Batch 3 sequence
- /springtail-exterminator-las-vegas/ &mdash; consolidation pending operator approval; chip on this page is pending per brief; retrofit-eligible to repoint to the combined false-chinch-bug page
- OG image asset: /assets/images/og-earwig-exterminator-las-vegas.jpg &mdash; placeholder URL, asset not yet produced
- /about/health-conscious-service-program/ linked from program section &mdash; destination page not yet built

#### Batch 3 status after this build
- Built: cockroach, rodent, termite, spider, bed bug, wasp, bee, bird, miller moth, crane fly, false-chinch-bug-+-springtail (combined), earwig = 12 pages
- Unbuilt: hornet only (springtail consolidated)
- Sequence recovery: substantially complete &mdash; only hornet remains before Batch 3 can be declared finished

#### Next page per build order
- /hornet-exterminator-las-vegas/ &mdash; final Level 4 page in Batch 3
