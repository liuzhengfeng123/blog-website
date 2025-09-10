import mdContainer from 'markdown-it-container'
const reg = /^demo\s*(.*)$/

export default (md) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(reg)
    },
    render(tokens, idx) {
      const token = tokens[idx]
      // 开标签
      if (token.nesting === 1) {
        console.log({ tokens, token })
        const m = token.info.trim().match(reg)
        const description = m && m[1].length > 1 ? m[1] : ''
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--element-demo: ${content}:element-demo-->
        `
      }
      return '</demo-block>';
    }
  })
}
