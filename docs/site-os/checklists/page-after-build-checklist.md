# Page After-Build Checklist — Pest Control Inc

Run after every page build before commit.

## File Check
- [ ] HTML file exists at correct path
- [ ] File is not empty and renders expected content
- [ ] No other HTML files accidentally modified

## Metadata
- [ ] <title> is unique and contains primary keyword + location
- [ ] <meta name="description"> is unique and 140-160 chars
- [ ] <link rel="canonical"> points to pestcontrolinc.net/[route]/
- [ ] <meta name="robots" content="index, follow">
- [ ] OG title, description, image present
- [ ] Twitter card present

## Content
- [ ] One H1 only
- [ ] H1 matches planned keyword
- [ ] Phone appears as (702) 228-4394 in display text
- [ ] tel:+17022284394 in all href attributes
- [ ] Skip-to-main-content link present
- [ ] No em dashes in customer-facing copy
- [ ] No double hyphens in customer-facing copy
- [ ] No invented claims or trust signals

## Schema
- [ ] LocalBusiness JSON-LD present
- [ ] FAQPage JSON-LD present if FAQs are visible
- [ ] FAQ schema answers match visible FAQ text exactly
- [ ] BreadcrumbList present if page has breadcrumb

## Internal Links
- [ ] Links to /free-estimate/ present
- [ ] Links to parent hub page present
- [ ] No broken internal links (no /scorpion-exterminator/ links that soft-404)

## CTA
- [ ] Primary CTA visible above the fold
- [ ] CTA text: Get Free Estimate or Call (702) 228-4394
- [ ] CTA links to /free-estimate/ or tel:+17022284394

## Soft-404 Check
- [ ] All internal links in this page point to LIVE routes only
  (see docs/site-os/inputs/page-list.md for LIVE vs SOFT_404 status)
