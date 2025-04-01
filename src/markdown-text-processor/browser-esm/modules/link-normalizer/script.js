/**
 * Wikilink正規化ロジック
 * @param {string} text - 入力テキスト
 * @returns {string} 正規化されたテキスト
 *
 * 処理ルール:
 * 1. [[A|B]] → Bだけ残す
 * 2. [[A]] → Aだけ残す
 */

export function normalizeLinks(text) {
  return text.replace(
    /\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g,

    (_, display, target) => display || target
  )
}

/**
 * @param {HTMLElement} container - モジュールのルート要素
 */

export function init(container) {
  // DOM依存のないコード
  const input = container.querySelector('[data-input]')
  const button = container.querySelector('[data-process]')
  const output = container.querySelector('[data-output]')
  button.addEventListener('click', () => {
    output.innerHTML = `<pre>${normalizeLinks(input.value)}</pre>`
  })
}
