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

---

### 2026-05-19 &mdash; Batch 3 Build: /hornet-exterminator-las-vegas/ (FINAL BATCH 3 PAGE)

- Route: /hornet-exterminator-las-vegas/
- AI Depth: Level 4
- Commit: 523671a
- File: hornet-exterminator-las-vegas/index.html

#### Batch 3 closeout
- **This is the final Level 4 page in Batch 3.** With this commit, the batch is substantively complete: 13 of 15 original pages built directly, plus springtail content consolidated into the false-chinch-bug page. Only the originally-planned standalone springtail URL is unbuilt &mdash; consolidated by operator direction in an earlier turn this session.

#### Scope note
- Page covers bald-faced hornets and European hornets only. Wasps have a dedicated page (/wasp-exterminator-las-vegas/). Bees have a dedicated page (/bee-removal-las-vegas/). Both species are referenced in comparison context (e.g., "more aggressive than yellow jackets or paper wasps", "unlike honey bees, hornets do not lose their stinger") and in FAQ Q7 (hornet vs wasp nest distinguishing) plus link chips, but receive no substantive coverage.

#### Keyword map (top primary)
1. hornet exterminator las vegas / hornet nest removal las vegas
2. bald-faced hornet nest removal las vegas (species-specific, highest-volume)
3. european hornet nest removal las vegas / "what hornet is this"

#### Pass/fail gate &mdash; ALL PASS
- Sections: 12 `<section>` blocks present (exceeds 10-section minimum)
- FAQ visible count: 8
- FAQ schema Question count: 8 (matches exactly)
- Schema types: LocalBusiness, Service, FAQPage, BreadcrumbList, HowTo (5 entities)
- AggregateRating reviewCount: "30" (Google only &mdash; single match)
- Canonical: https://pestcontrolinc.net/hornet-exterminator-las-vegas/
- Phone `(702) 228-4394`: 18 instances (highest count in Batch 3 &mdash; reflects emergency-CTA framing)
- `tel:+17022284394`: 14 instances
- robots: index, follow
- aria-current="page": 2 locations (related-pages chip + footer Hornet Control link)
- TODO-LAUNCH-BLOCKER: 1 (form placeholder)
- Raw em-dashes: 0 (CSS comments use `--` ASCII pattern from the start &mdash; lesson applied from earlier builds)
- Raw en-dashes: 0
- No 4-digit-year matches; no founding year, EPA registration, pricing, or named individuals
- **SCOPE CHECK PASS:** All bee/wasp references are non-substantive &mdash; comparison context (3) + FAQ Q7 nest distinguishing (2) + pending link chips (2) + comparative "more dangerous than" phrasing (3). No paragraphs, sections, or treatment content covering bee or wasp species.
- **OFFER ELIGIBILITY:** Hornets are NOT in the new-customer offer exclusion list (excluded: pigeons, bed bugs, bees, rodents) &mdash; standard `/specials/` references used: top bar badge links to /specials/, footer Company column includes Specials link.

