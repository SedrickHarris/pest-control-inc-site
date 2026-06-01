const fs = require('fs');
const { execSync } = require('child_process');

// All page-specific og:image / twitter:image targets are missing on disk (verified:
// 72/72 referenced image files absent), so every page currently has a broken social
// image. Point them all at the one asset that exists, og-default.webp, as a working
// fallback. Per-page OG images are a future enhancement.
const WEBP = 'https://pestcontrolinc.net/assets/images/og-default.webp';
// Middot separator (·) instead of an em-dash, per owner decision — keeps the site's
// no-long-dash gate green and matches the site's existing "·" separator convention.
const ALT = 'Pest Control Inc · Licensed Pest Control &amp; Exterminator Services, Las Vegas, NV';

const files = execSync('find . -name "*.html" -not -path "./.git/*"', { encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);

let modified = 0, skipped = 0;
const problems = [];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  if (content.includes('og-default.webp')) { skipped++; continue; } // idempotent

  const before = content;

  // og:image URL — the closing quote after og:image keeps this from matching og:image:alt.
  content = content.replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/g, '$1' + WEBP + '$2');
  // twitter:image URL
  content = content.replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/g, '$1' + WEBP + '$2');
  // og:image:alt standardized text
  content = content.replace(/(<meta\s+property="og:image:alt"\s+content=")[^"]*(")/g, '$1' + ALT + '$2');

  if (content === before) { problems.push(file + ' (no og:image/twitter:image tags matched)'); continue; }

  // No newlines are inserted (in-line attribute edits only), so each file's existing
  // CRLF/LF line endings are preserved untouched.
  fs.writeFileSync(file, content, 'utf8');
  modified++;
}

console.log('Modified: ' + modified + ' | Skipped (already og-default.webp): ' + skipped);
if (problems.length) { console.log('PROBLEMS:\n' + problems.join('\n')); process.exit(1); }
