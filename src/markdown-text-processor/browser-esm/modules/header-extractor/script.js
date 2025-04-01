export function extractHeaders(text) {
  return [...text.matchAll(/^#{1,3}\s+(.+)$/gm)].map((m) => m[1])
}

export function init(container) {
  const input = container.querySelector('[data-input]')
  const button = container.querySelector('[data-process]')
  const output = container.querySelector('[data-output]')

  button.addEventListener('click', () => {
    output.value = extractHeaders(input.value).join('\n')
  })
}
