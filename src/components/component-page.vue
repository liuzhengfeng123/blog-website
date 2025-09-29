<template>
  <div class="page-component">
    <div class="header-placeholder" />
    <div class="page-component__content" @scroll="handleScroll">
      <div class="page-component__container">
        <div ref="main" class="page-component__main">
          <slot :on-mounted="onMarkdownMounted" />
        </div>
        <aside class="page-component__aside">
          <toc-outline ref="tocOutlineRef" :data="tocList" />
        </aside>
      </div>
    </div>
  </div>
</template>
<script>
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
import TocOutline from '@/components/toc-outline'
import { throttle } from '../utils'

hljs.registerLanguage('vue', xml)
hljs.registerLanguage('javascript', javascript)

export default {
  name: 'ComponentPage',
  components: {
    TocOutline
  },
  data() {
    return {
      tocList: []
    }
  },
  mounted() {
    const codeElements = document.querySelectorAll('pre code')
    if (codeElements.length > 0) {
      codeElements.forEach((el) => hljs.highlightElement(el))
    }
  },
  methods: {
    onMarkdownMounted() {
      this.generateToc()
    },
    generateToc() {
      this.tocList = []
      let count = 0
      let childrenList = this.$refs.main.querySelector('.element-doc').children
      let headerList = Array.from(childrenList).filter((ele) =>
        ['h2', 'h3'].includes(ele.tagName.toLowerCase())
      )

      function getHeadElementLevel(element) {
        return Number(element.tagName[1])
      }

      for (let i = 0; i < headerList.length; i++) {
        const cur = headerList[i]
        const ret = {
          title: cur.id,
          level: getHeadElementLevel(cur),
          order: count++,
          children: []
        }
        if (i === 0) {
          this.tocList.push(ret)
          continue
        }
        const prev = this.tocList[this.tocList.length - 1]
        if (ret.level > prev.level) {
          prev.children.push(ret)
        } else {
          this.tocList.push(ret)
        }
      }
    },
    handleScroll: throttle(function (e) {
      this.$refs.tocOutlineRef?.highlightToc(e)
    }, 100)
  }
}

</script>
<style lang="scss" scoped>
.header-placeholder {
  height: 60px;
}

.page-component__content {
  height: calc(100vh - 60px);
  overflow: auto;
}

.page-component__container {
  display: flex;
  justify-content: center;
  padding-left: 300px;
  max-width: 1480px;
  margin: 0 auto;
}

.page-component__main {
  width: calc(100% - 300px);
  max-width: 870px;
  padding-top: 20px;
}

.page-component__aside {
  width: 300px;
  padding-left: 60px;
  flex-shrink: 0;
}

@media screen and (max-width: 1280px) {

  .page-component__container {
    padding-left: 0;
  }

  .page-component__main {
    padding: {
      left: 40px;
      right: 40px;
    }
  }
}

@media screen and (max-width: 960px) {
  .page-component__main {
    width: 100%;
  }
  .page-component__aside {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .page-component__main {
    width: 100%;

    padding: 10px;

    ::v-deep table {
      display: block;
    }
  }
}
</style>
