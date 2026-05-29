# Pest Control Inc — Brand & Style Reference

Source: PCI Brand & Style Guide (PDF, April 2026)
Status: Extracted and transcribed for repo use — reference document for all pages, all sessions, all developers
Last updated: 2026-05-18

---

## CONFIRMED BUSINESS DATA — LOCKED

```
Company Name:  Pest Control Inc
DBA:           PCI
Address:       3642 N Rancho Dr, Suite #102, Las Vegas, NV 89130
Phone:         702-228-4394  ← ONLY number to use. Never any other.
Email:         info@pestcontrolinc.net
Website:       pestcontrolinc.net
License:       Nevada Department of Agriculture Pest Control License #4632
```

### Hours
- Mon–Fri: 8:00am–4:00pm
- Sat: 8:00am–2:00pm
- Sun: Closed
- Emergency: 24/7

### Operations
- Callback promise: 30 minutes or less (business hours)
- Founded: 3 generations of family service — **DO NOT state a specific year on any page**
- Named individuals: **DO NOT feature named individuals on any page**

### Credentials
- Nevada Department of Agriculture License #4632
- NPMA — National Pest Management Association (active member)
- Drug tested + background checked + state-licensed technicians
- Fully licensed and insured

### Methodology
- IPM — Integrated Pest Management
- Branded program: Health Conscious Service Program
- Exterior-first treatment approach
- EPA-registered low-impact baits and gels

### Services
- Residential · Commercial · Emergency 24/7 · Lawn spraying / fertilizing
- 16 pest species: Scorpions · Ants · Cockroaches · Rodents · Termites · Spiders · Bed Bugs · Wasps · Bees · Birds/Pigeons · Earwigs · Hornets · Crane Flies · False Chinch Bugs · Miller Moths · Springtails

### Review Scores (confirmed — use verbatim, do not inflate)
- Google: 5.0 / 30 reviews
- Yelp: 5.0 / 14 reviews
- Facebook: 4.8 / 11 reviews
- Angi: 5.0 / 10 reviews

### Guarantee
Money-back guarantee on every service

### New Customer Offer
- Free first service with 12-month annual agreement
- Exclusions: pigeons, bed bugs, bees, rodents
- New residential customers only
- Cannot be combined with other offers
- 12-month contract required

### ReputationHub Widget
- Script: `https://reputationhub.site/reputation/assets/review-widget.js`
- Widget URL: `https://reputationhub.site/reputation/widgets/review_widget/XmTsrsLJDMVSiADHUA3q`

---

## COLORS

### Primary Palette

```css
--blue:        #2F5EA3   /* Primary identity color — headers, links, dominant sections,
                            trust bar background, eyebrow elements, internal link text,
                            H2 subtext, active states, info callout borders */
--blue-dark:   #234880   /* Hover state for blue elements */
--blue-light:  #EBF0F8   /* Blue tints for backgrounds, tag fills, logo placeholder backgrounds */
--orange:      #E87A1F   /* RESTRICTED USE ONLY — see Orange Restriction Rules below */
--orange-dark: #C4660F   /* Hover state for orange buttons only */
--navy:        #1D2430   /* Deep authority color — hero backgrounds, footer,
                            dark section overlays, pull quote backgrounds */
--navy-deep:   #0F1520   /* Footer background */
--white:       #F5F7FA   /* Page background, light section backgrounds */
--pure:        #ffffff   /* Card backgrounds, form fields, pure white sections */
--gray:        #D9E0E6   /* Borders, dividers, input borders */
--gray-mid:    #B0BBC6   /* Placeholder text, secondary labels */
--gray-dark:   #6B7280   /* Body text secondary, meta information */
--tan:         #946B42   /* Desert warmth accent color — callout borders,
                            desert-themed elements, select H3 accents in tan-light sections */
--tan-light:   #F5EEE6   /* Section backgrounds for warmth variety —
                            use on 2–3 sections per page alternating with white and navy */
```

### Orange Restriction Rules — STRICTLY ENFORCED