#### Hornet-specific page additions vs prior batch templates
- Top bar text adds "24/7 Emergency" qualifier on this page only &mdash; reflects the page's emergency-response positioning (no other Batch 3 page uses this top bar variant)
- Hero CTA primary button reads "Emergency (702) 228-4394" instead of the standard "(702) 228-4394" &mdash; reinforces 24/7 emergency framing in the highest-conversion CTA on the page
- Hero trust signals include a custom `.hero-trust-item.urgent` orange-tinted pill ("24/7 Hornet Emergency") as the first item &mdash; designed to draw the eye on a stinging-insect emergency page where time-to-call matters
- AEO answer block uses an orange left-border accent (instead of the standard blue) &mdash; signals the page is high-risk content rather than informational
- New Section 4 species cards use orange-accent (bald-faced hornet, most aggressive) and tan-accent (European hornet, void-nester) with warning-triangle bullets (`\26A0`) instead of checkmark bullets &mdash; visually reinforces danger
- New Section 5 "Danger + Do-Not" is the unique high-risk safety layout on this page: 1.05fr / .95fr 2-column grid pairing 5 orange-left-border danger cards (repeat stinging, alarm pheromones, bald-faced aggression, dozens-of-stings, anaphylaxis) on the left with a single navy DO-NOT card on the right. The DO-NOT card uses an X-marker list (`\2715`) and embeds an `.emergency-subcard` orange-bordered call-to-action block with allergic-individual emergency-medical guidance and a direct emergency phone button. Layout-wise, this is the most distinctive section on any Batch 3 page besides the scorpion Level 5 page.
- New Section 6 "Where Hornets Nest" uses 3-column 6-card grid with species-color coding: 3 orange-accent bald-faced hornet locations (trees, eaves, utility poles) + 3 tan-accent European hornet locations (attic voids, wall voids, hollow trees) &mdash; reinforces the visual species distinction established in Section 4
- Trust bar item 4 changed to "24/7 Hornet Emergency &mdash; Active Nest? Call Anytime" and item 5 to "Night Treatment &mdash; Safest Time for Hornet Nests" &mdash; both reinforce the page's emergency-response and night-treatment positioning
- Why-PCI section adds a 24/7 emergency point in place of the standard 30-minute callback point &mdash; emergency framing carried through to every section
- Why-PCI section also adds a "Night-Timed Treatment" point &mdash; reinforces the page's most-distinctive treatment differentiator (no Batch 3 page besides this one emphasizes night-specific treatment timing)
- Final CTA H2 reads "Active Hornet Nest on Your Las Vegas Property?" &mdash; opens with the emergency question rather than the standard "Ready to..." framing used on other Batch 3 pages
- Form select 4th option includes "Hornet sting occurred &mdash; need urgent removal" &mdash; captures emergency-occurred conversion intent

#### Internal link map note
- Brief specified live chips: scorpion, ant, free-estimate, contact (4 live chips, not 5 &mdash; this brief omits /pest-control-las-vegas/ that other Batch 3 briefs include). Followed brief literally.
- Brief specified pending chips for `/wasp-exterminator-las-vegas/` AND `/bee-removal-las-vegas/`. Both pages are built and live earlier in this session/batch. Followed brief literal pattern: chips remain pending. Retrofit eligible.

#### Open TODOs
- Form endpoint not wired (TODO-LAUNCH-BLOCKER comment present) &mdash; site-wide launch blocker (applies to entire Batch 3, every page in the batch)
- /wasp-exterminator-las-vegas/ and /bee-removal-las-vegas/ are built but appear as pending chips on this page per content brief &mdash; retrofit eligible
- /springtail-exterminator-las-vegas/ is not built (consolidated into /false-chinch-bug-exterminator-las-vegas/ per operator decision earlier in this session) &mdash; sitemap and any links elsewhere referencing the standalone springtail URL should be redirected or updated
- OG image asset: /assets/images/og-hornet-exterminator-las-vegas.jpg &mdash; placeholder URL, asset not yet produced (applies to most Batch 3 pages &mdash; site-wide asset production TODO)
- /about/health-conscious-service-program/ linked from program section &mdash; destination page not yet built (applies to every Batch 3 page)

#### Batch 3 final status
- **Built:** ant (Level 4, pre-existing), cockroach, rodent, termite, spider, bed bug, wasp, bee, bird, miller moth, crane fly, false-chinch-bug-+-springtail (combined), earwig, hornet = 14 pages
- **Not built:** /springtail-exterminator-las-vegas/ standalone URL only (intentional, consolidated)
- **Scorpion:** Level 5 build pre-existing; not in this session's scope
- **Outstanding cross-batch TODOs:** form endpoint, OG images, /about/health-conscious-service-program/ destination, sitemap update for springtail consolidation, optional retrofit of pending-chip references on bee/bird/miller-moth/crane-fly/false-chinch-bug/earwig/hornet pages to point at newly-built sibling pages

