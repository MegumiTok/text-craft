/**
 * Extracts Markdown headers (h1-h4) from text content
 *
 * @param {string} text - Input Markdown-formatted text
 * @returns {string[]} Array of header texts (without # symbols)
 *
 * @example
 * // Returns: ["Document", "Chapter", "Section", "Subsection"]
 * extractHeaders(`
 * # Document
 * ## Chapter
 * Content here...
 * ### Section
 * #### Subsection
 * ##### Not extracted (h5+ ignored)
 * `);
 *
 * @description
 * Matching Rules:
 * 1. Supports ATX-style headers only (no underline syntax)
 * 2. Requires 1-4 # symbols at line start (^ anchor)
 * 3. Mandatory single space after # symbols
 * 4. Preserves special characters in header text
 *
 * @throws {TypeError} If input is not a string *
 */
export function extractHeaders(text) {
  if (typeof text !== 'string') {
    throw new TypeError('Input must be a string')
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
    output.value = extractHeaders(input.value).join('\n')
  })
}