**PERMITTED uses of orange (#E87A1F):**
1. Primary CTA buttons ("Get Free Estimate", "Call Now", form submit)
2. Phone number text in top bar and hero section only
3. Promotional/offer badges ("Free First Service", "50% Off")
4. New customer offer callout accent borders
5. Star ratings that appear ON WHITE or LIGHT backgrounds
   (use #FFD580 warm gold instead of orange for stars on blue/navy)

**NEVER use orange for:**
- Section eyebrows or labels
- Checkmark icons or list bullets
- H1, H2, H3 text or accents
- FAQ accordion arrows
- Blog category tags
- Trust bar items
- Navigation elements
- Body text emphasis
- Icon fills in non-CTA contexts
- Any decorative element not directly tied to action or offer

### Star Rating Color Rule
```
Stars on WHITE or LIGHT backgrounds: var(--orange)  #E87A1F
Stars on BLUE or NAVY backgrounds:   #FFD580  (warm gold)
Reason: Orange stars on navy appear muddy and fail contrast.
        Warm gold reads clearly on dark backgrounds.
```

### Section Background Sequence

Standard alternating pattern (prevents visual monotony):

```
Navy   (#1D2430)  → High authority, hero, dark emphasis sections
Blue   (#2F5EA3)  → Trust bar only (full blue — brand dominant)
Tan    (#F5EEE6)  → Warmth, story, credentials, intro sections
White  (#F5F7FA)  → General content, standard sections
Pure   (#ffffff)  → Cards, forms, reviews, FAQ
```

Typical page sequence:
```
Top Bar:    navy
Header:     pure white
Hero:       navy
Trust Bar:  #2F5EA3 BLUE
Section 1:  #F5EEE6 tan-light
Section 2:  #ffffff pure white
Section 3:  #1D2430 navy
Section 4:  #F5EEE6 tan-light
Section 5:  #F5F7FA white
Section 6:  #1D2430 navy
FAQ:        #ffffff pure
Final CTA:  #1D2430 navy
Footer:     #0F1520
```

---

## TYPOGRAPHY

### Font Stack
```
Display / Headlines:  DM Serif Display
                      Use: H1, H2, pull quotes, emergency callouts
                      Weights: 400 (regular), 400 italic

Labels / UI:          Barlow Condensed
                      Use: eyebrows, nav, buttons, CTAs, trust bar,
                           table headers, credential labels, all-caps text
                      Weights: 400, 600, 700, 800, 900

Body:                 Barlow
                      Use: all paragraph text, list items, FAQ answers,
                           form fields, footer links
                      Weights: 300, 400, 500, 600 · italic variants
```

Google Fonts Import:
```
https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap
```

Font Preload:
```html
<link rel="preload" as="font" href="DM-Serif-Display.woff2" crossorigin>
```

### Type Scale
```
H1:    DM Serif Display · clamp(42px, 5.5vw, 68px) · weight 400 · line-height 1.05
H2:    DM Serif Display · clamp(30px, 4vw, 48px) · weight 400 · line-height 1.1
H3:    Barlow Condensed · clamp(16px, 2vw, 20px) · weight 800 · uppercase · tracking .04em
Body:  Barlow · 15–16px · weight 400 · line-height 1.65
Small: Barlow · 13–14px · weight 400
Label: Barlow Condensed · 10–12px · weight 700 · uppercase · tracking .12–.2em
```

Eyebrows (section labels above H2):
```
Font:      Barlow Condensed · 11–13px · weight 700
Color:     var(--blue) on light backgrounds
           rgba(168,196,232,0.9) on navy backgrounds
Transform: uppercase · letter-spacing: .14em
```

---

## CSS VARIABLES — COMPLETE SET

```css
:root {
  /* Colors */
  --blue:        #2F5EA3;
  --blue-dark:   #234880;
  --blue-light:  #EBF0F8;
  --orange:      #E87A1F;
  --orange-dark: #C4660F;
  --navy:        #1D2430;
  --navy-deep:   #0F1520;
  --white:       #F5F7FA;
  --pure:        #ffffff;
  --gray:        #D9E0E6;
  --gray-mid:    #B0BBC6;
  --gray-dark:   #6B7280;
  --tan:         #946B42;
  --tan-light:   #F5EEE6;

  /* Typography */
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-ui:      'Barlow Condensed', Arial, sans-serif;
  --font-body:    'Barlow', Arial, sans-serif;

  /* Spacing */
  --section-pad:    80px 0;
  --section-pad-sm: 48px 0;
  --container:      1160px;
  --container-pad:  28px;

  /* Borders */
  --radius-sm:   8px;
  --radius-md:   14px;
  --radius-lg:   20px;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-card:       0 4px 24px rgba(29,36,48,.08);
  --shadow-card-hover: 0 12px 40px rgba(29,36,48,.14);
  --shadow-hero-form:  0 24px 64px rgba(0,0,0,.25);
}
```

---

## COMPONENTS

### Buttons

```css
/* Primary — orange — CTAs only */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--orange);
  color: #fff;
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  padding: 14px 28px;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background .2s, transform .15s;
}
.btn-primary:hover {
  background: var(--orange-dark);
  transform: translateY(-1px);
}

/* Secondary — blue */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--blue);
  color: #fff;
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  padding: 14px 28px;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background .2s, transform .15s;
}
.btn-secondary:hover {
  background: var(--blue-dark);
  transform: translateY(-1px);
}

/* Outline — transparent with white border (on dark backgrounds) */
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: #fff;
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  padding: 13px 28px;
  border-radius: var(--radius-pill);
  border: 2px solid rgba(255,255,255,.4);
  cursor: pointer;
  text-decoration: none;
  transition: border-color .2s, background .2s;
}
.btn-outline:hover {
  border-color: rgba(255,255,255,.8);
  background: rgba(255,255,255,.06);
}
```

### Section Eyebrow

```css
.section-eyebrow {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--blue);       /* on light backgrounds */
  margin-bottom: 12px;
  display: block;
}
/* On dark/navy backgrounds: */
.section-eyebrow.light {
  color: rgba(168, 196, 232, 0.9);
}
```

### Section Title (H2)

```css
.section-title {
  font-family: var(--font-display);
  font-size: clamp(30px, 4vw, 48px);
  font-weight: 400;
  line-height: 1.1;
  color: var(--navy);
  margin-bottom: 20px;
}
.section-title span {
  color: var(--blue);   /* optional accent on second line */
}
/* On dark backgrounds: */
.section-title.white { color: #fff; }
.section-title.white span { color: rgba(168,196,232,.9); }
```

### Cards

```css
.card {
  background: var(--pure);
  border: 1px solid var(--gray);
  border-radius: var(--radius-md);
  padding: 24px;
  transition: box-shadow .25s, transform .25s;
}
.card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-3px);
}
/* Blue top accent variant: */
.card-accent-top {
  border-top: 3px solid var(--blue);
}
/* Blue left border variant: */
.card-accent-left {
  border-left: 4px solid var(--blue);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}
```

### FAQ Accordion

```css
.faq-section { max-width: 800px; }
.faq-item {
  border: 1px solid var(--gray);
  border-radius: var(--radius-md);
  margin-bottom: 8px;
  overflow: hidden;
  transition: border-color .2s;
}
.faq-item.active { border-color: var(--blue); }
.faq-q {
  width: 100%;
  background: var(--pure);
  border: none;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: .02em;
  color: var(--navy);
  cursor: pointer;
  text-align: left;
  transition: background .2s;
}
.faq-q:hover { background: var(--white); }
.faq-q-arrow {
  font-size: 22px;
  font-weight: 300;
  color: var(--blue);
  flex-shrink: 0;
  transition: transform .25s;
}
.faq-item.active .faq-q-arrow { transform: rotate(45deg); }
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height .35s ease;
}
.faq-answer.open { max-height: 600px; }
.faq-answer-inner {
  padding: 0 20px 18px;
  font-family: var(--font-body);
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--gray-dark);
}
```

### Trust Bar

```css
.trust-bar {
  background: var(--blue);
  padding: 14px 0;
  overflow-x: hidden;
}
.trust-bar-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 0 var(--container-pad);
}
.trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 24px;
  border-right: 1px solid rgba(255,255,255,.15);
}
.trust-item:last-child { border-right: none; }
.trust-value {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: .04em;
  color: #fff;
}
.trust-label {
  font-family: var(--font-ui);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(255,255,255,.65);
}
/* Star rating on blue background — use warm gold NOT orange */
.trust-stars { color: #FFD580; }
```

### Review Cards (static microdata)

```css
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}
.review-card {
  background: var(--pure);
  border: 1px solid var(--gray);
  border-radius: var(--radius-md);
  padding: 20px;
}
.review-stars {
  color: var(--orange);
  font-size: 13px;
  letter-spacing: 2px;
  margin-bottom: 8px;
}
.review-text {
  font-family: var(--font-body);
  font-size: 13.5px;
  font-style: italic;
  color: var(--gray-dark);
  line-height: 1.6;
  margin-bottom: 12px;
}
.review-attr {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--gray-mid);
}
.review-attr strong { color: var(--blue); }
@media (max-width: 768px) {
  .reviews-grid { grid-template-columns: 1fr; }
}
```

### Mobile Sticky CTA Bar

```css
.mobile-cta-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--navy);
  border-top: 2px solid var(--orange);
  padding: 10px 16px;
  gap: 10px;
  z-index: 90;
}
@media (max-width: 768px) {
  .mobile-cta-bar { display: flex; }
}
.mobile-cta-bar a {
  flex: 1;
  text-align: center;
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  padding: 12px 8px;
  border-radius: var(--radius-pill);
  text-decoration: none;
}
.mobile-cta-call     { background: var(--orange); color: #fff; }
.mobile-cta-estimate { background: var(--blue);   color: #fff; }
```

### Skip Link

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--blue);
  color: #fff;
  padding: 8px 16px;
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  z-index: 999;
  border-radius: 0 0 8px 0;
  transition: top .2s;
}
.skip-link:focus { top: 0; }
```

### Scroll Animation Classes

```css
.anim-ready {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity .55s ease, transform .55s ease;
}
.anim-visible {
  opacity: 1 !important;
  transform: none !important;
}
```

---

## LAYOUT

### Container

```css
.container {
  max-width: var(--container);  /* 1160px */
  margin: 0 auto;
  padding: 0 var(--container-pad);  /* 28px */
}
```

### Section Spacing

```css
section { padding: var(--section-pad); }  /* 80px 0 */
/* Compact variant: */
.section-compact { padding: var(--section-pad-sm); }  /* 48px 0 */
```

---

## GLOBAL PAGE STRUCTURE

### Required Elements (every page)
- `<a class="skip-link" href="#main-content">Skip to main content</a>`
- Top emergency bar (navy)
- Header / nav (pure white)
- Hero section (navy background)
- Trust bar (blue background)
- Main content sections (alternating per sequence above)
- FAQ section (pure white / #ffffff)
- Final CTA section (navy)
- Footer with NAP microdata

### NAP in Footer (always)

```html
<footer itemscope itemtype="https://schema.org/LocalBusiness">
  <span itemprop="name">Pest Control Inc</span>
  <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
    <span itemprop="streetAddress">3642 N Rancho Dr, Suite #102</span>
    <span itemprop="addressLocality">Las Vegas</span>
    <span itemprop="addressRegion">NV</span>
    <span itemprop="postalCode">89130</span>
  </div>
  <a href="tel:+17022284394" itemprop="telephone">702-228-4394</a>
  <a href="mailto:info@pestcontrolinc.net" itemprop="email">info@pestcontrolinc.net</a>
