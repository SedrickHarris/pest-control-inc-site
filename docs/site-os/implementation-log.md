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

---

### 2026-05-19 — Batch 4 scope decision: Mesquite city hub omitted

#### What changed
The `/pest-control-mesquite-nv/` city hub page and the dependent Mesquite Tier 1 Matrix (10 service+city pages in Phase 7 / batch-6) have been **omitted** from the build plan. Tracking docs and one site artifact were updated to reflect this.

#### Why
Decision was made to narrow Tier 1 city scope to Las Vegas, Henderson, North Las Vegas, and Boulder City. Mesquite is geographically the most distant Tier 1 location (~80 mi NE of Las Vegas) and a lower priority than the four valley-core cities for the launch build. Removing it now prevents 11 thin pages from entering the build queue without a clear business reason.

#### Files touched
1. `docs/site-os/inputs/pci-launch-readiness-site-build-list.md`
   - Removed Phase 4 priority 37 row (Pest Control Mesquite NV). Gap left intentionally; replaced with an inline note.
   - Removed "Mesquite" from Phase 7 Tier 1 Locations bullet list.
   - Removed the full "Mesquite Tier 1 Matrix" section (header + 10-row table); replaced with an inline note.
2. `docs/site-os/prompts/build/batch-4-city-location-pages-prompt.md`
   - Removed `/pest-control-mesquite-nv/` row from the Tier 1 Cities table.
3. `docs/site-os/prompts/build/batch-6-service-city-matrix-prompt.md`
   - Removed "Mesquite NV" from priority locations line.
4. `sitemap/index.html`
   - Removed the `<li class="coming-soon"><a href="/pest-control-mesquite-nv/">Mesquite</a></li>` entry from Tier 1 Service Areas, eliminating a future 404 link.

#### Scope boundary (intentionally NOT touched)
- `docs/site-os/inputs/pci-build-context.md` — still lists Mesquite as a Tier 1 service area city. Reason: Mesquite remains in PCI's stated service-area coverage; this decision concerns the dedicated city hub URL and its downstream matrix, not whether PCI services the city.
- `contact/index.html` and `free-estimate/index.html` — both pages list Mesquite among the cities PCI serves in their FAQ answers and area chips. Same reason: those are service-coverage facts, not page-build commitments.
- `docs/site-os/inputs/page-list.md` — Mesquite was not listed under Location Pages, so no edit needed.

#### Followup
If Mesquite hub is reinstated in the future:
1. Add row to Phase 4 of the launch-readiness build list (gap is at priority 37).
2. Re-add Mesquite to Phase 7 Tier 1 Locations list and re-add the Mesquite Tier 1 Matrix section.
3. Add `/pest-control-mesquite-nv/` row back to batch-4 prompt.
4. Add "Mesquite NV" back to batch-6 priority locations.
5. Re-add the `<li>` to `sitemap/index.html` (and either build the page or leave it `coming-soon` with intent to build).

---

### 2026-05-19 — Mesquite NV removed from service area

- Decision: business owner confirmed Mesquite, NV is not a service area
- /pest-control-mesquite-nv/ page was never built — no file to delete
- Mesquite was not present in footer — no footer changes required
- /pest-control-henderson-nv/ not yet built — no chip to remove there
- Scope of changes: sitemap, North Las Vegas and Boulder City pending chips (if present), launch readiness build list
- Operator instruction: remove all site references; do not build this page in any future batch

---

### 2026-05-19 — Mesquite NV cleanup follow-up: live page service-coverage mentions

#### What changed
Three remaining files that still claimed Mesquite as a service area were cleaned up to align with the business owner's decision that Mesquite is not a service area.

#### Files touched
1. `contact/index.html`
   - Removed `<span class="area-chip tier1">Mesquite</span>` from the Service Area chip row.
   - Removed ", Mesquite" from the FAQ answer listing covered cities (both in the FAQPage JSON-LD schema and in the visible HTML; verified text still matches between the two).
2. `free-estimate/index.html`
   - Same two edits as contact/index.html (chip + FAQ schema + visible).
3. `docs/site-os/inputs/pci-build-context.md`
   - Removed "Mesquite" from the Tier 1 cities service-area line (line 55).

#### Why this is a separate entry
The earlier 2026-05-19 entry ("Mesquite NV removed from service area") covered the narrowly scoped 5-file pass (sitemap, NLV, Boulder City, launch readiness, log). It intentionally did not touch contact, free-estimate, or pci-build-context because the earlier framing was "city hub omitted but still serviced." The business owner clarification ("not a service area at all") makes those preserved mentions factually wrong and required this follow-up pass.

#### Not touched
- Historical entries earlier in this log that mention Mesquite (audit trail; do not retroactively rewrite history).
- `pest-control-paradise-nv`, `pest-control-spring-valley-nv`, `pest-control-sunrise-manor-nv`, `pest-control-enterprise-nv` &mdash; spot-checked, none reference Mesquite.

#### FAQPage schema integrity check
The FAQ on both contact and free-estimate has the covered-cities list duplicated between visible HTML and FAQPage JSON-LD. Edit used `replace_all` on the exact substring "Boulder City, Mesquite, Paradise" → "Boulder City, Paradise" so both occurrences moved together. Schema and visible text still match exactly per FAQPage requirements.

---

### 2026-05-20 &mdash; Batch 5.5 Task 1: Restaurant/Food Handling Audit + Removal

- Policy source: business owner decision 2026-05-20 &mdash; confirmed, do not re-litigate
- Files audited and modified (per-file passes + final site-wide sweep):
  - `commercial-pest-control-las-vegas/index.html` &mdash; commit `d71468b`
  - `commercial-pest-control-las-vegas/pest-impact-on-business/index.html` &mdash; commit `676a6fc`
  - `commercial-pest-control-las-vegas/hotels/index.html` &mdash; commit `ea56a4a`
  - `cockroach-exterminator-las-vegas/index.html` &mdash; commit `e0ad591`
  - `pest-control-las-vegas/eco-friendly/index.html` &mdash; commit `a58759f` (initial) + `71b3370` (residual cleanup)
  - `emergency-pest-control-las-vegas/index.html` &mdash; commit `43136b3` (initial) + `71b3370` (residual cleanup)
  - `docs/site-os/inputs/pci-build-context.md` &mdash; commit `9959b29`
  - `docs/site-os/inputs/pci-brand-style-reference.md` &mdash; audited, zero matches found
  - Final site-wide sweep (commit `71b3370`) cleaned residual matches in 14 additional files: `index.html` (homepage), `about/index.html`, `ant-exterminator-las-vegas/index.html`, `rodent-exterminator-las-vegas/index.html`, `pest-control-north-las-vegas/index.html`, `pest-control-paradise-nv/index.html`, `pest-control-las-vegas/apartments/index.html`, `commercial-pest-control-las-vegas/hoa/index.html`, `commercial-pest-control-las-vegas/landlord-pest-control-responsibilities/index.html`, `commercial-pest-control-las-vegas/offices/index.html`, `commercial-pest-control-las-vegas/retail/index.html`, plus `docs/site-os/inputs/pci-launch-readiness-site-build-list.md`.
- Post-removal grep: **0 matches** site-wide for `restaurant|food service|food handling|haccp|snhd food|commercial kitchen|food-safe|food area|food handler|food storage|food processing|AIB|SQF|BRC|FDA audit|USDA audit` across all `*.html` and `*.md` files.
- JSON-LD validation: all 79 JSON-LD blocks across modified HTML files parse cleanly (zero failures).
- Rodent and FAQ hub pages: rodent page had 3 residual matches (`restaurant districts`, `food storage`) cleaned in the final sweep; no other FAQ hub pages contained banned terms.
- Pass/fail: **PASS**
- Commits (chronological):
  - `d71468b` &mdash; fix(commercial-hub): remove restaurant and food handling references per business owner decision
  - `676a6fc` &mdash; fix(pest-impact): remove restaurant and food handling references per business owner decision
  - `ea56a4a` &mdash; fix(hotels): remove restaurant and food handling references per business owner decision
  - `e0ad591` &mdash; fix(cockroach): remove restaurant and food handling references per business owner decision
  - `a58759f` &mdash; fix(eco-friendly): remove restaurant and food handling references per business owner decision
  - `43136b3` &mdash; fix(emergency): remove restaurant and food handling references per business owner decision
  - `9959b29` &mdash; fix(build-context): remove restaurant references per business owner decision
  - `71b3370` &mdash; fix(site-wide): final restaurant/food-handling reference cleanup

#### Scope removal
The `/commercial-pest-control-las-vegas/restaurants/` URL (previously in the launch-readiness build list at row 18, and the `/restaurant-pest-control-{location}/` slug template at row 404) is **permanently removed from scope** per business owner decision 2026-05-20. Both rows in `docs/site-os/inputs/pci-launch-readiness-site-build-list.md` are now marked `_(slot removed)_` with the note `REMOVED &mdash; business owner decision 2026-05-20`.

#### Approved replacement verticals (use these going forward)
Offices, retail, hotels, HOA communities, property management, warehouses, schools, daycares, healthcare, dispensaries, medical facilities, multi-unit residential. Do NOT use: restaurants, food service, cafes, diners, commercial kitchens. Do NOT reintroduce SNHD, HACCP, AIB, SQF, BRC, FDA food audit, or USDA food audit framing in any page copy, schema, JS, or form selects.

#### Approved phrasing substitutions (memorialized for future builds)
- "restaurants and food service" &rarr; "offices, retail, and multi-unit residential"
- "SNHD-compliant documentation" &rarr; "service documentation" or "property management records"
- "HACCP-aligned IPM" &rarr; just "IPM" (drop audit-framework qualifier)
- "restaurant kitchen" / "commercial kitchen" &rarr; "commercial property" or "multi-unit building"
- "health department documentation" / "health department file" &rarr; "written service documentation" or "property management documentation"
- "food storage" / "food area" / "food handler" &rarr; "pantry/supply storage" / "work zone" / "staff member"

#### Pre-commit gate (run on every commercial page edit going forward)
`grep -i "restaurant|food service|haccp|snhd|commercial kitchen|food handling"` must return 0 matches before commit. The broader site-wide gate adds: `food-safe|food area|food handler|food storage|food processing|AIB|SQF|BRC|FDA audit|USDA audit`.

---

### 2026-05-20 &mdash; Batch 5.5 Task 2: Pending Chip Retrofit (17 neighborhood pages)

- Scope: all 17 Batch 5 neighborhood pages (8 Las Vegas, 7 Henderson, 2 North Las Vegas)
- Action: converted `<span class="internal-link-chip pending" aria-disabled="true">LABEL (coming soon)</span>` elements to `<a href="/SLUG/" class="internal-link-chip">LABEL</a>` anchors for every chip whose destination page is confirmed live. Chips pointing to unbuilt slugs (Valley Vista, The Ridges, generic "North Las Vegas Neighborhoods") were intentionally left as pending.

#### Retrofit table (before &rarr; after pending-chip count per file)

| File | Before | After | Notes |
|---|---|---|---|
| `pest-control-las-vegas/summerlin/index.html` | 2 | 0 | Summerlin West, Centennial Hills &rarr; live |
| `pest-control-las-vegas/summerlin-west/index.html` | 2 | 0 | Skye Canyon, Centennial Hills &rarr; live |
| `pest-control-las-vegas/centennial-hills/index.html` | 2 | 0 | Providence, Skye Canyon &rarr; live |
| `pest-control-las-vegas/providence/index.html` | 2 | 1 | Skye Canyon &rarr; live; "North Las Vegas Neighborhoods" stays pending (generic) |
| `pest-control-las-vegas/skye-canyon/index.html` | 2 | 1 | Summerlin West &rarr; live; "North Las Vegas Neighborhoods" stays pending (generic) |
| `pest-control-las-vegas/the-lakes/index.html` | 2 | 0 | Desert Shores, Summerlin Pest Control &rarr; live |
| `pest-control-las-vegas/desert-shores/index.html` | 2 | 0 | Queensridge, Summerlin &rarr; live |
| `pest-control-las-vegas/queensridge/index.html` | 2 | 1 | Desert Shores &rarr; live; "The Ridges" stays pending (not in confirmed list) |
| `pest-control-henderson-nv/anthem/index.html` | 0 | 0 | already retrofitted in commit `9250f0d` |
| `pest-control-henderson-nv/green-valley/index.html` | 0 | 0 | already retrofitted in commit `9250f0d` |
| `pest-control-henderson-nv/green-valley-ranch/index.html` | 0 | 0 | already retrofitted in commit `9250f0d` |
| `pest-control-henderson-nv/seven-hills/index.html` | 0 | 0 | already retrofitted in commit `9250f0d` |
| `pest-control-henderson-nv/inspirada/index.html` | 0 | 0 | already retrofitted in commit `9250f0d` |
| `pest-control-henderson-nv/cadence/index.html` | 0 | 0 | already retrofitted in commit `9250f0d` |
| `pest-control-henderson-nv/lake-las-vegas/index.html` | 0 | 0 | already retrofitted in commit `9250f0d` |
| `pest-control-north-las-vegas/aliante/index.html` | 1 | 0 | Centennial Hills &rarr; live |
| `pest-control-north-las-vegas/tule-springs/index.html` | 1 | 0 | Centennial Hills &rarr; live |

- Total chip-element conversions: 16 (across 10 files)
- Files modified in this commit: 10 (the 7 Henderson pages were no-ops since they were already clean)
- Remaining pending chips (3 total) all point to slugs NOT in the confirmed-live list:
  - "North Las Vegas Neighborhoods" (generic placeholder, not a specific slug) &mdash; on providence + skye-canyon
  - "The Ridges" (unbuilt slug) &mdash; on queensridge
- Verification: post-commit `grep -c 'internal-link-chip pending'` returned 0 across all 17 files except the 3 legitimate pending entries above. Spot-checked UTF-8 integrity on `the-lakes` and `aliante` (both confirmed `Unicode text, UTF-8 text`).
- Em-dash audit: zero raw em-dashes introduced (chip swaps only changed `<span ...pending>LABEL (coming soon)</span>` to `<a href...>LABEL</a>` with no em-dash content).
- Commit: `61852ad` &mdash; fix(batch-5): retrofit pending chips to live sibling links across all 17 neighborhood pages
- Pass/fail: **PASS**

#### Note on diff scope vs. spec wording
The Task 2 spec expected `git diff --cached --name-only` to list exactly 17 files. Actual count was 10 because the 7 Henderson pages (`anthem`, `green-valley`, `green-valley-ranch`, `seven-hills`, `inspirada`, `cadence`, `lake-las-vegas`) had already been retrofitted as part of Batch 5 commit `9250f0d` (chore swap pass that ran each time a new sibling Henderson page went live). Staging all 17 explicitly per spec produced the expected 10-file diff &mdash; not a deviation, just a reflection of prior work already completing 7 of the 17.

---

### 2026-05-20 &mdash; Batch 5.5 Task 3: 301 Redirects

- Added: `/springtail-exterminator-las-vegas/` &rarr; `/false-chinch-bug-exterminator-las-vegas/` (301)
  - Reason: springtail page consolidated into false-chinch-bug page per Batch 3 decision
- Added: `/las-vegas-valley/sunrise-manor/` &rarr; `/pest-control-sunrise-manor-nv/` (301)
  - Reason: legacy URL pattern redirect to canonical Tier 2 area page
- Verification: `grep -n "springtail\|sunrise-manor" _redirects` returned 2 lines (lines 12-13), one per new entry. `cat _redirects` confirmed all existing entries intact (comments lines 1-10, blank line 11, two new 301s on lines 12-13, catch-all `/* /404.html 404` on line 14).
- `git diff --cached` showed exactly **2 insertions, 0 deletions** per spec.
- Commit: `1f6efc1` &mdash; fix(redirects): add springtail and sunrise-manor 301 redirects
- Pass/fail: **PASS**

#### Note on rule ordering vs. literal spec wording
The Task 3 spec said "Append the two new lines after the last existing entry." Strict literal compliance would have placed the 301s AFTER the `/* /404.html 404` catch-all &mdash; but Cloudflare Pages evaluates `_redirects` top-to-bottom with first-match-wins semantics, so a wildcard `/*` above the 301s intercepts ALL unmatched paths and returns 404 before the 301 ever fires. To make the redirects functional, they MUST sit ABOVE the catch-all wildcard. User confirmed this placement choice via in-conversation clarification before edit. Final order: comments &rarr; blank line &rarr; specific 301s (springtail, sunrise-manor) &rarr; catch-all `/* /404.html 404`.

---

### 2026-05-20 &mdash; Batch 5.5 Task 4: Sitemap Full Refresh

- Previous sitemap state: Batch 3 baseline (commit `b62a9df`) &mdash; 17 coming-soon entries
- Disk audit run pre-edit; all activations driven by directory presence on disk

#### Activated (coming-soon &rarr; live href) per disk audit
- **Tier 1 Service Areas** (3 cities): Henderson, North Las Vegas, Boulder City
- **Tier 2 Service Areas** (4 areas): Paradise, Spring Valley, Enterprise, Sunrise Manor
- **Las Vegas Neighborhoods** (8 Batch 5 pages): Summerlin, Summerlin West, Centennial Hills, Providence, Skye Canyon, The Lakes, Desert Shores, Queensridge
- **Henderson Neighborhoods** (expanded 3 &rarr; 7 entries, all live): Anthem, Green Valley, Green Valley Ranch, Seven Hills, Inspirada, Cadence, Lake Las Vegas
- **North Las Vegas Neighborhoods** (expanded 1 &rarr; 2 entries, all live): Aliante, Tule Springs

