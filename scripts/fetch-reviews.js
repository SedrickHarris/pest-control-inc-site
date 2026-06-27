#!/usr/bin/env node
/**
 * fetch-reviews.js
 *
 * Fetches all Google Business Profile reviews for the PCI location and writes
 * them to data/google-reviews.staged.json (gitignored staging file).
 *
 * The account and location IDs are hardcoded, so we skip the
 * mybusinessaccountmanagement / mybusinessbusinessinformation lookups entirely
 * (those APIs ship with zero default quota) and go straight to the legacy v4
 * reviews endpoint via a raw fetch(). Google never migrated reviews off the
 * legacy mybusiness.googleapis.com/v4/ API.
 *
 * Dependencies: google-auth-library only (no googleapis package).
 *
 * Usage: node scripts/fetch-reviews.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const { exec } = require('child_process');
const { OAuth2Client } = require('google-auth-library');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const PROJECT_ROOT = path.join(__dirname, '..');

const PLACE_ID = 'ChIJO1xBU8XByIARm-wk2PLZXM0';
const LOCATION_ID = '1161761504994897557';
const ACCOUNT_ID = '1161761504994897557';
const CALLBACK_PORT = 3333;
const CALLBACK_PATH = '/oauth2callback';
const SCOPES = ['https://www.googleapis.com/auth/business.manage'];

const CREDENTIALS_PATH = path.join(PROJECT_ROOT, 'credentials.json');
const TOKENS_PATH = path.join(PROJECT_ROOT, 'scripts', 'tokens.json');
const STAGED_PATH = path.join(PROJECT_ROOT, 'data', 'google-reviews.staged.json');

const REDIRECT_URI = `http://localhost:${CALLBACK_PORT}${CALLBACK_PATH}`;

const ratingMap = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

/**
 * Load the OAuth client credentials from credentials.json at the repo root.
 * Supports both "installed" (Desktop) and "web" client shapes.
 */
function loadCredentials() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(
      `Missing credentials.json at ${CREDENTIALS_PATH}\n` +
        'Download an OAuth 2.0 "Desktop app" client from the Google Cloud ' +
        'Console (APIs & Services > Credentials) and save it as credentials.json ' +
        'at the repo root.'
    );
  }

  const raw = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const block = raw.installed || raw.web;
  if (!block) {
    throw new Error(
      'credentials.json does not contain an "installed" or "web" client block. ' +
        'Re-download a Desktop OAuth client from the GCP Console.'
    );
  }
  return block;
}

/**
 * Open a URL in the user's default browser (cross-platform best effort).
 */
function openBrowser(targetUrl) {
  const platform = process.platform;
  let cmd;
  if (platform === 'win32') {
    // `start` needs an (empty) title argument when the URL is quoted.
    cmd = `start "" "${targetUrl}"`;
  } else if (platform === 'darwin') {
    cmd = `open "${targetUrl}"`;
  } else {
    cmd = `xdg-open "${targetUrl}"`;
  }
  exec(cmd, (err) => {
    if (err) {
      console.warn(
        '\nCould not open a browser automatically. Open this URL manually:\n' +
          targetUrl +
          '\n'
      );
    }
  });
}

/**
 * Run the interactive OAuth consent flow: open the consent screen, spin up a
 * local HTTP server to capture the callback, exchange the code for tokens, and
 * persist them to scripts/tokens.json.
 */
function runConsentFlow(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // force a refresh_token to be returned
      scope: SCOPES,
    });

    const server = http.createServer(async (req, res) => {
      try {
        const parsed = url.parse(req.url, true);
        if (parsed.pathname !== CALLBACK_PATH) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }

        const { code, error } = parsed.query;
        if (error) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end(`Authorization failed: ${error}`);
          server.close();
          reject(new Error(`OAuth consent returned error: ${error}`));
          return;
        }
        if (!code) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Missing authorization code.');
          return;
        }

        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2), 'utf8');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(
          '<html><body style="font-family:sans-serif"><h2>Authorization complete.</h2>' +
            '<p>You can close this tab and return to the terminal.</p></body></html>'
        );
        server.close();
        console.log(`Saved OAuth tokens to ${TOKENS_PATH}`);
        resolve(oAuth2Client);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Token exchange failed.');
        server.close();
        reject(err);
      }
    });

    server.on('error', reject);
    server.listen(CALLBACK_PORT, () => {
      console.log(
        `\nOpening browser for Google OAuth consent...\n` +
          `If it does not open, visit:\n${authUrl}\n`
      );
      openBrowser(authUrl);
    });
  });
}