</footer>
```

---

## REVIEW WIDGET INTEGRATION

### Embed Code (every page with reviews section)

In review section body:
```html
<iframe
  class="lc_reviews_widget"
  src="https://reputationhub.site/reputation/widgets/review_widget/XmTsrsLJDMVSiADHUA3q"
  frameborder="0"
  scrolling="no"
  style="min-width:100%;width:100%;"
  title="Pest Control Inc customer reviews — Las Vegas, NV"
  loading="lazy">
</iframe>
```

Before `</body>`:
```html
<script
  type="text/javascript"
  src="https://reputationhub.site/reputation/assets/review-widget.js"
  defer>
</script>
```

---

## SCHEMA STANDARDS

### AggregateRating (consistent across all pages)

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "reviewCount": "30",
  "bestRating": "5",
  "worstRating": "1",
  "description": "5.0 stars across 30 Google reviews for Pest Control Inc in Las Vegas, NV"
}
```

### Offer — New Customer Free First Service (consistent)

```json
{
  "@type": "Offer",
  "name": "Free First Pest Control Service — New Customers",
  "description": "New residential customers receive their first pest control service free with a 12-month annual service agreement. Excludes pigeons, bed bugs, bees, and rodents.",
  "price": "0",
  "priceCurrency": "USD",
  "validThrough": "2027-04-21",
  "eligibleCustomerType": "NewCustomer",
  "url": "https://pestcontrolinc.net/specials/"
}
```

