import MarkdownIt from "markdown-it";
import container from './containers'
import overWriteFenceRule from './fence'

const md = MarkdownIt({
  html: true
}).use(container).use(overWriteFenceRule)

export default md