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
})
