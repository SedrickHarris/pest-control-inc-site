# QA: /about/ + /eco-friendly/ Image Wiring

Date: 2026-05-28
Severity: Medium (visual/credibility quality; CLS once images load)
Status: Complete; one commit prepared; awaiting push approval
Scope: replace 4 placeholder divs with real responsive `<img>` elements on `about/index.html` and `pest-control-las-vegas/eco-friendly/index.html`; commit the 4 image assets; remove now-dead placeholder CSS.

---

## Phase A re-entry

- `git status`: clean apart from the two untracked image directories (`images/about/`, `images/ipm-diagrams/`) the user staged for this task.
- Implementation log tail: most recent entry is the blog neutralization (commit `8791a0e`, pushed). That entry leaves Batch B (5 city hubs) as the standing next batch; this image-wiring slid in ahead of it as a small high-value visual upgrade now that real assets exist.
- Latest QA: `qa/2026-05-28-blog-neutralize.md`.

---

## Step 0 — Inventory (read-only)

Four WebP files inventoried; dimensions read from VP8 header.

| File | Path | Dimensions | Aspect | Size |
|---|---|---|---|---|
| Three-generation family photo | `images/about/three-generation-family-pest-control-las-vegas.webp` | 1448 × 1086 | 4:3 landscape | 99 KB |
| Licensed technician photo | `images/about/licensed-pest-control-technician-las-vegas.webp` | 1086 × 1448 | 3:4 portrait | 81 KB |
| Four-pillars IPM diagram | `images/ipm-diagrams/ipm-four-pillars-health-conscious-pest-control-las-vegas.webp` | 1672 × 941 | ~16:9 | 191 KB |
| Targeted-vs-broadcast cabinet-treatment diagram | `images/ipm-diagrams/ipm-targeted-vs-broadcast-cabinet-treatment-las-vegas.webp` | 1672 × 941 | ~16:9 | 71 KB |

### Mapping (proposed before edit, all unambiguous after owner input)

| Slot | File chosen | Signal |
|---|---|---|
| `about/index.html` `.story-img-placeholder` (4:3 family) | `three-generation-family-pest-control-las-vegas.webp` | filename keywords (family, three-generation) AND aspect ratio (4:3) AND placeholder aria-label match — three converging signals |
| `about/index.html` `.team-img-placeholder` (3:4 technician) | `licensed-pest-control-technician-las-vegas.webp` | filename keywords (licensed, technician) AND aspect ratio (3:4) AND placeholder aria-label match — three converging signals |
| `eco-friendly` targeted-vs-broadcast `.diagram-placeholder` | `ipm-targeted-vs-broadcast-cabinet-treatment-las-vegas.webp` | confirmed by owner during this session: "ipm-targeted-vs-broadcast-cabinet-treatment-las-vega = ipm-targeted-vs-broadcast-diagram" |
| `eco-friendly` four-pillars `.diagram-placeholder` | `ipm-four-pillars-health-conscious-pest-control-las-vegas.webp` | filename keyword match (four-pillars) after owner clarified the renames |

### Owner-driven renames during the session

The user iteratively renamed the two IPM diagram files while the assistant was inventorying. Two assistant renames happened as well to reach the final clean state:

