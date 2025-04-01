async function loadModule(name) {
  const { init } = await import(`./modules/${name}/script.js`)

  const template = await fetch(`./modules/${name}/template.html`).then((r) =>
    r.text()
  )

  const container = document.createElement('div')

  container.innerHTML = template

  document.querySelector('main').appendChild(container)

  init(container.firstElementChild)
}

loadModule('header-extractor')

loadModule('link-normalizer')
