async function loadModule(name) {
  const { init } = await import(`./modules/${name}/script.js`)
  const { config } = await import(`./modules/${name}/config.js`)
  const template = await fetch('./modules/template.html').then((r) => r.text())

  const container = document.createElement('div')

  container.innerHTML = template
    .replace('${moduleName}', name)
    .replace('${title}', config.title)
    .replace('${placeholder}', config.placeholder)
    .replace('${defaultText}', config.defaultText)
    .replace('${buttonText}', config.buttonText)

  document.querySelector('main').appendChild(container)
  init(container.firstElementChild)
}

loadModule('markdown-pure-header-extractor')
loadModule('markdown-raw-header-extractor')
loadModule('markdown-header-hierarchy-extractor')
loadModule('link-normalizer')
