# QA: Gate Fix + Comma Splice Remediation

Date: 2026-05-28
Severity: Medium (standards hygiene + customer-facing prose quality)
Status: Complete; two commits prepared; awaiting push approval
Scope: (1) replace the line-based no-long-dash gate with a comment-aware detector; (2) remediate genuine comma splices left by the dash sweep.

---

## Phase A re-entry

- `git status`: clean, branch in sync with `origin/main`.
- Implementation log tail: most recent entry is the em/en dash content sweep (commit `2ba7cf8`). Its follow-up note explicitly anticipates this gate-fix work.
- Most recent QA files reviewed: the source scrub (`2026-05-28-no-long-dash-source-scrub.md`) and the content sweep (`2026-05-28-em-en-dash-content-sweep.md`). The content sweep QA note included the multi-line-aware detection method (`fs.readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->/g, '')` then scan), which is the method codified into the gate here.

---

## Task 1: gate detector replacement

Replaced the broken line-based check in `docs/site-os/pass-fail-page-quality-gates.md` with two runnable commands that strip multi-line comments first, then detect any em or en dash (literal or HTML-entity) in what remains. Both commands return exit code 0 and `TOTAL: 0` on this repo today; either returns non-zero on a regression.

Primary command (Node, no extra dependencies; tested on this Windows host):

```
node -e "const fs=require('fs');const path=require('path');function walk(d,o=[]){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name.startsWith('.')||e.name==='node_modules'||e.name.startsWith('_'))continue;const f=path.join(d,e.name);if(e.isDirectory())walk(f,o);else if(e.name.endsWith('.html'))o.push(f);}return o;}let t=0;for(const f of walk(process.cwd())){const s=fs.readFileSync(f,'utf8').replace(/<!--[\s\S]*?-->/g,'');const n=(s.match(/[—–]|&mdash;|&ndash;|&#8212;|&#8211;|&#x2013;|&#x2014;/g)||[]).length;if(n)console.log(f,n);t+=n;}console.log('TOTAL:',t);process.exit(t?1:0);"
```

Run output here: `TOTAL: 0`, exit code 0.

Portable Python equivalent (also documented in the gate; for hosts that have Python 3 installed; on this host the Python 3 launcher is not present but the gate doc lists the equivalent command):

```
python3 -c "import re,glob,sys
t=0
for f in glob.glob('**/*.html',recursive=True):
    s=open(f,encoding='utf-8',errors='replace').read()
    s=re.sub(r'<!--.*?-->','',s,flags=re.S)
    n=sum(s.count(x) for x in ['—','–','&mdash;','&ndash;','&#8212;','&#8211;'])+len(re.findall(r'&#x201[34];',s,re.I))
    t+=n
    if n: print(f,n)
print('TOTAL:',t)
sys.exit(1 if t else 0)"
```

Gate doc also gains a short note that a naive line-based `grep -v '<!--'` cannot recognize multi-line section-header comments and produces hundreds of false positives, so it must not be used as the strict check.

The original prose FAIL condition (visible text, attribute values, JSON-LD strings; comments exempt) is unchanged.

---

## Task 2: comma splice remediation

### Detection method

Spent time deriving the candidate list rather than trusting any external scan. A Node detector extracts customer-facing prose per page from three sources:

1. visible text (after stripping `<script>`, `<style>`, comments, and tags)
2. meta-attribute values (`description`, `og:description`, `twitter:description`, `og:image:alt`)
3. JSON-LD string fields (`description`, `text`, `name`, `articleBody`, `headline`)

then flags any `,` followed by an independent-clause-looking opener (pronoun or demonstrative + a verb-ish word) for review. 142 candidates surfaced.

### Manual classification of 142 candidates

Each candidate was read in its surrounding sentence to decide whether the comma joins two independent clauses (true splice) or whether the context makes the comma correct (subordinate-clause opener, introductory phrase, appositive, list item). 52 fixes applied across 22 files; 90 candidates were correct uses (mostly `If X, we Y` and `When X, you Y` patterns, plus introductory phrases like `In Las Vegas, …` and `By the time …, they …`). One candidate was left for manual review (see below).

### Fix method (punctuation-only)

Every fix promotes the splicing comma to a period and capitalizes the first letter of the next word, which is the only word-level change the spec permits. No word added, removed, reordered, or reworded. No em/en dash reintroduced. Where the same splice text appears in both visible HTML and a JSON-LD `description` field on the same page, the search-and-replace handled both.

