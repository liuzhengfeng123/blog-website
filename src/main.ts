import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import App from './App.vue'
import './plugins/element'
import DemoBlock from './components/demo-block.vue'
import ComponentPage from './components/component-page.vue'
import VirtualScroll from 'el-tree-virtual-scroll'
import 'el-tree-virtual-scroll/styles/index.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import './styles/common.scss'
import './styles/demo.scss'

Vue.use(VueRouter)
// Vue.use(ElementUI)
Vue.component('demo-block', DemoBlock)
Vue.component('ComponentPage', ComponentPage)
Vue.component('virtual-scroll', VirtualScroll)

new Vue({
  el: '#app',
  router,
  render: (h) => h(App as Vue.Component)
})
