/**
 * Grabs all markdown headers (h1-h4) from text
 * Extracts just the header text content (strips out # symbols)
 *
 * @param {string} text - Markdown content to scan
 * @returns {string[]} Array of header texts (without the # symbols)
 *
 * @example
 * // Returns: ["Document", "Chapter", "Section"]
 * extractPureHeader(`
 * # Document
 * ## Chapter
 * Some content...
 * ### Section
 * More content
 * `);
 *
 * @description
 * How it works:
 * - Only grabs ATX-style headers (using # symbols)
 * - Looks for 1-4 # symbols at start of line
 * - Needs space after #s to count
 *   - Good: "## Header"
 *   - Bad: "##Header" (missing space)
 * - Keeps any special chars in the header text
 * - Skips h5+ headers (too deep)
 *
 * @throws {TypeError} If you pass something that's not a string
 */
export function extractPureHeader(text) {
  if (typeof text !== 'string') {
    throw new TypeError('Feed me strings please! 🍝')
  }
  return [...text.matchAll(/^#{1,4}\s+(.+)$/gm)].map((m) => m[1].trim())
}

/**
 * @param {HTMLElement} container - モジュールのルート要素
 */
export function init(container) {
  const input = container.querySelector('[data-input]')
  const button = container.querySelector('[data-process]')
  const output = container.querySelector('[data-output]')

  button.addEventListener('click', () => {
    output.innerHTML = `<pre>${extractPureHeader(input.value).join('\n')}</pre>`
  })
}
