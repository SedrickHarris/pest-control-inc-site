# Batch 2: Core Brand & Conversion Pages
# Pest Control Inc · Las Vegas, NV

## Purpose
Build the Phase 1 gap pages and About cluster pages that are currently
soft-404ing despite being linked in the nav and footer.

## Source-of-Truth Docs
- docs/site-os/inputs/pci-build-context.md
- docs/site-os/inputs/pci-brand-style-reference.md
- docs/site-os/inputs/pci-launch-readiness-site-build-list.md
- docs/site-os/no-fake-data-policy.md
- docs/site-os/file-scope-and-git-safety-policy.md
- docs/site-os/service-business-conversion-layout.md

## Pages in This Batch

| Priority | Page | Route | Type |
|----------|------|-------|------|
| 1 | Free Estimate | /free-estimate/ | Conversion: Level 4 |
| 2 | Contact | /contact/ | Conversion: Level 4 |
| 3 | Thank You | /thank-you/ | Utility: Level 1 |
| 4 | Reviews | /reviews/ | Trust: Level 3 |
| 5 | Specials & Coupons | /specials/ | Offer: Level 3 |
| 6 | Privacy Policy | /privacy-policy/ | Legal: Level 1 |
| 7 | Terms of Use | /terms-of-use/ | Legal: Level 1 |
| 8 | HTML Sitemap | /sitemap/ | Utility: Level 1 |
| 9 | 404 Error Page | /404.html | Utility: Level 1 |
| 10 | Health Conscious Program | /about/health-conscious-service-program/ | About: Level 3 |
| 11 | Guarantee | /about/guarantee/ | Trust: Level 3 |

## Business Constants
- Phone: (702) 228-4394
- Email: info@pestcontrolinc.net
- Address: 3642 N Rancho Dr, Suite #102, Las Vegas, NV 89130
- License: NV #4632
- Primary CTA: Get Free Estimate → /free-estimate/
- Secondary CTA: Call (702) 228-4394

## Design Rules
- Follow service-business-conversion-layout.md for /free-estimate/ and /contact/
- All pages must match the brand color, typography, and component system
  defined in pci-brand-style-reference.md
- Phone format: (702) 228-4394 on all pages, no exceptions
- No fake reviews, ratings, or trust signals

## No-Fake-Data Rules
- /reviews/ page: use only the four confirmed review sources in pci-build-context.md
  (Google 5.0/30, Yelp 5.0/14, Facebook 4.8/11, Angi 5.0/10)
- /specials/ page: use only the confirmed new-customer offer in pci-build-context.md
- /about/guarantee/ page: use only the money-back guarantee language confirmed in the brand guide
- Do not invent testimonials, named individuals, or additional offers

## Validation
After each page: confirm file exists, canonical is correct, phone format is correct,
no soft-404, no broken internal links.

## Stop Conditions
- Do not build /free-estimate/ or /contact/ without a confirmed form handler endpoint.
  If no endpoint exists, build the page with a visible TODO placeholder for the form
  and note it as a launch blocker.
- Do not invent review counts beyond the four confirmed platforms.
