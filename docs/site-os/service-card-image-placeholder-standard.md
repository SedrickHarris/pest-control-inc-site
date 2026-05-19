# Service Card Image Placeholder Standard

A standalone universal rule for service card design on service-based business websites. Every service card must include a visual image placeholder area by default — even before owner-supplied photography lands. Adopted across Site OS Master client builds.

## Purpose

Make service cards feel polished, scannable, and image-ready on first build, without forcing the team to ship unverified photography. Service businesses convert partly on *visual signal* — a clean image area at the top of every service card communicates "this is real work, real spaces, real outcomes" before the user reads a single word. Building cards as text-only first and "adding images later" produces visually thin grids that look unfinished and discourage real-photo replacement. This standard inverts that: the placeholder ships first; the real image swaps in when the owner approves it.

This doc is a layout/structural standard, not a content standard. It pairs with — and does not weaken — `docs/no-fake-data-policy.md` (no fake images, no fake before/after, no fake team/customer photos), `docs/service-business-conversion-layout.md` (two-column hero/CTA), `docs/fast-build-batch-workflow.md` (default workflow), and `docs/file-scope-and-git-safety-policy.md` (file-scope discipline).

## When to Use

Apply this standard to every reusable "card representing a service" on a service-based business build, including:

- Homepage service preview cards (the "we do X, Y, Z" grid)
- Services hub cards (the `/services` index page)
- Service category cards (when a service business groups services by category)
- Related service cards inside a service page
- Location page service cards (which services are available in this location)
- Service + city matrix cards (service-area landing-page grids)
- Landing page service / offer cards
- Any other reusable `ServiceCard` component used across the build

## When Not to Use

Skip this standard on:

- Pure text navigation lists (footer service lists, sitemap entries, mega-menu lists) — these are link lists, not cards.
- Inline service mentions in body copy (e.g., "we offer move-in, move-out, and deep cleaning") — text inline, not a card.
- Search-result rows or table-style listings where image area would compete with data density.
- Non-service-business project types (directory, marketplace business profiles, SaaS feature cards, blog post cards) — those page types have their own card patterns.
- Single-service landing pages where the whole page is the "card" — the page itself carries the visual treatment.

## The Rule

**For service-based business websites, every service card must include a visual image placeholder area by default. The placeholder ships in the initial build and is replaced with an owner-supplied real image when one becomes available.**

### Required Service Card Structure

In document order, every service card must contain:

1. **Image placeholder area** — top of the card
2. **Service title** — H3 (or H4 if nested), font-display, brand-aligned weight
3. **Short service description** — one to two sentences, plain language
4. **CTA link or button** — "View details", "Learn more", or service-appropriate label, with a small arrow or affordance
5. **Optional supporting details** — only when owner-verified (e.g., "Available in [confirmed cities]", a price-range *only if confirmed*, a service-type tag)

Reasonable variations:

- The image placeholder may be the entire visual top portion of the card OR a left-side media column on a horizontal card layout. Both are acceptable as long as it ships with the card.
- The CTA may be the entire card (whole card is a `<Link>`) with a visual arrow affordance, OR an explicit button at the bottom. Both are acceptable.

### Image Placeholder Requirements

**Aspect ratio**
- Use a consistent ratio across all service cards in a grid. Choose one from `aspect-[16/10]`, `aspect-[4/3]`, or `aspect-[3/2]` based on card layout density.
- Mobile and desktop use the same ratio. Do not switch ratios responsively (causes jarring layout shift).

**Visual treatment**
- Brand-token-driven: use `soft-blue`, `light-gray`, or a subtle radial/linear gradient using brand colors.
- Optional: a faint pattern, a single illustration glyph (e.g., a Lucide icon centered at large size), or a duotone block.
- The placeholder should feel intentional — not "image not loaded" gray. It is a designed surface.

**No text inside the placeholder image area**
- Never bake a label, headline, or claim into the placeholder visual. The service title and description live outside the image area, in the card body.
- An icon glyph (e.g., a service-category icon) is acceptable inside the placeholder. A *word* is not.

