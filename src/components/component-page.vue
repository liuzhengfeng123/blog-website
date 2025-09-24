<template>
  <div class="page-component">
    <div class="header-placeholder" />
    <div class="page-component__main">
      <div class="page-component__content">
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
.header-placeholder {
  height: 60px;
}

.page-component__main {
  height: calc(100vh - 60px);
  overflow: auto;
}

.page-component__content {
  width: 870px;
  padding-top: 20px;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .page-component__content {
    width: 100%;

    padding: 10px;

    ::v-deep table {
      display: block;
    }
  }
}
</style>