### WebPage Required Properties (every page)

```json
{
  "@type": "WebPage",
  "isAccessibleForFree": true,
  "datePublished": "2025-01-01",
  "dateModified": "YYYY-MM-DD",
  "lastReviewed": "YYYY-MM-DD",
  "mainEntity": {"@id": "..."},
  "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".section-title", ".hero-headline"] }
}
```

### LocalBusiness Required Properties (every page)

```json
{
  "@type": "LocalBusiness",
  "@id": "https://pestcontrolinc.net/#business",
  "name": "Pest Control Inc",
  "telephone": "+17022284394",
  "email": "info@pestcontrolinc.net",
  "priceRange": "$$",
  "logo": {
    "@type": "ImageObject",
    "url": "https://pestcontrolinc.net/images/pci-logo.png",
    "width": 300,
    "height": 130
  }
}
```

---

## ENTITY PHRASES — MUST BE CONSISTENT ACROSS ALL PAGES

These phrases must appear **identically** on every page that uses them.
Any variation reduces AI citation confidence and GEO entity strength.

Use these exact strings (confirmed from style guide — entity phrase box not fully readable due to PDF rendering; update this section when source markdown is available):

- **Brand name:** Pest Control Inc
- **DBA short form:** PCI
- **Program name:** Health Conscious Service Program
- **Guarantee phrase:** money-back guarantee
- **Callback phrase:** 30 minutes or less
- **Credentials phrase:** licensed, insured, drug tested, and background checked
- **Generation phrase:** 3-generation family-owned (NOT "three generation", NOT "family business for three generations" — use the exact form)
- **License reference:** Nevada Department of Agriculture Pest Control License #4632
- **NPMA reference:** National Pest Management Association (NPMA) member
- **Service area:** Las Vegas Valley and Clark County, NV

