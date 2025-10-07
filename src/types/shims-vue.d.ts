declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.md' {
  import Vue from 'vue'
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions<Vue>
  export default component
}

declare module 'el-tree-virtual-scroll' {
  import Vue from 'vue'
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions<Vue>
  export default component
}

declare module 'element-ui' {
  const component: any
  export default component
}