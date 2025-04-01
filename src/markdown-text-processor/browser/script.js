/************************************
 ** Extract Headers of Markdown
 ************************************/
function extractHeaders() {
  try {
    const inputText = document.getElementById('mark-header-input').value
    const headers = []

    const matches = inputText.matchAll(/^#{1,4}\s+(.+)$/gm)

    for (const match of matches) {
      headers.push(match[1].trim())
    }

    document.getElementById('mark-header-output').innerHTML =
      `<pre>${headers.join('\n')}</pre>`
  } catch (error) {
    console.error('Error extracting headers:', error)
    document.getElementById('mark-header-output').textContent =
      'Error: ' + error.message
  }
}

/************************************
 ** Markdown Link Normalizer
 ************************************/
function normalizeMarkdownLinks() {
  try {
    const inputText = document.getElementById('markdown-link-input').value

    const processedText = inputText.replace(
      /\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g,
      (_, content) => content // 最初のキャプチャグループ（パイプの前）を常に使用
    )

    document.getElementById('markdown-link-output').innerHTML =
      `<pre>${processedText}</pre>`
  } catch (error) {
    console.error('Error normalizing links:', error)
    document.getElementById('markdown-link-output').textContent =
      'Error: ' + error.message
  }
}

/************************************
 ** 初期化処理（必要に応じて）
 ************************************/
window.addEventListener('DOMContentLoaded', function () {
  // 必要なら初期化コードをここに記述
})