**No fabricated imagery**
- Per `docs/no-fake-data-policy.md` §8 Image and Media:
  - No stock photos misrepresenting the actual business location, team, or past work
  - No AI-generated photos of staff, customers, or completed jobs
  - No fake before/after photos
  - No photos of competitors' work attributed to this business
  - No readable logos, signs, or business names that imply unverified affiliations
- The placeholder is explicitly *not* a photo. It is a designed surface that communicates "image goes here."

**Accessibility**
- When the placeholder is purely decorative (the typical case), mark it `aria-hidden="true"` and do not give it `alt` text.
- When the placeholder carries a glyph that conveys meaning (a category icon that *is* the only indicator of the service type), supply an accessible label via `aria-label` on the surrounding element or visually hidden text.
- When a real image replaces the placeholder, supply descriptive `alt` text per `docs/no-fake-data-policy.md` §8.

**TODO discipline for real image replacement**
- The placeholder is a launch-ready visual, but a real image is typically better long-term. Leave a clear TODO comment in code:
  ```tsx
  {/* TODO: Replace with owner-supplied photo of <service>. Maintain aspect ratio. */}
  ```
- Do not auto-pull from Google Places, GBP, stock libraries, or AI generators per `docs/no-fake-data-policy.md` §9.
- Do not block launch on real images — the placeholder is ship-ready.

### Design Requirements

- Image placeholder makes the card feel polished, not empty.
- Placeholder aligns with the project's brand guide (color tokens, radius, shadow).
- Placeholder works at all viewport sizes without changing aspect ratio.
- Placeholder does not overpower the service title or CTA — title and description remain the primary read.
- Placeholder accepts a real image drop-in later with no markup churn (i.e., the same wrapper, same aspect ratio, same `object-cover` behavior).

## Recommended Technical Pattern

Tailwind reference. Adjust to the project's design tokens; the structural rules above take precedence over these specific values.

```tsx
// Service card (whole card is a link)
<Link
  href={service.href}
  className="
    group block h-full
    rounded-[14px] border border-border-subtle bg-brand-white
    overflow-hidden
    transition-all duration-200 ease-out
    hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(26,26,26,0.08)]
    hover:border-brand-blue/30
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue
    focus-visible:ring-offset-2
  "
>
  {/* Image placeholder area */}
  <div
    aria-hidden="true"
    className="
      relative aspect-[16/10] w-full overflow-hidden
      bg-[radial-gradient(120%_80%_at_30%_20%,var(--color-soft-blue),var(--color-light-gray))]
    "
  >
    {/* Optional: a centered icon glyph */}
    {/* <ServiceIcon className="absolute inset-0 m-auto w-10 h-10 text-brand-blue/60" /> */}
    {/* TODO: Replace this placeholder with an owner-supplied photo of <service>.
        Use next/image with the same aspect ratio and object-cover. */}
  </div>

  {/* Card body */}
  <div className="p-6">
    <h3 className="font-display text-xl font-semibold text-brand-black tracking-tight group-hover:text-brand-blue transition-colors">
      {service.name}
    </h3>
    <p className="mt-2 text-sm text-muted leading-relaxed">
      {service.description}
    </p>
    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
      View details
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
    </span>
  </div>
</Link>
```