#### Next batch
- Operator decision &mdash; Batch 3 is substantively complete pending operator approval of the springtail consolidation. Next priority per launch readiness list is the about-cluster (Health Conscious Program, Guarantee) or the commercial hub.

---

### 2026-05-19 &mdash; Batch 3 cleanup: pending-chip retrofit pass

- Commit: b15cd3e
- Scope: 14 species pages modified, 25 stale pending chips converted to live links

#### What changed
Each Batch 3 page was built following its content brief literally, leaving sibling-page chips as `pending` (`aria-disabled="true"`) even after the sibling was built later in the batch. With Batch 3 now substantively complete (hornet was the last page), this single pass resolves all stale pending chips across the species hub pages.

#### Retrofit table
| Page | Pending chips converted |
|------|-------------------------|
| /bed-bug-exterminator-las-vegas/ | Termite, Spider |
| /bird-removal-las-vegas/ | Rodent |
| /bee-removal-las-vegas/ | Wasp, Hornet |
| /cockroach-exterminator-las-vegas/ | Rodent, Bed Bug |
| /crane-fly-exterminator-las-vegas/ | Miller Moth, Earwig |
| /earwig-exterminator-las-vegas/ | **Springtail → repointed to /false-chinch-bug-exterminator-las-vegas/ with relabel "False Chinch Bug & Springtail Control"** (per consolidation decision) |
| /false-chinch-bug-exterminator-las-vegas/ | Earwig, Crane Fly |
| /hornet-exterminator-las-vegas/ | Wasp, Bee Removal |
| /miller-moth-exterminator-las-vegas/ | Crane Fly |
| /rodent-exterminator-las-vegas/ | Termite |
| /scorpion-exterminator-las-vegas/ (Level 5) | Spider, Cockroach |
| /spider-exterminator-las-vegas/ | Termite, Bed Bug |
| /termite-exterminator-las-vegas/ | Spider |
| /wasp-exterminator-las-vegas/ | Bee Removal, Hornet |

#### Edit pattern
Each retrofit replaced:
```html
<span class="internal-link-chip pending" aria-disabled="true" title="Coming soon">LABEL</span>
```
with:
```html
<a href="/SLUG/" class="internal-link-chip">LABEL</a>
```

The earwig page's Springtail chip is a special case: the standalone springtail URL was consolidated into /false-chinch-bug-exterminator-las-vegas/ per operator direction earlier in this session. The chip was repointed to the combined page and relabeled "False Chinch Bug &amp; Springtail Control" to reflect the consolidation.

#### Verification
- Grep for `internal-link-chip pending` across the project returned zero matches after the commit
- Each live href targets a page that exists in the file system (confirmed via build history this session)
- No CSS or schema changes were required &mdash; only chip element swaps in Section 10 (Internal Links Row) of each page

#### Open TODOs not addressed by this pass
- /about/health-conscious-service-program/ chips on cockroach, rodent, termite, spider, bed bug remain live but point to an unbuilt destination &mdash; those are not "pending" chips, they are normal links to a TBD page; not in scope of this retrofit
- Sitemap and any cross-cluster references that may still mention /springtail-exterminator-las-vegas/ as a standalone URL &mdash; not audited in this pass; springtail consolidation cleanup is a separate sitemap-update task

---

### 2026-05-19 &mdash; Sitemap update: Batch 3 reflections + springtail consolidation

- Commit: b62a9df
- File: sitemap/index.html
- Type: HTML sitemap at /sitemap/ (the project does not have an XML sitemap.xml &mdash; this is the comprehensive on-site navigation map)

#### Pest Species Pages section (main grid, column 1)
**Before:** 9 entries, 8 of them marked `coming-soon` (only Ant was live). Wasp and Bee bundled together as one entry pointing only to wasp page. No entries for Batch 3 nuisance pests.

