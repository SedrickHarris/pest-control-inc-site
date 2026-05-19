# QA — Cloudflare Pages Soft-404 Catch-All

Date: 2026-05-18
Severity: High (SEO / UX)
Status: Open — fix required before launch
Audited on: pestcontrolinc-site.pages.dev (staging)
Production audit blocked: pestcontrolinc.net returned HTTP 403 to automated WebFetch (likely Cloudflare bot protection); production assumed identical because Cloudflare Pages serves both deploys from this same repo.

---

## Issue

Cloudflare Pages is configured (by default) to serve `/index.html` with HTTP `200 OK` for any URL path that does not match a deployed file. This is a soft-404 — the user / crawler thinks the page exists, but it is the homepage.

Verification (2026-05-18):

```
curl -s -o /dev/null -w "%{http_code}\n" https://pestcontrolinc-site.pages.dev/this-page-cannot-exist-zzzqqq/
→ 200
```

Body-hash comparison confirms the homepage is being served byte-for-byte for unmatched routes:

```
a58042013792  93774B  /                                          ← homepage
a58042013792  93774B  /this-page-cannot-exist-zzzqqq/            ← nonsense URL — same bytes
a58042013792  93774B  /scorpion-exterminator-las-vegas/          ← linked in nav — same bytes
a58042013792  93774B  /free-estimate/                            ← linked in nav — same bytes
a58042013792  93774B  /contact/                                  ← linked in nav — same bytes
a58042013792  93774B  /blog/                                     ← linked in nav — same bytes
... 25+ more identical hashes for routes linked in nav/footer but not built
```

---

## Routes affected (confirmed serving homepage as soft-404)

Pest service pages (10):
- /scorpion-exterminator-las-vegas/
- /cockroach-exterminator-las-vegas/
- /rodent-exterminator-las-vegas/
- /termite-exterminator-las-vegas/
- /spider-exterminator-las-vegas/
- /bed-bug-exterminator-las-vegas/
- /wasp-exterminator-las-vegas/
- /bee-removal-las-vegas/
- /bird-removal-las-vegas/
- /earwig-exterminator-las-vegas/
- /miller-moth-exterminator-las-vegas/

Conversion / utility (6):
- /free-estimate/
- /contact/
- /specials/
- /reviews/
- /pest-identification/
- /pest-control-faq/

Blog (4):
- /blog/
- /blog/why-scorpions-worse-after-rain/
- /blog/common-las-vegas-pests-summer/
- /blog/how-to-keep-pests-out-of-home-las-vegas/

About sub-pages (2):
- /about/health-conscious-service-program/
- /about/guarantee/

Service-area + cities + neighborhoods (12+):
- /las-vegas-valley/
- /pest-control-henderson-nv/
- /pest-control-north-las-vegas/
- /pest-control-boulder-city-nv/
- /pest-control-spring-valley-nv/
- /pest-control-paradise-nv/
- /pest-control-enterprise-nv/
- /pest-control-sunrise-manor-nv/
- /pest-control-las-vegas/summerlin/
- /pest-control-las-vegas/centennial-hills/
- /pest-control-las-vegas/southern-highlands/
- /pest-control-las-vegas/mountains-edge/
- /pest-control-henderson-nv/green-valley/
- /pest-control-henderson-nv/anthem/
- /pest-control-henderson-nv/inspirada/
- /pest-control-north-las-vegas/aliante/

Legal (2):
- /privacy-policy/
- /terms-of-use/

---

## Repo ground truth (17 routes — confirmed built with unique content)

```
/
/about/
/about/mission/
/ant-exterminator-las-vegas/
/commercial-pest-control-las-vegas/
/commercial-pest-control-las-vegas/hoa/
/commercial-pest-control-las-vegas/hotels/
/commercial-pest-control-las-vegas/landlord-pest-control-responsibilities/
/commercial-pest-control-las-vegas/offices/
/commercial-pest-control-las-vegas/pest-impact-on-business/
/commercial-pest-control-las-vegas/property-managers/
/commercial-pest-control-las-vegas/retail/
/emergency-pest-control-las-vegas/
/pest-control-las-vegas/
/pest-control-las-vegas/apartments/
/pest-control-las-vegas/eco-friendly/
/pest-control-las-vegas/plans-and-pricing/
```

