# Service Business Conversion Layout Standard

A standalone universal layout standard for hero and CTA sections on service-based business websites. Applies to homepages, service pages, location pages, service + location pages, landing pages, and any conversion-focused section across the build. Adopted across Site OS Master client builds.

## Purpose

Make the conversion layout default-correct on every service-based business build. Service businesses convert primarily through quote requests, phone calls, booking forms, and contact forms — the layout must put a usable form (or form placeholder) directly next to the hero copy on first paint, not buried below the fold. This doc codifies the two-column conversion layout, its container width, its motion discipline, and its safety boundaries so future Claude Code build prompts, page templates, and prompts inherit the same standard without re-deriving it per build.

This doc is a layout standard, not a copy standard. It pairs with — and does not weaken — `docs/no-fake-data-policy.md`, `docs/file-scope-and-git-safety-policy.md`, `docs/standing-approval-rule-template.md`, and `docs/fast-build-batch-workflow.md`.

## When to Use

This standard applies to conversion-focused sections on **service-based business websites**, including:

- Homepages (hero, final CTA)
- Service pages (`/services/<service>`) — hero, final CTA, quote section
- Location pages (`/locations/<location>`) — hero, final CTA
- Service + location pages (`/services/<service>/<location>`) — hero, final CTA
- Landing pages (`/landing/*`, ad/email/social-targeted offers) — hero, final CTA
- Quote / contact / booking pages — hero
- Any reusable conversion section component used across the build

## When Not to Use

Do not force the two-column layout onto pages where it adds no conversion value, including:

- Blog posts and editorial articles
- Long-form guides, knowledge-base entries, documentation
- Privacy policy, terms of service, accessibility, cookie policy, and other legal pages
- About / Our Team pages where the goal is narrative trust-building
- 404 pages and other utility pages
- Directory or marketplace business-profile pages (have their own layout standard)
- Any page where the primary user intent is reading, not conversion

For non-conversion pages, follow the existing project layout pattern. A standard single-column hero or narrow content measure is usually correct.

## The Rule

**For service-based business websites, the default hero and primary CTA layout is a two-column conversion layout: content on the left, quote/contact/booking form (or approved form placeholder) on the right, in an expanded container, that stacks vertically on mobile.**

### Required Layout

**Left column (content)**
- Eyebrow / category label (optional)
- Headline / H1 with optional italic emphasis on a key word
- Subheadline / value proposition
- Optional trust bullets (only verified facts — see No-Fake-Data section below)
- Primary CTA button
- Secondary CTA (often tap-to-call) — optional

**Right column (form)**
- Quote form, contact form, booking form, or approved form placeholder
- Visually prominent but does not overpower the headline
- Constrained max width so it doesn't stretch on wide viewports

**Mobile**
- Single column. Content first, form second.
- Form remains fully usable below the CTAs.
- All touch targets ≥ 44px (preferably 48px for primary actions).

**Container**
- Expanded width so content and form are not bunched in a narrow center column.
- Generous horizontal padding scaling up at larger breakpoints.
- Generous gap between columns at larger breakpoints.

## Recommended Technical Pattern

The recommended Tailwind / CSS pattern. Adjust to match the project's existing system; the structural rules above take precedence over these specific values.

```tsx
// Section wrapper
<section className="relative overflow-hidden bg-[surface-soft]">
  <div
    className="
      relative mx-auto
      max-w-[1440px]
      px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16
      py-16 sm:py-20 lg:py-24 xl:py-28
    "
  >
    {/* Two-column grid: content left, form right */}
    <div className="
      grid grid-cols-1
      lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.75fr)]
      gap-10 lg:gap-14 xl:gap-20
      items-start
    ">
      {/* Left: content column */}
      <div>
        {/* eyebrow, headline (H1), sub, bullets (verified only), primary CTA, secondary CTA */}
      </div>

      {/* Right: form column */}
      <div className="w-full lg:max-w-xl lg:justify-self-end">
        {/* QuoteFormPlaceholder, ContactFormPlaceholder, or live form */}
      </div>
    </div>
  </div>
</section>
```

