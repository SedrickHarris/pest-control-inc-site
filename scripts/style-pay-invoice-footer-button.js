// Upgrades the footer "Pay Invoice" text link into an orange pill button
// (.footer-pay-btn) on every page. Scoped to the footer Company column so the
// sitemap's BODY pay-invoice link (in the "Legal & Utility" group) stays a plain
// text link. Injects the CSS rule before </style>. Idempotent, EOL-preserving,
// UTF-8 (no BOM). Excludes docs/, scripts/.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const CSS_RULES = [
  `.footer-pay-btn{display:inline-flex;align-items:center;gap:7px;background:var(--orange);color:#fff;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:9px 18px;border-radius:999px;text-decoration:none;transition:background .2s,transform .15s;margin-top:8px;white-space:nowrap}`,
  `.footer-pay-btn:hover{background:var(--orange-dark);transform:translateY(-1px)}`,
];

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (['docs', 'node_modules', '.git', 'scripts'].includes(name)) continue;
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
const skipped = [];

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  let text = fs.readFileSync(file, 'utf8');
  const eol = text.includes('\r\n') ? '\r\n' : '\n';
  const before = text;

  // 1) Inject CSS before </style> (idempotent).
  if (!text.includes('.footer-pay-btn')) {
    const idx = text.indexOf('</style>');
    if (idx === -1) { skipped.push(rel + ' (no </style>)'); continue; }
    const block = CSS_RULES.join(eol) + eol;
    text = text.slice(0, idx) + block + text.slice(idx);
  }

  // 2) Convert the Company-column pay-invoice link into the button.
  //    Scope to the Company <ul> so the sitemap body link is untouched.
  const companyRe = /(<h4>Company<\/h4>\s*<ul>)([\s\S]*?)(<\/ul>)/;
  const m = companyRe.exec(text);
  if (!m) { skipped.push(rel + ' (no Company column)'); continue; }
  const [whole, open, inner, close] = m;

  const linkRe = /<li><a href="\/pay-invoice\/"( aria-current="page")?>Pay Invoice<\/a><\/li>/;
  if (linkRe.test(inner)) {
    const newInner = inner.replace(linkRe, (full, aria) =>
      `<li><a href="/pay-invoice/" class="footer-pay-btn"${aria || ''}>&#128179; Pay Invoice</a></li>`);
    text = text.replace(whole, open + newInner + close);
  } else if (!inner.includes('footer-pay-btn')) {
    skipped.push(rel + ' (no plain footer pay link found)');
  }

  if (text !== before) {
    fs.writeFileSync(file, text, { encoding: 'utf8' });
    changed++;
    touched.push(rel);
  }
}

console.log(`Files modified: ${changed}`);
touched.forEach(t => console.log('  + ' + t));
if (skipped.length) {
  console.log(`\nNOTE - ${skipped.length} file(s) skipped/flagged:`);
  skipped.forEach(t => console.log('  ! ' + t));
}
