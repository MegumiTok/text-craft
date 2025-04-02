/**
 * Extracts headers with hierarchy information
 *
 * @param {string} text - Markdown content
 * @returns {Array<{level: number, text: string}>} Header objects with depth
 *
 * @example
 * // Returns this structured data:
 * [
 *   { level: 1, text: 'River Adventures' },
 *   { level: 2, text: 'Whitewater Rafting' },
 *   { level: 3, text: 'Best Rivers for Beginners' },
 *   { level: 4, text: '1. Wisconsin River' },
 *   { level: 4, text: '2. Salmon River' }
 * ]
 *
 * // Which later gets formatted as:
 * // - River Adventures
 * //   - Whitewater Rafting
 * //     - Best Rivers for Beginners
 * //       - 1. Wisconsin River
 * //       - 2. Salmon River
 *
 * @description
 * Turns this:
 * # River Adventures
 * ## Whitewater Rafting
 * ### Best Rivers for Beginners
 * #### 1. Wisconsin River
 *
 * Into this beautiful hierarchy
 */
export function extractHierarchy(text) {
  if (typeof text !== 'string') {
    throw new TypeError('String input required')
  }

  const headers = [...text.matchAll(/^(#{1,4})\s+(.+)$/gm)]
  return headers.map((match) => ({
    level: match[1].length, // Number of # symbols
    text: match[2].trim(),
  }))
}

/**
 * Formats headers as indented hierarchy
 * @param {Array<{level: number, text: string}>} headers
 * @returns {string} Indented tree structure
 */
export function formatHierarchy(headers) {
  let result = ''
  let lastLevel = 0

  headers.forEach((header) => {
    const indent = '  '.repeat(header.level - 1)

    // Add newline when going back to higher level
    if (header.level < lastLevel) {
      result += '\n'
    }

    result += `${indent}- ${header.text}\n`
    lastLevel = header.level
  })

  return result
}

/**
 * Module initialization
 * @param {HTMLElement} container - Module root element
 */
export function init(container) {
  const input = container.querySelector('[data-input]')
  const button = container.querySelector('[data-process]')
  const output = container.querySelector('[data-output]')

  button.addEventListener('click', () => {
    try {
      const headers = extractHierarchy(input.value)
      output.innerHTML = `<pre>${formatHierarchy(headers)}</pre>`
    } catch (err) {
      output.innerHTML = `<div class="error">${err.message}</div>`
    }
  })
}
