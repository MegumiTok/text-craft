import { normalizeLinks, init } from './script.js'

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

/**
 * @jest-environment jsdom
 */

describe('init', () => {
  let container, input, button, output

  beforeEach(() => {
    // テスト用DOMをセットアップ
    container = document.createElement('div')
    container.innerHTML = `
      <input data-input type="text">
      <button data-process>Process</button>
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

  test('ボタンクリックでリンクを正規化', () => {
    input.value = '[[Hello|World]]'
    button.click()
    expect(output.innerHTML).toBe('<pre>Hello</pre>')
  })

  test('空入力で空の出力', () => {
    input.value = ''
    button.click()
    expect(output.innerHTML).toBe('<pre></pre>')
  })
})