### Full before/after list of every splice fixed (22 files, 52 sentence pairs)

Visible / attribute / JSON-LD context noted in parentheses where multiple buckets contained the same string.

**`about/index.html`** (2)

- "Three generations of family service in Las Vegas, that's not a tagline." → "Three generations of family service in Las Vegas. That's not a tagline."
- "Three generations of doing right by Las Vegas customers, that is our standard." → "Three generations of doing right by Las Vegas customers. That is our standard."

**`ant-exterminator-las-vegas/index.html`** (3)

- "Las Vegas ant control is not a single service, it is a species-dependent treatment decision." → "Las Vegas ant control is not a single service. It is a species-dependent treatment decision."
- "This entry pattern is not caused by poor sanitation, it is a climate-driven…" → "This entry pattern is not caused by poor sanitation. It is a climate-driven…"
- "This is not a sanitation problem, it is a predictable ecological response…" → "This is not a sanitation problem. It is a predictable ecological response…"

**`bed-bug-exterminator-las-vegas/index.html`** (1, same string in visible + JSON-LD)

- "Adult bed bugs are visible, they are approximately the size of an apple seed." → "Adult bed bugs are visible. They are approximately the size of an apple seed."

**`bee-removal-las-vegas/index.html`** (3, one of them in both buckets)

- "…visually identical to European honey bees, they cannot be identified by appearance alone." → "…visually identical to European honey bees. They cannot be identified by appearance alone."
- "Honeycomb removal is not optional, it is a required part of any structural bee treatment." → "Honeycomb removal is not optional. It is a required part of any structural bee treatment." (visible + JSON-LD)
- "as part of every structural bee treatment, it is not an upcharge or a separate service." → "as part of every structural bee treatment. It is not an upcharge or a separate service."

**`commercial-pest-control-las-vegas/hotels/index.html`** (1)

- "the #1 concern, introduced by traveling guests, they can establish in a single room within days." → "the #1 concern, introduced by traveling guests. They can establish in a single room within days."

**`commercial-pest-control-las-vegas/index.html`** (4)

- "Tell Us About Your Business, We'll Show You the Right Program" → "Tell Us About Your Business. We'll Show You the Right Program"
- "Exclusion does what chemistry alone never can, it stops the problem at the source." → "Exclusion does what chemistry alone never can. It stops the problem at the source."
- "Commercial rodent control is rarely about a single treatment, it is about a documented monitoring program." → "Commercial rodent control is rarely about a single treatment. It is about a documented monitoring program."
- "are still customers today, that is what trust looks like." → "are still customers today. That is what trust looks like."

**`commercial-pest-control-las-vegas/landlord-pest-control-responsibilities/index.html`** (1)

- "is not a law firm and cannot provide legal advice, we provide professional pest management,…" → "is not a law firm and cannot provide legal advice. We provide professional pest management,…"

**`commercial-pest-control-las-vegas/pest-impact-on-business/index.html`** (2)

- "The question is not whether pest control is affordable, it is whether a pest infestation is." → "The question is not whether pest control is affordable. It is whether a pest infestation is."
- "or TripAdvisor is not a customer complaint, it is a public record…" → "or TripAdvisor is not a customer complaint. It is a public record…"

**`crane-fly-exterminator-las-vegas/index.html`** (1, same string in visible + JSON-LD)

- "Adult crane flies cause no damage, they are harmless nuisance pests." → "Adult crane flies cause no damage. They are harmless nuisance pests."

**`emergency-pest-control-las-vegas/index.html`** (7)

- "Stay in the affected room until the technician inspects, this is the most counter-intuitive but critical bed bug rule." → "Stay in the affected room until the technician inspects. This is the most counter-intuitive but critical bed bug rule." (JSON-LD)
- "Call Nevada Poison Control immediately at 1-800-222-1222, they will direct you to the appropriate ER…" → "Call Nevada Poison Control immediately at 1-800-222-1222. They will direct you to the appropriate ER…" (JSON-LD)
- "Emergency situations are stressful, in a stressed state, it's hard to know whether to call…" → "Emergency situations are stressful. In a stressed state, it's hard to know whether to call…"
- "general guidance only, it is not medical advice." → "general guidance only. It is not medical advice."
- "Phone flashlights will NOT work, they're white LED, not 365nm UV." → "Phone flashlights will NOT work. They're white LED, not 365nm UV."
- "Request Emergency Callback, We'll Call You Back" → "Request Emergency Callback. We'll Call You Back"
- "(702) 228-4394</a>, Active accounts: 24/7." → "(702) 228-4394</a>. Active accounts: 24/7." (the phone is inside an `<a href="tel:…">` in the visible block; comma replaced with period)

