# Google Reviews Pipeline

Scripts that fetch, curate, and inject Google Business Profile reviews for the
Pest Control Inc. site.

## Prerequisites

The first run requires an OAuth client credentials file:

- **`credentials.json`** (Desktop OAuth client) must be present at the repo root.
  Download it from the Google Cloud Console for the OAuth Desktop application.

On the first run you'll be prompted to authorize in a browser. The resulting
refresh token is saved to `scripts/tokens.json` so subsequent runs are
non-interactive.

## Pipeline

Run the steps in order:

### 1. `npm run fetch-reviews`

Calls the Google API and writes the raw pull to
**`data/google-reviews.staged.json`** (gitignored). This is the unreviewed
staging file — nothing here is published yet.

### 2. `npm run curate-reviews`

Interactive CLI. Walks through the staged reviews so you can approve, edit, or
reject each one, then writes the approved set to
**`data/google-reviews.json`** (the committed, published source of truth).

### 3. `npm run inject-reviews`

Reads the curated `data/google-reviews.json` and injects the approved reviews
into **`reviews/index.html`**.

## Gitignored files

These are produced by the pipeline and must not be committed:

- **`credentials.json`** — OAuth Desktop client secret (repo root).
- **`scripts/tokens.json`** — saved OAuth refresh token.
- **`data/google-reviews.staged.json`** — raw, unreviewed API pull.
