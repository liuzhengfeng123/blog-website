import MarkdownIt from "markdown-it";
import container from './containers'
import overWriteFenceRule from './fence'
import anchorPlugin from 'markdown-it-anchor'

const md = MarkdownIt({
  html: true
}).use(anchorPlugin, {
  level: 2,
  permalink: anchorPlugin.permalink.headerLink({ safariReaderFix: true }),
  slugify(str) {
    return str
  }
}).use(container).use(overWriteFenceRule)

export default md