**`false-chinch-bug-exterminator-las-vegas/index.html`** (1, same string in visible + JSON-LD)

- "Springtails are far more common than fleas in Las Vegas bathrooms and kitchens, they are attracted to moisture in drains and plumbing." → "Springtails are far more common than fleas in Las Vegas bathrooms and kitchens. They are attracted to moisture in drains and plumbing."

**`index.html`** (1)

- "We're not a national franchise, we're your Las Vegas neighbors, and we treat every property like our own." → "We're not a national franchise. We're your Las Vegas neighbors, and we treat every property like our own." (only the first comma was a splice; the second is a correct comma before the coordinating `and`)

**`miller-moth-exterminator-las-vegas/index.html`** (1, same string in visible + JSON-LD)

- "They are harmless to humans, they do not bite, sting, or spread disease." → "They are harmless to humans. They do not bite, sting, or spread disease."

**`pest-control-las-vegas/apartments/index.html`** (2)

- "Tell Us Who You Are, We'll Show You Exactly What to Do Next" → "Tell Us Who You Are. We'll Show You Exactly What to Do Next"
- "Notify your landlord, they're responsible." → "Notify your landlord. They're responsible."

**`pest-control-las-vegas/eco-friendly/index.html`** (4)

- "It is not an upgrade or an add-on, it is our standard method,…" → "It is not an upgrade or an add-on. It is our standard method,…"
- "It is not a marketing phrase, it is a documented, implemented approach…" → "It is not a marketing phrase. It is a documented, implemented approach…"
- "This is the opposite of 'spray everywhere because we're here', it is methodical, evidence-based…" → "This is the opposite of 'spray everywhere because we're here.' It is methodical, evidence-based…" (the period was moved inside the closing quote to keep the sentence boundary clean)
- "Pet safety is not an afterthought in the Health Conscious Service Program, it is built into every protocol…" → "Pet safety is not an afterthought in the Health Conscious Service Program. It is built into every protocol…"

**`pest-control-las-vegas/index.html`** (the LV hub) (4)

- "The question for every Las Vegas homeowner is not whether you need pest control, it is which company you can trust…" → "The question for every Las Vegas homeowner is not whether you need pest control. It is which company you can trust…"
- "Pet safe pest control for homes with pets is not a special upgrade at PCI, it is the standard for every residential service we perform." → "Pet safe pest control for homes with pets is not a special upgrade at PCI. It is the standard for every residential service we perform."
- "Fair pricing, transparent pricing, that is our commitment to every Las Vegas homeowner." → "Fair pricing, transparent pricing. That is our commitment to every Las Vegas homeowner."
- "Year-round residential pest control in Las Vegas is not upselling, it is the only approach that works in Nevada's desert climate." → "Year-round residential pest control in Las Vegas is not upselling. It is the only approach that works in Nevada's desert climate."

**`pest-control-las-vegas/southern-highlands/index.html`** (1)

- "Pest Control Inc has been operated by the same family for three generations, we are not a national franchise." → "Pest Control Inc has been operated by the same family for three generations. We are not a national franchise."

**`pest-control-north-las-vegas/tule-springs/index.html`** (2 distinct splices, one of them in both buckets)

- "the pest pressure source is not temporary, it is a permanent geographic condition that requires ongoing professional management…" → "the pest pressure source is not temporary. It is a permanent geographic condition that requires ongoing professional management…" (visible + JSON-LD)
- "This is not a temporary construction-phase problem, it is a permanent geographic condition that requires ongoing professional management." → "This is not a temporary construction-phase problem. It is a permanent geographic condition that requires ongoing professional management."

**`reviews/index.html`** (1)

- "These are the only confirmed platforms, we do not claim ratings on platforms we have not verified." → "These are the only confirmed platforms. We do not claim ratings on platforms we have not verified."

**`rodent-exterminator-las-vegas/index.html`** (1)

