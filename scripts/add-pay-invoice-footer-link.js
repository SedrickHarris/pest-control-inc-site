// Adds a "Pay Invoice" link to the footer Company column of every page.
// Placement rule (adaptive, since the site has two footer Company structures):
//   - If the Company column contains a /privacy-policy/ <li>, insert Pay Invoice
//     immediately before it (groups with the utility links; matches build spec).
//   - Otherwise, insert Pay Invoice as the last <li> of the Company column.
// Idempotent (skips files already containing /pay-invoice/), EOL-preserving,
// UTF-8 (no BOM). Excludes docs/, scripts/, and pay-invoice/ (wired manually).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (['docs', 'node_modules', '.git', 'scripts', 'pay-invoice'].includes(name)) continue;
      walk(full, out);
    } else if (name.endsWith('.html')) {
      out.push(full);
    }
  }
}

const files = [];
walk(ROOT, files);

let changed = 0;
const touched = [];
const skippedNoCompany = [];

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  let text = fs.readFileSync(file, 'utf8');

  if (text.includes('href="/pay-invoice/"')) continue; // already wired

  const eol = text.includes('\r\n') ? '\r\n' : '\n';

  // Isolate the Company column <ul> (Company is the last footer-col; its <ul>
  // closes at the first </ul> after the <h4>Company</h4> heading).
  const companyRe = /(<h4>Company<\/h4>\s*<ul>)([\s\S]*?)(<\/ul>)/;
  const m = companyRe.exec(text);
  if (!m) { skippedNoCompany.push(rel); continue; }

  const [whole, open, inner, close] = m;
  let newInner;

  const privRe = /([ \t]*)<li><a href="\/privacy-policy\/"(?: aria-current="page")?>Privacy Policy<\/a><\/li>/;
  const pm = privRe.exec(inner);
  if (pm) {
    const indent = pm[1];
    newInner = inner.replace(privRe, (li) =>
      `<li><a href="/pay-invoice/">Pay Invoice</a></li>${eol}${indent}${li.trimStart()}`);
  } else {
    // Insert as last <li>: match indentation of the final <li> in the column.
    const liMatches = [...inner.matchAll(/([ \t]*)<li\b/g)];
    const indent = liMatches.length ? liMatches[liMatches.length - 1][1] : '          ';
    // Append after the last </li>, before trailing whitespace/close.
    const lastLiEnd = inner.lastIndexOf('</li>');
    if (lastLiEnd === -1) { skippedNoCompany.push(rel); continue; }
    const insertAt = lastLiEnd + '</li>'.length;
    newInner = inner.slice(0, insertAt)
      + `${eol}${indent}<li><a href="/pay-invoice/">Pay Invoice</a></li>`
      + inner.slice(insertAt);
  }

  const next = text.replace(whole, open + newInner + close);
  if (next !== text) {
    fs.writeFileSync(file, next, { encoding: 'utf8' });
    changed++;
    touched.push(rel);
  }
}

console.log(`Files modified this pass: ${changed}`);
touched.forEach(t => console.log('  + ' + t));
if (skippedNoCompany.length) {
  console.log(`\nWARNING - Company column not matched in ${skippedNoCompany.length} file(s):`);
  skippedNoCompany.forEach(t => console.log('  ! ' + t));
}
