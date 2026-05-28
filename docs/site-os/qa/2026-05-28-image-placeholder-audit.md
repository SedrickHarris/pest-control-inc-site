# QA — Image Placeholder + Missing-Asset Audit

Date: 2026-05-28
Severity: Medium (cosmetic + social-share / SEO)
Status: Open — backlog tracked; no code changes in this pass
Audit type: Read-only verification (no files written outside this report)
Production audit: `curl -I` worked through Cloudflare on this run (root `pestcontrolinc.net/` → 200); HEAD checks reached 71/72 og:image URLs cleanly. (One transient 000.)

---

## Phase A — Re-entry summary

- `git status`: clean, branch up to date with `origin/main`. No uncommitted work; safe to audit.
- Tail of `docs/site-os/implementation-log.md`: most recent entry is **2026-05-28 — Homepage: Technician Image Added** (commit `b245a99`). The entry confirms the `.why-img-placeholder` HTML element was replaced with the real technician WebP and only the dormant CSS rule remains in `index.html`.
- Most recent file in `docs/site-os/qa/` before this one: `2026-05-18-soft-404-catch-all.md` (Cloudflare Pages serves homepage as soft-404 for unmatched routes — still Open).
- This run is read-only verification only. No site/page/CSS/image files were modified.

---

## Section 1 — Visible image placeholders

| File | Line | Class | Visible text / aria-label | Status |
|---|---|---|---|---|
| `about/index.html` | 744 | `story-img-placeholder` | "PCI Family Photo Placeholder<br>(4:3 aspect ratio)" · aria-label "Pest Control Inc Las Vegas — family owned pest control company three generations" | Live placeholder (visible to visitor) |
| `about/index.html` | 810 | `team-img-placeholder` | "PCI Technician Photo Placeholder<br>(3:4 aspect ratio)" · aria-label "Pest Control Inc licensed technician Las Vegas NV — background checked drug tested state licensed" | Live placeholder (visible to visitor) |
| `pest-control-las-vegas/eco-friendly/index.html` | 1260 | `diagram-placeholder` (with `data-img="ipm-targeted-vs-broadcast-diagram.png"`) | aria-label "IPM targeted gel bait application in cabinet hinge crevice versus conventional broadcast spray covering all cabinet surfaces…" | Live placeholder (visible to visitor); target PNG missing on disk |
| `pest-control-las-vegas/eco-friendly/index.html` | 1273 | `diagram-placeholder` (with `data-img="ipm-four-pillars-diagram.png"`) | aria-label "Diagram of the four IPM pillars used in the Health Conscious Service Program — prevention and exclusion, monitoring and inspection, targeted treatment, and follow-up verification" | Live placeholder (visible to visitor); target PNG missing on disk |

Total: **4 visible image placeholders across 2 files** (matches baseline).

---

## Section 2 — Referenced-but-missing image files

### 2A — Local `<img src>` references (HTML body images)

| Path | Type | On disk? |
|---|---|---|
| `/images/logos/pest-control-inc-logo-transparent-background.png` | Header/footer logo | **Yes** (`images/logos/pest-control-inc-logo-transparent-background.png`) |
| `/images/technician/pest-control-technician-foundation-treatment-las-vegas-home-pest-control-inc.webp` | Homepage Why-PCI technician photo (added in `b245a99`) | **Yes** (`images/technician/…`) |

**0 broken `<img src>` references.** Matches baseline.

### 2B — `diagram-placeholder` `data-img` targets

| `data-img` value | Expected on-disk path candidate(s) | On disk? |
|---|---|---|
| `ipm-targeted-vs-broadcast-diagram.png` | `images/diagrams/ipm-targeted-vs-broadcast-diagram.png`, `images/ipm-targeted-vs-broadcast-diagram.png`, etc. | **No** (not found anywhere in repo) |
| `ipm-four-pillars-diagram.png` | similar | **No** (not found anywhere in repo) |

**2 of 2 diagram PNGs missing on disk.** Matches baseline.

### 2C — `og:image` / `twitter:image` content URLs

- **72 unique image URLs** are referenced across 76 `og:image` / `twitter:image` tags site-wide.
- `og:image` and `twitter:image` URL sets are identical (every page reuses the same URL for both).
- Two path prefixes appear:
  - `/assets/images/…` — 62 URLs (~86%)
  - `/images/…` — 10 URLs (~14%) (older content-image paths)

**On-disk check**: the `assets/` directory does not exist at the repo root. Under `images/`, only `images/logos/` and `images/technician/` are present. **None of the 72 og:image URLs resolves to a file in the repo.**

**Live HEAD check** (`curl -I` against `https://pestcontrolinc.net/…`):
- **71 URLs returned HTTP 404** (missing on production)
- **1 URL returned 000** (curl timeout; transient — assumed missing): `og-plans-pricing-las-vegas.jpg`
- **0 URLs returned 200**

**Classification:**
| Bucket | Count |
|---|---|
| present-in-repo | 0 |
| missing-in-repo-but-live-200 | 0 |
| missing-everywhere-404 | **71 confirmed + 1 timeout = 72** |