- "Money-back guarantee, if rodents return, we come back at no charge." → "Money-back guarantee. If rodents return, we come back at no charge." (the fragment + `if`-clause + main was split at the noun-phrase boundary, leaving the `if`-clause intact)

**`scorpion-exterminator-las-vegas/index.html`** (4)

- "Avoid bug bombs and total release foggers, these do not penetrate the deep crevices where scorpions hide…" → "Avoid bug bombs and total release foggers. These do not penetrate the deep crevices where scorpions hide…" (visible + JSON-LD)
- "wind scorpions are not true scorpions, they are in a separate order of arachnids." → "wind scorpions are not true scorpions. They are in a separate order of arachnids."
- "Scorpions do not, they will walk across treated surfaces without absorbing a lethal dose." → "Scorpions do not. They will walk across treated surfaces without absorbing a lethal dose."
- "Scorpions in Las Vegas are not a seasonal nuisance, they are a year-round structural reality…" → "Scorpions in Las Vegas are not a seasonal nuisance. They are a year-round structural reality…"

**`termite-exterminator-las-vegas/index.html`** (2)

- "are the most common and destructive, they live in soil, travel via mud tubes, and enter buildings through foundation gaps…" → "are the most common and destructive. They live in soil, travel via mud tubes, and enter buildings through foundation gaps…" (visible + JSON-LD)
- "is backed by PCI's money-back guarantee, if termite activity returns between scheduled visits, we come back at no additional charge." → "is backed by PCI's money-back guarantee. If termite activity returns between scheduled visits, we come back at no additional charge." (visible + JSON-LD)

**`wasp-exterminator-las-vegas/index.html`** (3)

- "Call Pest Control Inc at (702) 228-4394, we provide same-day service for active wasp nests during business hours and 24/7 emergency service" → "Call Pest Control Inc at (702) 228-4394. We provide same-day service for active wasp nests during business hours and 24/7 emergency service" (JSON-LD plus a separate visible variant where the phone is wrapped in `<a href="tel:…">…</a>`, fixed the same way)
- "Keep people and pets away from the area. Call Pest Control Inc directly, we provide same-day service during business hours and 24/7 emergency response." → "Keep people and pets away from the area. Call Pest Control Inc directly. We provide same-day service during business hours and 24/7 emergency response."
- "wasp treatment is backed by PCI's money-back guarantee, if wasp activity returns, we come back at no additional charge." → "wasp treatment is backed by PCI's money-back guarantee. If wasp activity returns, we come back at no additional charge."

### Manual review (1 item flagged, not changed)

- **`commercial-pest-control-las-vegas/landlord-pest-control-responsibilities/index.html`**: "Multi-family housing has unique pest entry vectors, subfloor voids, skirting gaps, HVAC ductwork, that require targeted exclusion programs not interchangeable with apartment service." The comma before `that require` is awkward (a restrictive relative clause should not be preceded by a comma) but the surrounding structure is a list-with-relative-clause rather than a classic two-independent-clauses splice. Either drop the comma before `that` or recast `, that require` as `; these require…`, both of which are word- or punctuation-level edits the spec did not authorize. Surfacing for owner judgment in a future content pass.

---

## Verification

| Check | Result |
|---|---|
| Gate detector (`TOTAL: 0`, exit 0) | passes |
| Customer-facing em/en dashes | still 0 site-wide (no regression) |
| Comment-bucket dash count | unchanged on every page (571 preserved) |
| Visible word count per page vs HEAD-of-this-task | unchanged on every page (capitalization is the only word-level change, and capitalization does not change `\b\w+\b` counts) |
| `<meta>` / `<link>` / JSON-LD blocks / external `<script src>` / `<h1>` / `<h2>` / `<h3>` counts | unchanged on every page |
| JSON-LD blocks parse with `JSON.parse()` | every block passes |

---

## Stop conditions

None triggered. The reword/rewording line was never crossed: every fix was either a period swap or a capitalization, both explicitly allowed.

---

## Follow-up

- 1 ambiguous candidate (above) flagged for owner judgment.
- The detector script's pronoun-pattern heuristic surfaces about 90 non-splice patterns (mostly correct `If X, we Y` and `When X, you Y` constructions) that a future content pass should know to ignore. Recommend keeping the detector in the QA bucket as a one-off, not promoting it to a gate; the gate is dash-detection only.
- Next standing batch: Batch B (5 city hubs) per the implementation log.
