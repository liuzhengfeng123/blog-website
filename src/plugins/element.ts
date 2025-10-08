import Vue from 'vue'

import {
  Button,
  Input,
  Popover,
  Message
} from 'element-ui'

const components = [
  Button,
  Input,
  Popover
]

components.forEach(component => Vue.use(component))

// eslint-disable-next-line
Vue.prototype.$message = Message