import { normalizeLinks } from './script.js'

describe('normalizeLinks', () => {
  test('[[A|B]]形式をBに変換', () => {
    expect(normalizeLinks('[[A|B]]')).toBe('A')
  })

  test('[[A]]形式をAに変換', () => {
    expect(normalizeLinks('[[A]]')).toBe('A')
  })

  test('複数のリンクを変換', () => {
    const input = 'Before [[A|B]] middle [[C]] after'
    const expected = 'Before A middle C after'
    expect(normalizeLinks(input)).toBe(expected)
  })

  test('空文字列をそのまま返す', () => {
    expect(normalizeLinks('')).toBe('')
  })
})