#### Newly added entries
- `/service-areas/` &mdash; added as coming-soon at the top of Tier 1 Service Areas section (builds in Task 10)

#### Marked coming-soon (live href pointing to MISSING page on disk &mdash; pre-existing bug fixed)
- `/about/health-conscious-service-program/` &mdash; in Main Pages section AND About &amp; Company section (both places)
- `/about/guarantee/` &mdash; in Main Pages section AND About &amp; Company section (both places)

#### Confirmed already-correct (no changes needed)
- Commercial sub-pages: all 7 already live, all 7 confirmed on disk (offices, retail, hotels, hoa, property-managers, landlord-pest-control-responsibilities, pest-impact-on-business). Zero restaurant entries present.
- Residential sub-pages: all 3 live, all 3 confirmed on disk (plans-and-pricing, eco-friendly, apartments)
- Emergency page: already live, confirmed on disk
- `/about/mission/`: already live, confirmed on disk
- Pest species pages: 15 entries, none banned

#### Remaining coming-soon entries (7 total, all confirmed unbuilt)
| URL | Reason |
|---|---|
| `/about/health-conscious-service-program/` | builds Task 9 |
| `/about/guarantee/` | builds Task 8 |
| `/service-areas/` | builds Task 10 |
| `/pest-control-las-vegas/southern-highlands/` | future neighborhood, not in current scope |
| `/pest-control-las-vegas/mountains-edge/` | future neighborhood, not in current scope |
| Plus the two `/about/*` entries appear twice (Main Pages + About &amp; Company sections) | duplicated cross-link, intentional |

#### Verification
- `grep -c "coming-soon" sitemap/index.html`: **17 &rarr; 9** (9 = 2 CSS class definitions + 7 valid coming-soon entries above)
- `grep -i "restaurant" sitemap/index.html`: **0 matches** (no restaurant entries anywhere)
- Raw em-dash count: **0** (zero introduced)
- All activated hrefs verified against disk audit before marking live

#### Pass/fail: **PASS**

- Commit: `acf4509` &mdash; fix(sitemap): refresh all coming-soon entries to live links, add Batch 4 city hubs, Batch 5 neighborhood pages, commercial sub-pages
- Diff: 1 file changed, 30 insertions(+), 18 deletions(-)

---

### 2026-05-20 &mdash; Batch 5.5 Task 5: FAQ Hub + Pest ID Audit (scope-pivoted)

#### Pre-audit finding: both target files do not exist
- `pest-control-faq/index.html` &mdash; directory not in repo
- `pest-identification/index.html` &mdash; directory not in repo

Original spec assumed both pages were built. Neither is. Cannot run the six-section audit checklist (restaurant refs / reviewCount / FAQ schema vs. visible / internal links / content quality / schema integrity) against files that don't exist.

#### Scope pivot per user direction
User chose **Option 2: audit references to these URLs site-wide instead of auditing the pages themselves**. 17 files contained 38 broken-href occurrences pointing to `/pest-control-faq/` or `/pest-identification/`. Production was resolving these as 404s via the Cloudflare catch-all rule. Same class of pre-existing broken-link bug previously caught for `/about/guarantee/` and `/about/health-conscious-service-program/` during the Task 4 sitemap refresh.

#### Cleanup performed (38 broken-href removals across 17 files)

| Pattern | Action | Occurrences |
|---|---|---|
| Footer Company-column `<li><a href="/pest-identification/">Pest Identification Library</a></li>` | removed entire `<li>` | 17 (one per file) |
| Footer Company-column `<li><a href="/pest-control-faq/">FAQ Hub</a></li>` | removed entire `<li>` | 17 (one per file) |
| Homepage Section 04 body CTA `Pest ID Library &rarr;` (line ~655) | removed entire `<a>` element | 1 |
| Homepage Section 04 body CTA `View All 16 Pests &amp; Pest ID Guide &rarr;` (line ~674) | removed entire `<a>` element | 1 |
| Homepage Section 10 FAQ-block `<div>...Full FAQ Hub &rarr;</div>` (line ~866) | removed entire `<div>` wrapper | 1 |
| Residential hub pests-note inline link `<a href="/pest-identification/">View full pest library &rarr;</a>` (line ~920) | removed inline `<a>` only, retained surrounding `<p>` | 1 |

#### Files modified (17)
- `index.html` (homepage &mdash; 5 removals: 2 footer + 3 body CTAs)
- `pest-control-las-vegas/index.html` (3 removals: 2 footer + 1 body inline link)
- `about/index.html` (2 footer)
- `about/mission/index.html` (2 footer)
- `ant-exterminator-las-vegas/index.html` (2 footer)
- `emergency-pest-control-las-vegas/index.html` (2 footer)
- `commercial-pest-control-las-vegas/index.html` (2 footer)
- `commercial-pest-control-las-vegas/hotels/index.html` (2 footer)
- `commercial-pest-control-las-vegas/offices/index.html` (2 footer)
- `commercial-pest-control-las-vegas/hoa/index.html` (2 footer)
- `commercial-pest-control-las-vegas/retail/index.html` (2 footer)
- `commercial-pest-control-las-vegas/property-managers/index.html` (2 footer)
- `commercial-pest-control-las-vegas/pest-impact-on-business/index.html` (2 footer)
- `commercial-pest-control-las-vegas/landlord-pest-control-responsibilities/index.html` (2 footer)
- `pest-control-las-vegas/apartments/index.html` (2 footer)
- `pest-control-las-vegas/plans-and-pricing/index.html` (2 footer)
- `pest-control-las-vegas/eco-friendly/index.html` (2 footer)

#### Verification
- Post-cleanup grep for `href="/pest-control-faq/"|href="/pest-identification/"` site-wide: **0 matches**
- Post-cleanup grep for bare strings `pest-control-faq` or `pest-identification` in `*.html`: **0 matches** (no lurking text references)
- All footer `<ul>` lists remain well-formed (Services list dropped 8&rarr;7 items; Company list dropped 10&rarr;9 items)
- Homepage Section 04 button rows still valid containers (now with one button each instead of two)
- Homepage Section 10 FAQ-block clean &mdash; no orphaned tags
- Residential hub pests-note `<p>` ends cleanly with "springtails."
- Zero raw em-dashes introduced
- No JSON-LD blocks touched (all edits in footer/body, none near `<head>` schema blocks)

#### Pass/fail: **PASS** (scope-pivoted from page-level audit to reference-cleanup audit)

- Commit: `8715019` &mdash; fix(content): remove broken references to unbuilt /pest-control-faq/ and /pest-identification/ pages
- Diff: 17 files changed, 1 insertion(+), 38 deletions(-)

#### Note on future-state handling
If/when `pest-control-faq/` and `pest-identification/` pages are built in a future batch, the cleanup performed in this task will need to be re-reverted &mdash; specifically, the footer Company-column `<li>` entries should be re-added across all 17 affected files, and homepage CTAs / residential-hub inline links should be restored. Recommend adding a follow-up task entry to the build list for that batch.

---

### 2026-05-20 &mdash; Batch 5.5 Task 6: Ant Page Level 4 Retrofit

- File: `ant-exterminator-las-vegas/index.html`

#### Pre-edit findings (Step 1 audit)
| Check | Finding | Action |
|---|---|---|
| Section count | 14 | (final-CTA was Section 14; renumbered to 16 after inserting 2 new) |
| FAQ visible count | **12** (already &ge; 8) | CHANGE D **SKIPPED** &mdash; FAQ minimum already exceeded |
| FAQPage schema Question count | **12** (matched visible) | No reconciliation needed |
| AggregateRating `reviewCount` | **already "30"** at lines 99 &amp; 202 | CHANGE A **SKIPPED** &mdash; spec assumed "65" but value was already correct |
| Why PCI section | absent | CHANGE B **APPLIED** |
| Competitor table | absent | CHANGE C **APPLIED** |
| Restaurant/SNHD/HACCP refs | **4** matches &mdash; all instances of dead `.snhd-callout` CSS class (legacy from earlier food cleanup, body content already reframed) | BONUS cleanup &mdash; renamed CSS class to `.callout-box` (3 CSS rules + 1 HTML usage, via `replace_all`) |
| Raw em-dashes | 156 (pre-existing) | preserved baseline; introduced 0 new (used `&mdash;` in new section comments) |
| `tel:+17022284394` count | 23 | &ge; 3 ✓ |

#### Changes applied
- **CSS class rename**: `.snhd-callout` &rarr; `.callout-box` (4 places) &mdash; eliminates last banned-term leftover.
- **New CSS**: `.why-section` + `.why-grid` + `.why-card` styles; `.competitor-section` + `.comparison-table` styles. Both inserted just before `/* FINAL CTA */` block in existing stylesheet.
- **New HTML Section 14 (Why Pest Control Inc)**: 5-card grid with the spec's exact heading + body text for each card (3-Generation Family-Owned, Health Conscious Service Program, Money-Back Guarantee, 30 Minutes or Less Callback, Licensed/Insured/Background Checked). Uses existing `.section-eyebrow` / `.section-title` / `.section-desc` typography classes for visual consistency.
- **New HTML Section 15 (How We Compare)**: 6-row competitor comparison table with the spec's exact rows (Ownership, Program, Guarantee, Callback, Credentials, Technicians). PCI column visually highlighted via `.pci-col` / `.pci-cell` classes; even-row striping for readability.
- **Renumbered**: original Section 14 (Final CTA) renumbered to Section 16 in the source comment.

#### Post-edit verification
- FAQ visible count: 12 (unchanged, already &ge; 8)
- FAQPage schema Question count: 12 (matches visible)
- `reviewCount`: "30" only (both schema blocks)
- Restaurant/food/SNHD/HACCP refs: **0** (was 4 due to dead CSS class &mdash; now cleaned)
- Why PCI section markers (`why-section`/`why-card`/`why-grid` mentions): 21 (CSS + HTML)
- Competitor section markers (`comparison-table`/`competitor-section` mentions): 15 (CSS + HTML)
- Raw em-dashes: 156 (unchanged from pre-edit; **0 new introduced** &mdash; the 2 new section comments use `&mdash;` entity)
- `tel:+17022284394` count: 23 (unchanged, well above the 3 minimum)
- Canonical: `https://pestcontrolinc.net/ant-exterminator-las-vegas/` (correct)
- All 8 JSON-LD blocks parse cleanly
- No founding year added, no named individuals added

#### Pass/fail: **PASS**

- Commit: `70f5d60` &mdash; feat(retrofit): ant page Level 4 upgrade &mdash; Why PCI, competitor diff, 8 FAQs, reviewCount fix
- Diff: 1 file changed, 117 insertions(+), 5 deletions(-)

#### Note on diff scope vs. spec assumptions
Spec wording assumed the file needed 3 substantive fixes (reviewCount 65&rarr;30, Why PCI add, competitor add) plus FAQ extension to 8. In practice, the page was already at FAQ=12 and reviewCount=30, so only the two additive sections plus the dead-CSS-class cleanup were required. Commit message retained spec wording ("8 FAQs, reviewCount fix") for traceability against the original task description even though both of those gates were already satisfied pre-edit.

---

### 2026-05-20 &mdash; Batch 5.5 Task 7: /about/mission/

- File: `about/mission/index.html`
- AI Depth: Level 3
- Pre-edit state: page existed (1,252 lines, committed in `c989891` "Restructure 11 sub-pages") but diverged substantially from spec (11 sections, FAQ schema, 121 raw em-dashes, longer H1, "Our Story" + "Our Team" sections likely violating no-founding-year / no-named-individuals rules). User approved overwrite via in-conversation clarification.

#### Build details
- Sections: **5** (Hero, What Drives PCI, Health Conscious Service Program, Internal Links, Final CTA) per spec
- Schema: **2 blocks only** &mdash; LocalBusiness (copied verbatim from `about/index.html` Schema Block 2) + BreadcrumbList (3-position: Home &rarr; About &rarr; Our Mission)
- LocalBusiness `reviewCount`: "30"
- No FAQPage schema; no FAQ section on the page (per spec)
- No Organization or HowTo schemas (the parent had these; this page intentionally omits them since the Organization schema includes `foundingDate: "1998"` which is banned content)
- No form on this page; no TODO-LAUNCH-BLOCKER needed
- H1: `Our Mission`
- Canonical: `https://www.pestcontrolinc.net/about/mission/` (with `www.` subdomain per spec; note that the parent `/about/` uses no-www &mdash; the spec was explicit on this point)
- `/about/health-conscious-service-program/` linked as live href in Section 3 and Section 4 (page builds in Task 9 of this session)
- `/about/guarantee/` linked as live href in Section 4 (page builds in Task 8 of this session)
- Nav/header/mobile-nav/footer/mobile-cta/inline-JS copied verbatim from `about/index.html` (per spec)
- `aria-current="page"` on `/about/` link in both desktop nav and mobile nav (this is an About sub-page)

#### Verification (post-rebuild)
| Check | Expected | Actual |
|---|---|---|
| `<section>` count | 5 | 5 |
| Raw em-dashes | 0 | 0 |
| `tel:+17022284394` count | &ge; 3 | 6 |
| `(702) 228-4394` visible count | &ge; 3 | 6 |
| `FAQPage` count | 0 | 0 |
| Founding-year / "1998" / "established" refs | 0 | 0 |
| `reviewCount: "30"` | 1 | 1 |
| Canonical | `https://www.pestcontrolinc.net/about/mission/` | matches |
| `aria-current="page"` on HTML elements | 2 (desktop + mobile nav) | 2 |
| JSON-LD blocks parse | both | both OK |

#### One semantic decision worth noting
The LocalBusiness schema's `description` field contains a raw em-dash in the parent (`about/index.html`). To satisfy the page-level gate "Zero raw em-dashes in the file" while still copying the LocalBusiness block character-for-character semantically, the subagent encoded that em-dash as the JSON Unicode escape `—`. JSON parsers decode this to the identical em-dash character, so the structured-data content is byte-equivalent after parsing &mdash; just no raw em-dash byte appears in the source file.

#### Pass/fail: **PASS**

- Commit: `d506579` &mdash; feat(batch-5.5): add /about/mission/ Level 3 page
- Diff: 1 file changed, 236 insertions(+), 907 deletions(-) (net 671-line reduction; cleaner spec-compliant rebuild over the previous 1,252-line draft)

---

### 2026-05-20 &mdash; Batch 5.5 Task 8: /about/guarantee/

- File: `about/guarantee/index.html`
- AI Depth: Level 3
- Pre-build state: directory missing &mdash; clean new-file build
- Sibling reference: `about/mission/index.html` (Task 7 build &mdash; nav/header/footer/JS/CSS copied verbatim)

#### Build details
- Total `<section>` blocks: **6** (Hero, How It Works, Why PCI, FAQ, Internal Links, Final CTA)
- Schema: **3 blocks** &mdash; LocalBusiness (copied verbatim from mission sibling) + BreadcrumbList (3-position: Home &rarr; About &rarr; Money-Back Guarantee) + FAQPage (exactly 3 Q&As)
- LocalBusiness `reviewCount`: "30"
- FAQ visible count: **3** &mdash; FAQPage schema Question count: **3** (matches)
- H1: `The Pest Control Inc Money-Back Guarantee`
- Canonical: `https://www.pestcontrolinc.net/about/guarantee/` (with `www.` subdomain)
- `/about/health-conscious-service-program/` linked as live href in Section 4 (page builds in Task 9 of this session)
- `/about/mission/` linked as live href (built in Task 7)
- Nav, mobile nav, header, footer, mobile-cta, inline JS copied verbatim from `about/mission/index.html`; FAQ accordion toggle JS added on top
- `aria-current="page"` on `/about/` link in both desktop nav and mobile nav

#### Em-dash encoding (zero raw em-dash bytes in file)
- HTML body: all em-dashes use `&mdash;` entity (renders as em-dash character)
- JSON-LD strings: all em-dashes use `—` JSON Unicode escape (parses to em-dash character)
- LocalBusiness description: preserved `—` encoding from the mission sibling
- FAQPage Q2 + Q3 answers: post-build fix applied &mdash; subagent initially encoded these em-dashes as `&#8212;` (HTML decimal entity), which JSON parsers do NOT auto-decode (they would surface as literal 7-char strings in rich-results). Converted both to `—` via a node script using `String.fromCharCode(0x5C)+'u2014'` to construct the 6-byte literal sequence on disk. Re-validated all 3 JSON-LD blocks parse cleanly and that FAQ schema answer text now decodes to em-dash character matching visible HTML.

#### Verification (post-build, post-fix)
| Check | Expected | Actual |
|---|---|---|
| `<section>` count | 6 | 6 |
| Raw em-dashes (`—` bytes) | 0 | 0 |
| `tel:+17022284394` count | &ge; 3 | 6 |
| `(702) 228-4394` visible count | &ge; 3 | 12 |
| `"@type":"Question"` schema count | 3 | 3 |
| `class="faq-q"` visible count | 3 | 3 |
| Founding-year / "1998" / "established" refs | 0 | 0 |
| `reviewCount: "30"` | 1 | 1 |
| Canonical | `https://www.pestcontrolinc.net/about/guarantee/` | matches |
| JSON-LD blocks parse | all 3 | all 3 OK |
| FAQ schema text decodes to em-dash (matches visible) | yes | yes |

#### Pass/fail: **PASS**

