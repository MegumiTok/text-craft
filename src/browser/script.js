/************************************
 ** Extract Headers of Markdown
 ************************************/
function extractPureHeader() {
  const button = document
    .querySelector('#mark-header-input')
    .nextElementSibling.querySelector('.container__button')
  const inputText = document.getElementById('mark-header-input').value
  const outputElement = document.getElementById('mark-header-output')

  try {
    const headers = []
    const matches = inputText.matchAll(/^#{1,4}\s+(.+)$/gm)

    for (const match of matches) {
      headers.push(match[1].trim())
    }

    const resultText = headers.join('\n')
    outputElement.innerHTML = `<pre>${resultText}</pre>`

    if (headers.length > 0) {
      navigator.clipboard
        .writeText(resultText)
        .then(() => showFeedback(button, 'Headers copied!'))
        .catch(() => showFeedback(button, 'Copy failed', 'error'))
    } else {
      showFeedback(button, 'No headers found', 'error')
    }
  } catch (error) {
    console.error('Error:', error)
    showFeedback(button, `Error: ${error.message}`, 'error')
  }
}

/************************************
 ** Markdown Link Normalizer
 ************************************/
function normalizeMarkdownLinks() {
  const button = document
    .querySelector('#markdown-link-input')
    .nextElementSibling.querySelector('.container__button')
  const inputText = document.getElementById('markdown-link-input').value
  const outputElement = document.getElementById('markdown-link-output')

  try {
    const processedText = inputText.replace(
      /\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g,
      (_, content, displayText) => displayText || content
    )

    outputElement.innerHTML = `<pre>${processedText}</pre>`

    if (processedText && processedText !== inputText) {
      navigator.clipboard
        .writeText(processedText)
        .then(() => showFeedback(button, 'Links normalized & copied!'))
        .catch(() => showFeedback(button, 'Copy failed', 'error'))
    } else if (!processedText) {
      showFeedback(button, 'Please enter text first!', 'error')
    } else {
      showFeedback(button, 'No links to normalize', 'info')
    }
  } catch (error) {
    console.error('Error:', error)
    showFeedback(button, `Error: ${error.message}`, 'error')
  }
}

/************************************
 ** Remove Whitespaces from text
 ************************************/
function removeWhiteSpaces() {
  const button = document
    .querySelector('#remove-whitespaces')
    .nextElementSibling.querySelector('.container__button')
  const inputElement = document.getElementById('remove-whitespaces')
  const outputElement = document.getElementById('remove-whitespaces-output')

  try {
    const processedText = inputElement.value.trim().replace(/\s+/g, '')

    if (!processedText) {
      showFeedback(button, 'Please enter text!', 'error')
      return
    }

    outputElement.textContent = processedText
    navigator.clipboard
      .writeText(processedText)
      .then(() => showFeedback(button))
      .catch(() => showFeedback(button, 'Copy failed', 'error'))
  } catch (error) {
    console.error('Error:', error)
    showFeedback(button, `Error: ${error.message}`, 'error')
  }
}

/************************************
 ** Remove blank lines
 *
 * 【削除対象の空白行パターン】
 * 1. 完全な空行:          \n\n
 * 2. スペースのみの行:     \n  \n (スペース2個以上)
 * 3. タブのみの行:        \n\t\n
 * 4. スペース/タブ混合行:  \n \t \n
 * 5. 複数連続する空白行:   \n\n\n → \n に正規化
 *
 ************************************/
function removeBlankLines() {
  const button = document
    .querySelector('#remove-blank-lines')
    .nextElementSibling.querySelector('.container__button')
  const inputElement = document.getElementById('remove-blank-lines')
  const outputElement = document.getElementById('remove-blank-lines-output')

  try {
    const processedText = inputElement.value
      .replace(/\n[\s\t]+\n/g, '\n') // 空白/タブ行を削除
      .replace(/\n{2,}/g, '\n') // 連続改行を正規化
      .trim()

    if (!processedText) {
      showFeedback(button, 'Please enter text!', 'error')
      return
    }

    outputElement.textContent = processedText
    navigator.clipboard
      .writeText(processedText)
      .then(() => showFeedback(button))
      .catch(() => showFeedback(button, 'Copy failed', 'error'))
  } catch (error) {
    console.error('Error:', error)
    showFeedback(button, `Error: ${error.message}`, 'error')
  }
}

/************************************
 ** Trim whitespace from both ends of each line
 ************************************/
function trimLineWhitespace() {
  const button = document
    .querySelector('#trim-line-whitespace')
    .nextElementSibling.querySelector('.container__button')
  const inputElement = document.getElementById('trim-line-whitespace')
  const outputElement = document.getElementById('trim-line-whitespace-output')

  try {
    const processedText = inputElement.value
      .split('\n')
      .map((line) => line.trim())
      .join('\n')

    if (!processedText) {
      showFeedback(button, 'Please enter text!', 'error')
      return
    }

    outputElement.textContent = processedText
    navigator.clipboard
      .writeText(processedText)
      .then(() => showFeedback(button))
      .catch(() => showFeedback(button, 'Copy failed', 'error'))
  } catch (error) {
    console.error('Error:', error)
    showFeedback(button, `Error: ${error.message}`, 'error')
  }
}

/************************************
 * フィードバック表示関数（動的生成）
 *
 * 【設計思想】
 * 1. 関心の分離 - HTML構造に依存せずJSで完全制御
 * 2. DRY原則 - 複数ボタンでUIを共有
 * 3. 状態管理 - 表示/非表示をJSで一元管理
 *
 * @param {HTMLElement} button - トリガーとなったボタン要素
 * @param {string} message - 表示メッセージ（デフォルト: 'Copied!'）
 * @param {'success'|'error'} type - フィードバックタイプ（デフォルト: 'success'）
 ************************************/
function showFeedback(button, message = 'Copied!', type = 'success') {
  // 既存フィードバックをクリーンアップ
  const existingFeedback =
    button.parentElement.querySelector('.feedback-bubble')
  if (existingFeedback) existingFeedback.remove()

  // フィードバック要素を動的生成
  const feedback = document.createElement('div')
  feedback.className = `feedback-bubble ${type}`
  feedback.textContent = message

  // DOMに追加
  button.parentElement.appendChild(feedback)

  // 自動消去設定
  setTimeout(() => {
    feedback.classList.add('fade-out')
    setTimeout(() => feedback.remove(), 200)
  }, 2000)
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
