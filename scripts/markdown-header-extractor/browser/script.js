/************************************
 ** Extract Headers of Markdown
 ************************************/

function extractHeaders() {
  const markdownText = document.getElementById("markdownInput").value;
  const headerRegex = /^#{1,3}\s+(.*)/gm;
  const headers = [];
  let match;

  while ((match = headerRegex.exec(markdownText)) !== null) {
    headers.push(match[1]);
  }

  document.getElementById("output").innerText = headers.join("\n");
}
