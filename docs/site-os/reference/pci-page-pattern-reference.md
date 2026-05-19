# Pest Control Inc — Page Pattern Reference

Source: Pattern audit of all 17 existing HTML files in this repo
Primary reference: `pest-control-las-vegas/index.html` (residential hub — service page patterns)
Secondary reference: `about/index.html` (trust/narrative section patterns)
Cross-file variations verified via targeted greps
Last audited: 2026-05-18
HEAD at audit: `171fb57`

---

## A. Document Structure

### DOCTYPE and `<html>` tag — uniform across all 17 files
```html
<!DOCTYPE html>
<html lang="en">
```

### `<head>` order — uniform pattern
1. `<meta charset="UTF-8">`
2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
3. `<title>`
4. `<meta name="description">`
5. `<meta name="robots" content="index, follow">`
6. `<link rel="canonical">` (always at line 9)
7. `<link rel="alternate" hreflang="en-us">`
8. Open Graph tags (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:image:alt`, `og:locale`, `og:site_name`)
9. Twitter card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
10. Font preconnects (`fonts.googleapis.com`, `fonts.gstatic.com`)
11. Optional `<link rel="preload" as="image">` for hero image
12. Google Fonts stylesheet (single combined link — homepage uses two separate links, see Anomalies)
13. JSON-LD `<script type="application/ld+json">` blocks (3–7 per page)
14. Inline `<style>` block

### `<body>` opening — uniform pattern
```html
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- TOP BAR -->
<div class="top-bar">...</div>

<!-- HEADER -->
<header class="header">...</header>

<!-- MOBILE NAV -->
<div id="mobile-nav" class="mobile-nav-overlay" aria-hidden="true">...</div>

<main id="main-content">
  <!-- SECTION 01 — HERO -->
  <!-- SECTION 02 — TRUST BAR -->
  <!-- SECTION 03 — ... -->
  ...
</main>

<footer class="footer">...</footer>

<!-- MOBILE STICKY CTA -->
<div class="mobile-cta">...</div>

<script>...inline JS...</script>
<script src="https://reputationhub.site/reputation/assets/review-widget.js" defer></script>
</body>
</html>
```

### Skip link — present on all 17 files
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```
First child of `<body>`. CSS class `.skip-link` is also present in every `<style>` block (added during the site-audit batch on the homepage, already present on the other 16).

---

## B. CSS Approach

### Where CSS lives
- **100% inline** in a single `<style>` block in `<head>`. No external CSS files referenced via `<link rel="stylesheet">` other than Google Fonts.

### CSS variables (declared in `:root` — uniform across all files)
```css
:root{
  --blue:        #2F5EA3;
  --blue-dark:   #234880;
  --blue-light:  #EBF0F8;
  --blue-accent: #a8c4e8;       /* present on some pages */
  --orange:      #E87A1F;
  --orange-dark: #C4660F;
  --navy:        #1D2430;
  --white:       #F5F7FA;
  --pure:        #ffffff;
  --gray:        #D9E0E6;
  --gray-mid:    #B0BBC6;
  --gray-dark:   #6B7280;
  --tan:         #946B42;
  --tan-light:   #F5EEE6;
}
```
Some pages additionally declare `--font-display`, `--font-ui`, `--font-body` font-family variables; most pages use literal font-family strings.

### Google Fonts (single combined link on 16 files)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet">
```
**Exception:** `index.html` (homepage) uses two separate `<link>` tags for the two font families (lines 24, 25). Cosmetic — both work.

### External CSS files
None linked. All CSS is inline per file.

---

## C. Top Bar

### Exact HTML structure (uniform)
```html
<div class="top-bar">
  <span class="top-bar-text">24/7 Pest Emergency — Las Vegas &amp; Clark County, NV</span>
  <a href="tel:+17022284394" class="top-bar-phone">📞 (702) 228-4394</a>
  <a href="/specials/" class="top-bar-badge">Free First Service →</a>
</div>
```

### Text content per page type (post-site-audit standardization)
- **Standard pages (13 of 17):** `24/7 Pest Emergency — Las Vegas & Clark County, NV`
- **Emergency page, plans-and-pricing, apartments, eco-friendly:** `Mon–Fri 8am–4pm · Sat 8am–2pm · Emergency 24/7 — Las Vegas & Clark County, NV`

### CSS
```css
.top-bar{background:var(--navy);padding:10px 24px;display:flex;align-items:center;justify-content:center;gap:28px;position:sticky;top:0;z-index:100;border-bottom:2px solid var(--orange);flex-wrap:wrap}
```

---

## D. Header / Navigation

### Header structure (uniform)
```html
<header class="header">
  <div class="container header-inner">
    <a href="/" class="logo-placeholder" aria-label="Pest Control Inc — Home">PCI Logo</a>
    <button id="hamburger-btn" class="hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav">
      <span class="ham-line"></span>
      <span class="ham-line"></span>
      <span class="ham-line"></span>
    </button>
    <nav class="nav" aria-label="Main navigation">
      <a href="/pest-control-las-vegas/">Residential</a>
      <a href="/commercial-pest-control-las-vegas/">Commercial</a>
      <a href="/emergency-pest-control-las-vegas/">Emergency</a>
      <a href="/about/">About</a>
      <a href="/contact/">Contact</a>
      <a href="/free-estimate/" class="nav-cta">Free Estimate</a>
    </nav>
  </div>
</header>
```

The current page link gets `aria-current="page"`.

### Logo markup — uniform (after Issue 5 normalization in the site-audit batch)
```html
<a href="/" class="logo-placeholder" aria-label="Pest Control Inc — Home">PCI Logo</a>
```
All 17 files now use this pattern.

### Desktop CTA
```html
<a href="/free-estimate/" class="nav-cta">Free Estimate</a>
```
Some service pages append a query param to the href (`?type=ant`, `?type=commercial`, etc.) — link text is always `Free Estimate`.

### Mobile menu overlay
```html
<div id="mobile-nav" class="mobile-nav-overlay" aria-hidden="true" aria-label="Mobile navigation">
  <div class="mobile-nav-inner">
    <button class="mobile-nav-close" onclick="closeMobileNav()" aria-label="Close navigation menu">✕</button>
    <nav class="mobile-nav-links" aria-label="Mobile navigation">
      <a href="/pest-control-las-vegas/" onclick="closeMobileNav()">Residential</a>
      <a href="/commercial-pest-control-las-vegas/" onclick="closeMobileNav()">Commercial</a>
      <a href="/emergency-pest-control-las-vegas/" onclick="closeMobileNav()">Emergency</a>
      <a href="/about/" onclick="closeMobileNav()">About</a>
      <a href="/contact/" onclick="closeMobileNav()">Contact</a>
    </nav>
    <a href="/free-estimate/" class="mobile-nav-cta">Free Estimate →</a>
    <a href="tel:+17022284394" class="mobile-nav-phone">📞 (702) 228-4394</a>
  </div>
</div>
```

---

## E. Hero Section

### Two-column hero (content + form card) — canonical hub pattern
```html
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-content">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol itemscope itemtype="https://schema.org/BreadcrumbList">
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <a href="/" itemprop="item"><span itemprop="name">Home</span></a>
            <meta itemprop="position" content="1">
          </li>
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <span itemprop="name">Current Page</span>
            <meta itemprop="position" content="2">
          </li>
        </ol>
      </nav>
      <span class="hero-eyebrow">Las Vegas, NV · License #4632 · 3-Generation Family Company</span>
      <h1>[Page H1]</h1>
      <p class="hero-sub">[Short tagline]</p>
      <p class="hero-intro [page]-speakable">[Full intro paragraph with phone link]</p>
      <div class="hero-ctas">
        <a href="/free-estimate/" class="btn-primary">Get Free Estimate →</a>
        <a href="tel:+17022284394" class="btn-secondary">📞 (702) 228-4394</a>
        <a href="/specials/" class="btn-outline">View Special Offer</a>
      </div>
      <div class="hero-trust" role="list" aria-label="Trust signals">
        <span class="hero-trust-item" role="listitem">⭐ 5.0 Stars · Google</span>
        <span class="hero-trust-item" role="listitem">🛡️ Licensed #4632</span>
        <span class="hero-trust-item" role="listitem">🏆 NPMA Member</span>
        <span class="hero-trust-item" role="listitem">🐾 Pet Safe IPM</span>
        <span class="hero-trust-item" role="listitem">🔄 Money-Back Guarantee</span>
      </div>
    </div>
    <aside class="hero-card" aria-label="Free estimate quick form">
      <h2 class="hero-card-title">Get Your Free Estimate</h2>
      <p class="hero-card-sub">Tell us your pest problem. We call back in <strong>30 minutes or less.</strong></p>
      <form action="/free-estimate/" method="post" novalidate>
        <div class="form-group">
          <input type="text" name="name" placeholder="Your Name *" required autocomplete="name">
        </div>
        <div class="form-group">
          <input type="tel" name="phone" placeholder="Phone Number *" required autocomplete="tel" inputmode="tel">
        </div>
        <div class="form-group">
          <select name="service">
            <option value="">What pest problem? (optional)</option>
            <option value="scorpions">Scorpions</option>
            ... (9 options total)
          </select>
        </div>
        <button type="submit" class="form-submit">Get My Free Estimate</button>
      </form>
      <p class="hero-card-foot">*Business hours. Emergency? Call <a href="tel:+17022284394">(702) 228-4394</a> 24/7.</p>
    </aside>
  </div>
</section>
```

### Hero background treatment
Hero uses `background:var(--navy)` plus two radial-gradient `::before` and `::after` pseudo-elements for atmospheric depth and a dotted-grid overlay.

### Hero CTA variants
- **Hub / service pages (primary pattern):** include the `<div class="hero-ctas">` button cluster (3 buttons) between `.hero-intro` and `.hero-trust`.
- **About / trust pages:** omit the button cluster — the form aside provides the conversion path.

### Form
Inline form in hero, posts to `/free-estimate/`. No client-side validation (`novalidate`). No form handler endpoint configured — this is a known launch blocker.

---

## F. Trust Bar

```html
<section class="trust-bar" aria-label="Trust credentials">
  <div class="container trust-bar-inner">
    <div class="trust-item"><span class="trust-icon">⭐</span><div><div class="trust-value"><span class="gold">5.0 Stars</span></div><div class="trust-label">Google Rated</div></div></div>
    <div class="trust-item"><span class="trust-icon">👨‍👩‍👧‍👦</span><div><div class="trust-value">3 Generations</div><div class="trust-label">Family Owned &amp; Operated</div></div></div>
    <div class="trust-item"><span class="trust-icon">🛡️</span><div><div class="trust-value">Licensed #4632</div><div class="trust-label">Nevada Certified</div></div></div>
    <div class="trust-item"><span class="trust-icon">🔍</span><div><div class="trust-value">Background Checked</div><div class="trust-label">Drug Tested Technicians</div></div></div>
    <div class="trust-item"><span class="trust-icon">🐾</span><div><div class="trust-value">Family &amp; Pet Safe</div><div class="trust-label">Eco-Friendly IPM</div></div></div>
    <div class="trust-item"><span class="trust-icon">⚡</span><div><div class="trust-value">24/7 Emergency</div><div class="trust-label">Same-Day Available</div></div></div>
    <div class="trust-item"><span class="trust-icon">🔄</span><div><div class="trust-value">Money-Back</div><div class="trust-label">Satisfaction Guaranteed</div></div></div>
    <div class="trust-item"><span class="trust-icon">🎟️</span><div><div class="trust-value">Free 1st Service</div><div class="trust-label">New Customers w/ Annual Plan</div></div></div>
  </div>
</section>
```

8 trust items. Star rating uses `.gold` class (`#FFD580` warm gold) on blue background per brand rule.

---

## G. Section Patterns

### Generic section structure
```html
<section class="[purpose]-section">
  <div class="container">
    <p class="last-reviewed">Last reviewed: May 18, 2026 · Updated as needed</p>  <!-- on section 03 only -->
    <span class="section-eyebrow">[Eyebrow Text]</span>
    <h2 class="section-title">[Section H2]</h2>
    <p class="section-desc">[Lead description]</p>
    <div class="[content-grid]">
      <!-- cards / content -->
    </div>
  </div>
</section>
```

### Eyebrow markup
```css
.section-eyebrow{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:700;letter-spacing:.2em;
  text-transform:uppercase;color:var(--blue);
  margin-bottom:14px;
  display:flex;align-items:center;gap:10px;
}
.section-eyebrow::before{
  content:'';width:32px;height:2px;
  background:var(--blue);display:block;
}
```
On navy/dark sections: `color:rgba(168,196,232,.9)` + matching `::before` background.

### Section title (H2)
```css
.section-title{
  font-family:'DM Serif Display',serif;
  font-size:clamp(30px,3.6vw,46px);
  font-weight:400;letter-spacing:-.015em;line-height:1.15;
  color:var(--navy);margin-bottom:18px;
}
```

### Generic card patterns (variants — all share core structure)
- `.fact-card` — 4-col grid, top blue accent bar (`::before`), emoji icon, h3, p
- `.credential-card` — 2-col grid, left blue accent bar (`border-left:4px solid var(--blue)`), icon + body
- `.guarantee-card` — 3-col grid, top blue accent bar, centered icon, h3, p
- `.step-card` — Process step card with numbered circle, h4, p

All cards use:
```css
background:var(--pure);
border-radius:14px;
box-shadow:0 2px 12px rgba(29,36,48,.07);
transition:transform .2s, box-shadow .2s;
```
Hover: `transform:translateY(-3px); box-shadow:0 12px 36px rgba(29,36,48,.1)`

### Grid patterns
- `.fact-grid` — `repeat(4,1fr)` → `repeat(2,1fr)` ≤1024px → `1fr` ≤768px
- `.cred-grid` — `repeat(2,1fr)` → `1fr` ≤1024px
- `.guar-grid` — `repeat(3,1fr)` → `1fr` ≤1024px
- `.ipm-steps` — `repeat(4,1fr)` → `repeat(2,1fr)` ≤1024px → `1fr` ≤768px

### Last-reviewed
On all 17 pages, `<p class="last-reviewed">Last reviewed: May 18, 2026 · Updated as needed</p>` placed as first child of section 03's `.container`, before the eyebrow. CSS is `position:absolute;top:24px;right:24px` (desktop) — visually a top-right corner stamp.

---

### Service-page section patterns (from residential hub — `pest-control-las-vegas/index.html`)

These section types appear on service hub pages and should be replicated for new service, hub, location, and species pillar pages.

#### Property type grid — for hub pages that fan out into property-type sub-pages
```html
<section class="intro-section">
  <div class="container">
    <p class="last-reviewed">Last reviewed: May 18, 2026 · Updated as needed</p>
    <div class="intro-grid">
      <div class="intro-text">
        <span class="section-eyebrow">[Eyebrow]</span>
        <h2 class="section-title">[H2]</h2>
        <p>[Intro paragraphs]</p>
        <p class="transparency-speakable">[Speakable paragraph]</p>
      </div>
      <div class="property-grid">
        <article class="property-card">
          <div class="property-card-icon" aria-hidden="true">🏠</div>
          <h3>[Property Type]</h3>
          <p>[Description]</p>
          <a href="[route]" class="property-card-link">[Link text]</a>
        </article>
        <!-- ...4 property-card articles total... -->
      </div>
    </div>
  </div>
</section>
```
Grid: `.property-grid` displays 4 cards (`.property-card`) — single-family, apartments, condos, HOA on the residential hub. Adapt for other hub types.

#### Zone coverage grid — for whole-property service explanation
```html
<section class="zone-section">
  <div class="container">
    <div class="zone-intro">
      <span class="section-eyebrow">[Eyebrow]</span>
      <h2 class="section-title">[H2]</h2>
      <p class="section-desc zone-intro-speakable">[Lead description]</p>
    </div>
    <div class="zone-grid">
      <article class="zone-item">
        <span class="zone-icon" aria-hidden="true">🍳</span>
        <h3>[Zone Name]</h3>
        <p>[Treatment description for this zone]</p>
      </article>
      <!-- ...up to 12 zone-item articles... -->
    </div>
    <div class="zone-cta-wrap">
      <a href="/free-estimate/" class="btn-secondary">[CTA]</a>
    </div>
  </div>
</section>
```
Used on hub to show "every zone of your home" treatment coverage. Hub has 12 zones (kitchen, bathroom, attic, garage, backyard, foundation, perimeter, windows/doors, roofline, kids' rooms, sheds, basement). Responsive: `repeat(3,1fr)` → `repeat(2,1fr)` → `1fr`.

#### Pests-on-this-page grid — common species at a glance with threat badges (dark section)
```html
<section class="pests-section dark-section">
  <div class="container">
    <span class="section-eyebrow">[Eyebrow]</span>
    <h2 class="section-title">[H2]</h2>
    <p class="section-desc pests-intro-speakable">[Lead description]</p>
    <div class="pests-grid">
      <article class="pest-card">
        <div class="pest-card-head">
          <span class="pest-icon" aria-hidden="true">🦂</span>
          <span class="pest-threat">⚠️ Venomous</span>
        </div>
        <h3>Scorpions</h3>
        <p>[Pest description with authoritative source link via <a target="_blank" rel="noopener noreferrer">]</p>
        <a href="/scorpion-exterminator-las-vegas/" class="pest-link">[Internal link to species page]</a>
      </article>
      <!-- ...8 pest-card articles... -->
    </div>
    <p class="pests-note">[Optional note + link to /pest-identification/]</p>
  </div>
</section>
```
Navy background (`dark-section` modifier on `.section-eyebrow` and `.section-title`). Each card has a head row with pest icon + threat-level badge. Internal link to species page at bottom.

#### IPM pillars grid — Health Conscious Service Program detail
```html
<section class="ipm-section">
  <div class="container">
    <span class="section-eyebrow">[Eyebrow]</span>
    <h2 class="section-title">[H2]</h2>
    <p class="section-desc">[Lead description]</p>
    <div class="ipm-pillars">
      <article class="ipm-pillar">
        <div class="ipm-pillar-icon" aria-hidden="true">🐾</div>
        <h3>[Pillar Name — Pet Safe, Family Safe, Eco-Friendly, IPM, etc.]</h3>
        <p>[Pillar description]</p>
      </article>
      <!-- ...4 ipm-pillar articles... -->
    </div>
  </div>
</section>
```
4 pillars: Pet Safe, Family Safe, Eco-Friendly, IPM Methodology. Use on any page that explains the Health Conscious Service Program.

---

### Trust/narrative section patterns (from about/index.html)

These appear on About/Trust pages and should be used for the About cluster. They can also be borrowed individually onto service pages where narrative context strengthens the page.

#### Story section — narrative with pull-quote aside
```html
<section class="story-section">
  <div class="container">
    <p class="last-reviewed">Last reviewed: May 18, 2026 · Updated as needed</p>
    <div class="story-grid">
      <div class="story-text">
        <span class="section-eyebrow">[Eyebrow]</span>
        <h2 class="section-title">[H2]</h2>
        <p class="story-speakable">[Lead paragraph]</p>
        <p>[Body paragraphs]</p>
      </div>
      <aside class="story-aside">
        <div class="story-img-placeholder" role="img" aria-label="[Alt text]">[Placeholder text]<br>(4:3 aspect ratio)</div>
        <div class="pull-quote">
          <p>"[Quote text]"</p>
          <cite>— Pest Control Inc · Las Vegas, NV</cite>
        </div>
      </aside>
    </div>
  </div>
</section>
```
Tan-light background. 2-col grid collapsing to 1-col ≤1024px.

#### Who-we-are fact grid — 4 fact cards
```html
<section class="who-section">
  <div class="container">
    <div class="who-intro">
      <span class="section-eyebrow">[Eyebrow]</span>
      <h2 class="section-title">[H2]</h2>
      <p class="section-desc">[Description]</p>
    </div>
    <div class="fact-grid">
      <article class="fact-card">
        <div class="fact-card-icon" aria-hidden="true">[Emoji]</div>
        <h3>[Fact Title]</h3>
        <p>[Fact description]</p>
      </article>
      <!-- ...4 fact-card articles... -->
    </div>
  </div>
</section>
```

#### Team section + standards-list
```html
<section class="team-section">
  <div class="container">
    <div class="team-grid">
      <div class="team-content">
        <span class="section-eyebrow">[Eyebrow]</span>
        <h2 class="section-title">[H2]</h2>
        <p>[Intro]</p>
        <h3>Our Hiring Standards</h3>
        <p>[Lead]</p>
        <ul class="standards-list">
          <li><strong>[Standard Name]</strong>[Description]</li>
          <!-- ...5 standards... -->
        </ul>
      </div>
      <aside class="team-aside">
        <div class="team-img-placeholder">[Team Photo Placeholder]</div>
        <div class="team-stats">
          <div class="team-stat"><div class="team-stat-num">[Number]</div><div class="team-stat-lbl">[Label]</div></div>
          <!-- ...4 team-stat divs... -->
        </div>
      </aside>
    </div>
  </div>
</section>
```
Aside is sticky on desktop. `.standards-list` items use blue checkmark circles (`::before` content `'✓'`).

#### IPM 4-step process — numbered circles with connector line
```html
<section class="ipm-section">
  <div class="container">
    <div class="ipm-inner">
      <span class="section-eyebrow">[Eyebrow]</span>
      <h2 class="section-title">[H2]</h2>
      <p class="section-desc">[Description]</p>
      <div class="ipm-steps">
        <div class="step-card">
          <div class="step-num">1</div>
          <h4>Inspect</h4>
          <p>[Description]</p>
        </div>
        <!-- ...4 step-card divs total — last gets .step-num.last (tan color)... -->
      </div>
      <div class="callout">
        <h4>[Callout Title]</h4>
        <p>[Callout body]</p>
      </div>
    </div>
  </div>
</section>
```
Navy `.ipm-section`. `.ipm-steps::before` draws a horizontal gradient connector line behind the numbered circles. Last step uses tan color to mark completion.

#### Credentials cards — 2-col with blue left border + icon
```html
<section class="cred-section">
  <div class="container">
    <div class="cred-intro">
      <span class="section-eyebrow">[Eyebrow]</span>
      <h2 class="section-title">[H2]</h2>
      <p class="section-desc">[Description]</p>
    </div>
    <div class="cred-grid">
      <article class="credential-card">
        <div class="credential-icon">[Emoji]</div>
        <div class="credential-body">
          <h3>[Credential Title]</h3>
          <p>[Description]</p>
        </div>
      </article>
      <!-- ...credential cards... -->
    </div>
  </div>
</section>
```
Tan-light background. 2-col grid → 1-col ≤1024px.

#### Guarantee 3-card grid
```html
<section class="guar-section">
  <div class="container">
    <div class="guar-intro">
      <span class="section-eyebrow">[Eyebrow]</span>
      <h2 class="section-title">[H2]</h2>
      <p class="section-desc">[Description]</p>
    </div>
    <div class="guar-grid">
      <article class="guarantee-card">
        <div class="icon">[Emoji]</div>
        <h3>[Card Title]</h3>
        <p>[Card description]</p>
      </article>
      <!-- ...3 guarantee-card articles... -->
    </div>
  </div>
</section>
```
White background. 3-col → 1-col ≤1024px. Each card has top blue accent bar via `::before`.

#### Service area chips
```html
<section class="area-section">
  <div class="container">
    <div class="area-intro">
      <span class="section-eyebrow">[Eyebrow]</span>
      <h2 class="section-title">[H2]</h2>
      <p class="section-desc service-area-speakable">[Description]</p>
    </div>
    <div class="area-grid">
      <a href="/pest-control-las-vegas/" class="area-chip tier1">Las Vegas</a>
      <a href="/pest-control-henderson-nv/" class="area-chip tier1">Henderson</a>
      <!-- ...16+ area-chip links... -->
    </div>
    <a href="/las-vegas-valley/" class="area-note">Serving all 97 Las Vegas Valley communities →</a>
  </div>
</section>
```
Tan-light background. Chips are pill-shaped (`border-radius:999px`). `.tier1` chips are filled blue; standard chips are blue-outlined.

#### Offer reminder strip (used inside final-cta)
```html
<p class="offer-reminder">🎟️ <span><strong>New residential customers</strong> — first service FREE with a 12-month annual agreement. Excludes pigeons, bed bugs, bees, and rodents. · <a href="/specials/">See offer details →</a></span></p>
```
Orange-tinted background, soft border. Appears below the final CTA buttons.

---

## H. FAQ Section

### Two-column layout
```html
<section class="faq-section">
  <div class="container">
    <div class="faq-grid">
      <div class="faq-left">  <!-- sticky on desktop -->
        <span class="section-eyebrow">Pest Control Inc Las Vegas</span>
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-desc">[Intro]</p>
        <a href="/free-estimate/" class="btn-secondary">Request Free Estimate →</a>
      </div>
      <div class="faq-right">
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-q" aria-expanded="false" onclick="toggleFaq(this)">
              [Question]<span class="faq-q-arrow" aria-hidden="true">+</span>
            </button>
            <div class="faq-answer">
              <div class="faq-answer-inner">[Answer]</div>
            </div>
          </div>
          <!-- ... more faq-items ... -->
        </div>
        <div class="faq-cta-block">
          <p>Still have questions? We'll call you back in 30 minutes.</p>
          <div class="btns">
            <a href="tel:+17022284394" class="btn-primary">📞 Call (702) 228-4394</a>
            <a href="/free-estimate/" class="text-link">Request Free Estimate →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### FAQ accordion JS (uniform, all 17 files)
```javascript
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(b => {
    b.setAttribute('aria-expanded','false');
    const a = b.querySelector('.faq-q-arrow');
    if (a) a.textContent = '+';
    b.closest('.faq-item').classList.remove('active');
  });
  if (!isOpen) {
    answer.classList.add('open');
    btn.setAttribute('aria-expanded','true');
    const arrow = btn.querySelector('.faq-q-arrow');
    if (arrow) arrow.textContent = '−';
    btn.closest('.faq-item').classList.add('active');
  }
}
```
Accordion is single-select (opening one closes others). Arrow toggles `+` ↔ `−`.

### FAQPage JSON-LD — present on all 17 files
Example (about page, 15 Q&As):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://pestcontrolinc.net/about/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Pest Control Inc?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pest Control Inc — also known as PCI — is a 3-generation family-owned and operated pest control company..."
      }
    }
  ]
}
```
**Critical:** FAQ schema answers must match visible FAQ answer text exactly. They do today.

---

## I. Reviews Section

### Static review header markup
```html
<section class="reviews-section">
  <div class="container">
    <div class="reviews-header">
      <div class="reviews-header-left">
        <span class="section-eyebrow">Pest Control Inc Reviews</span>
        <h2 class="section-title">[Reviews H2]</h2>
        <p class="section-desc">[Description]</p>
      </div>
      <div class="score-ring">
        <div class="score-num">5.0</div>
        <span class="score-den">out of 5</span>
        <div class="score-stars">★★★★★</div>
        <p class="score-meta">30 Google Reviews</p>
        <a href="..." class="score-link">Read on Google →</a>
      </div>
    </div>

    <div class="platform-scores" role="list">
      <div class="platform-score" role="listitem">
        <span class="platform-stars">★★★★★</span>
        <span class="platform-name">Google</span>
        <span class="platform-count">5.0 · 30 Reviews</span>
      </div>
      <div class="platform-score">...Yelp 5.0 · 14 Reviews...</div>
      <div class="platform-score">...Facebook 4.8 · 11 Reviews...</div>
      <div class="platform-score">...Angi 5.0 · 10 Reviews...</div>
    </div>

    <div class="review-widget-container">
      <iframe
        class="lc_reviews_widget"
        src="https://reputationhub.site/reputation/widgets/review_widget/XmTsrsLJDMVSiADHUA3q"
        frameborder="0" scrolling="no"
        style="min-width:100%;width:100%;min-height:400px;"
        title="Pest Control Inc customer reviews — Las Vegas, NV"
        loading="lazy">
      </iframe>
    </div>

    <div class="reviews-cta">
      <a href="/reviews/" class="btn-secondary">Read All Pest Control Inc Reviews →</a>
    </div>
  </div>
</section>
```

### Two ReputationHub integration patterns observed
- **Iframe pattern (3 files):** `pest-control-las-vegas/`, `commercial-pest-control-las-vegas/`, `about/` — uses `<iframe class="lc_reviews_widget" src="...">` directly
- **Div pattern (10 files):** `<div class="reputationhub-widget" data-widget-id="XmTsrsLJDMVSiADHUA3q">` — relies on the script to inject the iframe

Both patterns include this script at end of body:
```html
<script type="text/javascript" src="https://reputationhub.site/reputation/assets/review-widget.js" defer></script>
```

---

## J. Final CTA Section

```html
<section class="final-cta">
  <div class="container final-cta-inner">
    <span class="section-eyebrow">Pest Control Inc · Las Vegas, NV</span>
    <h2 class="section-title">[CTA headline]</h2>
    <p class="final-cta-body">[CTA paragraph with bold key points]</p>
    <div class="final-cta-btns">
      <a href="/free-estimate/" class="btn-primary">Get Your Free Estimate →</a>
      <a href="tel:+17022284394" class="btn-secondary">📞 Call (702) 228-4394</a>
    </div>
    <p class="offer-reminder">🎟️ <span><strong>New residential customers</strong> — first service FREE with a 12-month annual agreement. Excludes pigeons, bed bugs, bees, and rodents. · <a href="/specials/">See offer details →</a></span></p>
  </div>
</section>
```
Navy background, radial gradient overlay. Centered content. Final offer-reminder strip below buttons.

---

## K. Footer

### Structure
```html
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Column 1: NAP -->
      <div class="footer-col">
        <div class="footer-logo" role="img" aria-label="Pest Control Inc Logo">PCI LOGO</div>
        <div class="footer-nap" itemscope itemtype="https://schema.org/LocalBusiness">
          <p itemprop="name">Pest Control Inc</p>
          <p itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
            <span itemprop="streetAddress">3642 N Rancho Dr Suite #102</span><br>
            <span itemprop="addressLocality">Las Vegas</span>, <span itemprop="addressRegion">NV</span> <span itemprop="postalCode">89130</span>
          </p>
          <p><a href="tel:+17022284394" class="footer-phone" itemprop="telephone">(702) 228-4394</a></p>
          <p><a href="mailto:info@pestcontrolinc.net" itemprop="email">info@pestcontrolinc.net</a></p>
          <p>Mon–Fri 8am–4pm · Sat 8am–2pm<br>Sun Closed · Emergency: 24/7</p>
          <p class="footer-license">NV License #4632 · NPMA Member · 3-Generation Family-Owned</p>
        </div>
      </div>

      <!-- Column 2: Pest Control Services links -->
      <div class="footer-col">
        <h4>Pest Control Services</h4>
        <ul>...8 species links...</ul>
      </div>

      <!-- Column 3: Service Areas links -->
      <div class="footer-col">
        <h4>Service Areas</h4>
        <ul>...8 area links...</ul>
      </div>

      <!-- Column 4: Company links -->
      <div class="footer-col">
        <h4>Company</h4>
        <ul>...10 company links...</ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-text">
        © <span id="yr"></span> Pest Control Inc · Las Vegas, NV · License #4632 ·
        <a href="/privacy-policy/">Privacy Policy</a> · <a href="/terms-of-use/">Terms of Use</a>
      </div>
      <div class="footer-trust-marks">
        <div class="trust-mark">NPMA Member</div>
        <div class="trust-mark">Nevada Licensed #4632</div>
        <div class="trust-mark">3-Generation Family Business</div>
      </div>
    </div>
  </div>
</footer>
```

### Mobile sticky CTA bar
```html
<div class="mobile-cta">
  <a href="tel:+17022284394" class="btn-primary" style="font-size:15px;padding:14px;flex:1;text-align:center;justify-content:center;">📞 Call Now</a>
  <a href="/free-estimate/" class="btn-secondary" style="font-size:15px;padding:14px;flex:1;text-align:center;justify-content:center;">Free Estimate</a>
</div>
```
Fixed bottom on mobile only (`display:none` desktop; `display:flex` ≤768px). Navy bg, orange top border.

---

## L. Schema

### Schema @type values observed across all 17 files
- `LocalBusiness` (all 17)
- `BreadcrumbList` (all 17)
- `FAQPage` (all 17)
- `WebPage` / `AboutPage` / `Service` / `ContactPage` (varies by page intent)
- `Organization` (about, mission)
- `HowTo` (homepage, about, several service pages)
- `Offer` (most pages — Free First Service)
- `AggregateRating` (embedded in LocalBusiness)
- `SpeakableSpecification` (most pages)
- `OpeningHoursSpecification`, `PostalAddress`, `EducationalOccupationalCredential` (embedded)

### LocalBusiness — canonical version
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://pestcontrolinc.net/#business",
  "name": "Pest Control Inc",
  "alternateName": ["PCI", "PCI Pest Control"],
  "slogan": "Three Generations of Family Pest Control in Las Vegas",
  "description": "Pest Control Inc is a 3-generation family-owned pest control company serving Las Vegas and Clark County, Nevada...",
  "url": "https://pestcontrolinc.net/",
  "telephone": "+17022284394",
  "email": "info@pestcontrolinc.net",
  "priceRange": "$$",
  "image": "https://pestcontrolinc.net/images/about-pci-las-vegas-team.jpg",
  "logo": {
    "@type": "ImageObject",
    "url": "https://pestcontrolinc.net/images/pci-logo.png",
    "width": 300, "height": 130
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3642 N Rancho Dr, Suite #102",
    "addressLocality": "Las Vegas",
    "addressRegion": "NV",
    "postalCode": "89130",
    "addressCountry": "US"
  },
  "openingHoursSpecification": [
    {"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"08:00","closes":"16:00"},
    {"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"08:00","closes":"14:00"}
  ],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Professional License",
    "name": "Nevada Department of Agriculture Pest Control License #4632",
    "recognizedBy": {"@type":"Organization","name":"Nevada Department of Agriculture","url":"https://agri.nv.gov/"}
  },
  "memberOf": {
    "@type": "Organization",
    "name": "National Pest Management Association",
    "url": "https://www.npmapestworld.org/"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "30",
    "bestRating": "5",
    "worstRating": "1",
    "description": "5.0 stars across 30 Google reviews for Pest Control Inc in Las Vegas, NV"
  },
  "sameAs": [
    "https://www.yelp.com/biz/pest-control-inc-las-vegas-4",
    "https://www.facebook.com/pcilv/",
    "https://www.angi.com/companylist/us/nv/las-vegas/pest-control-inc-reviews-303580.htm",
    "https://www.npmapestworld.org/"
  ]
}
```

### BreadcrumbList — canonical version
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"Home","item":"https://pestcontrolinc.net/"},
    {"@type":"ListItem","position":2,"name":"Current Page","item":"https://pestcontrolinc.net/[route]/"}
  ]
}
```
On nested pages (e.g., commercial sub-pages), position 3 is added for the parent hub.

### FAQPage — canonical structure
See section H above. About page has 15 Q&As; other pages have 5–15 depending on intent.

---

## M. JavaScript

### Where JS lives
Inline `<script>` block placed immediately after `<footer>` and `<div class="mobile-cta">`. One inline block per page. Plus the external ReputationHub script tag at the very end of body.

### What inline JS does (uniform across all 17 files)
1. Dynamic copyright year: `document.getElementById('yr').textContent = new Date().getFullYear();`
2. **FAQ accordion** — `toggleFaq(btn)` (see section H for full code)
3. **Mobile nav** — `openMobileNav()`, `closeMobileNav()`, hamburger click listener, ESC key listener, click-outside-to-close listener
4. **Scroll animations** — IntersectionObserver applied to selected cards (`.fact-card`, `.credential-card`, `.guarantee-card`, `.step-card`, `.faq-item`, `.platform-score`, `.area-chip`, `.trust-item`, `.team-stat` — varies per page). Adds `.anim-ready` class initially, then `.anim-visible` on intersection. Stagger delay via `data-anim-delay`.
5. **Phone pulse animation** — keyframe animation injected via `createElement('style')` to make `.top-bar-phone` opacity-pulse

### Mobile nav functions (uniform)
```javascript
function openMobileNav() {
  const btn = document.getElementById('hamburger-btn');
  const overlay = document.getElementById('mobile-nav');
  btn.classList.add('open');
  btn.setAttribute('aria-expanded','true');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  const btn = document.getElementById('hamburger-btn');
  const overlay = document.getElementById('mobile-nav');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded','false');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
document.getElementById('hamburger-btn').addEventListener('click', function() {
  this.classList.contains('open') ? closeMobileNav() : openMobileNav();
});
document.getElementById('mobile-nav').addEventListener('click', function(e) {
  if (e.target === this) closeMobileNav();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMobileNav();
});
```

---

## N. Metadata Patterns

### Title tag format
- **Pattern:** `[Page Topic] | [Suffix]`
- **Examples:**
  - Homepage: `Pest Control Inc | Las Vegas Pest Control & 24/7 Exterminators`
  - About: `About Pest Control Inc | Las Vegas Family Pest Control`
  - Hub: `[Service] Las Vegas | Pest Control Inc | Licensed #4632`
- Always under 60 characters where possible.

### Meta description
- 140–160 characters
- Always contains the phone `(702) 228-4394`
- Usually contains `License #4632` and a key entity phrase (`3-generation family-owned`, `NPMA member`, `eco-friendly IPM`)

### Canonical
- Always on line 9: `<link rel="canonical" href="https://pestcontrolinc.net/[route]/">`
- All routes are trailing-slash with full https://pestcontrolinc.net/ host.

### OG image path format
- `https://pestcontrolinc.net/images/[descriptive-slug].jpg`
- Examples: `about-pci-las-vegas-team.jpg`, `commercial-pest-control-las-vegas-hero.jpg`, `eco-friendly-pest-control-las-vegas-hero.jpg`, `ant-exterminator-las-vegas.jpg`
- **Exception:** homepage uses `og-homepage.jpg` (different naming convention)

### `hreflang` and locale
- Every page declares `<link rel="alternate" hreflang="en-us">` to itself
- `<meta property="og:locale" content="en_US">`

---

## Step 3 — Recommended Reference Pages

### Primary reference: `pest-control-las-vegas/index.html` (residential hub)

Why:
- **Most representative of high-value page templates** new operators will be building. Site OS Master's Phase 2 (parent authority pages), Phase 3 (city hubs), Phase 5 (species pillars), Phase 7 (service+city matrix) all map to "hub or service page" patterns this file demonstrates.
- **Service pages are the dominant page type in the build.** New developers building species pages, location pages, and matrix pages will pattern-match against a service page more naturally than an about page.
- **Demonstrates the canonical 3-button hero CTA cluster** (primary / secondary / outline) plus the form aside — a fuller hero pattern than about/index.html's form-only hero.
- **Demonstrates four hub-specific grid patterns** (property-grid, zone-grid, pests-grid with threat badges, ipm-pillars) that don't exist on about/index.html.
- **Standardized top bar, logo, mobile CTA, last-reviewed, skip link** — all current after the site-audit batch.

Use as the structural template when scaffolding any new service, hub, city, or species pillar page.

### Secondary reference: `about/index.html` (trust/narrative section patterns)

Use when a page needs trust/narrative sections that the hub doesn't have:
- Company story (`.story-section` with pull-quote)
- Team standards (`.team-section` with `.standards-list`)
- 4-step IPM process (`.ipm-steps` with numbered circles)
- Credentials cards (`.credential-card`)
- Guarantee cards (`.guarantee-card`)
- Service area chips (`.area-chip`)

The About cluster (`/about/`, `/about/mission/`, `/about/health-conscious-service-program/`, `/about/guarantee/`) should follow about/index.html's section pattern. Service and location pages should follow the hub's pattern, optionally borrowing individual narrative sections from about/.

---

## Step 4 — Anomalies and Deviations

### 1. `index.html` (homepage) — multiple minor deviations
- **Two Google Fonts link tags** (lines 24, 25) — splits Barlow Condensed + Barlow from DM Serif Display. All other 16 files use one combined link. *Cosmetic; no functional difference.*
- **Different OG image naming** (`og-homepage.jpg`) — all others use descriptive slugs. *Minor; correct it for new pages.*
- **Fewer JSON-LD blocks** (3 inline blocks vs 7 on about/index.html). The homepage is heavier on inline schema fragments. *Acceptable variation.*
- **`section-eyebrow` is a `<div>`, not a `<span>`** in section 03 — and section 03's eyebrow is nested inside `.services-intro > div` rather than being a direct child of `.container`. *Section structure is unique to homepage.*
- **Recommendation:** for new pages, follow the residential hub, not homepage.

### 2. `ant-exterminator-las-vegas/index.html`, `commercial-*/landlord-pest-control-responsibilities/index.html` — CSS variable naming
- Use `font-family:var(--font-ui)` and `var(--font-body)` style variables instead of literal `'Barlow Condensed',sans-serif` strings.
- *Functionally identical, but readers grepping for font names won't find them.* No need to change retroactively; consider standardizing for new pages.

### 3. ReputationHub widget — two integration patterns coexist
- **Iframe direct pattern** (3 files): `about/`, `pest-control-las-vegas/`, `commercial-pest-control-las-vegas/`
- **Div+script pattern** (10 files): all others using `<div class="reputationhub-widget" data-widget-id="...">`
- **Script-only pattern** (2 files: emergency, apartments): just the script tag at end of body with no container element near the reviews section
- *All three render the same widget visually. The iframe pattern is more explicit and recommended for new pages.*

### 4. `commercial-*/pest-impact-on-business/`, `commercial-*/hoa/` — section 03 comment style
- Use `<!-- ============================================================ -->` separator comments around `<!-- SECTION 03 ... -->`.
- Other commercial sub-pages use a simpler single-line comment.
- *Cosmetic — no behavioral impact. Don't propagate; use single-line comments on new pages.*

### 5. `commercial-*/hoa/`, `commercial-*/retail/`, `commercial-*/pest-impact-on-business/` — formerly used legacy Pattern B logo
- These three previously used a nested `<a><div class="logo-placeholder">PCI LOGO</div></a>` markup. They were normalized to Pattern A (single anchor with class) during the site-audit batch.
- **Current state: all 17 files now match.** No further action needed.

### 6. `apartments/index.html` — formerly used `<span class="last-reviewed">`
- Now normalized to `<p class="last-reviewed">` matching other pages. Current state matches.

### 7. Top bar text — all 17 now match approved variants
- 13 files: `24/7 Pest Emergency — Las Vegas & Clark County, NV`
- 4 files: `Mon–Fri 8am–4pm · Sat 8am–2pm · Emergency 24/7 — Las Vegas & Clark County, NV` (emergency, plans-and-pricing, apartments, eco-friendly)
- All license-tagline variants were removed during the site-audit batch.

### 8. Mobile nav CTA — all 17 now say `Free Estimate →`
- Service-specific labels ("Free Ant Inspection →", "Free Commercial Inspection →", etc.) were flattened during the site-audit batch.

### 9. Phone format — uniform across all files
- Display text: `(702) 228-4394` (94 instances replaced from bare hyphenated in the phone batch)
- `tel:` href: `tel:+17022284394` everywhere
- One exception (intentional, not PCI's number): `tel:+17024864480` for Nevada Housing Division in `apartments/index.html`

---

## Pre-launch deviations remaining

These are not "anomalies in the pattern" but launch-blockers / open items already on record:

- **No `/404.html`** — soft-404 catch-all serves homepage for any unmatched URL (tracked in `docs/site-os/qa/2026-05-18-soft-404-catch-all.md`).
- **No form handler endpoint** — hero forms post to `/free-estimate/` with no backend. The `/free-estimate/` page itself is not built.
- **Image placeholders** — many pages use `[PCI Family Photo Placeholder]` style placeholder divs where real photography should go.
- **GBP phone mismatch** — Google Business Profile shows `702-905-1355`, must be corrected to `702-228-4394` (in pre-launch checklist).

---

End of pattern reference.