**After:** 15 entries, all live, ordered by regional importance:
1. Scorpion Control (moved to top &mdash; most important regional pest)
2. Ant Control
3. Cockroach Control
4. Rodent Control
5. Termite Control
6. Spider Control
7. Bed Bug Control
8. Bee Removal (split from wasp bundle, dedicated page)
9. Wasp Removal (split from bee bundle)
10. Hornet Removal (new)
11. Bird & Pigeon Removal
12. Earwig Control (new)
13. Miller Moth Control (new)
14. Crane Fly Control (new)
15. False Chinch Bug & Springtail Control (new, single entry for consolidated page)

The standalone /springtail-exterminator-las-vegas/ URL is deliberately omitted &mdash; the springtail content lives on the false-chinch-bug page per the consolidation decision made earlier in this session.

#### Footer "Pest Control Services" column
**Before:** 8 entries with single "Wasp & Bee Removal" bundle.
**After:** 11 entries &mdash; split Wasp/Bee into separate entries, added Hornet Removal and Bird & Pigeon Removal. Top 7 species kept in the same order; the four stinging/flying-pest entries added in the same priority block.

#### Pre-existing inconsistency fixed
The Tier 1 Service Areas section had `/pest-control-las-vegas/` (the residential hub, which is built) still marked `coming-soon`. Fixed in this pass. Other Tier 1/2/neighborhood entries correctly remain `coming-soon` &mdash; verified via `if [ -d ... ]` checks that none of them exist on disk yet.

#### Dash normalization
The sitemap was built before the Batch 3 "zero raw em-dashes" quality standard was applied. This pass also normalized:
- 6 raw em-dashes (`&mdash;`) in title tag, OG meta, JSON-LD `name`, top bar text, header aria-label
- 1 raw en-dash (`&ndash;`) in hours line ("Mon&ndash;Fri 8am&ndash;4pm &middot; Sat 8am&ndash;2pm")
- 1 raw middle-dot (·) normalized to `&middot;` in the same hours line for consistency

Result: sitemap is now at parity with the Batch 3 quality standard (zero raw em-dashes / en-dashes).

#### Verification
- `grep "—"` on sitemap returns 0
- `grep "–"` on sitemap returns 0
- All 15 unique species page hrefs present in the sitemap (verified via `grep -oE 'href="/[a-z-]+(-exterminator|-removal)-las-vegas/"' | sort -u`)
- Zero references to `/springtail-exterminator-las-vegas/` anywhere in the file
- One reference to `/false-chinch-bug-exterminator-las-vegas/` (the combined page)
- Remaining 16 `coming-soon` items are all service-area pages confirmed missing on disk (Tier 1 areas except Las Vegas, all Tier 2 areas, neighborhood pages)

#### Out of scope for this pass (still open)
- ~~Footer "Service Areas" column lists Henderson, North Las Vegas, Boulder City, Spring Valley, Paradise, Enterprise without coming-soon styling &mdash; clicking these will 404.~~ **Resolved in commit `6f5ac79` (site-wide footer fix across 40 pages).**
- "Commercial Services" section lists 7 sub-pages (offices, retail, hotels, hoa, property-managers, landlord-pest-control-responsibilities, pest-impact-on-business) &mdash; not verified in this pass; out of Batch 3 scope.
- `/pest-control-las-vegas/plans-and-pricing/`, `/eco-friendly/`, `/apartments/` listed in the "Pest Control Services" section without coming-soon &mdash; not verified.
- An XML sitemap.xml at the project root would also be useful for search engine submission; the project currently relies on the HTML sitemap only.

---

### 2026-05-19 — Footer Service Areas fix: site-wide, encoding incident + redo

- Commits: 8c0855f (corrupt — reverted in 4be040f), 6f5ac79 (clean redo)
- Files: 40 (every page with a footer Service Areas column)
- Operator choice: convert unbuilt area links to plain-text `<li>` items (Option 1 from the question prompt)