Each returns a unique body hash and unique byte count distinct from the homepage.

---

## Impact

- **Duplicate content at scale.** 30+ URLs return byte-identical homepage HTML. Google will see this as duplicate content, waste crawl budget, and likely soft-404 the surplus URLs after discovery — losing the chance to rank any of them.
- **Broken UX from internal nav.** Visitors who click "Scorpion Exterminator" or "Free Estimate" in the nav/footer arrive at the homepage with no indication the page they wanted does not exist. No 404 page, no redirect, no breadcrumb mismatch — silent failure.
- **Schema inconsistency.** The homepage's `WebPage` and `LocalBusiness` schema is now served at 30+ URLs, all claiming to be the homepage. Schema parsers see contradictory `url` fields.
- **GSC / Bing Webmaster signals.** Once Search Console is connected at launch, every unbuilt-but-linked route will produce "Duplicate without user-selected canonical" or "Soft 404" warnings in coverage reports.

---

## Recommended fix paths (pick one)

1. **Add a real `/404.html` and a `_routes.json` or `_redirects` file** to make Cloudflare Pages return a true 404 for unmatched paths. This is the SEO-correct outcome — surplus URLs disappear from the index, and the 17 built pages get their own ranking.

2. **Remove broken internal links from nav/footer** until the target pages are actually built. Pair this with option 1 — even with a 404 page, you don't want broken links shipping in the global nav.

3. **Build the missing pages** in priority order per `docs/site-os/inputs/pci-launch-readiness-site-build-list.md`. Phase 1 (Conversion & Technical Foundation) has 8 of these as top-priority builds: free-estimate, contact, reviews, specials, thank-you, privacy-policy, terms-of-use, sitemap. Once built they stop being soft-404s.

Recommended sequencing: (1) immediately, (2) before next deploy, (3) over the launch-readiness phase.

---

## Related: page-list.md known divergence

`docs/site-os/inputs/page-list.md` (committed in this same session) marks 17 routes as `LIVE`, including:
- /free-estimate/, /contact/, /scorpion-exterminator-las-vegas/, /cockroach-exterminator-las-vegas/, /rodent-exterminator-las-vegas/, /termite-exterminator-las-vegas/, /spider-exterminator-las-vegas/, /bed-bug-exterminator-las-vegas/, /pest-identification/, /pest-control-faq/, /blog/

Per the body-hash audit above, **all 11 of these are soft-404 fallbacks, not actually live pages**. The page-list was committed verbatim per direction; this note exists so future sessions know to treat those LIVE markers as the *original audit assumption* rather than verified ground truth. Reconciliation pass needed before page-list is treated as authoritative.

---

## Related: pre-launch checklist item

`docs/site-os/inputs/pci-brand-style-reference.md` pre-launch checklist already includes:
- [ ] Verify all internal links resolve (no 404s)

This finding is the concrete evidence behind that checklist item. The item should be expanded to: *return real 404s for unmatched routes, then verify no nav/footer link triggers one.*

---

## Reproduction commands (for re-verification)

```bash
# Confirm soft-404 still active
curl -s -o /dev/null -w "%{http_code}\n" https://pestcontrolinc-site.pages.dev/this-page-cannot-exist-zzzqqq/
# Expected after fix: 404. Currently: 200.

# Confirm body-hash equality of unbuilt route and homepage
curl -s https://pestcontrolinc-site.pages.dev/ | sha256sum
curl -s https://pestcontrolinc-site.pages.dev/scorpion-exterminator-las-vegas/ | sha256sum
# Expected after fix: hashes differ (real 404 page served for second URL).
# Currently: hashes identical (both serve homepage).
```
