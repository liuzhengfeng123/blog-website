import md from './config.js'

function loader(source) {
  const content = md.render(source)
  console.log(content)
  return `export default ${JSON.stringify(source)}`
}

export default loader