---

## PUNCTUATION: NO LONG DASHES (HARD RULE)

Customer-facing content on Pest Control Inc pages must never contain em dashes or en dashes.

### Forbidden characters (negative examples, do not emit)

| Mark | Literal | HTML entities |
|---|---|---|
| em dash | `—` | `&mdash;`, `&#8212;`, `&#x2014;` |
| en dash | `–` | `&ndash;`, `&#8211;`, `&#x2013;` |

### Where the rule applies

The rule applies to every customer-facing context:

- Visible text inside any element (paragraphs, headings, lists, buttons, captions)
- Attribute values: `alt`, `aria-label`, `title`, `meta name="description"`, `meta name="twitter:description"`, `meta property="og:description"`
- JSON-LD `@graph` values (any string field a search engine or social platform reads)

### Replacement guidance

When you remove a long dash, pick the contextually correct mark instead:

- For a break or aside in a sentence, use a comma, colon, period, or parentheses. Read the sentence aloud, the correct mark is usually obvious.
- For a numeric range (times, dates, scores, page counts), use the word **to**. Examples: "Mon to Fri", "8:00am to 4:00pm", "1 to 3 treatments".
- Never substitute a hyphen for a removed long dash unless the result is a genuine compound modifier (a real adjective phrase like "long-term", "drug-tested"). A hyphen in place of an em dash usually reads as a typo.

