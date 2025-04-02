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
        showFeedback(outputElement, '✓ Copied to clipboard!', 'success')
      })
      .catch((err) => {
        console.error('Failed to copy:', err)
        showFeedback(outputElement, '✗ Failed to copy', 'error')
      })
  } catch (error) {
    console.error('Error:', error)
    document.getElementById('remove-spaces-output').textContent =
      `Error: ${error.message}`
  }
}

/************************************
 ** Remove blank lines
 ************************************/
function removeBlankLines() {
  try {
    const inputElement = document.getElementById('remove-blank-lines')
    const outputElement = document.getElementById('remove-blank-lines-output')

    const processedText = inputElement.value.replace(/\r?\n{2,}/gm, '\n').trim()

    if (!processedText) {
      outputElement.textContent = 'Please enter some text first!'
      return
    }

    outputElement.textContent = processedText

    navigator.clipboard
      .writeText(processedText)
      .then(() => {
        showFeedback(outputElement, '✓ Copied to clipboard!', 'success')
      })
      .catch((err) => {
        console.error('Failed to copy:', err)
        showFeedback(outputElement, '✗ Failed to copy', 'error')
      })
  } catch (error) {
    console.error('Error:', error)
    document.getElementById('remove-blank-lines-output').textContent =
      `Error: ${error.message}`
  }
}

/************************************
 ** フィードバック表示関数 (共通化)
 ************************************/
function showFeedback(element, message, type = 'success') {
  // 既存のコンテンツを保持
  const originalContent = element.textContent

  // フィードバック要素を作成
  const feedback = document.createElement('div')
  feedback.className = `feedback feedback--${type}`
  feedback.textContent = message

  // スタイルリセット
  element.innerHTML = ''
  element.appendChild(feedback)

  setTimeout(() => {
    feedback.classList.add('fade-out')
    setTimeout(() => {
      element.textContent = originalContent
    }, 300)
  }, 400)
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
