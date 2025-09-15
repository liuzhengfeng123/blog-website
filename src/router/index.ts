import VueRouter, { RouterOptions } from 'vue-router'

const routes: RouterOptions['routes'] = [
  {
    name: 'virtualScroll',
    path: '*',
    component: () => import('@/views/componentDisplay/el-tree-virtual-scroll.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
