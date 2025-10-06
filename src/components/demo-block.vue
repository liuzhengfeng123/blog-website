<template>
  <div class="demo-block" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <div class="source">
      <slot name="source" />
    </div>
    <div ref="meta" class="meta">
      <div v-if="$slots.default" class="description">
        <slot />
      </div>
      <div
        class="highlight"
        @mouseenter="codeHovering = true"
        @mouseleave="codeHovering = false"
      >
        <transition name="fade">
          <div
            v-show="codeHovering"
            class="copy-code-btn"
            title="Copy Code"
            @click="copyCode"
          >
            <i class="el-icon-copy-document"></i>
          </div>
        </transition>
        <slot name="highlight" />
      </div>
    </div>
    <div class="demo-block-control" :style="{
      borderWidth: isExpanded ? '1px' : '0'
    }" @click="isExpanded = !isExpanded">
      <i :class="[iconClass, { hovering: hovering }]" />
      <transition name="text-slide">
        <span v-show="hovering">显示代码</span>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isExpanded: false,
      hovering: false,
      codeAreaHeight: 0,
      codeHovering: false
    }
  },
  computed: {
    iconClass() {
      return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
    }
  },
  watch: {
    isExpanded(val) {
      this.$refs.meta.style.height = val ? this.codeAreaHeight + 'px' : 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.calculateCodeAreaHeight()
    })
  },
  methods: {
    async copyCode() {
      const codeElement = this.$refs.meta.querySelector('pre code')
      try {
        await navigator.clipboard.writeText(codeElement.textContent)
        this.$message.success('代码已复制到剪贴板')
      } catch (err) {
        this.$message.error('❌ 复制失败：' + err)
      }
    },
    calculateCodeAreaHeight() {
      const descriptionBlock = this.$refs.meta.querySelector('.description')
      const codeBlock = this.$refs.meta.querySelector('.highlight')

      this.codeAreaHeight =
        [descriptionBlock, codeBlock]
          .filter((item) => item)
          .reduce((total, cur) => {
            return total + cur.clientHeight
          }, 0) + (descriptionBlock ? 20 : 0)
    }
  }
}
</script>
<style lang="scss" scoped>
.demo-block {
  border: solid 1px var(--divider-light);
  border-radius: 3px;
  transition: box-shadow 0.2s, border-color $theme-switch-transition-duration;

  &.hover {
    box-shadow:
      0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }


  .source {
    padding: 24px;
  }

  .meta {
    border-top: solid 1px var(--divider-light);
    height: 0;
    overflow: hidden;
    transition: height 0.2s, border-color $theme-switch-transition-duration;
  }

  .highlight {
    position: relative;
  }

  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px var(--divider-light);
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    word-break: break-word;
    margin: 10px;
    transition: border-color $theme-switch-transition-duration;

    p {
      margin: 0;
      line-height: 26px;
    }

    code {
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
      box-sizing: content-box;
    }
  }

  .demo-block-control {
    border-top: solid 1px var(--divider-light);
    height: 44px;
    box-sizing: border-box;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
    transition: border-color $theme-switch-transition-duration;

    i {
      font-size: 16px;
      line-height: 44px;
      transition: 0.3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }

    > span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: 0.3s;
      display: inline-block;
    }

    &:hover {
      color: #409eff;
    }

    & .text-slide-enter,
    & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }
  }
}
</style>