The "missing-everywhere-404" bucket is the real backlog. Every page on the site currently advertises an OG image URL that returns 404, so social-share previews (Facebook, LinkedIn, Slack unfurl, Twitter card) will fall back to no-image or platform default.

### 2D — Favicon / Apple-touch / Android-chrome / Webmanifest references

| Path | Referenced from | On disk? |
|---|---|---|
| `/images/logos/favicons/favicon.ico` | every page `<head>` | **Yes** |
| `/images/logos/favicons/favicon-16x16.png` | every page `<head>` | **Yes** |
| `/images/logos/favicons/favicon-32x32.png` | every page `<head>` | **Yes** |
| `/images/logos/favicons/apple-touch-icon.png` | every page `<head>` | **Yes** |
| `/images/logos/favicons/site.webmanifest` | every page `<head>` | **Yes** |
| `/images/logos/favicons/android-chrome-192x192.png` | referenced by webmanifest icons array | **Yes** |
| `/images/logos/favicons/favicon-512.png` | referenced by webmanifest icons array | **Yes** |

**All 7 favicon-set paths present.** Matches baseline.

Note: no `android-chrome-512x512.png` (canonical PWA name) is referenced or on disk; `favicon-512.png` substitutes for it in the manifest. This was already logged as an open TODO in the 2026-05-28 logo+favicon entry.

---

## Section 3 — Excluded (form placeholders, dormant CSS) — proof checked

### 3A — Form placeholders (NOT image placeholders; excluded per spec)

| Class | Where it appears | Why excluded |
|---|---|---|
| `form-placeholder` | Group B outlier forms (6 commercial/plans pages) — wrapper class on the `<form>` element itself | Form styling class, not a visual image placeholder |
| `form-placeholder-title` | Same 6 outlier pages — title `<p>` inside the form | Form-internal title styling |
| `placeholder-radio` | Same 6 outlier pages — each `<label>` around a radio option | Radio-option styling |
| `placeholder-radios` | Same 6 outlier pages — the radio-group `<div>` | Radio-group styling |

These are leftovers from the pre-wire-up "form coming soon" placeholder design and are still load-bearing styling for the live radio-form pattern on the commercial/plans pages. Not image placeholders.

### 3B — Dormant CSS rules with no live element

| Class | File | Status |
|---|---|---|
| `why-img-placeholder` | `index.html:193` — `.why-img-placeholder{…}` CSS rule | **Dormant.** `grep -rn "why-img-placeholder" --include="*.html" .` returns exactly one hit, which is the CSS rule. No `<div class="why-img-placeholder">` HTML element exists site-wide. Confirms the homepage placeholder is fully resolved (replaced with the real `<img class="why-technician-img">` in commit `b245a99`). Rule left in place by design — the implementation log notes other pages may still reference it (and could pick it up in a future image-placeholder pass). |

---

## Discrepancies vs. baseline

- **Baseline expected "~70 og:image files referenced and absent from repo."** Actual exact count: **72 unique URLs.** Within the "~" approximation, but flagging precisely.
- **One og:image HEAD check returned `000` (curl timeout) instead of `404`:** `https://pestcontrolinc.net/assets/images/og-plans-pricing-las-vegas.jpg`. Treated as missing-everywhere alongside the 71 confirmed 404s, but if a precise re-check is wanted, this single URL would benefit from a retry.
- All other baseline lines match exactly: 4 visible placeholders across 2 files; the about pages and eco-friendly diagrams as expected; both diagram PNGs missing on disk; the homepage `why-img-placeholder` resolved with only the dormant CSS rule remaining; zero broken `<img src>`; full favicon set present.

---

## Prioritized resolution list

In order of visitor-visible impact:

1. **`about/index.html` story-img-placeholder + team-img-placeholder** — both render as dashed gray "Photo Placeholder" boxes to every visitor of the About page. Highest visitor-visible severity. Resolution path is identical to the homepage approach used in commit `b245a99`: commit a real image asset (e.g. a family/team photo and a technician photo), replace the `<div class="…-img-placeholder">` with an `<img>` tag, add a companion live-image CSS rule next to the existing placeholder rule.
2. **`pest-control-las-vegas/eco-friendly/index.html` diagram placeholders ×2** — visible dashed boxes on the eco-friendly long-read; also missing PNG assets. Lower visitor traffic than About, but resolves two issues at once (placeholder display + missing data-img target).
3. **`og:image` backlog (72 URLs)** — invisible to direct-page visitors but breaks every social-share preview. The URLs are already declared in the HTML; they just need the corresponding `.jpg` files committed at the paths each page expects (mix of `/assets/images/og-…` and `/images/…`). Could be tackled in batches by page-type (e.g., pest pages first, then city hubs, then neighborhoods).
4. **`android-chrome-512x512.png` canonical-name PWA icon** — minor PWA compatibility nicety; manifest currently uses `favicon-512.png` and works fine in Chrome/Edge. Lowest priority of the open items.

(No code changes were made by this audit. All four items belong on the existing TODO backlog tracked in `implementation-log.md`.)
