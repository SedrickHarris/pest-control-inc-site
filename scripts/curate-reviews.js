#!/usr/bin/env node
/**
 * curate-reviews.js
 *
 * Interactive CLI that walks a human through approving, skipping, or editing
 * reviews from data/google-reviews.staged.json (the raw fetch output) before
 * merging the approved ones into data/google-reviews.json (the published set).
 *
 * data/google-reviews.json is currently manually seeded and verified, so this
 * script is for FUTURE use: once GBP API access is approved and
 * fetch-reviews.js produces a staged file, run this to curate the new reviews.
 *
 * Dependencies: Node built-ins only (fs, path, readline). No npm packages.
 *
 * Usage: node scripts/curate-reviews.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const PROJECT_ROOT = path.join(__dirname, '..');
const STAGED_PATH = path.join(PROJECT_ROOT, 'data', 'google-reviews.staged.json');
const APPROVED_PATH = path.join(PROJECT_ROOT, 'data', 'google-reviews.json');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function stars(rating) {
  const n = Math.max(0, Math.min(5, Number(rating) || 0));
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function shortDate(reviewedAt) {
  if (!reviewedAt) return 'unknown date';
  return String(reviewedAt).slice(0, 10);
}

function preview(text) {
  if (!text) return '(no text)';
  const trimmed = text.trim();
  return trimmed.length > 100 ? trimmed.slice(0, 100) + '...' : trimmed;
}

/**
 * Promise-based single-line prompt over a shared readline interface.
 */
function ask(rl, query) {
  return new Promise((resolve) => rl.question(query, (answer) => resolve(answer)));
}

/**
 * Render one review block to stdout.
 */
function showReview(review, index, total) {
  console.log('---');
  console.log(
    `[${index + 1} of ${total}] ${review.authorName} — ${stars(review.rating)} — ${shortDate(
      review.reviewedAt
    )}`
  );
  console.log(`"${preview(review.text)}"`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // 1. Staged file must exist.
  if (!fs.existsSync(STAGED_PATH)) {
    console.log('No staged reviews found. Run npm run fetch-reviews first.');
    process.exitCode = 0;
    return;
  }

  // 2. Read staged (raw fetch output).
  const staged = readJson(STAGED_PATH);
  const stagedReviews = Array.isArray(staged.reviews) ? staged.reviews : [];

  // 3. Read existing approved reviews.
  let approved = {
    verified: false,
    placeId: staged.placeId,
    locationId: staged.locationId,
    averageRating: staged.averageRating,
    totalReviewCount: staged.totalReviewCount,
    lastFetched: staged.fetchedAt || null,
    reviews: [],
  };
  if (fs.existsSync(APPROVED_PATH)) {
    approved = readJson(APPROVED_PATH);
    if (!Array.isArray(approved.reviews)) approved.reviews = [];
  }

  const existingReviews = approved.reviews.slice();
  const approvedIds = new Set(existingReviews.map((r) => r.id));

  // 4. Filter staged to only NEW reviews.
  const newReviews = stagedReviews.filter((r) => !approvedIds.has(r.id));
  if (newReviews.length === 0) {
    console.log('No new reviews to curate.');
    process.exitCode = 0;
    return;
  }

  // 5. Walk each new review interactively.
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const newlyApproved = [];
  let skipped = 0;

  try {
    for (let i = 0; i < newReviews.length; i++) {
      const review = newReviews[i];
      let displayName = review.authorName || 'Google Reviewer';
      let decided = false;

      while (!decided) {
        showReview({ ...review, authorName: displayName }, i, newReviews.length);
        const answer = (
          await ask(rl, '[y] approve  [n] skip  [e] edit name  > ')
        )
          .trim()
          .toLowerCase();

        if (answer === 'y') {
          newlyApproved.push({
            id: review.id,
            authorName: displayName,
            rating: review.rating,
            text: review.text || '',
            reviewedAt: review.reviewedAt,
            verified: true,
            permissionToPublish: true,
          });
          decided = true;
        } else if (answer === 'n') {
          skipped += 1;
          decided = true;
        } else if (answer === 'e') {
          const edited = (await ask(rl, 'Display name: ')).trim();
          if (edited) displayName = edited;
          // loop again: re-show with new name and re-prompt y/n/e
        } else {
          console.log('Please enter y, n, or e.');
        }
      }
    }
  } finally {
    rl.close();
  }

  // 6. Merge and write.
  const mergedReviews = existingReviews.concat(newlyApproved);
  const output = {
    verified: mergedReviews.length > 0,
    placeId: staged.placeId,
    locationId: staged.locationId,
    averageRating: staged.averageRating,
    totalReviewCount: staged.totalReviewCount,
    lastFetched: staged.fetchedAt || null,
    reviews: mergedReviews,
  };

  fs.writeFileSync(APPROVED_PATH, JSON.stringify(output, null, 2) + '\n', 'utf8');

  // 7. Summary.
  console.log('');
  console.log(
    `Approved: ${newlyApproved.length}  Skipped: ${skipped}  Total in file: ${mergedReviews.length}`
  );
  console.log('Written to data/google-reviews.json');
}

main().catch((err) => {
  console.error('\ncurate-reviews failed:');
  console.error(err.message || err);
  process.exitCode = 1;
});