**Container**
- `max-w-[1440px]` (or `max-w-screen-2xl` if the project's design tokens prefer it)
- Padding: `px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16` (the `2xl:px-16` step is optional and only needed if the project's outer chrome doesn't already provide the same offset)

**Grid**
- `grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.75fr)]`
- The `minmax(420px, ...)` floor on the form column prevents the form from squeezing below usable width on mid-size laptops.
- The `1.05fr` weight on the content column gives the headline room to breathe at xl+ viewports.

**Gap**
- `gap-10 lg:gap-14 xl:gap-20`
- Mobile (`gap-10`) keeps content and form visually separated when stacked.
- Desktop scales up so the columns don't feel cramped on wide viewports.

**Form column**
- `w-full lg:max-w-xl lg:justify-self-end`
- `max-w-xl` (= 36rem / 576px) caps the form card so it doesn't sprawl on wide viewports.
- `justify-self-end` aligns the form card flush with the right edge of its grid track, keeping symmetry with the left-aligned hero content.

**Tap targets**
- All CTAs minimum 44px, primary actions 48px (`min-h-[44px]` / `min-h-[48px]`).
- Form inputs ≥ 44px tall.

## Mobile Stacking Rules

- `grid-cols-1` is the mobile default; the two `lg:grid-cols-[...]` tracks only apply at `lg` (1024px+) and above.
- Source order matters: render the content column FIRST in the DOM, the form column SECOND. This is the correct linear reading order on mobile, for screen readers, and for users who scan top-to-bottom.
- Mobile users see: eyebrow → headline → sub → CTAs (primary + tap-to-call) → form.
- The form remains fully usable below the CTAs. Do not collapse it to a "tap to expand" hidden state on mobile — it should be visible and operable.

## Heading Sizing in Split Mode

The headline column is narrower in split mode than in a full-width single-column hero. Scale the headline conservatively so it remains readable:

```
text-[2.25rem] sm:text-5xl lg:text-[3.25rem] xl:text-6xl 2xl:text-7xl
```

- Mobile (`2.25rem` / 36px) is bold but not overwhelming.
- `lg` is intentionally smaller than the non-split hero would use (`text-[3.25rem]` ≈ 52px) because the column is constrained.
- `xl` and `2xl` grow back to `text-6xl` / `text-7xl` once the content column has the room.

Avoid setting display headlines wider than the column they live in — wrapping at 3+ lines on `lg` is a sign the size needs to come down a step.

## Container Width Discipline

- **Split-mode conversion sections (Hero, Final CTA when it carries a form):** `max-w-[1440px]` with the progressive padding above.
- **Standard sections (TrustBar, services preview, FAQ, footer):** stay at the project's normal container width (`max-w-7xl` / `max-w-screen-xl` etc.). Do not widen non-conversion sections just for consistency — narrower measure improves readability on FAQ and long copy.
- **Final CTA without a form:** standard single-column layout is correct. Don't add an empty right column; instead, omit the `formSlot` and the component falls back to its standard branch.

## Form Slot Discipline

The form column accepts:

- A live form (e.g., `<QuoteForm>` wired to a real endpoint), OR
- An approved form placeholder (e.g., `<QuoteFormPlaceholder>` with disabled inputs and intercepted `onSubmit`).

Until a form endpoint is owner-confirmed, the placeholder is the correct default. Per `docs/no-fake-data-policy.md` §9, never invent or auto-pull a form endpoint, CRM webhook, API route, email destination, or thank-you-page URL.

The placeholder must:

- Render form fields as `disabled` and `aria-disabled="true"`.
- Intercept submit (`onSubmit={(e) => e.preventDefault()}`) so no data leaves the page.
- Show a clear "form not yet active — please call or email" note.
- Direct visitors to the verified phone number and email as the live channels.

When a real form endpoint is owner-confirmed, replace the placeholder per `docs/fast-build-batch-workflow.md` § Fast Integration Checklist.

## Conversion Hierarchy

- **One primary CTA per view.** The form button is the primary action on the section. The secondary CTA (tap-to-call) is visually subordinate but reachable. Phone number is supporting, not competing.
- **Don't duplicate forms.** If the hero contains a form, the final CTA section should NOT also contain a form — it should be text + buttons routing to `/free-quote` or equivalent. Two forms on a single page dilute the conversion focus and add visual noise.
- **Trust bullets are optional and must be verified.** Concrete, owner-confirmed facts only (family-owned, local team, service area, free quotes are typically safe; reviews, ratings, license numbers, insurance details, years-in-business, awards, certifications, satisfaction guarantees, response-time claims must be owner-verified before they appear).

## Accessibility

- Single `<h1>` per page (in the hero).
- Heading hierarchy stays sequential (h1 → h2 → h3, no level skip).
- Form fields have visible `<label>` elements above inputs (not placeholder-only labels).
- Disabled inputs use both `disabled` and `aria-disabled="true"`.
- Focus rings are visible (`focus-visible:ring-2` or equivalent). Do not remove the default focus ring without supplying a custom one.
- All meaningful interactive elements have descriptive accessible names (`aria-label` on icon-only buttons, including tap-to-call icons).
- Touch targets ≥ 44px, primary actions ≥ 48px.
- Form action note ("call us instead — phone number") provides a non-form path for users who cannot or will not fill the form.
- Mobile DOM order is content → form so screen-reader linear order matches the conversion flow.

## Motion

- Use `<MotionConfig reducedMotion="user">` at the root so all motion components auto-respect OS reduce-motion.
- Entrance animations transform / opacity only — no animated width / height / top / left.
- Durations under 300ms. Use ease-out curves.
- In-view triggered with `viewport.once`. No looping animation. No scroll-jacking. No parallax.
- Stagger sibling reveals at 60ms (within the 30–50ms list-stagger guideline).
- Form column entrance has a small (~150–200ms) delay after the content stagger so the form lands just after the headline reads.

## No-Fake-Data Compliance

The conversion layout standard does not change the no-fake-data discipline in `docs/no-fake-data-policy.md`. Inside a two-column hero, the following are still forbidden unless owner-confirmed:

- Reviews, ratings, star displays, review counts, AggregateRating schema
- License numbers, license types, insurance carriers, "Licensed & insured" claims
- Years in business, jobs completed
- Certifications, awards, accreditations
- Pricing claims, satisfaction guarantees, money-back terms
- Testimonials, customer photos, before/after framed as customer outcomes
- "As seen on" / partner badges / press mentions
- Urgency, scarcity, social-proof counters
- Form endpoints, CRM webhooks, analytics IDs, GBP URLs, thank-you-page routes

The layout standard prescribes structure. The no-fake-data policy governs content. Both apply at all times.

## Working Example: Final Touch Cleaning Company

The Final Touch Cleaning Company client build at `C:\Users\Welcome\Desktop\client-sites\final-touch-cleaning-company-site` is the reference implementation as of Batch 1.2 (2026-05-17). See:

- `components/shared/HeroSection.tsx` — `formSlot` / `layout` / `container` props; split layout with stagger fade-up entrance.
- `components/shared/CTASection.tsx` — same three-prop API; standard branch preserved for CTA sections without a form.
- `components/shared/QuoteFormPlaceholder.tsx` — disabled-field placeholder with intercepted submit.
- `app/page.tsx` — homepage hero hosts the form; final CTA stays text + buttons.

The component API:

```ts
type HeroProps = {
  // existing props...
  formSlot?: React.ReactNode;                     // typically <QuoteFormPlaceholder />
  layout?: 'standard' | 'split';                  // inferred from formSlot when omitted
  container?: 'normal' | 'wide';                  // inferred from layout when omitted
};
```

Inference: presence of `formSlot` implies `layout: 'split'`; split layout implies `container: 'wide'`. Existing call sites without these props get the original single-column behavior.

## Reusable Component Naming

When building reusable conversion components for a project, prefer these names so other Site OS Master builds can recognize them:

- `HeroSection` (with `formSlot` prop for split layout) — primary hero used on home / service / location / landing pages
- `CTASection` (with `formSlot` prop for split layout) — secondary conversion section near the page bottom
- `QuoteFormPlaceholder` / `ContactFormPlaceholder` / `BookingFormPlaceholder` — appropriate placeholder until the live form endpoint is owner-confirmed

A project may extend the API (additional props, additional tones) as long as the structural rules above are honored.

## Adoption in Build Prompts

When generating a Claude Code build prompt for a service-based business page, include this standard in the Design Requirements section:

> The hero section uses the two-column conversion layout per `docs/service-business-conversion-layout.md`: content left, quote form (or approved placeholder) right, in an expanded `max-w-[1440px]` container with `lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.75fr)]` and `gap-10 lg:gap-14 xl:gap-20`. Mobile stacks content first, form second. If a final CTA section is included and the hero already contains a form, the final CTA uses the standard single-column layout (text + buttons, no duplicate form).

When generating a page template, ensure the Hero Section and Final CTA Section explicitly reference this doc.

## Anti-Patterns to Avoid

- Centering the hero copy and form together inside a narrow `max-w-3xl` or `max-w-4xl` container — feels cramped and underuses the viewport.
- Putting the form below the hero in a separate section when the hero is mostly empty whitespace — wastes the first paint of conversion opportunity.
- Duplicating the form in the hero AND in a mid-page section AND in the final CTA — dilutes focus, adds visual noise, and creates analytics ambiguity (which form converted?).
- Hiding the form behind a "Click to open" toggle on mobile — users on mobile are most likely to convert immediately; don't make them tap twice.
- Setting display headings at full `text-7xl` inside the narrower split-mode column — wraps to 4+ lines and looks broken on `lg` viewports.
- Removing the visible focus ring or shrinking the touch target to fit a design preference — accessibility CRITICAL rules override visual minimalism.
- Treating the placeholder as ready-to-launch — until the form endpoint is owner-confirmed, the placeholder is a launch blocker per `docs/no-fake-data-policy.md` §9.

## Stop Conditions

Pause and surface to the project owner if any of these are true:

- The page is a service-based business conversion surface but no form endpoint, form vendor, or form placement decision has been confirmed.
- The hero would require unverified trust signals (reviews, ratings, license numbers, insurance details, awards) to feel "complete" — surface the gap rather than fabricate.
- The brief calls for a form in the hero but the form fields are not yet defined in the approved build brief.
- The split layout would require a global config or container width change outside the approved file scope per `docs/file-scope-and-git-safety-policy.md` §5.

## Related Files

- `docs/fast-build-batch-workflow.md` — default workflow under which most layout iteration happens
- `docs/new-client-startup-workflow.md` — Phase D build phase inherits this standard
- `docs/page-build-workflow.md` — page-level workflow; Hero / CTA sections reference this standard
- `docs/no-fake-data-policy.md` — fabrication-prevention rules that govern content inside this layout
- `docs/file-scope-and-git-safety-policy.md` — file-scope discipline that applies when introducing the layout
- `docs/standing-approval-rule-template.md` — session-scoped approval rules continue to apply
- `prompts/06-claude-code-build-prompt.md` — Claude Code build prompts inherit this standard via the Design Requirements section
- `prompts/12-conversion-optimization-prompt.md` — conversion optimization recommendations should default to this layout for service-based business pages
- `page-templates/homepage-template.md`
- `page-templates/service-page-template.md`
- `page-templates/location-page-template.md`
- `page-templates/landing-page-template.md`

---

Site OS Master — Service Business Conversion Layout Standard v1.0
Status: Adopted 2026-05-17
Reason for creation: codify the proven two-column conversion layout (validated in the Final Touch Cleaning Company Batch 1.2 client build) as the universal default for service-based business hero and CTA sections, so every future Claude Code build inherits it without re-deriving the pattern per project.