### Dev exemption

HTML comments that never reach the user (build-tool comments, section markers, TODOs) are exempt because they are not customer-facing. Even so, prefer hyphens or words in comments for grep consistency, so a single grep can catch leaks.

### How to check before commit

Run from the repo root:

```
grep -rnE '—|&mdash;|&#8212;|&#x2014;|–|&ndash;|&#8211;|&#x2013;' --include="*.html" . | grep -v '<!--'
```

Zero output is the pass condition. See `docs/site-os/pass-fail-page-quality-gates.md` for the enforceable gate that ties this rule to the quality-gate run.

---

## PAGES BUILT — STATUS (as of April 2026)

> Note: Status column reflects April 2026 state. See docs/site-os/inputs/page-list.md for current build status.

| Page | URL | Prompt File | Status |
|------|-----|-------------|--------|
| Homepage | / | PCI_Redesign_ClaudeCode.md | Built: PCI_Homepage_v2.html |
| About | /about/ | PCI_About_v2_Prompt.md | Prompt ready — build timed out, retry needed |
| Residential Hub | /pest-control-las-vegas/ | PCI_Residential_Hub_Prompt.md | Prompt ready |
| Mission | /about/mission/ | PCI_Mission_Prompt.md | Prompt ready |

### Pages to Build Next (priority order from style guide)

| Priority | Page | URL | Notes |
|----------|------|-----|-------|
| 1 | Health Conscious Program | /about/health-conscious-service-program/ | About cluster |
| 2 | Guarantee | /about/guarantee/ | About cluster |
| 3 | Commercial Hub | /commercial-pest-control-las-vegas/ | Separate from residential |
| 4 | Apartments | /pest-control-las-vegas/apartments/ | Residential sub-page |
| 5 | HOA | /pest-control-las-vegas/hoa/ | Residential sub-page |
| 6 | Condos | /pest-control-las-vegas/condos/ | Residential sub-page |
| 7 | Single-Family | /pest-control-las-vegas/single-family-homes/ | Residential sub-page |
| 8–23 | 16 Species Pages | /[pest]-exterminator-las-vegas/ | Species hub pages |
| 24–120 | 97 Geo Pages | /pest-control-[city-nv]/ | Community pages |

---

## PRE-LAUNCH CHECKLIST (from style guide)

- [ ] **CRITICAL: Fix GBP phone: 702-905-1355 → 702-228-4394**
- [ ] Claim and correct Angi profile
- [ ] Replace all logo placeholders with actual PCI logo file
- [ ] Replace all photo placeholders with real photography
- [ ] Configure Google Search Console at launch
- [ ] Configure Google Analytics at launch
- [ ] Create Wikidata entity for Pest Control Inc
- [ ] Submit sitemap to GSC at launch
- [ ] Launch review generation campaign (target 50+ Google reviews)
- [ ] Build /apartments/ and /hoa/ sub-pages before residential hub launch
- [ ] Verify all internal links resolve (no 404s)

---

## PDF RENDERING NOTE

The brand style guide PDF was produced via "Print to PDF" from a markdown renderer. Code block text is rendered in very light gray and is partially unreadable in PDF extraction. The CSS variables, component styles, entity phrases block, accessibility standards, and performance standards sections above are transcribed from the readable portions. The source markdown file (`PCI_Brand_Style_Guide.md`) is the authoritative version — request it if precision on any dropped values is needed.

---

Site OS Build Reference — Pest Control Inc
Source: Brand_Style_Guide.pdf (April 2026)
Extracted: 2026-05-18
