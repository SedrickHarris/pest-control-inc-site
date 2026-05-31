const fs = require('fs');

// Canonical source: the henderson city-hub header, restored in commit 51496cc.
// It is the verified, blessed pattern (correct /images/logos/ path, event-listener
// nav that matches every neighborhood page's existing inline JS). We extract it at
// runtime so the inserted markup is byte-faithful to the source of truth.
const CANON_FILE = 'pest-control-henderson-nv/index.html';
const SKIP = '<a href="#main-content" class="skip-link">Skip to main content</a>';

// Target files: the 26 Phase 10.5 neighborhood pages confirmed missing <header in Phase A.
// Do not touch any file not in this list.
const TARGETS = [
  'pest-control-henderson-nv/anthem/index.html',
  'pest-control-henderson-nv/cadence/index.html',
  'pest-control-henderson-nv/green-valley/index.html',
  'pest-control-henderson-nv/green-valley-ranch/index.html',
  'pest-control-henderson-nv/inspirada/index.html',
  'pest-control-henderson-nv/lake-las-vegas/index.html',
  'pest-control-henderson-nv/seven-hills/index.html',
  'pest-control-henderson-nv/silverado-ranch/index.html',
  'pest-control-las-vegas/centennial-hills/index.html',
  'pest-control-las-vegas/desert-shores/index.html',
  'pest-control-las-vegas/lone-mountain/index.html',
  'pest-control-las-vegas/mountains-edge/index.html',
  'pest-control-las-vegas/painted-desert/index.html',
  'pest-control-las-vegas/peccole-ranch/index.html',
  'pest-control-las-vegas/providence/index.html',
  'pest-control-las-vegas/queensridge/index.html',
  'pest-control-las-vegas/rhodes-ranch/index.html',
  'pest-control-las-vegas/skye-canyon/index.html',
  'pest-control-las-vegas/southern-highlands/index.html',
  'pest-control-las-vegas/spanish-trails/index.html',
  'pest-control-las-vegas/summerlin/index.html',
  'pest-control-las-vegas/summerlin-west/index.html',
  'pest-control-las-vegas/sun-city-summerlin/index.html',
  'pest-control-las-vegas/the-lakes/index.html',
  'pest-control-north-las-vegas/aliante/index.html',
  'pest-control-north-las-vegas/tule-springs/index.html',
];

// --- Extract canonical block (between the skip-link and <main) ---
const canon = fs.readFileSync(CANON_FILE, 'utf8');
const cSkip = canon.indexOf(SKIP);
const cMain = canon.indexOf('<main', cSkip);
if (cSkip === -1 || cMain === -1) {
  console.error('FATAL: could not locate skip-link/<main in canonical source ' + CANON_FILE);
  process.exit(1);
}
// Normalize to LF, strip the blank line(s) right after skip-link and trailing blank
// line(s) before <main, leaving exactly the top-bar + header + mobile-nav block.
const blockLF = canon.slice(cSkip + SKIP.length, cMain)
  .replace(/\r\n/g, '\n')
  .replace(/^\n+/, '')
  .replace(/\s+$/, '');

// Integrity assertions on the extracted block before we touch any target.
const need = ['<div class="top-bar">', '<header class="header">', 'id="mobile-nav"',
  '/images/logos/pest-control-inc-logo-transparent-background.png'];
for (const n of need) {
  if (!blockLF.includes(n)) {
    console.error('FATAL: canonical block missing expected marker: ' + n);
    process.exit(1);
  }
}
if ((blockLF.match(/<header/g) || []).length !== 1) {
  console.error('FATAL: canonical block does not contain exactly one <header');
  process.exit(1);
}

let modified = 0, skipped = 0;
const problems = [];

for (const file of TARGETS) {
  let content = fs.readFileSync(file, 'utf8');

  if (/<header/.test(content)) { skipped++; continue; } // idempotent
  if (!content.includes(SKIP)) { problems.push(file + ' (no skip-link anchor)'); continue; }

  const eol = content.includes('\r\n') ? '\r\n' : '\n';
  const block = blockLF.replace(/\n/g, eol);

  // Insert the block immediately AFTER the skip link (first occurrence only).
  content = content.replace(SKIP, SKIP + eol + block);

  fs.writeFileSync(file, content, 'utf8');
  modified++;
}

console.log('Modified: ' + modified + ' | Skipped (already has <header): ' + skipped);
if (problems.length) {
  console.log('PROBLEMS:\n' + problems.join('\n'));
  process.exit(1);
}
