<template>
  <div class="toc-container">
    <div class="outline-marker" :style="{
      top: markerTop + 'px',
      opacity: activeTocOrder === -1 ? 0 : 1
    }" />
    <h6 class="outline-title">CONTENTS</h6>
    <virtual-scroll
      :data="data"
      :props="defaultProps"
      node-key="title"
      :indent="14"
      default-expand-all
      :expand-on-click-node="false"
    >
      <template #default="{ node }">
        <a
          :class="['outline-link', { 'is-active': node.data.order === activeTocOrder }]"
          :href="'#' + node.data.title"
          >{{ node.data.title }}</a
        >
      </template>
    </virtual-scroll>
  </div>
</template>
<script>
export default {
  name: 'TocOutline',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      defaultProps: {
        label: 'title'
      },
      activeTocOrder: -1
    }
  },
  computed: {
    flatTocList() {
      let origin = [...this.data]
      let ret = []
      while (origin.length > 0) {
        const node = origin.shift()
        ret.push(node)
        if (Array.isArray(node.children) && node.children.length > 0) {
          for (let i = node.children.length - 1; i >= 0; i--) {
            origin.unshift(node.children[i])
          }
        }
      }
      return ret
    },
    markerTop() {
      if(this.activeTocOrder < 0) {
        return 0
      } else if(this.activeTocOrder === 0) {
        return 32
      } else {
        return 32 + this.activeTocOrder * 28
      }
    }
  },
  methods: {
    highlightToc(e) {
      const { scrollTop, clientHeight, scrollHeight } = e.target
      if (scrollTop === 0) {
        this.activeTocOrder = -1
      } else if (scrollTop + clientHeight + 1 >= scrollHeight) {
        this.activeTocOrder = this.flatTocList.length > 0 ? this.flatTocList.length - 1 : -1
      } else {
        let activeId = -1
        const viewportHeight = window.innerHeight
        for (let i = 0; i < this.flatTocList.length; i++) {
          const h = this.flatTocList[i]
          const ele = document.getElementById(h.title)
          if (scrollTop > ele.offsetTop) {
            activeId = i
            const next = this.flatTocList[i + 1]
            const nextElm = document.getElementById(next.title)
            if (next && nextElm.offsetTop < scrollTop + viewportHeight * 0.3) {
              activeId = i + 1
            }
          } else if (i === 0 && ele.offsetTop < scrollTop + viewportHeight * 0.3) {
            activeId = i
          }
        }
        this.activeTocOrder = activeId
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.toc-container {
  position: sticky;
  margin-top: 60px;
  top: 30px;
}

.el-tree ::v-deep {
  .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }

  .el-tree-node__content {
    height: 28px;

    &:hover {
      background-color: transparent;
    }
  }
}

.outline-title {
  line-height: 24px;
  margin: 0 0 4px;
}

.outline-marker {
  position: absolute;
  width: 4px;
  height: 20px;
  background-color: #409eff;
  top: 0;
  left: -12px;
  border-radius: 4px;
  transition: top .25s cubic-bezier(0,1,.5,1),opacity .25s;
}

.outline-link {
  display: block;
  width: 100%;
  font:
    500 13px / 28px Quotes,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  text-decoration: none;
  color: rgba(60, 60, 60, 0.7);
  transition: color 0.5s;

  &:hover,
  &.is-active {
    color: #409eff;
  }
}
</style>
