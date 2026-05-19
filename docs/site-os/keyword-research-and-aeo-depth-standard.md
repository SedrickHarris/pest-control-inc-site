# Keyword Research and AEO Depth Standard

A standalone universal standard requiring keyword type research and AEO question research before writing or optimizing high-value pages.

## Purpose

Site OS Master must require keyword type research and AEO question research before writing or optimizing high-value pages.

Without enforced keyword and AEO research, pages can technically complete but still rank poorly in Google, miss People Also Ask coverage, fail voice-search and AI-search citation, and leave conversion intent unmet.

## When to Use

Before any high-value page implementation. Specifically:

- Before writing or rewriting the homepage
- Before writing or rewriting any service, location, or service + location page
- Before rebuilding the FAQ hub
- Before any content gap fix that touches body copy on a high-value page
- Before any content update that changes a primary or secondary keyword

Low-value utility pages (legal, thank-you, simple placeholders) do not require this depth.

## Required Keyword Types

For relevant pages, identify all of the following before drafting copy:

1. Primary keywords
2. Secondary keywords
3. Long-tail keywords
4. Local keywords
5. AEO question keywords
6. Transactional keywords
7. Informational keywords
8. Commercial comparison keywords
9. Entity and semantic keywords
10. Internal-link anchor targets

## Keyword Type Definitions

### Primary keywords

Main page target terms. Typically two to four head-term phrases the page is built to rank for.

### Secondary keywords

Supporting service, location, and intent terms. Variations of the primary keyword, plus near-synonyms that ladder up to it.

### Long-tail keywords

Specific customer searches and detailed service queries. Less competitive, higher intent, often phrased as full questions or descriptive phrases.

### Local keywords

City, county, neighborhood, near-me, and service-area terms. Bound to verified service areas only.

### AEO question keywords

Question-based terms used for direct-answer sections, FAQs, voice search, and LLM search. Always phrased as a real customer question, not a keyword-stuffed pseudo-question.

### Transactional keywords

Quote, estimate, schedule, book, call, pricing, provider, near me. Signals the user is ready to convert.

### Informational keywords

"What is," "how does," "what should I include," "what areas do you serve." Signals research intent rather than transactional intent.

### Commercial comparison keywords

"Best," "top," "professional," "company," "provider," "service," "local expert." Signals shortlist-building intent.

### Entity and semantic keywords

Company name, owners, services, locations, industry terms, related concepts. Builds entity authority for AI search and topical authority for traditional search.

### Internal-link anchor targets

Specific anchor texts the page should provide as outbound internal links and receive as inbound internal links. Maps the page into the site's topical graph.

## Research Depth by Page Type

### Homepage

- Comprehensive keyword type research
- Comprehensive AEO FAQ map
- Conversion intent map
- Internal-link map

### Service Page

- Deep service keyword research
- Service pain points
- Long-tail terms
- Service FAQs
- Transactional terms

### Location Page

- Local modifiers
- City plus service intent
- No fake location/address claims
- Local FAQs

### Service + Location Page

- Service plus city keywords
- Unique local relevance
- Anti-doorway checks
- Localized FAQs

### FAQ Page

- Heavy AEO question research
- Question grouping
- Answer-first formatting
- FAQ schema planning

### Free Quote and Contact

- Conversion keywords
- Quote-process questions
- Form-status questions
- Phone/email fallback
- Objection handling

### Legal and Thank You

- Minimal keyword work
- No SEO over-optimization

## Required Keyword Map Output

Before implementation on high-value pages, output:

```
Keyword map
- Page type:
- AI depth level:
- Primary keywords:
- Secondary keywords:
- Long-tail keywords:
- Local modifiers:
- AEO question targets:
- Transactional terms:
- Informational terms:
- Commercial comparison terms:
- Entity / semantic terms:
- Internal-link anchor targets:
- Where each keyword group will be used (which sections):
```

If any required group is missing, the keyword map is incomplete and the build should not proceed to drafting.

## AEO Question Research Standard

For pages that include a FAQ section (most high-value pages), every FAQ must:

- Be phrased as a real customer question, not a keyword string
- Answer in the first sentence
- Use plain language and a confident tone
- Be 40 to 100 words for most answers
- Avoid keyword stuffing
- Avoid claims that require verification the owner has not supplied
- Be reflected exactly in `FAQPage` JSON-LD (no schema-only Q/A)

Question clustering for high-value pages should cover at minimum:

- Service questions ("What cleaning services does X offer?")
- Service area questions ("Does X serve [city]?")
- Quote and contact questions ("How do I request a quote?")
- Form status questions ("Are the online forms active yet?")
- Differentiator questions ("What makes X different from a basic service?")
- Pricing transparency ("Do you provide pricing online?") with a non-pricing answer when no verified pricing exists
- Process questions ("What happens after I request a quote?")

## Prohibited Keyword Behavior

Do not:

- Keyword stuff (3+ exact repeats in one paragraph, or H1+H2+H3 all stacking the same phrase)
- Create doorway pages (city-name-swap copy across multiple location or service+city pages)
- Invent locations the business does not actually serve
- Invent services the business does not offer
- Invent claims (reviews, ratings, credentials, hours, response times)
- Aggressively SEO-optimize legal pages
- Use fake review/rating schema
- Force keywords where they do not fit the user's actual reading flow

## Related Files

- `docs/prompt-router-and-ai-depth-standard.md` — selects the prompt type and depth this research feeds into
- `docs/high-value-page-enforcement-standard.md` — pre-build deliverables that consume this keyword map
- `docs/pass-fail-page-quality-gates.md` — gate that checks for keyword work
- `docs/no-fake-data-policy.md` — fabrication-prevention rules that govern claims inside the keyword map

---

Site OS Master — Keyword Research and AEO Depth Standard v1.0
Status: Adopted 2026-05-17
Reason for creation: require deliberate keyword type research and AEO question research before writing or optimizing high-value pages, so pages ship with real ranking and citation surface coverage rather than templated copy.
