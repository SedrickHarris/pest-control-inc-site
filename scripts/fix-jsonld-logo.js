const fs = require('fs');
const { execSync } = require('child_process');

const OLD_PATH = '/images/pci-logo.png';
const NEW_PATH = '/images/logos/pest-control-inc-logo-transparent-background.png';

// pci-logo.png appears exclusively inside JSON-LD "logo" ImageObjects (verified).
const files = execSync('grep -rl "pci-logo.png" --include="*.html" .', { encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);

let modified = 0;
const problems = [];

for (const file of files) {
  const orig = fs.readFileSync(file, 'utf8');

  // Match the whole logo object (no nested braces inside it). [^}] also matches
  // newlines, so this captures both inline and multi-line logo blocks.
  const changed = orig.replace(/"logo":\s*\{[^}]*\}/g, (block) => {
    if (!block.includes(OLD_PATH)) return block; // idempotent / unrelated logo objects
    let b = block.replace(OLD_PATH, NEW_PATH);
    // Drop width/height (declared 300x130 for the old asset). Handles inline
    // (,"width":300,"height":130) and multi-line (,\r\n  "width": 300,\r\n ...).
    b = b.replace(/,\s*"width"\s*:\s*\d+\s*,\s*"height"\s*:\s*\d+/g, '');
    return b;
  });

  if (changed === orig) { problems.push(file + ' (no logo change applied)'); continue; }
  if (changed.includes(OLD_PATH)) { problems.push(file + ' (pci-logo.png still present!)'); continue; }

  fs.writeFileSync(file, changed, 'utf8');
  modified++;
}

console.log('Modified: ' + modified + ' / ' + files.length);
if (problems.length) { console.log('PROBLEMS:\n' + problems.join('\n')); process.exit(1); }