- assistant: `ChatGPT Image May 28, 2026, 09_04_00 PM.webp` → `ipm-targeted-vs-broadcast-pest-control-las-vegas.webp` (initial rename based on first reading of slot mapping)
- user: above renamed file → `ipm-four-pillars-health-conscious-pest-control-las-vegas.webp` (because the file is actually the four-pillars diagram)
- user: original `ipm-four-pillars-health-conscious-pest-control-las-vegas.webp` → `ipm-targeted-vs-broadcast-cabinet-treatment-las-vega.webp` (typo, missing trailing "s")
- assistant: above → `ipm-targeted-vs-broadcast-cabinet-treatment-las-vegas.webp` (typo fix; matches the convention used by every other image in the directory and the slot's data-img slug)

Net result: each file ended up correctly identified and named; the four placeholder slots map cleanly.

---

## Wiring (per slot)

All 4 `<img>` tags follow the same recipe: `src` = `/images/<dir>/<file>`, `alt` reuses the placeholder's existing aria-label verbatim (no new claims), explicit `width`/`height` attributes set to the real pixel dimensions, `loading="lazy"`, `decoding="async"`, inline `style` preserving the slot's border-radius and `display:block; width:100%; height:auto;` for responsive scaling and stable layout (no CLS once the image dimensions are reflected in the browser's intrinsic aspect-ratio calculation).

### Slot 1 — `about/index.html` story-img-placeholder

Before:
```html
<div class="story-img-placeholder" role="img" aria-label="Pest Control Inc Las Vegas, family owned pest control company three generations">PCI Family Photo Placeholder<br>(4:3 aspect ratio)</div>
```

After:
```html
<img src="/images/about/three-generation-family-pest-control-las-vegas.webp" alt="Pest Control Inc Las Vegas, family owned pest control company three generations" width="1448" height="1086" loading="lazy" decoding="async" style="width:100%;height:auto;display:block;border-radius:18px;">
```

### Slot 2 — `about/index.html` team-img-placeholder

Before:
```html
<div class="team-img-placeholder" role="img" aria-label="Pest Control Inc licensed technician Las Vegas NV, background checked drug tested state licensed">PCI Technician Photo Placeholder<br>(3:4 aspect ratio)</div>
```

After:
```html
<img src="/images/about/licensed-pest-control-technician-las-vegas.webp" alt="Pest Control Inc licensed technician Las Vegas NV, background checked drug tested state licensed" width="1086" height="1448" loading="lazy" decoding="async" style="width:100%;height:auto;display:block;border-radius:18px;">
```

### Slot 3 — `eco-friendly/index.html` targeted-vs-broadcast diagram

Before:
```html
<div class="diagram-placeholder" data-img="ipm-targeted-vs-broadcast-diagram.png" aria-label="IPM targeted gel bait application in cabinet hinge crevice versus conventional broadcast spray covering all cabinet surfaces, why targeted application is safer and more effective for cockroach elimination">
  <span>📊 ipm-targeted-vs-broadcast-diagram.png<br>IPM targeted gel bait in cabinet hinge crack vs. broadcast spray on all cabinet surfaces, why targeted application is both safer and more effective</span>
</div>
```

After:
```html
<img src="/images/ipm-diagrams/ipm-targeted-vs-broadcast-cabinet-treatment-las-vegas.webp" alt="IPM targeted gel bait application in cabinet hinge crevice versus conventional broadcast spray covering all cabinet surfaces, why targeted application is safer and more effective for cockroach elimination" width="1672" height="941" loading="lazy" decoding="async" style="width:100%;height:auto;display:block;border-radius:12px;margin:24px 0;">
```

(`data-img` attribute removed — no longer needed.)

### Slot 4 — `eco-friendly/index.html` four-pillars diagram

Before:
```html
<div class="diagram-placeholder" data-img="ipm-four-pillars-diagram.png" aria-label="Diagram of the four IPM pillars used in the Health Conscious Service Program, prevention and exclusion, monitoring and inspection, targeted treatment, and follow-up verification" style="background:rgba(168,196,232,.1);margin:30px 0;">
  <span style="color:var(--blue-accent);">📊 ipm-four-pillars-diagram.png<br>The four IPM pillars: Prevention &amp; Exclusion → Monitoring &amp; Inspection → Targeted Treatment → Follow-Up Verification</span>
</div>
```

After:
```html
<img src="/images/ipm-diagrams/ipm-four-pillars-health-conscious-pest-control-las-vegas.webp" alt="Diagram of the four IPM pillars used in the Health Conscious Service Program, prevention and exclusion, monitoring and inspection, targeted treatment, and follow-up verification" width="1672" height="941" loading="lazy" decoding="async" style="width:100%;height:auto;display:block;border-radius:12px;margin:30px 0;">
```

The placeholder's inline background tint (`background:rgba(168,196,232,.1)`) was placeholder-only chrome and is not carried over; the 30px top/bottom margin is preserved.

---

## Dead CSS removed (guarded)

Before deleting each rule, grepped the whole repo to confirm the class is used on no other page.

| Rule | Other use? | Action |
|---|---|---|
| `.story-img-placeholder` | only in `about/index.html` (now removed) + 2 doc/QA references | rule deleted from `about/index.html` |
| `.team-img-placeholder` | only in `about/index.html` (now removed) + 2 doc/QA references | rule deleted from `about/index.html` |
| `.diagram-placeholder` and `.diagram-placeholder span` | only in `eco-friendly/index.html` (now removed) + 1 doc/QA reference | both rules deleted from `eco-friendly/index.html` |

(Documentation references in `docs/site-os/reference/pci-page-pattern-reference.md` and `docs/site-os/qa/2026-05-28-image-placeholder-audit.md` are descriptions of the placeholder pattern, not live uses, so they don't block removal of the CSS.)

---

## Image hygiene (report, not block)

All four files are under 200 KB and well under the 400 KB flag threshold; no conversion or resize is recommended at this time.

| File | Size | Pixel width | Likely display width (desktop) | Notes |
|---|---|---|---|---|
| family 1448×1086 | 99 KB | 1448 | ~600 px in the story aside | ~2.4× display width — slightly over 2× DPR but WebP, acceptable; no action |
| technician 1086×1448 | 81 KB | 1086 | ~360 px in the team aside | ~3× display width — over 2× DPR for retina but file is small (81 KB) so no action |
| four-pillars 1672×941 | 191 KB | 1672 | ~840 px max-width on eco-friendly | ~2× display width; fine |
| targeted-vs-broadcast 1672×941 | 71 KB | 1672 | ~840 px max-width on eco-friendly | comfortable margins |

No file > 400 KB; no oversize image flagged.

---

## Verification

| Gate | Method | Result |
|---|---|---|
| 1. Zero image placeholders on the 2 pages | scan for `story-img-placeholder`, `team-img-placeholder`, `diagram-placeholder`, `data-img=` | PASS |
| 2. All 4 `<img>` src paths exist on disk | `fs.existsSync` per src | 4/4 PASS |
| 3. Each `<img>` has non-empty alt + explicit width + height | regex extraction per tag | 4/4 PASS |
| 4. No other `<img>` on either page changed | total `<img>` count vs HEAD (1 logo) and current (1 logo + 2 new) | PASS — only logo retained |
| 5. JSON-LD still parses | strip comments, `JSON.parse` every `<script type="application/ld+json">` body on both pages | 15/15 PASS (about 7, eco-friendly 8) |
| 6. No customer-facing em/en dashes introduced (gate) | comment-aware Node detector from `pass-fail-page-quality-gates.md` | TOTAL: 0, exit 0 |
| 7. Site-wide placeholder scan (non-comment) | regex pattern set: `-img-placeholder`, `diagram-placeholder`, `Featured Image`, `Photo Placeholder`, `data-img=` | 0 hits outside comments (the homepage's 3 blog Featured Image strings live inside the TODO(blog) comment from commit `8791a0e`, so they correctly do not count) |

---

## Stop conditions

The only stop condition that triggered was the mapping ambiguity around the IPM diagrams (two files temporarily both named "targeted-vs-broadcast"). It was resolved by owner intervention during this session: filename renames on disk plus an explicit equation "`ipm-targeted-vs-broadcast-cabinet-treatment-las-vega` = `ipm-targeted-vs-broadcast-diagram`", which locked the mapping. Once the final filenames were confirmed, the typo `las-vega` → `las-vegas` was fixed by the assistant to match the directory's naming convention (every other file in `images/` uses `las-vegas`).

---

## Image backlog (updated)

| Slot | Status |
|---|---|
| `/about/` story (family) | DONE (this commit) |
| `/about/` team (technician) | DONE (this commit) |
| `/eco-friendly/` targeted-vs-broadcast diagram | DONE (this commit) |
| `/eco-friendly/` four-pillars diagram | DONE (this commit) |
| Homepage blog: 3 article featured images (1200 × 675) | DEFERRED with the blog batch (see `qa/2026-05-28-blog-neutralize.md`) |
| `og:image` real assets | OUTSTANDING on ~72 pages — most use the same generic placeholder |
| PWA / favicon / manifest icon set | OUTSTANDING — currently the favicon only |

---

## Next step

Batch B remains the standing next batch (5 city hubs header/main/hero reconstruction). The remaining image-backlog items are independent and can interleave with Batch B as assets become available.
