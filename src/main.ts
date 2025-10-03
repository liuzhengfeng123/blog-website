import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import App from './App.vue'
import './plugins/element'
import DemoBlock from './components/demo-block.vue'
import FenceCodeBlock from './components/fence-code-block.vue'
import ComponentPage from './components/component-page.vue'
import VirtualScroll from 'el-tree-virtual-scroll'
import 'el-tree-virtual-scroll/styles/index.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import './styles/common.scss'
import './styles/component-page.scss'
import './styles/demo.scss'
import './styles/transition.css'
import './styles/_theme.scss'

Vue.use(VueRouter)
// Vue.use(ElementUI)
Vue.component('demo-block', DemoBlock)
Vue.component('fence-code-block', FenceCodeBlock)
Vue.component('ComponentPage', ComponentPage)
Vue.component('virtual-scroll', VirtualScroll)

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App as Vue.Component)
})
