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

@media (max-width: 768px) {
  .page-container {
    width: 100%;
  }
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
  // width: calc(100% - 240px);
  padding-top: 50px;
  // margin-left: 270px;
}

.page-content ::v-deep {
  table {
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 45px;
    line-height: 1.5em;

    strong {
      font-weight: normal;
    }

    td,
    th {
      border-bottom: 1px solid #dcdfe6;
      padding: 15px;
      max-width: 250px;
    }

    th {
      text-align: left;
      white-space: nowrap;
      color: #909399;
      font-weight: normal;
    }

    td {
      color: #606266;
    }

    th:first-child,
    td:first-child {
      padding-left: 10px;
    }
  }
}
</style>