#### What changed
Every page's footer Service Areas column had 6-7 area links that 404 (Henderson, North Las Vegas, Boulder City, Mesquite, Paradise, Spring Valley, Enterprise, Sunrise Manor, plus an `All Service Areas` link to `/las-vegas-valley/`). The fix removes the broken `<a href>` wrappers, leaving plain `<li>` text items. The single working `/pest-control-las-vegas/` link is preserved as the only live link in the column.

Both label conventions preserved verbatim:
- Short labels ("Henderson") on Batch 3 species pages, sitemap, free-estimate
- Long labels ("Pest Control Henderson NV") on homepage, about, ant, etc.

#### Encoding incident and recovery
The first attempt (commit `8c0855f`) was made by a dispatched subagent using a PowerShell script that called `Get-Content -Raw` without an explicit `-Encoding utf8` flag. On PS 5.1 this defaults to the system codepage (Windows-1252 / Latin-1), which decoded UTF-8 multi-byte sequences as Latin-1 single bytes. Writing back as UTF-8 then produced classic mojibake:

| Original UTF-8 | Mojibake after round-trip |
|---|---|
| `—` (em-dash) | `â€"` |
| `–` (en-dash) | `â€"` |
| `→` (right arrow) | `â†'` |
| `✓` (checkmark) | `âœ"` |

The git diff stat made the corruption visible: small-content files (scorpion = 12 lines, sitemap = 20 lines) had reasonable diff sizes, but content-heavy files showed inflated diffs (ant = 578 lines, homepage = 296 lines). Inspecting the homepage diff revealed mojibake in the meta description, OG/Twitter tags, hero CSS comments, and content rule pseudo-elements.

Recovery: `git revert HEAD --no-edit` produced commit `4be040f` restoring original UTF-8 across all 40 files.

#### Redo with encoding-safe approach
Commit `6f5ac79` uses a PowerShell script with explicit UTF-8 read/write:

```
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$content = [System.IO.File]::ReadAllText($path, $utf8NoBom)
# ... regex transformation scoped to <h4>Service Areas</h4>...<ul>...</ul> block ...
[System.IO.File]::WriteAllText($path, $newContent, $utf8NoBom)
```

The key change: `[System.IO.File]::ReadAllText` with an explicit `UTF8Encoding(false)` argument forces UTF-8 decoding regardless of system codepage. `Get-Content` should be avoided on Windows when round-tripping content with non-ASCII characters unless `-Encoding utf8` is passed.

#### Verification (post-redo)
- 40/40 footer Service Areas `<h4>...<ul>...</ul>` blocks scanned via PowerShell regex
- 0 broken-URL `<a href>` elements remain inside any block
- 40/40 footers retain `/pest-control-las-vegas/` as a live link
- 262 insertions, 262 deletions total (~12-14 lines per file = ~7 targeted items × delete+insert)
- 0 mojibake characters in spot-checked files
- Em-dashes, en-dashes, arrows, checkmarks in body content preserved byte-faithfully

#### Lesson captured
For future site-wide cross-file mechanical edits on Windows, prefer:
1. `[System.IO.File]::ReadAllText($path, [System.Text.UTF8Encoding]::new($false))` over `Get-Content`
2. `[System.IO.File]::WriteAllText($path, $content, [System.Text.UTF8Encoding]::new($false))` over `Set-Content` or `Out-File`
3. After bulk write, sanity-check the git diff stat against expected line counts — large per-file diffs on small content changes signal an encoding issue
4. Spot-check at least one large content-heavy file in addition to small ones

#### Followup
When geo pages get built (Henderson, North Las Vegas, etc.), the relevant `<li>LABEL</li>` items should be re-wrapped in `<a href="/SLUG/">LABEL</a>`. This is now a per-page pass rather than a search-and-replace, since each footer's exact label varies.
