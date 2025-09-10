import MarkdownIt from "markdown-it";
import container from './containers.js'
import overWriteFenceRule from './fence.js'

const md = MarkdownIt({
  html: true
}).use(container).use(overWriteFenceRule)

export default md