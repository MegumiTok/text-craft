import { extractRawHeader } from './script.js'

describe('extractPureHeader', () => {
  test('extracts h1-h4 headers from markdown text', () => {
    const input = `
# Document
## Chapter
Content here...
### Section
#### Subsection
##### Not extracted (h5+ ignored)
    `
    const expected = [
      '# Document',
      '## Chapter',
      '### Section',
      '#### Subsection',
    ]
    expect(extractRawHeader(input)).toEqual(expected)
  })
  test('preserves special characters in headers', () => {
    const input = `
# Header with $pec!@l ch4r5
## 日本語もOK
        `
    const expected = ['# Header with $pec!@l ch4r5', '## 日本語もOK']
    expect(extractRawHeader(input)).toEqual(expected)
  })

  test('頭にスペースがあるヘッダーのみを抽出できる', () => {
    const input = `
    # スペースありヘッダー
      ## スペースたくさん
# スペースなしヘッダー
## スペースなし
      ### スペースあり
  `
    const expected = ['# スペースなしヘッダー', '## スペースなし']
    expect(extractRawHeader(input)).toEqual(expected)
  })

  test('タグ付きタイトルの挙動', () => {
    const input = `
# タイトルです #タグです
## わたしもタイトルです #再びタグです
  `
    const expected = [
      '# タイトルです #タグです',
      '## わたしもタイトルです #再びタグです',
    ]
    expect(extractRawHeader(input)).toEqual(expected)
  })

  test('returns empty array for text without headers', () => {
    expect(extractRawHeader('Plain text')).toEqual([])
  })

  test('throws TypeError for non-string input', () => {
    expect(() => extractRawHeader(null)).toThrow(TypeError)
    expect(() => extractRawHeader(123)).toThrow(TypeError)
    expect(() => extractRawHeader({})).toThrow(TypeError)
  })
})
