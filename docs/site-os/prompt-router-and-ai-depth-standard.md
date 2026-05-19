# Prompt Router and AI Depth Standard

A standalone universal standard for selecting the correct prompt type and AI depth level before writing, editing, or optimizing any page. Applies to every Site OS Master client build regardless of session, stack, or workflow mode.

## Purpose

Site OS Master must select the correct prompt type and AI depth level before writing, editing, or optimizing any page.

The system must not use a generic batch prompt for high-value pages unless explicitly approved.

Recent client builds showed that broad batch prompts can technically complete pages but still produce thin content, weak AEO FAQ coverage, incomplete page-specific research, missed copy rules, and visual CTA issues. This standard turns Site OS Master from a loose prompt/document library into a stricter routing and enforcement system.

## When to Use

This standard applies every time a page is being created, edited, or optimized. It runs before any other prompt invocation:

- Before Prompt 06 (Claude Code Build)
- Before Prompt 12 (Conversion Optimization)
- Before any batch build prompt in `docs/site-os/prompts/build/` on the client side
- Before any content gap fix or content update prompt
- Before any QA prompt

If routing fails, stop and surface the failure before any file changes.

## Required Routing Questions

Before page work begins, Site OS must classify each of the following:

1. Page type
2. Page value
3. Search intent
4. Conversion importance
5. SEO/AEO importance
6. Research depth required
7. Compliance or risk level
8. Correct prompt type
9. Correct AI depth level
10. Required QA gate

## Page-Type Prompt Routing Table

### Homepage

- Prompt type: Individual Homepage Beyond-Elite Prompt
- AI depth: Level 5 Beyond-Elite
- Required research: comprehensive keyword type research, AEO FAQ research, conversion analysis, content gap analysis, UX/CTA review

### Free Quote Page

- Prompt type: Conversion Page Prompt
- AI depth: Level 4 Conversion
- Required research: conversion keywords, quote-process FAQs, objection handling, form-flow clarity

### Contact Page

- Prompt type: Conversion + Trust Page Prompt
- AI depth: Level 4 Conversion
- Required research: contact intent, service area clarity, form status, phone/email path, trust copy

### Services Hub

- Prompt type: SEO/AEO Services Hub Prompt
- AI depth: Level 3 Core SEO/AEO, or Level 5 if revenue-critical
- Required research: service taxonomy, service keyword clusters, internal linking, service-card strategy, AEO FAQs

### Locations Hub

- Prompt type: Local SEO/AEO Locations Hub Prompt
- AI depth: Level 3 Core SEO/AEO, or Level 5 if revenue-critical
- Required research: local modifiers, service-area clarity, no fake office/address claims, city FAQ coverage

### About Page

- Prompt type: Trust + Brand Story Prompt
- AI depth: Level 3 Core Trust, or Level 4 if conversion-critical
- Required research: verified owner/company facts, trust copy, brand story, no fake credentials

### FAQ Page

- Prompt type: AEO FAQ Hub Prompt
- AI depth: Level 5 AEO Hub
- Required research: question clustering, answer-first formatting, voice search, FAQ schema, entity clarity

### Individual Service Page

- Prompt type: Service SEO/AEO Page Prompt
- AI depth: Level 3 Core SEO/AEO, or Level 5 for core revenue services
- Required research: service keyword research, long-tail terms, pain points, FAQs, schema, CTA

### Individual Location Page

- Prompt type: Local SEO/AEO Location Page Prompt
- AI depth: Level 3 Core SEO/AEO
- Required research: city modifiers, service-area relevance, local intent, no fake location claims

### Service + Location Page

- Prompt type: Programmatic Service-City Matrix Prompt
- AI depth: Level 3 Core SEO/AEO with anti-doorway safeguards
- Required research: service plus city intent, unique local relevance, no thin duplication, localized FAQs

### Legal Page

- Prompt type: Legal Placeholder / Compliance Prompt
- AI depth: Level 1 Utility
- Required research: low creativity, legal review notes, no SEO over-optimization

### Thank You Page

- Prompt type: Utility Confirmation Prompt
- AI depth: Level 1 Utility
- Required research: minimal, confirmation UX, noindex, return links

## AI Depth Levels

### Level 1: Utility

- For thank-you pages, simple placeholders, legal drafts, small updates
- Minimal research
- Simple QA

### Level 2: Standard

- For basic support pages
- Light SEO and content checks

### Level 3: Core SEO/AEO

- For service pages, location pages, service hubs, location hubs
- Keyword types, local modifiers, AEO FAQs, internal links, schema readiness

### Level 4: Conversion

- For contact, quote, booking, offer, landing pages
- Conversion copy, CTA flow, objection handling, form clarity, trust copy

### Level 5: Beyond-Elite

- For homepage, major revenue pages, competitive service pages, pillar pages
- Comprehensive keyword research, AEO research, content analysis, gap identification, gap fix, UX/CTA polish, metadata/schema QA

### Level 6: Competitive Research

- For pages requiring SERP/competitor analysis before implementation
- Requires external SERP or competitor source review when allowed

## Routing Enforcement Rule

If the page is high-value, do not use a broad batch prompt unless the user explicitly approves it.

High-value pages include:

- homepage
- free quote page
- contact page
- services hub
- locations hub
- about page
- FAQ hub
- core service pages
- core location pages
- core service + location pages
- revenue-critical landing pages

If the wrong prompt or AI depth is selected, stop and return:

```
ROUTING FAIL: Incorrect prompt or AI depth selected.
```

## Routing Output Block

Before any high-value page implementation begins, the operator (or Claude Code) must output a routing block of this shape:

```
Routing
- Page type: <type>
- Page value: high / standard / utility
- Search intent: <intent>
- Conversion importance: <high/medium/low>
- SEO/AEO importance: <high/medium/low>
- Research depth: <Level 1–6>
- Compliance / risk level: <none/low/medium/high>
- Prompt type selected: <prompt name>
- AI depth selected: <Level 1–6>
- QA gate: <pass-fail gate referenced>
```

If any field is missing, routing fails. Do not proceed.

## Related Files

- `docs/keyword-research-and-aeo-depth-standard.md` — keyword type research depth required per page type
- `docs/high-value-page-enforcement-standard.md` — pre-build deliverables and post-build proof required for high-value pages
- `docs/pass-fail-page-quality-gates.md` — pass/fail checklist invoked at the end of every high-value build
- `docs/fast-build-batch-workflow.md` — batch prompts retain their place for setup, scaffolding, legal, utility, and low-risk pages
- `docs/no-fake-data-policy.md` — fabrication-prevention rules that apply regardless of routing
- `docs/service-business-conversion-layout.md` — paired layout primitive used by conversion routes
- `docs/service-card-image-placeholder-standard.md` — paired layout primitive used by service-card surfaces
- `docs/client-repo-prompt-system-standard.md` — client repos receive their own per-page prompt files; routing applies there too

---

Site OS Master — Prompt Router and AI Depth Standard v1.0
Status: Adopted 2026-05-17
Reason for creation: enforce correct prompt type and AI depth selection before page work begins, and prevent broad batch prompts from handling high-value pages without explicit approval.
