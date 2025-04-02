/**
 * Grabs raw markdown headers exactly as they appear (with # symbols)
 *
 * @param {string} text - Input Markdown-formatted text
 * @returns {string[]} Array of header texts (with # symbols intact)
 *
 * @example
 * // Returns: ["# My Awesome Doc", "## Chapter 1: Beginnings", "### The Plot Thickens"]
 * extractRawHeaders(`
 * # My Awesome Doc
 * ## Chapter 1: Beginnings
 * It was a dark and stormy night...
 * ### The Plot Thickens
 * Suddenly, a JavaScript error appeared!
 * `);
 *
 * @throws {TypeError} If input is not a string
 */
export function extractRawHeader(text) {
  if (typeof text !== 'string') {
    throw new TypeError('Feed me strings please! 🍝')
  }
  return [...text.matchAll(/^#{1,4}\s+(.+)$/gm)].map((m) => m[0].trim())
}

/**
 * @param {HTMLElement} container - モジュールのルート要素
 */
export function init(container) {
  const input = container.querySelector('[data-input]')
  const button = container.querySelector('[data-process]')
  const output = container.querySelector('[data-output]')

  button.addEventListener('click', () => {
    output.innerHTML = `<pre>${extractRawHeader(input.value).join('\n')}</pre>`
  })
}
