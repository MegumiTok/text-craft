/************************************
 ** Extract Headers of Markdown
 ************************************/

function extractHeaders() {
  const inputText = document.getElementById("mark-header-input").value;
  const headerRegex = /^#{1,3}\s+(.*)/gm;
  const headers = [];
  let match;

  while ((match = headerRegex.exec(inputText)) !== null) {
    headers.push(match[1]);
  }

  document.getElementById("mark-header-output").innerText = headers.join("\n");
}

/************************************
 ** Markdown Link Normalizer
 ************************************/

function normalizeMarkdownLinks() {
  const inputText = document.getElementById("markdown-link-input").value;
  const output = document.getElementById("markdown-link-output");

  // 処理ルール:
  // 1. [[A|B]] 形式 → Bだけ残す
  // 2. [[A]] 形式 → Aだけ残す
  const processedText = inputText.replace(
    /\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g,
    (match, p1, p2) => p2 || p1
  );

  output.innerHTML = `<pre>${processedText}</pre>`;
}
