import md from './config'
import { stripTemplate, stripScript, genInlineComponentText } from './utils'

function loader(source: string) {
  const content = md.render(source)

  const startTag = '<!--element-demo:'
  const startTagLen = startTag.length
  const endTag = ':element-demo-->'
  const endTagLen = endTag.length

  let componenetsString = ''
  let id = 0 // demo 的 id
  let output: string[] = [] // 输出的内容
  let start = 0 // 字符串开始位置

  let commentStart = content.indexOf(startTag)
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen)

  while (commentStart > -1 && commentEnd > -1) {
    output.push(content.slice(start, commentStart))
    const commentContent = content.slice(commentStart + startTagLen, commentEnd)
    const html = stripTemplate(commentContent)
    const script = stripScript(commentContent)
    let demoComponentContent = genInlineComponentText(html, script)
    const demoComponentName = `element-demo${id}`
    output.push(`<template slot="source"><${demoComponentName} /></template>`)
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`
    id++
    start = commentEnd + endTagLen
    commentStart = content.indexOf(startTag, start)
    commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  }

  output.push(content.slice(start))

  let pageScript = ''
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        props: ['onMounted'],
        components: {
          ${componenetsString}
        },
        mounted() {
          this.onMounted()
        }
      }
    </script>`
  } else if (content.indexOf('<script>') === 0) {
    // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length
    pageScript = content.slice(0, start)
  }

  return `
    <template>
      <section class="content element-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
  `
}

export default loader
