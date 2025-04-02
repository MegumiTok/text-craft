/************************************
 ** Remove spaces from text
 ************************************/

function removeSpaces() {
  try {
    const inputElement = document.getElementById('remove-spaces')
    const outputElement = document.getElementById('remove-spaces-output')

    const processedText = inputElement.value.trim().replace(/\s+/g, '')

    if (!processedText) {
      outputElement.textContent = 'Please enter some text first!'
      return
    }

    outputElement.textContent = processedText
    navigator.clipboard
      .writeText(processedText)
      .then(() => {
        console.log('Text copied to clipboard')
      })
      .catch((err) => {
        console.error('Failed to copy:', err)
        outputElement.textContent += ' (Copy failed)'
      })
  } catch (error) {
    console.error('Error:', error)
    document.getElementById('remove-spaces-output').textContent =
      `Error: ${error.message}`
  }
}

/************************************
 ** Extract Headers of Markdown
 ************************************/
function extractPureHeader() {
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
 ** 初期化処理
 ************************************/

const TEXT_CONTENTS = {
  headerInput: `# Header 1
## Header 2
### Header 3
Some text here.
## Another Header 2`,

  linkInput: `1. [[Japan|Tokyo]] started as a small village...
2. [[Venice]] was built on water...`,
}

window.onload = function () {
  document.getElementById('mark-header-input').value = TEXT_CONTENTS.headerInput
  document.getElementById('markdown-link-input').value = TEXT_CONTENTS.linkInput
}