/**
 * Return an authenticated OAuth2 client. Uses saved tokens (no browser) when
 * scripts/tokens.json exists, otherwise runs the interactive consent flow.
 */
async function authorize() {
  const creds = loadCredentials();
  const oAuth2Client = new OAuth2Client(
    creds.client_id,
    creds.client_secret,
    REDIRECT_URI
  );

  if (fs.existsSync(TOKENS_PATH)) {
    const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
    oAuth2Client.setCredentials(tokens);
    // Persist any refreshed access token back to disk.
    oAuth2Client.on('tokens', (newTokens) => {
      const merged = { ...tokens, ...newTokens };
      fs.writeFileSync(TOKENS_PATH, JSON.stringify(merged, null, 2), 'utf8');
    });
    console.log('Using saved OAuth tokens (no browser needed).');
    return oAuth2Client;
  }

  return runConsentFlow(oAuth2Client);
}

// ---------------------------------------------------------------------------
// Reviews (legacy v4 endpoint via raw fetch)
// ---------------------------------------------------------------------------

/**
 * Fetch all reviews for the hardcoded account/location from the legacy v4
 * endpoint, paginating through nextPageToken.
 * Returns { reviews, totalReviewCount, averageRating }.
 */
async function fetchAllReviews(auth) {
  const accessToken = (await auth.getAccessToken()).token;
  if (!accessToken) {
    throw new Error('Failed to obtain an access token for the reviews request.');
  }

  const base =
    `https://mybusiness.googleapis.com/v4/accounts/${ACCOUNT_ID}` +
    `/locations/${LOCATION_ID}/reviews`;

  const reviews = [];
  let totalReviewCount = 0;
  let averageRating = 0;
  let pageToken;

  do {
    const endpoint = new URL(base);
    endpoint.searchParams.set('pageSize', '50');
    if (pageToken) endpoint.searchParams.set('pageToken', pageToken);

    const resp = await fetch(endpoint.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!resp.ok) {
      const body = await resp.text();
      throw new Error(
        `GBP reviews API error: ${resp.status} ${resp.statusText}\n${body}`
      );
    }

    const data = await resp.json();
    if (Array.isArray(data.reviews)) reviews.push(...data.reviews);
    if (typeof data.totalReviewCount === 'number') {
      totalReviewCount = data.totalReviewCount;
    }
    if (typeof data.averageRating === 'number') {
      averageRating = data.averageRating;
    }
    pageToken = data.nextPageToken;
  } while (pageToken);

  return { reviews, totalReviewCount, averageRating };
}

/**
 * Map a raw GBP review to the staged shape.
 */
function mapReview(review) {
  return {
    id: review.reviewId,
    authorName: (review.reviewer && review.reviewer.displayName) || 'Google Reviewer',
    rating: ratingMap[review.starRating] || 0,
    text: review.comment || '',
    reviewedAt: review.createTime,
    sourceUrl: (review.reviewReply && review.reviewReply.comment) || '',
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const auth = await authorize();

  const { reviews, totalReviewCount, averageRating } = await fetchAllReviews(auth);

  const mapped = reviews.map(mapReview);

  if (mapped.length === 0) {
    console.warn('\nWARNING: 0 reviews returned by the GBP API.');
  }

  const output = {
    fetchedAt: new Date().toISOString(),
    placeId: PLACE_ID,
    locationId: LOCATION_ID,
    totalReviewCount,
    averageRating,
    reviews: mapped,
  };

  fs.writeFileSync(STAGED_PATH, JSON.stringify(output, null, 2), 'utf8');

  console.log('');
  console.log(`Reviews fetched: ${mapped.length}`);
  console.log(`Average rating: ${averageRating}`);
  console.log('Staged to: data/google-reviews.staged.json');
}

main().catch((err) => {
  console.error('\nfetch-reviews failed:');
  console.error(err.message || err);
  // Set exitCode instead of calling process.exit() so any in-flight handle
  // (e.g. the just-closed callback server) finishes tearing down cleanly.
  // Calling process.exit() mid-close triggers a libuv assertion on Windows.
  process.exitCode = 1;
});
