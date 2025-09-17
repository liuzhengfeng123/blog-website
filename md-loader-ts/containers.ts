import type MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import type { ContainerOpts } from 'markdown-it-container'
const reg = /^demo\s*(.*)$/

export default (md: MarkdownIt) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(reg)
    },
    render(tokens, idx) {
      const token = tokens[idx]
      // 开标签
      if (token.nesting === 1) {
        const m = token.info.trim().match(reg)
        const description = m && m[1].length > 1 ? m[1] : ''
        const nextToken = tokens[idx + 1]
        let content = ''
        if (nextToken.type === 'fence') {
          content = nextToken.content
        } else if (
          nextToken.type === 'html_block' &&
          nextToken.content.includes('<!-- prettier-ignore -->')
          && tokens[idx + 2].type === 'fence'
        ) {
          content = tokens[idx + 2].content
        }
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--element-demo: ${content}:element-demo-->
        `
      }
      return '</demo-block>'
    }
  } as ContainerOpts)
}