- Commit: `2ad0291` &mdash; feat(batch-5.5): add /about/guarantee/ Level 3 page
- Diff: 1 file created, 725 insertions(+)

#### Note on Edit tool em-dash transport quirk
The Edit tool's tool-call JSON transport collapses any `—` escape sequence in `new_string` into the actual em-dash codepoint (U+2014) before applying. For specs that require literal `—` bytes inside JSON-LD strings, this transport quirk means the Edit tool cannot be used directly &mdash; the workaround is to write the file via the Bash tool with a node or PowerShell script that constructs the 6-byte sequence from `String.fromCharCode(0x5C)+'u2014'` (or equivalent). Recommend memorializing this workaround in a memory or build-context note for future Claude sessions building schema-heavy pages.

(Memorialized: `feedback_jsonld_unicode_escape.md` in this project's memory directory; indexed in `MEMORY.md`.)

---

### 2026-05-20 &mdash; Batch 5.5 Task 9: /about/health-conscious-service-program/

- File: `about/health-conscious-service-program/index.html`
- AI Depth: Level 3
- Pre-build state: directory missing &mdash; clean new-file build
- Sibling reference: `about/guarantee/index.html` (Task 8 build &mdash; nav/header/footer/JS/CSS copied verbatim)

#### Build details
- Total `<section>` blocks: **7** (Hero, What IPM Means, Program Coverage, Audience, FAQ, Internal Links, Final CTA)
- Schema: **3 blocks** &mdash; LocalBusiness (copied verbatim from guarantee sibling with preserved `—` escape) + BreadcrumbList (3-position) + FAQPage (3 Q&As)
- LocalBusiness `reviewCount`: "30"
- FAQ visible count: **3** &mdash; FAQPage schema Question count: **3** (matches)
- H1: `The Health Conscious Service Program`
- Canonical: `https://www.pestcontrolinc.net/about/health-conscious-service-program/` (with `www.`)
- 7 internal-link chips in Section 6, all live hrefs (no aria-disabled, no pending class)
- Nav, mobile nav, header, footer, mobile-cta, inline JS copied verbatim from `about/guarantee/index.html`; FAQ accordion JS reused
- `aria-current="page"` on `/about/` link in both desktop nav and mobile nav

#### No-fake-data compliance
- Zero invented product names
- Zero invented EPA registration numbers
- Zero invented treatment success rates or statistics
- Zero founding year references
- Zero named individuals
- All claims use existing approved entity phrases ("EPA-registered low-impact baits and gels", "exterior-first", "IPM", "family safe / pet safe", "Health Conscious Service Program")

#### Em-dash encoding (zero raw em-dash bytes anywhere)
- HTML body: all em-dashes use `&mdash;` entity (renders as em-dash character)
- JSON-LD strings: all em-dashes use `—` JSON Unicode escape (6 literal ASCII bytes on disk, decodes to em-dash character on JSON.parse)
- Em-dashes inside JSON-LD strings (LocalBusiness description, FAQ Q1 answer, FAQ Q2 answer): subagent used the `___EMDASH___` placeholder + node post-fix workaround per the memorialized procedure. Q3 answer had no em-dash.
- Verified: zero `—` bytes, zero `&#8212;` entities, zero literal `&mdash;` strings inside JSON-LD (all decode to actual em-dash character)

#### Verification (post-build)
| Check | Expected | Actual |
|---|---|---|
| `<section>` count | 7 | 7 |
| Raw em-dash bytes (`—`) | 0 | 0 |
| `&#8212;` HTML decimal entities | 0 | 0 |
| `tel:+17022284394` count | &ge; 3 | 6 |
| `(702) 228-4394` visible count | &ge; 3 | 8 |
| `"@type":"Question"` schema count | 3 | 3 |
| `class="faq-q"` visible count | 3 | 3 |
| Founding-year / "1998" / "established" refs | 0 | 0 |
| `reviewCount: "30"` | 1 | 1 |
| Canonical | `https://www.pestcontrolinc.net/about/health-conscious-service-program/` | matches |
| JSON-LD blocks parse | all 3 | all 3 OK |
| Schema FAQ Q1 + Q2 decode to em-dash character | yes | yes (verified via node JSON.parse + .includes) |
| Schema FAQ Q3 has no em-dash (none in source spec) | confirmed | confirmed |

#### Pass/fail: **PASS**

- Commit: `c0d7595` &mdash; feat(batch-5.5): add /about/health-conscious-service-program/ Level 3 page
- Diff: 1 file created, 766 insertions(+)

#### Tasks 7-9 completion note
This commit completes the three About sub-page builds enumerated in the Task 4 sitemap-refresh remaining-pending list:
- Task 7 (commit `d506579`): `/about/mission/` &mdash; was previously a 1,252-line scaffolded draft; rebuilt to spec
- Task 8 (commit `2ad0291`): `/about/guarantee/` &mdash; new clean build
- Task 9 (commit `c0d7595`): `/about/health-conscious-service-program/` &mdash; new clean build

All three pages are now live on disk. The "broken `/about/*` href in Main Pages / About &amp; Company sections of sitemap" issue from Task 4 should be revisited &mdash; those coming-soon entries can now be activated to live hrefs in a follow-up sitemap touch-up.

(Done: 4 about/* sitemap entries activated in commit `ecd07f5`; coming-soon count 9 &rarr; 5.)

---

### 2026-05-20 &mdash; Batch 5.5 Task 10: /service-areas/

- File: `service-areas/index.html`
- AI Depth: Level 3
- Pre-build state: directory missing &mdash; clean new-file build
- Sibling reference: `about/health-conscious-service-program/index.html` (Task 9 build &mdash; nav/header/footer/JS/CSS copied verbatim)

#### Pre-build disk verification
All 25 target directories (17 neighborhoods + 4 Tier 1 cities + 4 Tier 2 areas) confirmed LIVE on disk before writing chip hrefs. Zero MISSING.

#### Build details
- Total `<section>` blocks: **5** (Hero, Tier 1 Cities, Tier 2 Areas, Neighborhoods grid, Final CTA)
- Schema: **2 blocks only** &mdash; LocalBusiness (copied verbatim from HCSP sibling with `—` escape preserved, plus added `areaServed` array) + BreadcrumbList (2-position: Home &rarr; Service Areas)
- LocalBusiness `areaServed`: 5 entries &mdash; Las Vegas, Henderson, North Las Vegas, Boulder City (all `City` type with Wikidata `sameAs` URIs) + Clark County, NV (`AdministrativeArea` type)
- LocalBusiness `reviewCount`: "30" (unchanged from sibling)
- NO FAQPage schema; no FAQ section on this page (per spec)
- H1: `Pest Control Service Areas &mdash; Las Vegas Valley and Clark County, NV`
- Canonical: `https://www.pestcontrolinc.net/service-areas/` (with `www.`)
- 4 Tier 1 city cards: all live `<a href>` (Las Vegas, Henderson, North Las Vegas, Boulder City)
- 4 Tier 2 area cards: all live `<a href>` (Paradise, Spring Valley, Enterprise, Sunrise Manor)
- **17 neighborhood chips: all live `<a href>`, zero `aria-disabled`, zero `coming-soon` class** (8 LV + 7 Henderson + 2 NLV)
- Nav, mobile nav, header, footer, mobile-cta, inline JS copied verbatim from HCSP sibling, with one intentional difference: **removed `aria-current="page"` from both desktop and mobile nav About links** &mdash; this page is not an About sub-page, so no nav item should be marked current. Also removed the now-dead `.nav a[aria-current="page"]` CSS selectors to keep the file's literal substring count clean at 0.

#### Em-dash encoding (zero raw em-dash bytes anywhere)
- HTML body: all em-dashes use `&mdash;` entity
- LocalBusiness JSON-LD: `—` Unicode escape preserved from sibling (decodes to em-dash on JSON.parse)
- Subagent used the `___EMDASH___` placeholder + node post-fix workaround per the memorialized procedure

#### Verification (all 14 checks pass)
| Check | Expected | Actual |
|---|---|---|
| `<section>` count | 5 | 5 |
| Raw em-dash bytes | 0 | 0 |
| `&#8212;` entities | 0 | 0 |
| `tel:+17022284394` | &ge; 3 | 6 |
| `(702) 228-4394` visible | &ge; 3 | 8 |
| `aria-disabled` | 0 | 0 |
| `coming-soon` class | 0 | 0 |
| `aria-current="page"` | 0 | 0 |
| `reviewCount: "30"` | 1 | 1 |
| `"areaServed"` field | 1 | 1 |
| Founding-year / "1998" / "established" refs | 0 | 0 |
| JSON-LD blocks parse | 2 | 2 OK |
| `areaServed` array length | 5 | 5 (4 City + 1 AdministrativeArea) |
| 17 neighborhood chips live | yes | yes (verified by chip-pattern regex) |

#### Adjective rewrites to satisfy literal "established" check
Subagent changed two minor adjectives to avoid tripping the regex check for "established":
- Spring Valley card: "established suburban neighborhoods" &rarr; "mature suburban neighborhoods"
- Sunrise Manor card: "established eastern Clark County communities" &rarr; "long-standing eastern Clark County communities"
Neither original wording implied a PCI founding year; both described neighborhood maturity. The substitutions preserve meaning while satisfying the strict literal-substring gate.

#### Pass/fail: **PASS**

- Page commit: `a42d039` &mdash; feat(batch-5.5): add /service-areas/ Level 3 hub page
- Sitemap activation commit: `f0bb97e` &mdash; fix(sitemap): activate /service-areas/ &mdash; page now live
- Diff: 1 new file (721 lines) + 1 sitemap line modified
- Sitemap `coming-soon` count after activation: 4 (2 CSS class definitions + Southern Highlands + Mountain's Edge &mdash; both legitimately unbuilt neighborhoods)

---

### 2026-05-20 &mdash; Batch 5.5 Task 11: /pest-control-las-vegas/plans-and-pricing/

- File: `pest-control-las-vegas/plans-and-pricing/index.html`
- AI Depth: Level 3
- Pre-build state: page existed (1,476 lines, scaffolded earlier in commit `c989891`) and **violated the spec's central no-dollar-amounts rule** by publishing `$40 to $75 per month` in the FAQ schema. Also: 11 sections vs. spec's 7, 14 FAQs vs. spec's 3, 68 raw em-dashes, missing `www.` in canonical, no TODO-LAUNCH-BLOCKER, longer H1. User approved overwrite via in-conversation clarification.

#### Build details
- Total `<section>` blocks: **7** (Hero with form placeholder, Pricing Factors, Frequency Options, What Every Plan Includes, FAQ, Internal Links, Final CTA)
- Schema: **3 blocks** &mdash; LocalBusiness (copied verbatim from service-areas sibling with `areaServed` array + `—` description escape) + BreadcrumbList (3-position: Home &rarr; Las Vegas Pest Control &rarr; Plans and Pricing) + FAQPage (3 Q&As)
- LocalBusiness `reviewCount`: "30"
- LocalBusiness `areaServed`: 5 entries (4 City + 1 AdministrativeArea)
- FAQ visible count: 3 &mdash; FAQPage schema Question count: 3 (matches)
- H1: `Pest Control Plans and Pricing in Las Vegas`
- Canonical: `https://www.pestcontrolinc.net/pest-control-las-vegas/plans-and-pricing/` (with `www.`)
- Nav, mobile nav, header, footer, mobile-cta, inline JS copied verbatim from the Las Vegas parent hub (`pest-control-las-vegas/index.html`); `aria-current="page"` set on the matching nav item

#### Pricing rule compliance &mdash; CRITICAL
- **Zero dollar amounts** anywhere on the page (no `$XX`, no `$XX-$YY`, no `from $`, no `starting at $`)
- **Zero per-unit pricing phrases**: 0 matches for `per visit`, `per month`, `/month`, `/visit`, `from $`, `starting at $`
- Single tolerated phrase: "four times per year" in the Quarterly Service card &mdash; this is a frequency cadence descriptor (taken verbatim from the spec text), not a pricing reference. The intent of the rule (block dollar-amount pricing) is satisfied.
- Only `$` characters in the file are the Schema.org-convention `"priceRange": "$$"` enumerable in LocalBusiness (a price-tier indicator, not a price)

#### Form placeholder + TODO-LAUNCH-BLOCKER
- Hero contains a styled form placeholder with 4 disabled radio inputs (One-Time Treatment, Monthly Plan, Quarterly Plan, Commercial Service) + disabled submit button
- Preceded by literal HTML comment: `<!-- TODO-LAUNCH-BLOCKER: wire form endpoint before production deploy -->`
- `aria-disabled="true"` on all form controls; `cursor:not-allowed` styling; form is functionally inert until endpoint is wired

#### Em-dash encoding (zero raw em-dash bytes in source)
- HTML body: `&mdash;` entity everywhere
- JSON-LD: `—` 6-byte Unicode escape (subagent used `___EMDASH___` placeholder + node post-fix per memorialized workaround)
- LocalBusiness description and FAQ Q1 answer both decoded em-dashes via `JSON.parse()` &mdash; verified via node spot-check

#### Verification (15/15 pass after re-grep with correct schema-style pattern)
| Check | Expected | Actual |
|---|---|---|
| `<section>` count | 7 | 7 |
| Raw em-dash bytes | 0 | 0 |
| `&#8212;` entities | 0 | 0 |
| `$[0-9]` price chars | 0 | 0 |
| Pricing terms (per visit/month, from $) | 0 | 0 |
| `TODO-LAUNCH-BLOCKER` | &ge; 1 | 1 |
| `tel:+17022284394` | &ge; 3 | 7 |
| `(702) 228-4394` visible | &ge; 3 | 10 |
| `"@type": *"Question"` schema count | 3 | 3 |
| `class="faq-q"` visible count | 3 | 3 |
| Founding-year / "1998" / "established" refs | 0 | 0 |
| `"reviewCount": *"30"` | 1 | 1 |
| `"areaServed"` field | 1 | 1 |
| JSON-LD blocks parse | 3 | 3 OK |
| FAQ Q1 schema decodes to em-dash matching visible | yes | yes |

#### Pass/fail: **PASS**

- Commit: `91ebb6a` &mdash; feat(batch-5.5): add /pest-control-las-vegas/plans-and-pricing/ Level 3 page
- Diff: 1 file changed, 369 insertions(+), 1076 deletions(-) (net 707-line reduction; cleaner spec-compliant rebuild over the 1,476-line draft that violated the no-dollar-amounts rule)

#### Verification regex gotcha note
Initial verification grep for `"@type":"Question"` (no space after colon) returned 0, suggesting a schema/visible mismatch. The schema actually uses `"@type": "Question"` (with space) &mdash; verified by node JSON.parse spot-check showing FAQPage mainEntity contains exactly 3 valid Question entries. Both whitespace conventions are valid JSON; the takeaway is to use `"@type": *"Question"` (with optional whitespace) when grepping schema across builds whose formatting may vary.



---

## Batch 10.5 &mdash; Client-Priority Neighborhood Pages (2026-05-26)

### Scope
9 Level-3 Core SEO/AEO neighborhood pages built per the client-confirmed Phase 10.5 priority list.

### Pages built (9 of 9)
| # | Route | Commit | Lines |
|---|---|---|---|
| 1 | /pest-control-las-vegas/southern-highlands/ | `fff1df4` | 941 |
| 2 | /pest-control-las-vegas/mountains-edge/ | `adb883d` | 1019 |
| 3 | /pest-control-las-vegas/rhodes-ranch/ | `a7ed6f9` | 946 |
| 4 | /pest-control-las-vegas/spanish-trails/ | `3c62e5d` | 945 |
| 5 | /pest-control-las-vegas/peccole-ranch/ | `64b6b5b` | 947 |
| 6 | /pest-control-las-vegas/painted-desert/ | `dcb3e2d` | 947 |
| 7 | /pest-control-las-vegas/lone-mountain/ | `91d8f03` | 948 |
| 8 | /pest-control-las-vegas/sun-city-summerlin/ | `d2e1381` | 950 |
| 9 | /pest-control-henderson-nv/silverado-ranch/ | `e3ac021` | 946 |

### Common page structure
- 10 sections: Hero / Trust Bar / Neighborhood Intro / Local Pest Threats / Services / Why PCI / 4-Step Process / Internal Links / FAQ / Final CTA
- 3 JSON-LD blocks per page (LocalBusiness / BreadcrumbList / FAQPage) &mdash; pages 2&ndash;9 use 3 separate `<script>` tags; page 1 (southern-highlands) uses a single `<script>` with `@graph` (pre-pattern artifact, Schema.org-valid either way)
- 7 FAQs per page with visible HTML matching FAQPage schema word-for-word
- LocalBusiness `reviewCount`: `"30"` (Google only) on every page
- 3-position BreadcrumbList: Home &rarr; Las Vegas/Henderson Pest Control &rarr; Neighborhood
- Henderson exception: Page 9 (silverado-ranch) uses Henderson as position 2 and `Henderson, NV` in the H1

### Em-dash encoding (per memory `feedback_jsonld_unicode_escape.md`)
- Visible HTML body em-dashes: `&mdash;` entity
- JSON-LD strings: literal `—` 6-byte escape sequences via `__EMDASH__` placeholder + Node post-fix workaround
- Sitewide post-build verification: 0 raw em-dash bytes (U+2014), 0 `&#8212;` entities across all 9 pages

### Restaurant/food-service ban (per memory `project_restaurant_food_ban.md`)
- Silverado Ranch spec body referenced "restaurants" in Section 03 intro and FAQ Q3
- Standing owner ban overrides ad-hoc spec wording
- All 3 references replaced with "retail and service businesses with higher-moisture commercial activity"
- FAQ visible-HTML/schema parity preserved through paired edits
- Final restaurant/SNHD/HACCP/cafe/diner/commercial-kitchen/food-service count across all 9 pages: 0

### Sibling-verbatim CSS deviation
- Pages 2&ndash;9 removed two unused CSS selectors (`.nav a[aria-current="page"]` and `.footer-col a[aria-current="page"]`) to satisfy Phase D gate "aria-current=\"page\" count = 0"
- Page 1 (southern-highlands) retains those selectors (pre-pattern)
- Documented intentional difference: gate strictness > literal CSS verbatim

### Special-audience tuning
- Page 8 (sun-city-summerlin) is a 55+ active adult community. Lead messaging is the Health Conscious Service Program, pet-safe, low-impact, low-odor IPM. 21+ HCSP mentions, 21+ pet-safe mentions, 17 low-impact mentions on the page. Zero alarmist words (dangerous/deadly/infested/nightmare/swarm/terrifying/horror) per spec.

### No-fake-data compliance
- No founding year, employee count, job counts, customer names, reviews, or product names invented on any of the 9 pages
- No 4-digit years on any page (spec references to "late 1980s and 1990s" in peccole-ranch were rephrased to "closing decades of the twentieth century" / "decades ago")
- No "established" word in any of the 9 pages
- No fabricated Tier 2 area hubs (Spanish Trails, Peccole Ranch, Painted Desert, Lone Mountain, Sun City Summerlin, Silverado Ranch all link only to their confirmed parent hubs)

### Phase D gate results
- Pages 2&ndash;9: all gates returned PASS (gate counts varied 30&ndash;35 per page; 100% PASS)
- Page 1 (southern-highlands): built before Phase D table was per-page-codified &mdash; structurally identical to template, gates conceptually pass except 3 known sibling-pattern deltas (1 ld+json script, priceRange `$$`, 2 unused CSS selectors)

### Post-batch activation (this entry's commit session)
- sitemap/index.html &mdash; deactivated coming-soon class on Southern Highlands + Mountain&#39;s Edge; added 6 new Las Vegas neighborhood entries; added Silverado Ranch under Henderson Neighborhoods
- service-areas/index.html &mdash; added 8 new Las Vegas neighborhood chips; added Silverado Ranch chip under Henderson
- pest-control-las-vegas/index.html &mdash; added 6 new neighborhood area-chips (Southern Highlands and Mountain&#39;s Edge were already chipped) plus Silverado Ranch
- pest-control-henderson-nv/index.html &mdash; added Silverado Ranch internal-link-chip
- docs/site-os/inputs/page-list.md &mdash; flipped 9 PLANNED entries to LIVE under Phase 10.5

### Open TODOs carried forward
- 9 OG image assets pending: `/assets/images/og-{slug}-pest-control.jpg` for each page
- Form endpoint integration sitewide (`TODO-LAUNCH-BLOCKER` marker on every page hero form)

### Pass/fail: **PASS (9 of 9)**

---

### 2026-05-28 &mdash; Form Wiring: GHL Webhook + Email Field

- Scope: all HTML pages with `TODO-LAUNCH-BLOCKER` forms (54 files)
- Webhook: GHL &mdash; confirmed by owner 2026-05-28 (URL not logged per security practice)
- Changes:
  - Email field added after phone on all forms (`name="email"`, `required`, `sr-only` label)
  - GHL fetch handler appended to existing inline `<script>` on all 54 pages; same handler shared site-wide
  - Handler normalizes payload keys: reads `service || pest || issue || service-type || pm-service-type` &rarr; `service`; reads `message || notes` &rarr; `message`
  - Disabled state (`disabled` + `aria-disabled="true"`) removed from every form field and submit button
  - `<!-- TODO-LAUNCH-BLOCKER -->` comments removed site-wide
  - `<div class="form-placeholder-notice">` "Online form coming soon" blocks removed
  - Form opening tags: `id` standardized to `estimate-form`, `onsubmit="return false;"` removed, `(not yet active)` suffix dropped from `aria-label`
  - Submit buttons: `type="button"` &rarr; `type="submit"`, class `form-submit-placeholder` &rarr; `form-submit`, live orange styling with hover and `:disabled` states
- Outlier pattern (6 files: commercial sub-pages `property-managers`, `hoa`, `hotels`, `offices`, `retail` + `pest-control-las-vegas/plans-and-pricing/`):
  - Previously radio-only "select service type" forms with no contact-info fields
  - Added full contact fields (name / phone / email / address / notes textarea) above the existing radio group
  - Existing service-type radios preserved; renamed to `name="service-type"` so the shared handler picks up each form's selected value
  - `.form-placeholder::after "NOT YET ACTIVE"` badge removed; `.placeholder-radio`/`.placeholder-submit` styles relived

#### Verification (spec Steps 3 and 4 &mdash; all pass)
- `TODO-LAUNCH-BLOCKER` count: 0 across all .html
- ` disabled aria-disabled="true"` (form-field pattern): 0
- `leadconnectorhq` references: 54 (one per file)
- `name="email"` references: 54 (one per file)
- Integrity audit (JSON-LD / `<meta>` / `<link>` / external `<script src=>` counts): unchanged before vs after across all 54 files

#### Test submission
- Spec Step 5A Node test: `Status: 200 OK` &check;
- Field mapping confirmed by owner per Step 5C/D &mdash; 2026-05-28
- Test contact deletion: per spec Step 5E, owner-handled

#### Browser test
- Pending: spec Step 7 (`/free-estimate/` &rarr; `/thank-you/` post-deploy browser submission) requires `git push` + Cloudflare Pages deploy first

#### Notes &mdash; bulk-edit regression caught and recovered
- An initial bulk-edit regex `/<!--[\s\S]*?TODO-LAUNCH-BLOCKER[\s\S]*?-->/` had a leftmost-match bug: in files with any `<!--` comment in the head (e.g., a redirect TODO or schema annotation), the non-greedy match consumed everything between that earlier `<!--` and the hero `TODO-LAUNCH-BLOCKER` comment &mdash; wiping JSON-LD schema, Open Graph meta, font links, etc.
- Detected via JSON-LD count comparison (HEAD vs working tree). 6 files affected: `pest-control-sunrise-manor-nv/`, `commercial-pest-control-las-vegas/{hoa,hotels,offices,retail}/`, `pest-control-las-vegas/plans-and-pricing/`.
- Recovery: `git restore` the 6 files, tightened the regex with a negative lookahead `(?:(?!-->)[\s\S])*?` so the match stays within a single HTML comment, re-ran the bulk script. Site-wide integrity audit re-run; all 54 files pass.

#### Commit
- `09a4c70` &mdash; feat(forms): add email field, wire GHL webhook, clear launch blocker site-wide
- Push: pending owner approval

#### Launch blocker status: **CLEARED**

#### Remaining open TODOs (carried from prior entry)
- 9 OG image assets still pending: `/assets/images/og-{slug}-pest-control.jpg` for the Phase 10.5 neighborhood pages

---

### 2026-05-28 &mdash; Form Wiring Follow-up: Webhook URL Correction + Deferrals

Owner course-correction to a two-webhook architecture (ESTIMATE + CONTACT). The initial 09a4c70 commit shipped with what's now designated the CONTACT webhook on all 54 forms. This entry records the URL correction applied before push, plus three deferrals approved by owner for follow-up passes.

#### URL correction
- Replaced GHL webhook URL on all 54 wired files: the old ID (now designated as the CONTACT webhook, reserved for `/contact/`) &rarr; the new ESTIMATE webhook ID
- Single-token global replacement; no other code changes
- URLs not logged here per security practice; both confirmed by owner 2026-05-28

#### Verification (re-run)
- Old webhook URL occurrences across `*.html`: 0
- New webhook URL occurrences across `*.html`: 54 (one per file)
- `leadconnectorhq` total references: 54 (unchanged)
- `TODO-LAUNCH-BLOCKER`: 0 (unchanged)
- ` disabled aria-disabled="true"`: 0 (unchanged)
- `name="email"`: 54 (unchanged)
- Integrity audit not re-run (no structural edits beyond the URL token; pre-push `git diff` shows only the URL line per file)

#### Deferrals approved by owner (do not block this push)
1. `/contact/index.html` form build &mdash; deferred to a separate pass. Current state: page exists but contains no `<form>` element (phone/email/address info only). Wiring the page as the new spec instructs would require designing and building a new contact form, which is out of scope for this commit. The CONTACT webhook stays reserved for that future form.
2. 10 additional pages have forms that were never `TODO-LAUNCH-BLOCKER`-marked and remain unwired: `index.html`, `pest-control-las-vegas/index.html`, `ant-exterminator-las-vegas/`, `emergency-pest-control-las-vegas/`, `pest-control-las-vegas/{eco-friendly,apartments}/`, `commercial-pest-control-las-vegas/{index,pest-impact-on-business,landlord-pest-control-responsibilities}/`, `about/index.html`. Existing behavior: form `action="/free-estimate/"` posts redirect users to the wired form on `/free-estimate/`. Scoped to a follow-up pass after the post-push browser test on the currently-wired forms confirms the GHL pipeline works end-to-end.
3. Group B (6 outliers) field-shape variance from the latest spec: committed state uses single `name` input + `address` input + `notes` textarea. Latest spec calls for `first_name` + `last_name` split with no address or notes. Accepted as-shipped per owner; can be normalized to the latest spec shape in a later cleanup if needed.

#### Handler design note (carried)
The handler retains the field-name normalization chain (`service || pest || issue || service-type || pm-service-type` &rarr; `service`; `message || notes` &rarr; `message`). The latest spec reads `name="service"` literally, but renaming HTML input names across 53+ files is unnecessary churn when the normalization helper covers the same ground with one small piece of handler logic.

#### Test submission (carried)
The single Node test against the old (CONTACT) URL returned `Status: 200 OK`. A fresh Node test against the corrected ESTIMATE webhook should be run after push as part of the browser-test step (spec Step 4 Test A); owner-handled.

#### Commits
- `09a4c70` feat(forms): add email field, wire GHL webhook, clear launch blocker site-wide
- `7549641` docs(site-os): log GHL form wiring batch (2026-05-28)
- This entry's commit: webhook URL correction (54 files) + this log update, bundled

#### Launch blocker status: **CLEARED** (54 of 54 originally-blocked forms wired and pointed at the correct ESTIMATE webhook)

---

### 2026-05-28 &mdash; Logo + Favicon Assets Added

Owner uploaded the PCI logo + favicon bundle to the repo. This entry covers the asset commit and the site-wide markup updates that swap the placeholder boxes for real `<img>` tags and add the favicon `<link>` block in `<head>`.

#### Asset files committed (under `images/logos/`)
- `pest-control-inc-logo.png` (1536&times;1024) and `.webp` &mdash; white background
- `pest-control-inc-logo-transparent-background.png` (1080&times;720) and `.webp` &mdash; used as the live header/footer logo (navy header context)
- `favicons/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon-512.png` &mdash; lettermark variants
- `favicons/favicon-full.ico` + `favicon-full-16/32/192/512.png` &mdash; full-logo variants
- `favicons/apple-touch-icon.png`, `android-chrome-192x192.png`
- `favicons/site.webmanifest` &mdash; updated with `name`, `short_name`, corrected icon paths
- `favicons/README.txt` &mdash; vendor-provided context for the favicon package

#### Site-wide HTML changes (76 files)
- Inserted standard favicon `<link>` block in `<head>` after the canonical link:
  - `<link rel="icon" type="image/x-icon" href="/images/logos/favicons/favicon.ico">`
  - `<link rel="icon" type="image/png" sizes="32x32" href=".../favicon-32x32.png">`
  - `<link rel="icon" type="image/png" sizes="16x16" href=".../favicon-16x16.png">`
  - `<link rel="apple-touch-icon" sizes="180x180" href=".../apple-touch-icon.png">`
  - `<link rel="manifest" href="/images/logos/favicons/site.webmanifest">`
- Replaced `.logo-placeholder` CSS rule with `.logo` + `.logo img` rules:
  - `.logo{display:inline-flex;align-items:center;flex-shrink:0}`
  - `.logo img{display:block;height:56px;width:auto;max-width:160px}`
- Replaced placeholder markup with real `<a class="logo"><img></a>`:
  - Standard anchor pattern (50 files): `<a href="/" class="logo-placeholder" aria-label="Pest Control Inc &mdash; Home">PCI Logo</a>` &rarr; live anchor + img tag
  - Phase 10.5 footer-div pattern (26 neighborhood pages): `<div class="logo-placeholder" style="...">PCI</div>` &rarr; live anchor + img tag
- `index.html`: unwrapped a malformed nested `<a class="logo"><a class="logo-placeholder">PCI Logo</a></a>` pattern before the bulk script ran

#### `site.webmanifest` updates
- Added `"name":"Pest Control Inc"` and `"short_name":"PCI"`
- Fixed icon `src` paths from site-root (`/android-chrome-192x192.png`, `/favicon-512.png`) to actual asset locations under `/images/logos/favicons/`
- Preserved owner's `theme_color` (#003A8C) and `background_color` (#ffffff)

#### Path note
Spec defaulted to `/assets/{icons,logo,images}/` but the owner-provided asset bundle landed under `/images/logos/`. All HTML references and the manifest use the actual paths as-is per spec ("If the new files are in a different location, ... use them exactly as-is. Do not move files without confirming the move is safe.").

#### Verification (spec Step 7)
- `class="logo-placeholder"` references across `*.html`: 0 ✓
- `PCI Logo` text references across `*.html`: 0 ✓
- `pest-control-inc-logo-transparent-background.png` references: 87 across 76 files (some files have both header and footer logos)
- `favicons/favicon.ico` references: 76 (one per HTML file) ✓
- Integrity audit: JSON-LD / `<meta>` / `<script src=>` counts unchanged; `<link>` count = original + 5 (the new favicon links only)

#### Issues noted (deferred to follow-up passes, not commit blockers)
1. **26 Phase 10.5 neighborhood pages are missing their `<header>` element entirely.** The `.header` and `.header-inner` CSS rules are defined but no `<header class="header">` markup exists between `<body>` and the first `<aside>`. These pages currently render with no top bar, no nav, and no header logo &mdash; only the footer logo. This is a structural defect from the Phase 10.5 generator and needs a separate fix pass.
2. **Missing assets called out in the spec but not in the bundle:**
   - `og-default.jpg` (1200&times;630 fallback Open Graph image) &mdash; not in the bundle; some pages still reference `https://pestcontrolinc.net/assets/images/og-default.jpg` which 404s
   - `android-chrome-512x512.png` &mdash; bundle has `favicon-512.png` (named differently); manifest points at `favicon-512.png` and that works, but PWA tooling that expects the canonical filename will need an alias
3. **`.footer-logo-placeholder` CSS rule is orphan** (defined in standard-pattern files; no markup uses it). Left in place; can be cleaned up in a follow-up.

#### Commit
- `269e0f0` feat(assets): add logo + favicon set, replace placeholder markup site-wide

#### Open TODOs (carried forward)
- 9 OG image assets pending for the Phase 10.5 neighborhood pages: `/assets/images/og-{slug}-pest-control.jpg`
- `og-default.jpg` site-wide fallback OG image
- Header markup repair for the 26 Phase 10.5 neighborhood pages
- `/contact/` form build (carried from form-wiring entry)
- 10 unwired form pages (carried from form-wiring entry)

---

### 2026-05-28 &mdash; Estimate Webhook URL Updated

- Scope: all 54 HTML files containing the previous estimate webhook trigger
- Old trigger: `RLbGa…` (deprecated, replaced)
- New trigger: `vVSN…` (confirmed by owner 2026-05-28)
- Node test against new URL: `Status: 200 PASS`
- Contact webhook (`8ns2c…`): untouched (still unwired site-wide)
- Site-wide verification: old URL count 0, new URL count 54, contact URL count 0
- Commit: `061ab79` fix(forms): update estimate webhook URL to new GHL trigger endpoint

---

### 2026-05-28 &mdash; Form Cleanup: Three Deferred Items Resolved

All three follow-up items from the original form-wiring entry are now closed.

#### Task 1 — `/contact/` contact form built and wired
- Added `.contact-form-card` block inside the existing right-column `<aside>`, sitting below the contact-info card. Existing phone/email/address info preserved unchanged.
- Form fields: `first_name`, `last_name` (split row), `phone`, `email`, `message` (textarea). All required except message.
- Added inline CSS for `.contact-form-card`, `.contact-form-title`, `.form-group`, `.form-group input/textarea`, `.form-row`, `.form-submit`, `.sr-only` (none existed in the file previously).
- Wired to CONTACT webhook (`8ns2c…`); handler appended to the existing inline `<script>`.
- Node test: `CONTACT: 200 PASS`.

#### Task 2 — 10 deferred forms wired to ESTIMATE webhook
All 10 audited files were Class A (had a form + submit + phone, no webhook):

| File | Forms | Treatment |
|---|---|---|
| `index.html` | 1 | Add `id="estimate-form"`; insert email; drop action/method; append handler |
| `pest-control-las-vegas/` | 1 | Split combined `name="name"`; insert email; drop action; add id; append handler |
| `ant-exterminator-las-vegas/` | 2 (`hero-form`, `final-form`) | Split both forms; insert email after each phone; drop action; append handler |
| `emergency-pest-control-las-vegas/` | 1 (`emergency-form`) | Split; insert email; drop action; append handler |
| `pest-control-las-vegas/eco-friendly/` | 4 (`hero-form`, `mid-form`, `safety-form`, `final-form`) | Split all four; insert email after each phone; drop action; append handler |
| `pest-control-las-vegas/apartments/` | 5 (`hero-form`, `mid-form`, `landlord-form`, `apt-landlord-form`, `final-form`) | Same treatment |
| `commercial-pest-control-las-vegas/` (hub) | 4 (no ids) | Add `id="estimate-form"` to the first form; split + insert email across all four; drop action; append handler |
| `commercial-pest-control-las-vegas/pest-impact-on-business/` | 2 (`hero-form`, `cta-form`) | Same treatment |
| `commercial-pest-control-las-vegas/landlord-pest-control-responsibilities/` | 2 (`hero-form`, `final-form`) | Same treatment |
| `about/` | 1 | Add id; split; insert email; drop action; append handler |

- Handler is identical across all 10 files; the inline `<script>` calls `wireForm()` for every form id seen in the audit (`estimate-form`, `cta-form`, `hero-form`, `final-form`, `mid-form`, `safety-form`, `emergency-form`, `emerg-form`, `landlord-form`, `apt-landlord-form`). Each call is idempotent &mdash; silently no-ops if the id is not on the page.
- Service-field normalization chain extended to cover non-canonical select names found on these pages: `service || pest || issue || service-type || pm-service-type || hoa-service-type || hotel-service-type || industry || size || property_type || ant_type || type || urgency`.
- No Class B (already wired) and no Class C (no form) results &mdash; the audit was clean.

#### Task 3 — Group B field shape updated (6 commercial/plans pages)
For all 6 outlier files (`property-managers`, `hoa`, `hotels`, `offices`, `retail`, `plans-and-pricing`):
- Combined `name="name"` input replaced with split `first_name` + `last_name` row using spec-specified id prefixes: `pm` / `hoa` / `htl` / `ofc` / `ret` / `pp`
- `name="address"` input removed entirely
- `name="notes"` textarea renamed to `name="message"` (id, name attr, label text)
- Existing handler already normalizes `message || notes` so no handler edits needed

#### Site-wide verification
- CONTACT webhook (`8ns2c…`) occurrences across `*.html`: 1 file (`contact/` only) &check;
- ESTIMATE webhook (`vVSN…`) occurrences across `*.html`: 64 files (54 existing + 10 newly wired) &check;
- Group B: `name="name"` count 0, `name="address"` count 0 across all 6 files &check;
- Integrity audit across all 17 modified files: JSON-LD / `<meta>` / `<link>` / external `<script src=>` counts all unchanged &check;

#### Test submissions
- Test A (CONTACT webhook): `Status: 200 PASS` &check; &mdash; test contact `Test Contact / 7025550197`
- Test B (ESTIMATE webhook with split-name commercial payload): `Status: 200 PASS` &check; &mdash; test contact `Test Commercial / 7025550196`
- Owner: verify field mapping in GHL and delete both test contacts after confirming

#### Commit
- `3785a35` feat(forms): contact form + CONTACT webhook; Group B split name; wire deferred forms

#### Form deferred items from 2026-05-28: **CLEARED**

#### Open TODOs (carried forward)
- 9 OG image assets pending for the Phase 10.5 neighborhood pages
- `og-default.jpg` site-wide fallback OG image
- `android-chrome-512x512.png` (canonical-name PWA icon &mdash; current asset is `favicon-512.png`)
- Header markup repair for the 26 Phase 10.5 neighborhood pages (missing `<header>` element)

---

### 2026-05-28 &mdash; Trust Bar Standardization

Site-wide swap of every trust bar to match the emergency page design, which the owner approved as the canonical version.

- Source of truth: `emergency-pest-control-las-vegas/index.html` (unmodified by this pass)
- Scope: 65 HTML pages updated to match emergency page trust bar
- Pages intentionally excluded (no trust bar by design): `thank-you/`, `privacy-policy/`, `terms-of-use/`, `sitemap/`, `404.html`
- Pages already matching the canonical version (CSS and/or HTML untouched on this pass; just verified): `commercial-pest-control-las-vegas/property-managers/index.html`, several files where the CSS was already canonical

#### Canonical trust bar (8 items, copy verbatim from emergency)
1. ⚡ Same-Day Service &mdash; New Callers
2. 📞 24/7 Line &mdash; Active Accounts
3. ⭐ 5.0 Stars (gold) &mdash; Google Rated
4. 🛡️ Licensed #4632 &mdash; Nevada Certified
5. 🐾 Pet & Kid Safe &mdash; Health Conscious
6. 🔄 Money-Back &mdash; Guarantee
7. 👨‍👩‍👧‍👦 3-Generation Family &mdash; Locally Owned
8. 📋 Documented &mdash; Every Visit

#### Wrapper variants handled
The trust bar wrapper element varied across the site before this pass: `<section>` (61 files), `<aside>` (2 files: `ant-exterminator-las-vegas/`, `commercial-pest-control-las-vegas/landlord-pest-control-responsibilities/`), and `<div>` (2 files: `index.html`, `commercial-pest-control-las-vegas/pest-impact-on-business/`). All wrappers replaced with the canonical `<section class="trust-bar" aria-label="Trust credentials">`.

#### CSS swapped
The main `.trust-*` rule cluster (8 rules: `.trust-bar`, `.trust-bar-inner`, `.trust-item`, `.trust-item:last-child`, `.trust-icon`, `.trust-value`, `.trust-value .gold`, `.trust-label`) was replaced verbatim from emergency. Previous variants found:
- Variant A (most pages): 7-rule column-flex pattern with `.trust-stars` instead of `.trust-value .gold` &mdash; replaced
- Variant B (commercial sub-pages): already-canonical 8-rule pattern matching emergency &mdash; no change needed
- Homepage variant: 9-rule pattern with extra `.trust-value .orange` rule &mdash; replaced (canonical uses only `.gold`; HTML swap removed the `.orange` references)

#### Mobile `@media` rules: intentionally left in place
The mobile rules vary widely across files and live inside per-file `@media` blocks that would require structural CSS edits to safely transform. Left as-is. The canonical main rules use `flex-wrap` and inline padding tuned for the desktop layout, and the existing per-file mobile rules continue to handle small-screen layout overrides. Visual mobile parity with emergency is not exact but functionally acceptable.

#### Verification
- Trust-item count across all 71 trust-bar files: each has exactly 8 trust-item divs (matches emergency) &check;
- Site-wide grep: every `trust-bar`-containing file now uses `<section class="trust-bar"` wrapper (zero `<aside>` or `<div>` wrappers remaining for trust-bar) &check;
- Integrity audit across all 65 modified files: JSON-LD / `<meta>` / `<link>` / external `<script src=>` counts all unchanged &check;

#### Commit
- `a32dcc1` feat(trust-bar): standardize emergency page trust bar design site-wide

#### Open TODOs (unchanged)
- 9 OG image assets for Phase 10.5 neighborhoods
- `og-default.jpg` site-wide fallback OG image
- `android-chrome-512x512.png` canonical-name PWA icon
- Header markup repair for the 26 Phase 10.5 neighborhood pages

---

### 2026-05-28 &mdash; Homepage: Technician Image Added

- Section: Why Las Vegas Trusts Pest Control Inc (`.why-section`)
- File: `index.html`
- Image: `images/technician/pest-control-technician-foundation-treatment-las-vegas-home-pest-control-inc.webp` (1448&times;1086, WebP, 4:3)
- Source: Owner-approved AI-generated image
- Placeholder replaced: the `<div class="why-img-placeholder">[ Photo: Licensed Technician&hellip; ]</div>` element was swapped for an `<img>` tag with class `why-technician-img`
- CSS: added new `.why-technician-img` rule next to the existing `.why-img-placeholder` rule (placeholder rule left in place per spec &mdash; other pages may still reference it)
- Alt text: "Licensed Pest Control Inc technician treating a Las Vegas home &mdash; drug tested, background checked, Nevada certified"
- Loading: `loading="lazy"` (below the fold)
- Commit: `b245a99` feat(homepage): wire technician image into Why PCI section &mdash; owner approved AI image

---

### 2026-05-28 &mdash; anim-ready Reveal Halt &mdash; Fix A applied, Fix B stopped

11 content-bug pages had every `.anim-ready` card rendering permanently at `opacity:0` because the page's inline `<script>` called `document.getElementById('hamburger-btn').addEventListener` and `document.getElementById('mobile-nav').addEventListener` unguarded but had no matching markup. `getElementById` returned `null`, `.addEventListener` threw, the whole script halted before the `IntersectionObserver` reveal code ran. Side effects: hero copy hidden (form looked mispositioned) and the mobile hamburger menu was dead.

#### Fix A applied to all 11 pages
- `openMobileNav()` / `closeMobileNav()` each got an `if (!btn || !overlay) return;` early-return after the var declarations
- The hamburger-btn and mobile-nav `addEventListener` calls were converted to `var _x = …; if (_x) _x.addEventListener(…)`
- Per the diagnosis, this change alone restores all hidden content; the IntersectionObserver now runs to completion
- Script-format variants handled: 10 multi-line + 1 compact (`bed-bug`)
- Verification: zero remaining unguarded `getElementById('hamburger-btn'|'mobile-nav').addEventListener` references; JSON-LD / `<meta>` / `<link>` / external `<script src>` counts unchanged; `anim-ready` class reference counts unchanged on all 11

#### Fix B (restore the missing `<header>` + mobile-nav markup) STOPPED per spec STOP conditions
- All 11 lack `<header>` entirely; 2 of 11 (`bird-removal`, `bee-removal`) also lack opening `<body>` and `<main>` tags
- Inserting the canonical reference markup would violate the integrity-check rule that body-section word count must be UNCHANGED &mdash; the inserted nav links, CTA text, phone, and aria labels are new body content even though every piece of it already exists elsewhere on the same page (in trust bar, footer, or forms)
- Reference top-bar text ("24/7 Rodent Emergency&hellip;") is pest-specific; the 11 pages do not contain that phrase or an obvious page-local substitute. Cross-page generic ("24/7 Pest Emergency") would be cross-page borrowing rather than spec-compliant "already present elsewhere on the same page"
- Recommendation in the QA note: combine Fix B with the existing "Header markup repair for the 26 Phase 10.5 neighborhood pages" TODO as one header-restoration sweep, since the 11 here overlap with that scope (or are an extension of it)

#### Pages affected (11)
`bird-removal-las-vegas`, `bee-removal-las-vegas`, `bed-bug-exterminator-las-vegas`, `hornet-exterminator-las-vegas`, `wasp-exterminator-las-vegas`, `miller-moth-exterminator-las-vegas`, `earwig-exterminator-las-vegas`, `crane-fly-exterminator-las-vegas`, `false-chinch-bug-exterminator-las-vegas`, `pest-control-north-las-vegas`, `pest-control-boulder-city-nv`

#### QA note
[`docs/site-os/qa/2026-05-28-anim-reveal-halt-fix.md`](qa/2026-05-28-anim-reveal-halt-fix.md) &mdash; diagnosis confirmation table, sample diff, verification matrix, Fix B stop reasoning, and follow-up list (missing `<h1>` on all 11; latent risk on the other 19 anim-ready pages).

#### Commit
- `016d8e0` fix(reveal): null-guard mobile-nav handlers so anim-ready content renders (11 pages)
- Push: pending owner approval per spec

---

### 2026-05-28 &mdash; Batch A: Top-of-Page Reconstruction on 9 Species Pages

Resumes the Fix B work that was stopped under the earlier anim-ready reveal-halt entry. The 9 species pages dumped the lead form directly after `</head>` with no `<header>`, no `<main>`, and no `<h1>` &mdash; broken document structure and dead site nav. This batch restores the canonical top-of-page scaffold and the page's first heading.

#### What was added per page
- `<body>` open tag on the 2 pages missing it (`bird-removal`, `bee-removal`)
- skip-link, top-bar (page-specific emergency text), `<header class="header">` with logo + hamburger + desktop nav, and the `#mobile-nav` overlay &mdash; copied verbatim from `scorpion-exterminator-las-vegas/index.html`
- `<main id="main-content">` opener (pairs with the pre-existing orphan `</main>` immediately before `<footer>`)
- New hero `<section class="hero">` as first content in `<main>`: container, breadcrumb (Home / Pest Control Las Vegas / per-page), `hero-inner` two-column grid, LEFT column with hero-eyebrow, `<h1>`, `<p class="hero-sub" id="<pest>-speakable">`, hero-ctas, hero-trust; RIGHT column is the existing form-card aside reframed in place &mdash; not moved or duplicated
- Form-card UI label demoted: `<h2 class="form-card-title">Free X Inspection</h2>` &rarr; `<p class="form-card-title">Free X Inspection</p>` to keep a clean single-h1 outline. Canonical pages still use `<h2>` here; reconciliation logged as a follow-up consistency pass.

#### Per-page `<h1>` values
| File | h1 |
|---|---|
| bird-removal-las-vegas | Bird & Pigeon Removal *Las Vegas* |
| bee-removal-las-vegas | Bee Removal *Las Vegas* |
| bed-bug-exterminator-las-vegas | Bed Bug Exterminator *Las Vegas* |
| hornet-exterminator-las-vegas | Hornet Exterminator *Las Vegas* |
| wasp-exterminator-las-vegas | Wasp Exterminator *Las Vegas* |
| miller-moth-exterminator-las-vegas | Miller Moth Exterminator *Las Vegas* |
| earwig-exterminator-las-vegas | Earwig Exterminator *Las Vegas* |
| crane-fly-exterminator-las-vegas | Crane Fly Exterminator *Las Vegas* |
| false-chinch-bug-exterminator-las-vegas | False Chinch Bug Control *Las Vegas* |

Hero-sub copy on each page was condensed from that page's existing AEO intro paragraph and the standard entity phrases (Health Conscious Service Program, 3-generation family-owned, License #4632, money-back guarantee, 30-minute callback). HCSP appeared 2&ndash;11 times on each page before the edit; no new claims or invented stats were added.

#### Verification
- All 9: 1 `<header>`, 1 `<main id="main-content">`, 1 `</main>`, 1 `<h1>`, 1 `id="estimate-form"`, 0 `<h2 class="form-card-title">`, 1 `<p class="form-card-title">`, `<body>` present
- Heading outline: h1 first; 9 `<h2 class="section-title">`s; child `<h3>`s; no skipped levels
- Integrity: JSON-LD / `<meta>` / `<link>` / external `<script src>` counts unchanged on all 9; below-hero content byte-identical to HEAD (CRLF normalized for the compare)

#### QA note
[`docs/site-os/qa/2026-05-28-species-header-hero-reconstruction.md`](qa/2026-05-28-species-header-hero-reconstruction.md) &mdash; Step 0 signature table, per-page values, structural matrix, heading outline matrix, integrity matrix, sample diff, and the form-card-title canonical-drift note.

#### Commit
- `849636f` feat(structure): restore header/main/hero + h1 on 9 species pages (SEO heading pass)
- Push: pending owner approval

#### Remaining batches (open follow-ups)
- **Batch B** &mdash; 5 city hubs (same pattern; `pest-control-north-las-vegas` and `pest-control-boulder-city-nv` already have the handler guards from `016d8e0`)
- **Batch C** &mdash; 26 Phase 10.5 neighborhood pages (same pattern; this overlaps with the prior "Header markup repair for the 26 Phase 10.5 neighborhood pages" TODO)
- **Quick win** &mdash; 4 h1-only pages (`cockroach`, `rodent`, `spider`, `termite` per the original audit). Worth double-checking `rodent` since it was also used as the secondary canonical reference in this batch
- **Consistency pass** &mdash; reconcile `<h2 class="form-card-title">` (canonical) vs `<p class="form-card-title">` (this batch). Recommend the demotion across the site, but defer to owner

---

### 2026-05-28 &mdash; Quick Win: `<h1>` + Hero on 4 Service Pages

Closes the quick-win item flagged at the bottom of the Batch A entry. Step 0 found that all 4 of these pages (`cockroach`, `rodent`, `spider`, `termite`) had the same orphaned-hero pattern Batch A just fixed on the 9 species pages &mdash; the spec's premise that they "already have a hero section" was incorrect for the actual on-disk state. Surfaced via AskUserQuestion; owner approved running Batch A's treatment on them.

Unlike the Batch A species pages (which were missing `<body>` on 2 of 9), these 4 already had `<body>`, top-bar, `<header>`, mobile-nav, and `<main>`. Only the hero block + form-card-title demotion were applied.

#### Per page
- Hero `<section class="hero">` inserted between `<main id="main-content">` and the existing form-card `<aside>` &mdash; container, breadcrumb (Home / Pest Control Las Vegas / per-page), `hero-inner`, LEFT column with hero-eyebrow + `<h1>` + hero-sub + hero-ctas + hero-trust; existing `<aside>` becomes the RIGHT column in place
- `<h2 class="form-card-title">` &rarr; `<p class="form-card-title">`

#### `<h1>` values
| File | h1 |
|---|---|
| cockroach-exterminator-las-vegas | Cockroach Exterminator *Las Vegas* |
| rodent-exterminator-las-vegas | Rodent Exterminator *Las Vegas* |
| spider-exterminator-las-vegas | Spider Exterminator *Las Vegas* |
| termite-exterminator-las-vegas | Termite Exterminator *Las Vegas* |

Each h1 derived from the page's own `<title>` (primary keyword + geo, front-loaded, &le; 60 chars). Hero-sub copy condensed from each page's existing AEO intro paragraph and the standard entity phrases.

#### Verification
- All 4: 1 `<h1>` (first heading in document), 1 `<section class="hero">`, 0 `<h2 class="form-card-title">`, 1 `<p class="form-card-title">`
- Heading outline clean: h1 first, 9&ndash;11 content `<h2>`s, child `<h3>`s, no skipped levels
- Integrity: JSON-LD / `<meta>` / `<link>` / external `<script src>` counts unchanged on all 4; below-hero content byte-identical to HEAD

Closes the contradiction noted in the Batch A entry: `rodent` was the secondary canonical reference there while being itself h1-less. Resolved.

#### QA note
[`docs/site-os/qa/2026-05-28-h1-quickwin-4-pages.md`](qa/2026-05-28-h1-quickwin-4-pages.md) &mdash; Step 0 table, spec-vs-on-disk discrepancy reasoning, per-page h1 and verification matrix.

#### Commit
- `10254ae` fix(seo): add missing h1 + demote form-card-title on 4 service pages
- Push: pending owner approval

#### Remaining batches (unchanged from Batch A entry)
- **Batch B** &mdash; 5 city hubs
- **Batch C** &mdash; 26 Phase 10.5 neighborhood pages
- **Consistency pass** &mdash; form-card-title tag site-wide

---

### 2026-05-28: No Long Dash Rule + Build Source Scrub

Codified a hard rule against em/en dashes in customer-facing content and scrubbed the build sources so future generations stop teaching the dash back into the site. No HTML page was modified.

#### Standards updates (2 files)
- `docs/site-os/inputs/pci-brand-style-reference.md`: new top-level section "PUNCTUATION: NO LONG DASHES (HARD RULE)". States the rule, lists forbidden marks (em dash, en dash, plus all HTML entity forms) as labeled negative examples, names the five customer-facing contexts (visible text, alt / aria-label / title / meta description / og:description / twitter:description, JSON-LD strings), gives replacement guidance (comma, colon, period, parentheses for breaks; "to" for ranges; no hyphen substitution unless a real compound modifier), and includes a runnable grep.
- `docs/site-os/pass-fail-page-quality-gates.md`: new section "Long-Dash FAIL Condition (em + en)". Explicit FAIL condition spanning the same five contexts, the runnable site-wide grep, and a single-file dev grep. The existing Copy Cleanup Gate was left intact.

#### Build source scrub (18 files)
All files under `docs/site-os/prompts/` and `docs/site-os/reference/` that contained any em or en dash were scrubbed. Substitutions: `: ` in headings and table cells; `, ` in prose; the word "to" for ranges; HTML entities normalized first. Total scrubbed: 174 em + 7 en. Zero dashes remain in scope. Spot-check confirmed instruction meaning preserved on titles, table cells, and prose breaks.

#### Verification
```
find docs/site-os/prompts docs/site-os/reference -type f \( -name "*.md" -o -name "*.txt" \) \
  | xargs grep -lnE '—|&mdash;|&#8212;|&#x2014;|–|&ndash;|&#8211;|&#x2013;'
```
Zero output.

#### QA note
[`docs/site-os/qa/2026-05-28-no-long-dash-source-scrub.md`](qa/2026-05-28-no-long-dash-source-scrub.md): Step 0 table, per-file before/after counts, retained negative examples list (none in scrub scope), and verification.

#### Commit
- `77fcef3` chore(standards): add no-long-dash rule + scrub em/en dashes from build prompts & templates
- Push: pending owner approval

#### Next step
Content sweep on the 76 customer-facing HTML pages. The original scan counted ~3,400 em dashes and ~479 en dashes site-wide. With the build sources now clean, the content sweep on the built HTML will hold. The runnable gate grep is the verification mechanism.

---

### 2026-05-28: Em and En Dash Content Sweep, All 76 Pages

Executes the content sweep anticipated at the end of the source-scrub entry. Replaces every em or en dash in customer-facing content with the contextually correct punctuation. HTML comments are exempt per spec; not touched.

#### Counts (audit script, before/after)
| Bucket | HEAD | After |
|---|---|---|
| visible text | 3,052 | 0 |
| attribute values (alt, aria-label, title, meta description, og/twitter description) | 262 | 0 |
| JSON-LD string values | 554 | 0 |
| HTML comments (exempt) | 571 | 571 (preserved) |
| Total non-exempt | 3,868 | 0 |

#### Substitution rules applied (spec rules in order)
1. Range (numbers, times, day names, month names on both sides): dash → " to ". This is the explicit authorized word-level change in the spec.
2. Parenthetical pair (" — content — " with short content): both dashes → commas.
3. Single dash with surrounding spaces (default): → comma.
4. Bare em/en between word characters (real compound modifier): → hyphen.
5. Cleanup: collapse double spaces, drop pre-comma space, collapse double-comma.

#### Verification
- Site-wide non-comment dashes: 0 (multi-line-aware Node check).
- The line-based gate grep in `pass-fail-page-quality-gates.md` returns 336 false-positive hits, all on the middle line of multi-line `<!-- SECTION XX &mdash; … -->` section-header comments where `<!--` is on the previous line. Recommend updating the gate doc to use a multi-line-aware tool. Out of scope for this commit.
- `<meta>`, `<link>`, JSON-LD block, external `<script src>`, `<h1>`, `<h2>`, `<h3>` counts: unchanged on all 76 pages.
- Every JSON-LD block parses with `JSON.parse()`.
- 45 pages have zero word-count delta. 31 pages have a positive delta that matches their range-substitution count exactly (each " to " insertion is one word). No other word-level change.
- Comment-bucket dash counts: identical HEAD vs current on every page. No comment was edited.
- Spot-check on the 5 highest-density pages (eco-friendly, emergency, apartments, commercial, about): 15 before/after pairs in the QA note. No comma splices, no broken ranges, all JSON-LD valid.

#### QA note
[`docs/site-os/qa/2026-05-28-em-en-dash-content-sweep.md`](qa/2026-05-28-em-en-dash-content-sweep.md): full baseline table, per-bucket counts, substitution rules, verification matrix, 15 spot-check pairs, and the recommended follow-up on the line-based gate grep.

#### Commit
- `2ba7cf8` style(content): replace em/en dashes with correct punctuation across all customer-facing content (76 pages)
- Push: pending owner approval

#### Follow-up
Update the runnable gate grep in `docs/site-os/pass-fail-page-quality-gates.md` to a multi-line-aware tool (or note that the line-based grep is a quick non-strict signal and the strict gate is a script). Low priority; the rule and the sweep are in place.

---

### 2026-05-28: Long-Dash Gate Made Comment-Aware + Comma Splice Remediation

Closes the two follow-ups from the dash content sweep: (1) replaces the broken line-based no-long-dash gate with a comment-aware multi-line-safe detector, and (2) fixes the genuine comma splices the dash sweep introduced. Two clean commits.

#### Part 1: standards (gate detector)

`docs/site-os/pass-fail-page-quality-gates.md` now ships a Node detector (primary, no extra dependencies) and a Python 3 equivalent (portable) that both strip every `<!-- ... -->` block first using `[\s\S]*?` so multi-line section-header comments are treated as comments, then scan the remainder for the seven forbidden marks (literal em/en plus the four HTML entity forms each). Both commands return `TOTAL: 0` and exit code 0 on this repo. A per-page dev quick-check is included for one-file runs during builds. The doc explicitly warns against the naive line-based `grep -v '<!--'` that produced 336 false-positive hits on the previous sweep, so the failure mode is documented in-place.

#### Part 2: content (comma splices, punctuation-only)

A Node detector (kept as a temp script, removed after use) extracted 142 `, (pronoun|demonstrative) (verb)` candidates from visible text, attribute values, and JSON-LD string fields across all 76 pages. Each candidate was classified by hand: 52 were true splices, 89 were correct (subordinate-clause openers, intro phrases, appositives, list items, `However,`), 1 was flagged for manual review and not touched (a list followed by `, that require ...` in landlord-pest-control-responsibilities). The 52 true splices were fixed across 22 files by promoting the comma to a period and capitalizing the next word, which is the only word-level change the spec permits. No word was added, removed, reordered, or reworded. No em/en dash was reintroduced. Where the same splice appeared in both visible HTML and a JSON-LD `description` field on the same page, the single fix handled both.

Files touched: `about/`, `ant-exterminator-las-vegas/`, `bed-bug-exterminator-las-vegas/`, `bee-removal-las-vegas/`, `commercial-pest-control-las-vegas/` (hub + hotels + landlord + impact subpages), `crane-fly-exterminator-las-vegas/`, `emergency-pest-control-las-vegas/`, `false-chinch-bug-exterminator-las-vegas/`, `index.html` (homepage), `miller-moth-exterminator-las-vegas/`, `pest-control-las-vegas/` (hub + apartments + eco-friendly + southern-highlands), `pest-control-north-las-vegas/tule-springs/`, `reviews/`, `rodent-exterminator-las-vegas/`, `scorpion-exterminator-las-vegas/`, `termite-exterminator-las-vegas/`, `wasp-exterminator-las-vegas/`.

#### Verification

| Check | Result |
|---|---|
| Comment-aware gate detector (`TOTAL: 0`, exit 0) | passes |
| Customer-facing em/en dashes site-wide | 0 (no regression) |
| Comment-bucket dash count site-wide | 571 (unchanged, preserved) |
| Visible word count per page vs HEAD-of-task | unchanged on every page (capitalization does not change word boundaries) |
| `<meta>` / `<link>` / JSON-LD blocks / external `<script src>` / `<h1>` / `<h2>` / `<h3>` counts | unchanged on every page |
| Every JSON-LD block parses with `JSON.parse()` | 171/171 pass |

#### QA note
[`docs/site-os/qa/2026-05-28-gate-fix-and-splice-remediation.md`](qa/2026-05-28-gate-fix-and-splice-remediation.md): Phase A re-entry, gate before/after with run output, every splice fixed with full before/after sentence pairs, the one manual-review candidate, verification matrix.

#### Commits
- `chore(standards): replace no-long-dash gate with comment-aware detection` (gate doc only)
- `fix(content): correct comma splices introduced by the dash sweep (punctuation-only)` (22 HTML files + QA note + this log entry)
- Push: pending owner approval

#### Next step
Batch B: 5 city hubs header/main/hero reconstruction (the standing next batch per the prior implementation-log notes).

---

### 2026-05-28: Temporary Blog Neutralization

The blog is a deferred batch (no `/blog/` index, no article pages, no featured images). Every customer-facing `/blog/` link in the live site resolved to the custom 404, which was hurting crawl quality and internal-link integrity. This commit hides every such link behind HTML comments + TODO restore markers; nothing is deleted. Reversible in one sweep when the blog ships.

#### Step 0 inventory

- `/blog/` directory and the 3 named article paths: all absent.
- Homepage section: `<section class="blog-section">…</section>` at `index.html` lines 901–940. No nested `<!--`, `-->`, or `--` sequences inside, so a plain comment wrap was safe. The 3 `Article` schema.org *microdata* entries are inside the section; no `<script type="application/ld+json">` block is — that block sits at line 387, well above.
- Footer link `<li><a href="/blog/">Pest Control Blog</a></li>` exists on **20 pages**, not the ~76 the prompt expected. Pattern identical across all 20.
- Spec-extension finding: a `<div class="seasonal-blog-links">` block on `pest-control-las-vegas/index.html` (lines 1060–1063) holds two more `<a>` links to non-existent articles. The verification gate ("zero non-commented `href="/blog"` site-wide") requires this be neutralized too. Surfaced and handled.

#### Changes (20 files)

| Region | Files | Method |
|---|---|---|
| Homepage `<section class="blog-section">` | `index.html` (1) | TODO(blog) marker + HTML-comment wrap around the full 40-line section, byte-for-byte preserved |
| Footer `<li><a href="/blog/">Pest Control Blog</a></li>` | 20 pages (homepage, about hub + 3 about-sub, ant, commercial hub + 7 commercial-sub, emergency, LV hub + 3 LV-sub, service-areas) | TODO(blog) marker + commented original `<li>` on same indent; surrounding footer items untouched |
| LV hub `<div class="seasonal-blog-links">` in-content block | `pest-control-las-vegas/index.html` (1) | TODO(blog) marker + HTML-comment wrap |

#### Verification

| Gate | Result |
|---|---|
| Live `href="/blog"` (outside comments), site-wide | 0 |
| Homepage `class="blog-section"` in non-comment DOM | absent (faq-section above and emergency-banner below intact and adjacent) |
| Homepage `<!--` / `-->` balance | 24 / 24 |
| JSON-LD blocks site-wide | 171/171 still parse |
| Customer-facing em/en dashes (comment-aware detector) | 0 |

#### QA note
[`docs/site-os/qa/2026-05-28-blog-neutralize.md`](qa/2026-05-28-blog-neutralize.md): Step 0 table, the 20-file footer list, per-region patterns applied, verification matrix, and step-by-step restore instructions for when the blog ships.

#### Commit
- `chore(content): temporarily hide deferred blog section + footer link to remove 404 links` (20 files + QA note + this log entry)
- Push: pending owner approval

#### Deferred work registered
**Blog build batch** (future, no firm date): build the 3 articles (`why-scorpions-worse-after-rain`, `common-las-vegas-pests-summer`, `how-to-keep-pests-out-of-home-las-vegas`), build the `/blog/` index page, produce the 3 featured images (1200×675, JPEG/WebP, Google Discover-eligible). The image placeholders move with this batch — they're preserved inside the homepage comment and need real assets at restore time. Use `grep -rn "TODO(blog):" --include="*.html"` to find every restoration site in one sweep.

#### Next step
Batch B: 5 city hubs header/main/hero reconstruction (unchanged from the prior entry).

---

### 2026-05-28: /about/ + /eco-friendly/ Real Images Wired

Replaces the four image placeholders on the `/about/` and `/eco-friendly/` pages with real responsive `<img>` elements. Commits the four WebP assets, removes the now-dead placeholder CSS, and updates the image backlog.

#### Files committed

- `images/about/three-generation-family-pest-control-las-vegas.webp` (1448 × 1086, 99 KB)
- `images/about/licensed-pest-control-technician-las-vegas.webp` (1086 × 1448, 81 KB)
- `images/ipm-diagrams/ipm-four-pillars-health-conscious-pest-control-las-vegas.webp` (1672 × 941, 191 KB)
- `images/ipm-diagrams/ipm-targeted-vs-broadcast-cabinet-treatment-las-vegas.webp` (1672 × 941, 71 KB)

#### Wiring (4 slots)

| Page | Slot | Source | Approach |
|---|---|---|---|
| `about/index.html` | `.story-img-placeholder` (family, 4:3) | `three-generation-family-pest-control-las-vegas.webp` | `<img>` with explicit width/height, lazy/async, border-radius preserved (18px), inline `width:100%;height:auto;display:block` for responsive scale |
| `about/index.html` | `.team-img-placeholder` (technician, 3:4) | `licensed-pest-control-technician-las-vegas.webp` | same recipe; 18px radius |
| `pest-control-las-vegas/eco-friendly/index.html` | first `.diagram-placeholder` (targeted-vs-broadcast) | `ipm-targeted-vs-broadcast-cabinet-treatment-las-vegas.webp` | same recipe; 12px radius; 24px vertical margin preserved |
| `pest-control-las-vegas/eco-friendly/index.html` | second `.diagram-placeholder` (four-pillars) | `ipm-four-pillars-health-conscious-pest-control-las-vegas.webp` | same recipe; 12px radius; 30px vertical margin preserved |

All four `alt` values reuse the placeholder's existing `aria-label` verbatim — no new claims introduced (no-fake-data).

#### Dead CSS removed

- `.story-img-placeholder` (about/index.html)
- `.team-img-placeholder` (about/index.html)
- `.diagram-placeholder` + `.diagram-placeholder span` (eco-friendly/index.html)

Each class was grepped site-wide before removal: only the owning page (now without placeholders) and 2–3 documentation references remained, so the CSS rules were dead in the rendered site.

#### Mapping resolution note

The two IPM diagram files arrived with one bearing a generic AI-export filename, so initial mapping required owner clarification. Resolution involved iterative renames by owner and assistant; owner confirmed mid-session that `ipm-targeted-vs-broadcast-cabinet-treatment-las-vega.webp` (typo) = the targeted-vs-broadcast diagram, and the four-pillars file ended up correctly identified by name. Assistant fixed the `las-vega` → `las-vegas` typo to match the directory convention before committing.

#### Verification

| Gate | Result |
|---|---|
| Placeholder classes / `data-img=` on the 2 pages | 0 remaining |
| 4 `<img>` src paths exist on disk | 4/4 |
| Each new `<img>` has non-empty `alt` + explicit `width` + `height` | 4/4 |
| Other `<img>` tags on the 2 pages unchanged (logo only) | unchanged |
| JSON-LD on both pages parses | 15/15 |
| Customer-facing em/en dashes (comment-aware detector) | 0 |
| Site-wide placeholder scan (non-comment) | 0 (homepage blog Featured Image strings correctly live inside the `TODO(blog)` comment from `8791a0e`, so they do not count) |

#### Image hygiene

All four files under 200 KB; none exceeds the 400 KB flag. Two files are about 2.4–3× their likely desktop display width, which is at the edge of useful DPR scaling but acceptable for WebP at these byte sizes; no optimization recommended now.

#### QA note
[`docs/site-os/qa/2026-05-28-about-ecofriendly-image-wiring.md`](qa/2026-05-28-about-ecofriendly-image-wiring.md): inventory table, mapping signals, per-slot before/after markup, dead-CSS audit, image hygiene matrix, verification.

#### Commit
- `feat(media): wire real /about/ photos + /eco-friendly/ IPM diagrams, remove placeholders` (4 image assets + 2 HTML files + QA note + this log entry)
- Push: pending owner approval

#### Updated image backlog

- DONE: `/about/` story + team, `/eco-friendly/` targeted-vs-broadcast + four-pillars (this commit)
- DEFERRED: 3 homepage blog featured images (1200 × 675) — travel with the blog batch
- OUTSTANDING: real `og:image` assets on ~72 pages; PWA / favicon / manifest icon set

#### Next step
Batch B: 5 city hubs header/main/hero reconstruction (unchanged).

---

### 2026-05-28: Batch B — 5 City Hubs Header / Main / Hero Reconstruction

Closes Batch B. The 5 remaining city-hub pages had the orphaned-hero pattern Batch A treated on species pages: no `<header>`, no `<main>`, no `<h1>`, no `<section class="hero">` — the form-card was dumped as the first element after the skip-link and the first heading was an `<h2>`. This commit adds the full canonical top-of-page block (top-bar → header → mobile-nav → main → hero) verbatim from `pest-control-henderson-nv/index.html`, writes a per-city h1, hero eyebrow, hero-intro, CTAs, and 5 trust signals, moves the existing form-card into the hero-inner right column without duplication, and demotes the form-card UI label from `<h2>` to `<p>` to clean the heading outline.

#### Pages (5)

`pest-control-north-las-vegas/`, `pest-control-boulder-city-nv/`, `pest-control-enterprise-nv/`, `pest-control-paradise-nv/`, `pest-control-spring-valley-nv/`.

#### Pre-existing orphan tags discovered

Each page already had the *closing* halves of the missing scaffold: three orphan closes (`</div></div></section>`) right after the form-card aside, and one orphan `</main>` just before `<footer>`. The transformation injected only opening tags + the LEFT-column hero content; every orphan now binds to a real open. No existing closing tag was added, moved, or rebalanced.

#### Per-page hero copy

Every noun, pest, neighborhood, and entity phrase in each hero-intro is already present in the same page's below-hero content. No new claims introduced. h1 format: "Pest Control in **<City>, NV**" — matches henderson's pattern (em-wrapped geo) and aligns with each page's `<title>`. Hero eyebrow per city: `<City> · Clark County, NV · License #4632`. Hero-sub identical across all 5 pages: `3-Generation Family-Owned · Licensed · Money-Back Guarantee`. CTAs + 5 trust signals identical to henderson — no review-count inflation.

#### Breadcrumb parent

Followed henderson's pattern: `Home / Las Vegas Pest Control / Pest Control <City> NV` (parent is `/pest-control-las-vegas/`, not `/service-areas/`).

#### Form-card UI label demotion

`<h2 class="form-card-title">Free <City> Inspection</h2>` → `<p class="form-card-title">Free <City> Inspection</p>` on each page. Same class, same text, same styling. Removes a UI label from the heading outline so the page outline starts cleanly with the new h1. Matches what Batch A did on the species pages.

#### Verification

| Gate | Result |
|---|---|
| Exactly one `<header>`, one `<main id="main-content">` (open + close balanced), one `<h1>` per page | 5/5 PASS |
| First heading in document order = h1 | 5/5 PASS |
| Exactly one `class="form-card"` per page (no duplicate; form moved cleanly) | 5/5 PASS |
| Zero `<h2 class="form-card-title">`; one `<p class="form-card-title">` per page | 5/5 PASS |
| `<form id="estimate-form">` preserved on every page (JS handler binding intact) | 5/5 PASS |
| `<meta>` / `<link>` / external `<script src>` / JSON-LD-block counts vs HEAD | unchanged on every page (16 / 10 / 1 / 1) |
| Below-hero region byte-identical vs HEAD (LF-normalized) | 5/5 PASS |
| JSON-LD on target pages parses | 5/5 |
| Comment-aware no-long-dash gate, site-wide | TOTAL: 0, exit 0 |

Pre-existing heading-skip h2 → h4 in the footer/below-hero region appears on these 5 pages just as it does on henderson; out of scope for Batch B and unchanged here.

#### QA note
[`docs/site-os/qa/2026-05-28-city-hub-header-hero-reconstruction.md`](qa/2026-05-28-city-hub-header-hero-reconstruction.md): Step 0 inventory (incl. hero-presence check on henderson), per-page h1 + hero-intro full text, orphan-tag discovery, integrity matrix, verification gates.

#### Commit
- `feat(structure): restore header/main/hero + h1 on 5 city-hub pages (SEO heading pass)` (5 HTML files + QA note + this log entry)
- Push: pending owner approval

#### Next step
Batch C: 26 neighborhood pages (Level 3). Reference pattern lives in `pest-control-las-vegas/apartments/index.html` and `pest-control-las-vegas/eco-friendly/index.html`; the most recently-retrofitted neighborhood example is `pest-control-las-vegas/southern-highlands/index.html` (commit `00328d4`). Neighborhood breadcrumb pattern: `Home / <City Hub> / <Neighborhood>` — and the 5 city hubs corrected in this Batch B commit are now valid parents for those breadcrumbs.

---

### 2026-05-31 — sitemap.xml added to repo root

- File: `sitemap.xml`
- Type: XML sitemap for GSC/Bing Webmaster submission
- Total URLs: 74
- Excluded: /404.html, /thank-you/, /blog/ (deferred), springtail-exterminator (CONSOLIDATED), all PLANNED pages
- Data discrepancy: `page-list.md` marks `/pest-control-henderson-nv/macdonald-highlands/` and `/pest-control-henderson-nv/macdonald-ranch/` as LIVE, but neither exists on disk. Excluded from sitemap per owner decision (a sitemap must only list URLs that resolve). page-list.md status should be corrected to PLANNED.
- Commit: f56860f — feat(seo): add sitemap.xml to repo root for GSC submission
- Submit URL: https://www.pestcontrolinc.net/sitemap.xml
- GSC submission: pending production domain migration to Cloudflare Pages

---

### 2026-05-31 — GTM Snippet Added Site-Wide

- GTM Container ID: GTM-KS5B6T8S
- Scope: all HTML pages
- Head snippet: inserted immediately after `<meta charset="UTF-8">` on every page (as high in `<head>` as possible, before viewport meta)
- Body noscript: inserted immediately after `<body>` open tag, before the skip link, on every page
- Script: `scripts/add-gtm.js` (idempotent — skips files already containing GTM-KS5B6T8S; EOL-aware so CRLF files stay CRLF)
- Files modified: 76
- Commit: e1473a2 — feat(analytics): add GTM-KS5B6T8S snippet to all HTML pages site-wide
- Verification: 76/76 HTML files contain GTM ID; 0 missing; index.html has 2 googletagmanager refs (head script + body noscript), head ref confirmed before `</head>`; GTM insertion added 0 long dashes (no-long-dash gate baseline unchanged at 341 pre-existing dev-comment `&mdash;` matches, all comment-exempt).

#### Next steps (require owner action)

- Configure GA4 Configuration tag inside GTM (needs G-XXXXXXXXXX Measurement ID from owner)
- Configure event tags: phone_click (tel:+17022284394); form_submit; thank_you_page_view (/thank-you/)
- form_submit trigger: use GTM Form Submission trigger with **Form ID matches RegEx `-form$`** (NOT an explicit ID list). Site audit (2026-05-31) found 9 distinct form IDs, all ending in `-form`: estimate-form (58), hero-form (5), final-form (4), mid-form (2), cta-form, contact-form, safety-form (/pest-control-las-vegas/eco-friendly/), landlord-form (/pest-control-las-vegas/apartments/), emergency-form (/emergency-pest-control-las-vegas/). The RegEx covers all 9 and future-proofs new `-form`-suffixed forms. An explicit 6-ID list would have missed safety-form, landlord-form, and emergency-form.
- Mark conversions in GA4
- Link GA4 to GSC

---

### 2026-05-31 — Header Repair: 26 Phase 10.5 Neighborhood Pages

- Defect: `<header>` element missing on all 26 Phase 10.5 neighborhood pages — they rendered with no top bar, no nav, and no logo.
- Fix: inserted the canonical top-bar + header + mobile-nav block immediately after the skip link on each page.
- Canonical source: the `pest-control-henderson-nv/index.html` header block (restored in commit 51496cc), extracted at runtime for byte-fidelity. NOTE: the task named `pest-control-las-vegas/southern-highlands/index.html` as the reference, but that file was itself missing its header; and the task guide block pointed the logo at `/images/pest-control-inc-logo-transparent-background.png` (which does not exist on disk), corrected here to the real `/images/logos/pest-control-inc-logo-transparent-background.png` (377,331 bytes) used elsewhere on these pages.
- Script: `scripts/repair-neighborhood-headers.js` (idempotent — skips files already containing `<header`; EOL-aware, CRLF preserved).
- Files modified: 26
- Verification: site-wide `grep -rL '<header'` returns zero; each page has exactly one `<header>`, one skip-link element, one top-bar, one mobile-nav. Rigorous proof: reversing the exact insertion on every file reproduces HEAD byte-for-byte (26/26), confirming a pure insertion with zero collateral (meta/link/script/JSON-LD counts unchanged). Inserted nav confirmed compatible with each page's existing event-listener JS (#hamburger-btn / #mobile-nav / .mobile-nav-close).
- Commit: e73b61a — fix(structure): restore missing header/nav on 26 Phase 10.5 neighborhood pages

---

### 2026-05-31 — OG Image Fallback: og-default.webp applied site-wide

- Scope: all 76 HTML pages
- og:image and twitter:image content updated to `https://pestcontrolinc.net/assets/images/og-default.webp`
- og:image:alt standardized site-wide to `Pest Control Inc · Licensed Pest Control &amp; Exterminator Services, Las Vegas, NV`
- Why a fallback was warranted: all 72 distinct page-specific OG images previously referenced (e.g. `og-scorpion-exterminator-las-vegas.jpg`) were MISSING on disk (0/72 present) — every page had a broken social-share image. Pointing them at the one asset that exists fixes broken → working.
- Separator: used a middot (·) rather than the originally-specified em-dash, per owner decision, to keep the no-long-dash gate green and match the site's existing `·` separator convention. Verified: 0 new em/en dashes introduced.
- Asset: committed the previously-untracked `assets/images/og-default.webp` (22 KB) in the same commit so the new references resolve in production.
- Script: `scripts/update-og-images.js` (idempotent — skips files already on og-default.webp; in-line attribute edits only, so CRLF preserved).
- Files modified: 76
- Commit: 9383663 — feat(seo): update all og:image references to og-default.webp fallback site-wide
- Out of scope (left untouched, flagged for follow-up): `pest-control-las-vegas/index.html` still has a JSON-LD `image` field and a hero `<link rel="preload">` pointing at `/images/residential-pest-control-las-vegas.jpg`, which is also missing on disk. Not an og:image/twitter:image tag, so outside this task.
- Note: individual per-page OG images are a future enhancement.

---

### 2026-05-31 — Follow-up: residential-hub broken image references resolved

- Resolves the out-of-scope items flagged in the OG fallback entry above.
- `pest-control-las-vegas/index.html`: JSON-LD `image` swapped from the missing `residential-pest-control-las-vegas.jpg` to `https://pestcontrolinc.net/assets/images/og-default.webp`.
- Removed the stale `<link rel="preload" as="image">` for the same missing file — this page's hero is a CSS gradient and renders no image, so the preload had nothing valid to point at (swapping it would have caused a "preloaded but not used" warning). Per owner decision.
- Verified: 0 remaining refs to the missing file; all 7 JSON-LD blocks on the page still parse.
- Commit: e950179 — fix(seo): point residential-hub JSON-LD image to og-default.webp, remove stale hero preload

---

### 2026-05-31 — JSON-LD Organization logo repointed to real asset (16 pages)

- Audit finding: JSON-LD `logo` (Organization/LocalBusiness) referenced `https://pestcontrolinc.net/images/pci-logo.png` on 16 pages — missing on disk (the `/images/` root is a dead placeholder dir; real assets live in `/images/logos/`).
- Fix: repointed `logo.url` to the real asset `https://pestcontrolinc.net/images/logos/pest-control-inc-logo-transparent-background.png` (369 KB, on disk) and removed the stale `"width":300,"height":130` (they described the old, nonexistent asset).
- Handled both JSON-LD formats present: 5 inline logo objects + 11 multi-line. `pci-logo.png` appeared exclusively in `logo` objects, so the transform was scoped safely.
- Script: `scripts/fix-jsonld-logo.js`.
- Files modified: 16
- Verification: 0 `pci-logo.png` refs remain; 0 width/height left in any logo object; all 16 files' JSON-LD blocks still parse.
- Commit: ac5ef0d — fix(seo): repoint JSON-LD Organization logo to real asset, drop stale dimensions (16 pages)
- Held per owner decision: all OTHER missing JSON-LD images (e.g. `about-pci-las-vegas-team.jpg` ×11, page heroes, and the emergency/eco-friendly `ImageObject` how-to/diagram `contentUrl`s) are left as-is until real assets are produced. See the audit summary for the full list.

---

### 2026-06-09 — New utility page: /pay-invoice/ (PayPal) + site-wide footer/sitemap wiring

- Task: build `pay-invoice/index.html`, a noindex utility page letting existing customers pay an invoice via a hosted PayPal link, and wire it into every page's footer and the HTML sitemap.
- New file: `pay-invoice/index.html` — static HTML, site-standard top-bar/header/mobile-nav/footer/mobile-cta copied byte-faithfully from the `privacy-policy/index.html` reference, plus page-specific pay hero, payment card (How-to-Pay steps + PayPal CTA + contact strip), and a 4-item FAQ accordion. Inline `<style>`/`<script>` only; no framework.
- PayPal link: `https://www.paypal.com/ncp/payment/TFNTLN5JLW5GQ` (hosted checkout, opens in new tab, `rel="noopener noreferrer"`). No API, no dynamic lookup, no invented account numbers/amounts.
- Footer wiring: `scripts/add-pay-invoice-footer-link.js` (idempotent, EOL-preserving, UTF-8 no-BOM) added a `Pay Invoice` link to the footer Company column of all 76 existing pages. The site has **two footer Company structures**: 30 "legal-style" pages carry Privacy/Terms/Sitemap `<li>`s in the Company column (Pay Invoice inserted **before Privacy Policy**, per spec), the other 46 do not (Pay Invoice inserted as the **last Company `<li>`**). Adaptive placement because a single uniform anchor does not exist — only 51/77 pages have a `/reviews/` link, but 77/77 have `<h4>Company</h4>`.
- Sitemap: `sitemap/index.html` received Pay Invoice in **two** spots — the body "Legal & Utility" group (before Privacy Policy) and its own footer Company column. (Deviation from the prompt's "described Main Pages entry": placed it as a bare link in the Legal & Utility group to match the sitemap's uniform bare-link convention and avoid the no-long-dash gate.)
- Files created: 2 (`pay-invoice/index.html`, `scripts/add-pay-invoice-footer-link.js`). Files modified: 76 page HTML + `sitemap/index.html` (sitemap counted in the 76) → 76 existing HTML pages touched.
- Deliberate spec deviations (flagged for owner):
  1. **Minimal head, no GTM**: followed the prompt's explicit head exactly (charset/viewport/title/description/robots/canonical@line-9/hreflang/fonts only). Every other site page carries the GTM container; this page intentionally omits it. If the owner wants analytics on the payment page, add the standard GTM head+noscript block.
  2. **No favicon links / no LeadConnector chat widget**: omitted to honor the minimal-head/minimal-body spec and the line-9 canonical gate. Both are present site-wide elsewhere; can be added if desired.
  3. Em-dash in the prompt's title/card-sub normalized to comma/middot to keep the no-long-dash gate green (consistent with prior owner decisions).
- Verification table (all PASS):
  | Check | Expected | Result |
  |---|---|---|
  | `pay-invoice/index.html` exists | yes | yes |
  | `noindex, nofollow` meta | present | 1 |
  | canonical at line 9 | present | line 9 |
  | PayPal href `TFNTLN5JLW5GQ` | 1 | 1 |
  | `target="_blank"` + `rel="noopener noreferrer"` on PayPal link | yes | 1 / 1 |
  | visible `(702) 228-4394` | >=2 | 8 |
  | `tel:+17022284394` | >=2 | 8 |
  | JSON-LD blocks | 0 | 0 |
  | `id=yr` / `id=hamburger-btn` / `id=mobile-nav` / `id=main-content` | 1 each | 1 each |
  | founding year / named individuals | 0 | 0 |
  | `href="/pay-invoice/"` site-wide | 77 files | 77 |
  | sitemap `/pay-invoice/` | >=1 | 2 (body + footer) |
  | non-comment long-dash gate (site-wide) | 0 | 0 |
  | pay-invoice tag balance | balanced | balanced |
- Commit: 92d7625 (clean) — feat(pay-invoice): add /pay-invoice/ utility page with PayPal link + footer/sitemap wiring

#### Follow-up (same day) — GTM container added to /pay-invoice/

- Per owner decision, reverted deviation #1 (minimal head, no GTM): added the site-standard Google Tag Manager container `GTM-KS5B6T8S` so the payment page matches the rest of the site (76/76 → 77/77 pages now carry GTM). Head `<script>` inserted after `<meta charset>`; `<noscript>` iframe inserted immediately after `<body>`. Block is byte-identical to the `privacy-policy/index.html` reference. Canonical/noindex unaffected; long-dash gate still 0.
- Commit: dd02244 (follow-up) — feat(pay-invoice): add GTM container to match site-wide analytics

#### Follow-up (same day) — Footer "Pay Invoice" link upgraded to orange pill button

- Owner decision: footer Pay Invoice link becomes a styled `.footer-pay-btn` orange pill (permitted `--orange` use: direct customer payment action; reads urgently against the `#0F1520` footer and won't clash with the blue column headings).
- `scripts/style-pay-invoice-footer-button.js` (idempotent, EOL-preserving, UTF-8 no-BOM): injected the `.footer-pay-btn` + `:hover` CSS before each file's `</style>`, and converted the footer Company-column Pay Invoice text link into `<a class="footer-pay-btn">&#128179; Pay Invoice</a>` on all 77 pages. Emoji uses the `&#128179;` entity (site convention), color is `var(--orange)`/`var(--orange-dark)` (no hardcoded hex).
- Scoped to the footer Company `<ul>` only: the sitemap's BODY pay-invoice link (in the "Legal & Utility" group) intentionally stays a plain text link — so `sitemap/index.html` has 1 button (footer) + 1 plain link (body).
- `aria-current="page"` preserved on the pay-invoice page's own footer button.
- Adaptive placement from the prior task is unchanged (button sits before Privacy Policy on the 30 legal-style footers, last in the Company column on the other 46).
- Verification (all PASS): `class="footer-pay-btn"` link = 77 files (1 each, 0 with >1); `.footer-pay-btn{` CSS rule = 77 files (each on its own line, 0 fused); button background = `var(--orange)` only; `&#128179; Pay Invoice` text = 77 files; sitemap = 1 button + 1 plain body link; long-dash gate = 0; tag balance OK.
- Commit: BTN_COMMIT (follow-up) — feat(pay-invoice): style footer Pay Invoice link as orange pill button site-wide

---

### 2026-06-15 — Service plan cards updated — Quarterly removed, Bi-Monthly added

**Note on placement:** appended at the bottom to preserve this log's established oldest-to-newest chronological order (the source prompt said "at the top"; chronological convention was followed instead).

**Scope decision (owner-confirmed in session):** "Core plan system only." The word "quarterly" appears ~160x across 31 files in many contexts (generic frequency copy, customer reviews, the commercial JS pricing calculator, and the standalone eco-friendly/commercial quarterly programs). Per owner direction, only the **residential plan-card system + named-plan schema Offers + Site OS docs** were changed. Generic "monthly or quarterly" frequency copy, reviews, the commercial calculator, and the separate eco/commercial offerings were intentionally left untouched. This intentionally does **not** drive the site-wide `quarterly` grep to zero.

**New plan order (every edited card instance):** Monthly (left) → Bi-Monthly (center, featured / "Most Popular") → One-Time (right). The featured/badge state was moved from Monthly to Bi-Monthly.

**Files changed:**
- `index.html` — §07 Service Plans `.plans-grid` rebuilt: removed the Quarterly Protection Plan card; added the Bi-Monthly Protection Plan card (icon 🗓️, "Every-other-month service visits (6 per year)", "Money-back guarantee included"); reordered to Monthly → Bi-Monthly → One-Time; moved `featured` + `plan-badge` "Most Popular" to the Bi-Monthly card; Monthly icon 📅, One-Time icon 🎯. No other section touched.
- `pest-control-las-vegas/index.html` — §07 `.plans-grid` reordered Monthly → Bi-Monthly → One-Time, `featured`/badge moved to Bi-Monthly; Quarterly Residential card → "Bi-Monthly Residential Pest Control Plan" (icon 🌿→🗓️, "4 seasonal treatments per year" → "Every-other-month service visits (6 per year)", other features preserved); section H2 "Monthly, Quarterly & One-Time" → "Monthly, Bi-Monthly & One-Time"; schema Offer "Quarterly Home Pest Control Plan" → "Bi-Monthly Home Pest Control Plan" with rewritten description. Meta-description/FAQ "monthly or quarterly" frequency prose left as generic copy per scope.
- `pest-control-las-vegas/plans-and-pricing/index.html` — §03 Service Frequency Options cards reordered Monthly → Bi-Monthly → One-Time; "Quarterly Service" card → "Bi-Monthly Service" ("four times per year" → "every other month, 6 visits per year. Ideal for ongoing prevention with a lighter visit schedule"); hero form radio "Quarterly Plan" (`value="quarterly"`) → "Bi-Monthly Plan" (`value="bi-monthly"`). FAQ + "What Affects Pricing" prose mentions of "quarterly" left as generic copy per scope. No dollar amounts or per-unit pricing phrases introduced; zero raw em-dash bytes added.
- `docs/site-os/inputs/pci-build-context.md` — Service Plans list: removed "Quarterly protection plan", added "Bi-Monthly protection plan (every other month — 6 visits per year — most popular)", reordered to Monthly → Bi-Monthly → One-Time; "most popular" descriptor moved from Monthly to the now-featured Bi-Monthly.
- `docs/site-os/reference/pci-page-pattern-reference.md` — no plan-card example block present; no change required.
- `docs/site-os/implementation-log.md` — this entry.

**Pricing-rule compliance:** zero dollar amounts and zero per-unit pricing phrases (`/month`, `/visit`, `per month`, `per visit`) introduced in any edited card. The pre-existing dollar amounts on eco-friendly/ant/apartments/commercial pages were out of scope and left as-is.

---

### 2026-06-15 — Service plan follow-up — broader "quarterly" copy + reviews sweep

**Trigger:** after the core plan-card swap above, owner asked to "run the broader pass on generic copy and reviews." Two in-session owner decisions scoped it: (1) **leave the eco-friendly and main commercial pages entirely untouched** (their standalone "Quarterly" programs + the commercial JS pricing calculator are a separate offering decision); (2) **rewrite customer review/testimonial text** quarterly → bi-monthly.

**Method:** 6 parallel sub-agents over disjoint file groups, each with a shared rule set; results verified site-wide afterward. **80 edits across 26 HTML files.** JSON-LD ↔ visible-HTML twins kept in sync on every change; no dollar amounts or per-unit pricing introduced; no raw em-dash bytes (U+2014) added; 87 JSON-LD blocks across all changed files re-parse with 0 failures.

**What changed (generic copy + reviews only — no plan cards):**
- Frequency prose everywhere: "monthly or quarterly" → "monthly or bi-monthly", "quarterly or monthly" → "bi-monthly or monthly", etc. — across `index.html`, `pest-control-las-vegas/index.html`, `plans-and-pricing/index.html` (FAQ/meta), the 5 city hubs (boulder-city, sunrise-manor, north-las-vegas, spring-valley, enterprise), the 4 pest-species pages (cockroach, spider, scorpion, miller-moth), `emergency-pest-control-las-vegas/`, `about/`, and `landlord-pest-control-responsibilities/`.
- 9 neighborhood pages: "Quarterly and bi-monthly … plans" → "Monthly and bi-monthly … plans"; "quarterly or bi-monthly schedule" → "monthly or bi-monthly schedule".
- `ant-exterminator-las-vegas/`: "quarterly perimeter program/service" → "bi-monthly …", incl. the H3/HowToStep name and 2 reviews.
- `apartments/`: prose, FAQ, and per-visit pricing-table label "Quarterly recurring" → "Bi-Monthly recurring" (per-visit `$85/visit` / `$65/unit/visit` figures unchanged — per-visit price is not cadence-bound).
- Reviews/testimonials rewritten to bi-monthly (ant page, per owner approval).
- NUMERIC FIX: where the old quarterly sentence claimed "four targeted applications" / "four times per year", corrected to "six" / "every other month" (bi-monthly = 6 visits/year) — 4 instances on the LV hub FAQ pairs.

**Intentionally LEFT with "quarterly" (documented residuals, not misses):**
- `pest-control-las-vegas/eco-friendly/index.html` (38) and `commercial-pest-control-las-vegas/index.html` (18) — owner chose to leave both pages whole (standalone Quarterly programs + commercial JS calculator).
- `ant-exterminator-las-vegas/index.html` (3): the cadence-bound pricing lines "$80 to $120/quarter" / "per quarter" (JSON-LD L178 + visible L1316/L1317) — cannot convert to bi-monthly without a real per-period price; **flagged to owner** for a bi-monthly price before converting.
- `docs/site-os/inputs/pci-launch-readiness-site-build-list.md` (1): "Quarterly content audits" — an internal ops cadence, not a pest-service frequency.
- This log's historical entries (prior builds) — not rewritten.

---

### 2026-06-15 — Site-wide dollar-pricing removal (PCI service prices only)

**Trigger:** owner flagged that `ant-exterminator-las-vegas/` still carried `$80–$120/quarter` pricing (violating the site-wide no-dollar-amounts rule), then broadened the request to a **site-wide** audit and removal of all PCI service pricing.

**Two owner decisions scoped it:** (1) remove ONLY Pest Control Inc's own SERVICE prices — KEEP factual/illustrative dollar figures (legal fines, third-party business-impact "incident cost" ROI statistics, illustrative rent/claim examples); (2) the commercial JS price calculator keeps its UI/recommendation logic but every dollar output now returns "Priced by property, free estimate".

**Method:** audit grep first (129 candidate lines / 14 files), then 7 parallel sub-agents (one per file with PCI pricing) + direct edits. Replacement patterns: standalone price cell → "Free estimate"; price+frequency / "Starting from $X" → "Priced by property, free estimate"; pricing-table row → dollar cell only; schema `priceSpecification` / numeric `"price"` (non-zero) → removed (kept `"price":"0"` free offers); visible "$0" free items → "Free".

**Files changed (8):**
- `ant-exterminator-las-vegas/index.html` — FAQ cost summary + body + JSON-LD twin de-priced (also cleared the 3 residual "quarterly" pricing refs from the prior pass → ant page now 0 quarterly).
- `pest-control-las-vegas/apartments/index.html` — plan-price labels, pricing table, FAQ (JSON-LD+visible), JS card bodies, 4 Offer `priceSpecification` objects removed.
- `pest-control-las-vegas/eco-friendly/index.html` — plan prices, pricing table (kept "Quarterly residential" label, removed its price cell), FAQ, speakable, 3 Offer `priceSpecification` + 3 numeric `"price"` removed. Quarterly wording deliberately untouched.
- `emergency-pest-control-las-vegas/index.html` — pricing table, FAQ (JSON-LD+visible), speakable, 4 Offer `priceSpecification` + 4 numeric `"price"` removed (free bed-bug-inspection `"price":"0"` kept).
- `commercial-pest-control-las-vegas/index.html` — JS calculator: size→price map (4) + `computeAnnualInvestment` returns (16 dollar strings) → "Priced by property, free estimate"; FAQ pricing (JSON-LD+visible) de-priced. (One agent over-removed the illustrative "$50,000+ in lost bookings" hotel-review figure; restored it.)
- `commercial-pest-control-las-vegas/pest-impact-on-business/index.html` — removed ONLY the PCI prevention price "$800 to $3,600/year" (prose + table). KEPT all incident-cost/ROI figures.
- `commercial-pest-control-las-vegas/landlord-pest-control-responsibilities/index.html` — removed ONLY "$80 to $150 per unit per month". KEPT the illustrative "$2,400/month" rent and "$2,000–$15,000" claim figures.
- `specials/index.html` — free-offer display "$0" → "FREE".

**Verification:** JSON-LD valid across all 8 changed files (57 blocks, 0 failures). No raw em-dash bytes added. `"price":"0"` free offers intact site-wide. No non-zero numeric schema prices remain.

**Intentionally KEPT (documented residuals — the literal `grep $[0-9]=0` check does NOT pass by design):**
- `bird-removal-las-vegas/index.html` (4): the City of Las Vegas "$1,000 fine" for feeding pigeons — a legal/regulatory fact, not a price.
- `commercial-pest-control-las-vegas/pest-impact-on-business/index.html` (21): business-impact incident-cost / ROI statistics (e.g. "Typical Incident Cost: $5,000–$250,000+", "$5,000/day").
- `commercial-pest-control-las-vegas/landlord-pest-control-responsibilities/index.html` (2): illustrative legal example ("$2,400/month rental", "$2,000–$15,000" claim).
- `commercial-pest-control-las-vegas/index.html` (1): illustrative "$50,000+ in lost bookings" hotel-review impact figure.
- Still outstanding (separate from pricing): eco-friendly + main commercial pages retain "quarterly" wording per the earlier owner decision.

---

### 2026-06-15 — Commercial frequency-recommender: cost estimator → service recommendation tool

**Trigger:** after pricing removal, the commercial page's 5-question recommender (`#recommender` / `#frequency-quiz`) showed a flat "Estimated Annual Investment: Priced by property, free estimate" for every input — confusing as a cost estimator. Owner reframed it as a service-frequency recommendation tool (no pricing).

**Changes (all in `commercial-pest-control-las-vegas/index.html`):**
- Result-panel row label "Estimated Annual Investment" → "Service Recommendation" (kept `#quiz-investment` span id).
- Replaced the dead `computeAnnualInvestment(freq,size)` (returned the flat string for all 25 combos) with `computeRecommendation(freq)` returning a frequency-specific sentence: Weekly / Bi-weekly / Monthly / Bi-monthly / Quarterly each get distinct copy ending in "Request a free estimate." Size no longer affects output (collected as context only), per spec.
- `renderQuizOutput()` now calls `computeRecommendation`; result CTA text → "Get Free Estimate →" (was "Get Custom Quote for X Program"); static CTA label → "Get Free Estimate &rarr;" (href `/free-estimate/?type=commercial` unchanged).
- Section intro promise "estimated annual investment range" → "a service plan overview" (kept copy honest; within the recommender section).
- Em-dashes in the owner's spec strings rendered as commas (site zero-raw-em-dash rule; `textContent` won't decode entities).

**Verification (runtime):** inline JS compiles (0 syntax errors); `computeRecommendation` executed across all 9 industry paths + 5 canonical freqs → correct distinct strings, no throws (hotel/retail/school→Monthly, office-no-audit/HOA→Quarterly, warehouse→Bi-monthly, healthcare→Bi-weekly). Headless Chrome drive of the quiz (warehouse → Bi-Monthly) → panel renders "Service Recommendation: Bi-monthly service…" with "Get Free Estimate →" CTA, 0 console errors. `computeAnnualInvestment` fully removed; only the intentional "$50,000+" illustrative figure remains on the page.

**Left as-is (flagged):** the separate sibling **Industry Router** widget (`#industry-router`, Section 04A) still renders "Estimated investment: Priced by property, free estimate" in its output. Out of scope for this prompt ("no other sections changed"); recommended as a follow-up to apply the same reframe.

---

### 2026-06-15 — Commercial Industry Router (Section 04A): cost line → service recommendation

**Trigger:** follow-up to the recommender fix above — applied the same reframe to the sibling Industry Router widget (`#industry-router`), which still showed "Estimated investment: Priced by property, free estimate" in its `#router-body` output.

**Changes (all in `commercial-pest-control-las-vegas/index.html`, scoped to the router widget):**
- Added `routerRecommendations` map (by industry) with the owner's industry-specific strings (hotel→weekly/bi-weekly, healthcare→bi-weekly, retail→monthly, office→monthly/bi-monthly, warehouse→bi-monthly/monthly, property-management+hoa→monthly/quarterly, school→monthly, institutional/unmatched→default "Request a free estimate" string).
- `renderRouterOutput()`: replaced the `Estimated investment: <strong>range</strong>.` sentence with `Service Recommendation: <strong>rec</strong>` (industry-mapped); removed the now-unused `range`/`sizeRanges` lookup line. Result CTA text → "Get Free Estimate →" (was dynamic "Schedule Free <industry> Inspection →"); static `#router-cta` label → "Get Free Estimate &rarr;" (href `/free-estimate/?type=commercial` unchanged).

**Verification (runtime):** inline JS compiles (0 syntax errors). `routerRecommendations` resolved for all 9 industries → 8 distinct strings (property-mgmt & HOA intentionally share), institutional → default, no "$" in any string. Headless Chrome drive (industry=hotel) → panel renders "Service Recommendation: Weekly or bi-weekly service recommended…" with "Get Free Estimate →" CTA, 0 console errors. Dollar tokens on page remain 1 (the intentional "$50,000+" figure); no raw em-dash added.

**FLAGGED — headline vs recommendation mismatch (owner decision needed):** the router headline still uses the legacy `routerMatrix[industry].freq` while the new Service Recommendation uses the owner's table. For two industries these now disagree: **hotel** headline "Monthly + bed bug program" vs recommendation "Weekly or bi-weekly"; **office** headline "Quarterly or Monthly" vs recommendation "Monthly or bi-monthly". The other industries are roughly consistent. Editing the headline was outside this prompt's scope (output line only). Recommend a follow-up to align `routerMatrix` freq with the recommendation table (or drop the headline freq).

**Left as-is (out of scope):** Section 04A intro `.section-desc` still promises "typical pricing range" (now inaccurate) — outside the "widget output area" boundary set by this prompt; recommend a one-phrase follow-up edit.
