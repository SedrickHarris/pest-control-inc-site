const fs = require('fs');
const { execSync } = require('child_process');

const HEAD_ANCHOR = '<meta charset="UTF-8">';
const BODY_ANCHOR = '<body>';

// Snippet lines (joined with each file's own EOL so we never mix CRLF/LF)
const GTM_HEAD_LINES = [
  '<!-- Google Tag Manager -->',
  "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':",
  "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],",
  "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=",
  "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);",
  "})(window,document,'script','dataLayer','GTM-KS5B6T8S');</script>",
  '<!-- End Google Tag Manager -->',
];

const GTM_BODY_LINES = [
  '<!-- Google Tag Manager (noscript) -->',
  '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KS5B6T8S"',
  'height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>',
  '<!-- End Google Tag Manager (noscript) -->',
];

const files = execSync('find . -name "*.html" -not -path "./.git/*"', { encoding: 'utf8' })
  .trim().split('\n');

let modified = 0;
let skipped = 0;
const problems = [];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  if (content.includes('GTM-KS5B6T8S')) {
    skipped++;
    continue; // already wired
  }

  if (!content.includes(HEAD_ANCHOR) || !content.includes(BODY_ANCHOR)) {
    problems.push(file + ' (missing anchor)');
    continue;
  }

  const eol = content.includes('\r\n') ? '\r\n' : '\n';
  const gtmHead = GTM_HEAD_LINES.join(eol);
  const gtmBody = GTM_BODY_LINES.join(eol);

  // Insert head snippet after charset meta (first occurrence only)
  content = content.replace(HEAD_ANCHOR, HEAD_ANCHOR + eol + gtmHead);

  // Insert body noscript after <body> open tag (first occurrence only)
  content = content.replace(BODY_ANCHOR, BODY_ANCHOR + eol + gtmBody);

  fs.writeFileSync(file, content, 'utf8');
  modified++;
}

console.log(`Modified: ${modified} | Skipped (already wired): ${skipped}`);
if (problems.length) {
  console.log('PROBLEMS:\n' + problems.join('\n'));
  process.exit(1);
}
