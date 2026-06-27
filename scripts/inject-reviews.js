#!/usr/bin/env node
/**
 * inject-reviews.js
 *
 * Reads data/google-reviews.json and injects rendered review cards into
 * reviews/index.html at the <!-- REVIEWS_INJECT --> placeholder.
 *
 * Only reviews that are verified, cleared to publish, and have non-empty text
 * are rendered. The injection region is bracketed by <!-- REVIEWS_INJECT -->
 * and <!-- /REVIEWS_INJECT --> so this script is idempotent: re-running
 * replaces the previously injected block rather than appending to it.
 *
 * Dependencies: Node built-ins only (fs, path).
 *
 * Usage: node scripts/inject-reviews.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_PATH = path.join(PROJECT_ROOT, 'data', 'google-reviews.json');
const HTML_PATH = path.join(PROJECT_ROOT, 'reviews', 'index.html');

const START = '<!-- REVIEWS_INJECT -->';
const END = '<!-- /REVIEWS_INJECT -->';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function stars(rating) {
  const n = Math.max(0, Math.min(5, Number(rating) || 0));
  return '★'.repeat(n);
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderCard(review) {
  return (
    `      <article class="review-card" itemscope itemtype="https://schema.org/Review">\n` +
    `        <div class="review-stars">${stars(review.rating)}</div>\n` +
    `        <p class="review-text" itemprop="reviewBody">"${escapeHtml(review.text)}"</p>\n` +
    `        <div class="review-attr" itemprop="author">${escapeHtml(
      review.authorName
    )} <span>&middot; Google &middot; Las Vegas</span></div>\n` +
    `      </article>`
  );
}

function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  // 1. Top-level verified gate.
  if (data.verified !== true) {
    console.warn(
      'data/google-reviews.json has verified:false — refusing to inject. ' +
        'Curate and verify reviews first. Nothing changed.'
    );
    process.exitCode = 0;
    return;
  }

  const reviews = Array.isArray(data.reviews) ? data.reviews : [];
  if (reviews.length === 0) {
    console.warn('data/google-reviews.json has no reviews. Nothing injected.');
    process.exitCode = 0;
    return;
  }

  // 2. Only publishable reviews with text.
  const publishable = reviews.filter(
    (r) =>
      r.verified === true &&
      r.permissionToPublish === true &&
      typeof r.text === 'string' &&
      r.text.trim() !== ''
  );

  // 3. Build the cards HTML.
  const cardsHtml = publishable.map(renderCard).join('\n');

  // 4. Read the page.
  let html = fs.readFileSync(HTML_PATH, 'utf8');

  const replacement = `${START}\n${cardsHtml}\n      ${END}`;
  const blockRe = new RegExp(
    escapeRegExp(START) + '[\\s\\S]*?' + escapeRegExp(END)
  );

  // 5/6. Replace the bracketed block (idempotent) or the bare placeholder.
  if (blockRe.test(html)) {
    html = html.replace(blockRe, replacement);
  } else if (html.includes(START)) {
    html = html.replace(START, replacement);
  } else {
    throw new Error(
      `Placeholder ${START} not found in reviews/index.html — cannot inject.`
    );
  }

  fs.writeFileSync(HTML_PATH, html, 'utf8');

  // 7. Report.
  console.log(`Injected ${publishable.length} reviews into reviews/index.html`);
}

try {
  main();
} catch (err) {
  console.error('\ninject-reviews failed:');
  console.error(err.message || err);
  process.exitCode = 1;
}
