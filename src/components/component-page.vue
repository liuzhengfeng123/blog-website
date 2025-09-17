<template>
  <div class="page-container">
    <div class="page-component">
      <div class="page-content">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('vue', xml)
hljs.registerLanguage('javascript', javascript)

@Component
export default class ComponentPage extends Vue {
  mounted() {
    const codeElements = document.querySelectorAll('pre code')
    if (codeElements.length > 0) {
      codeElements.forEach(el => hljs.highlightElement(el))
    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  position: relative;
  width: 870px;
  margin: 0 auto;
}

aside {
  position: sticky;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 240px;
  height: calc(100vh - 60px);
  padding-top: 50px;
  overflow: auto;
}

.page-component {
  padding-top: 50px;
}
</style>
