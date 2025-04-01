import { extractHeaders, init } from './script.js'

describe('extractHeaders', () => {
  test('extracts h1-h4 headers from markdown text', () => {
    const input = `
# Document
## Chapter
Content here...
### Section
#### Subsection
##### Not extracted (h5+ ignored)
    `
    const expected = ['Document', 'Chapter', 'Section', 'Subsection']
    expect(extractHeaders(input)).toEqual(expected)
  })

  test('requires space after # symbols', () => {
    const input = `
#Valid
## Invalid
###Also invalid
    `
    expect(extractHeaders(input)).toEqual(['Invalid'])
  })
  test('preserves special characters in headers', () => {
    const input = `
# Header with $pec!@l ch4r5
## 日本語もOK
      `
    const expected = ['Header with $pec!@l ch4r5', '日本語もOK']
    expect(extractHeaders(input)).toEqual(expected)
  })

  test('頭にスペースがあるヘッダーのみを抽出できる', () => {
    const input = `
  # スペースありヘッダー
    ## スペースたくさん
# スペースなしヘッダー
## スペースなし
    ### スペースあり
`
    const expected = ['スペースなしヘッダー', 'スペースなし']
    expect(extractHeaders(input)).toEqual(expected)
  })

  test('タグ付きタイトルの挙動', () => {
    const input = `
# タイトルです #タグです
## わたしもタイトルです #再びタグです
`
    const expected = [
      'タイトルです #タグです',
      'わたしもタイトルです #再びタグです',
    ]
    expect(extractHeaders(input)).toEqual(expected)
  })

  test('returns empty array for text without headers', () => {
    expect(extractHeaders('Plain text')).toEqual([])
  })

  test('throws TypeError for non-string input', () => {
    expect(() => extractHeaders(null)).toThrow(TypeError)
    expect(() => extractHeaders(123)).toThrow(TypeError)
    expect(() => extractHeaders({})).toThrow(TypeError)
  })
})

/**
 * @jest-environment jsdom
 */
describe('init', () => {
  let container, input, button, output

  beforeEach(() => {
    // Set up test DOM
    container = document.createElement('div')
    container.innerHTML = `
      <textarea data-input></textarea>
      <button data-process>Extract</button>
      <div data-output></div>
    `
    document.body.appendChild(container)

    input = container.querySelector('[data-input]')
    button = container.querySelector('[data-process]')
    output = container.querySelector('[data-output]')

    init(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  test('processes markdown and displays headers on button click', () => {
    input.value = `
# Main Title
## Subtitle
Content
### Section
    `
    button.click()
    expect(output.innerHTML).toBe('<pre>Main Title\nSubtitle\nSection</pre>')
  })

  test('handles empty input gracefully', () => {
    input.value = ''
    button.click()
    expect(output.innerHTML).toBe('<pre></pre>')
  })

  test('preserves header order and formatting', () => {
    input.value = `
### Third
# First
#### Fourth
## Second
    `
    button.click()
    expect(output.innerHTML).toBe('<pre>Third\nFirst\nFourth\nSecond</pre>')
  })
})
