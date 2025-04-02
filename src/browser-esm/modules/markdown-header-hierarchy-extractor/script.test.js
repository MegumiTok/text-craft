import { extractHierarchy, formatHierarchy } from './script.js'

describe('Header Hierarchy Extraction', () => {
  describe('extractHierarchy', () => {
    test('extracts h1-h4 headers with level info', () => {
      const input = `
# Document
## Chapter
Content here...
### Section
#### Subsection
##### Not extracted (h5+ ignored)
      `

      const expected = [
        { level: 1, text: 'Document' },
        { level: 2, text: 'Chapter' },
        { level: 3, text: 'Section' },
        { level: 4, text: 'Subsection' },
      ]

      expect(extractHierarchy(input)).toEqual(expected)
    })

    test('throws TypeError for non-string input', () => {
      expect(() => extractHierarchy(null)).toThrow(TypeError)
      expect(() => extractHierarchy(123)).toThrow(TypeError)
      expect(() => extractHierarchy({})).toThrow(TypeError)
    })

    test('preserves special characters in headers', () => {
      const input = `
# Header with $pec!@l ch4r5
## 日本語もOK
          `

      const expected = [
        { level: 1, text: 'Header with $pec!@l ch4r5' },
        { level: 2, text: '日本語もOK' },
      ]

      expect(extractHierarchy(input)).toEqual(expected)
    })
  })

  describe('formatHierarchy', () => {
    test('handles empty input', () => {
      expect(formatHierarchy([])).toBe('')
    })
    test('formats basic hierarchy correctly', () => {
      const input = [
        { level: 1, text: 'Main Title' },
        { level: 2, text: 'Section' },
        { level: 3, text: 'Subsection' },
      ]

      const expected = `- Main Title
  - Section
    - Subsection
`

      expect(formatHierarchy(input)).toBe(expected)
    })

    test('ignores non-header content in markdown', () => {
      const input = `
Here's some introductory text...
# Document Title
This paragraph explains something.
## Section 1
\`\`\`javascript
// Code blocks should be ignored
const example = "Markdown";
\`\`\`
### Subsection 1.1
- List items
- Should not appear
#### Details
Some more body text...
## Section 2
### Subsection 2.1
`

      const expectedOutput = [
        { level: 1, text: 'Document Title' },
        { level: 2, text: 'Section 1' },
        { level: 3, text: 'Subsection 1.1' },
        { level: 4, text: 'Details' },
        { level: 2, text: 'Section 2' },
        { level: 3, text: 'Subsection 2.1' },
      ]

      expect(extractHierarchy(input)).toEqual(expectedOutput)
    })
  })
})