**Card wrapper**
- `rounded-[14px]` (project's card-radius token), `border border-border-subtle`, optional `shadow` on hover only (not at rest — keeps grids visually calm).
- `overflow-hidden` so the placeholder's rounded top corners aren't clipped by the image.
- Hover: `motion-safe:hover:-translate-y-0.5` + shadow increase + accent border. Single transition at 200ms ease-out.
- Focus ring: 2px brand-blue with 2px offset.

**Image placeholder**
- `relative aspect-[16/10] w-full overflow-hidden` — reserves space, prevents CLS.
- Background uses brand tokens, not raw hex. Acceptable patterns: solid soft surface, two-token radial gradient, two-token linear gradient, faint pattern via CSS, or single brand-tone with low-opacity icon.
- `aria-hidden="true"` when decorative (default).

**Card body**
- `p-6` (or scale to project density). Title uses `font-display`, description uses `font-body text-sm text-muted`. CTA uses brand-blue with subtle arrow affordance.

**Accessibility**
- Tap target: the entire card is a link, so the tap area is the full card height (well above 44px).
- Focus ring is visible on keyboard focus.
- Screen reader: the card's accessible name comes from the `<h3>` title, not from the placeholder. Decorative placeholder is `aria-hidden`.

**Motion (optional and reduced-motion safe)**
- Hover lift + shadow + arrow translate are CSS transitions, gated by `prefers-reduced-motion: reduce` (already handled in `app/globals.css` per `docs/service-business-conversion-layout.md`).
- No entrance animation per card by default; if the grid uses an entrance stagger (Framer Motion), keep it ≤300ms with `viewport.once` and respect `MotionConfig reducedMotion="user"`.

## Optional Reusable Component: ServiceImagePlaceholder

For projects with many service cards (services hub, location grids, service + city matrix), extract the placeholder into its own component so the visual treatment stays consistent and a future "replace with real image" change is a single-file edit:

```tsx
// components/shared/ServiceImagePlaceholder.tsx
type Props = {
  aspect?: '16/10' | '4/3' | '3/2';
  icon?: React.ReactNode;
  className?: string;
};

export default function ServiceImagePlaceholder({
  aspect = '16/10',
  icon,
  className = '',
}: Props) {
  const aspectClass =
    aspect === '4/3' ? 'aspect-[4/3]' :
    aspect === '3/2' ? 'aspect-[3/2]' :
    'aspect-[16/10]';

  return (
    <div
      aria-hidden="true"
      className={`relative ${aspectClass} w-full overflow-hidden bg-[radial-gradient(120%_80%_at_30%_20%,var(--color-soft-blue),var(--color-light-gray))] ${className}`}
    >
      {icon && (
        <div className="absolute inset-0 flex items-center justify-center text-brand-blue/60">
          {icon}
        </div>
      )}
      {/* TODO: Replace with owner-supplied photo. Maintain aspect ratio + object-cover. */}
    </div>
  );
}
```

Then a `<ServiceCard>` composes it:

```tsx
<Link href={...} className="...">
  <ServiceImagePlaceholder icon={<SprayBottleIcon />} />
  <div className="p-6">...title, description, CTA...</div>
</Link>
```

Whether to extract is a judgment call — small projects can inline the placeholder; larger projects benefit from a shared component.

## No-Fake-Data Compliance

The placeholder standard does not change the no-fake-data rules in `docs/no-fake-data-policy.md`. Inside or around a service card, the following are still forbidden unless owner-confirmed:

- Reviews, ratings, review counts, stars (no AggregateRating fragments on cards)
- Testimonial pull-quotes attached to cards
- Pricing claims, "starting at" prices, discount badges, "limited time" tags
- License numbers, insurance details, "Licensed & insured" badges
- Years-in-business chips, jobs-completed counters
- "Featured", "Most popular", "Best value" — only if owner-confirmed
- Fake before/after thumbnails as the placeholder image
- AI-generated photography of staff, customers, completed jobs, or competitors' work
- Readable logos, signage, business names in the placeholder image that imply unverified affiliations
- Schema fields (Service, Offer, AggregateRating) populated with invented values

The placeholder is a designed surface. It is not a vehicle for unverified claims.

## Working Example: Final Touch Cleaning Company

The Final Touch Cleaning Company client build at `C:\Users\Welcome\Desktop\client-sites\final-touch-cleaning-company-site` was the reference implementation of the two-column conversion layout. Its current `components/shared/ServicesPreview.tsx` renders text-only service cards (title + description + arrow CTA) and **does not yet include an image placeholder area**. Adopting this standard going forward, the next iteration of `ServicesPreview` will add the placeholder as described above. This is a forward-looking decision; it does not invalidate the current Final Touch build.

When the Final Touch ServicesPreview is updated, the change should:

- Wrap each card in `<Link>` with `overflow-hidden` and the existing radius/border/shadow treatment.
- Insert `<ServiceImagePlaceholder aspect="16/10" />` at the top of each card.
- Keep the existing title, description, and arrow CTA in the card body below the placeholder.
- Leave a TODO comment in code noting that owner-supplied photos should replace the placeholders when available.

## Accessibility

- Decorative placeholder is `aria-hidden="true"`. Screen readers skip it.
- The whole card is a link; its accessible name is the H3 title. No redundant "Image of …" announcement.
- Focus ring is visible on the link wrapper, not on the placeholder.
- Hover and focus states are visually distinct.
- Tap target = full card height (well above 44px).
- All motion (hover lift, arrow translate, optional entrance) honors `prefers-reduced-motion`.

## Motion

- Hover-only motion at rest (the card is calm until interacted with).
- No looping animation, no scroll-jacking, no parallax on the placeholder.
- Optional entrance stagger when used inside a grid (per `docs/service-business-conversion-layout.md`): 60ms between siblings, 280ms ease-out, `viewport.once`, MotionConfig `reducedMotion="user"`.
- Durations ≤ 300ms.

## Adoption in Build Prompts

When generating a Claude Code build prompt for a page that includes a service card grid, the prompt's Image Requirements section must include this standard:

> Every service card in this grid must include a visual image placeholder area at the top per `docs/service-card-image-placeholder-standard.md`. Use a consistent `aspect-[16/10]` (or `aspect-[4/3]`) placeholder with a brand-token background (soft-blue / light-gray / subtle gradient), `aria-hidden="true"`, and a TODO comment noting that an owner-supplied photo should replace the placeholder when available. Do not embed text in the placeholder. Do not invent images, before/after, team photos, or customer photos per `docs/no-fake-data-policy.md`.

When generating a page template, the relevant service-card sections must reference this doc.

## Anti-Patterns to Avoid

- Text-only service cards on a service-business build (looks visually thin, discourages later photo replacement).
- "Just add an emoji" as a substitute for the image placeholder (emojis are font-dependent, inconsistent across platforms, fail brand-token discipline).
- Inserting a generic stock photo as a "temporary" placeholder (still risks misrepresentation; the placeholder is the right "temporary" by design).
- Letting different cards in the same grid use different aspect ratios (jarring, looks broken).
- Skipping `aria-hidden` on a decorative placeholder (screen readers read empty image announcements).
- Baking the service name into the placeholder image (text-in-images is non-translatable, non-resizable, and an SEO/accessibility loss).
- Animating the placeholder constantly (decorative motion, no semantic meaning).
- Replacing the placeholder with an unverified Google Places photo per `docs/no-fake-data-policy.md` §9.

## Stop Conditions

Pause and surface to the project owner if any of these are true:

- The project is being asked to ship service cards with auto-pulled photography (Google Places, GBP, stock libraries) without owner consent.
- The placeholder visual would require new global brand tokens or color additions outside the approved scope.
- A service card is being asked to display unverified social-proof badges, ratings, or trust claims layered over the placeholder.
- The brief calls for service cards but the project has no design tokens for `soft-blue` / `light-gray` or equivalent — surface the gap rather than invent tokens.

## Related Files

- `docs/service-business-conversion-layout.md` — paired layout standard for hero / CTA sections; service card grids typically sit between the hero and the FAQ on service-business pages
- `docs/no-fake-data-policy.md` — §8 Image and Media governs all image decisions inside this card; §9 governs external pulls
- `docs/file-scope-and-git-safety-policy.md` — applies when introducing the card pattern across multiple files
- `docs/fast-build-batch-workflow.md` — default workflow under which cards are iterated
- `docs/new-client-startup-workflow.md` — service-based onboarding inherits this standard
- `docs/page-build-workflow.md` — page-level workflow; service-card sections reference this standard
- `prompts/06-claude-code-build-prompt.md` — Image Requirements section embeds this standard
- `page-templates/homepage-template.md` — Section 3 Core Services or Offers
- `page-templates/service-page-template.md` — Section 10 Related Services / Internal Links
- `page-templates/location-page-template.md` — Section 4 Services or Categories Available in This Location
- `page-templates/landing-page-template.md` — Section 5 What Is Included when service cards are used
- `page-templates/category-page-template.md` — Section 4 Subcategory or Related Page Links

---

Site OS Master — Service Card Image Placeholder Standard v1.0
Status: Adopted 2026-05-17
Reason for creation: codify the image-placeholder-by-default rule for service cards on service-based business builds so every future Claude Code build ships polished, image-ready service grids without forcing unverified photography. Pairs with the two-column conversion layout standard (`docs/service-business-conversion-layout.md`) as the second of the universal service-business layout primitives.
