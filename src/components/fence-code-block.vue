<template>
  <div
    class="fence-code-block"
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
    <pre><code ref="codeRef" :class="language" v-text="codeContent" /></pre>
  </div>
</template>
<script>
export default {
  name: 'FenceCodeBlock',
  props: {
    codeContent: String,
    language: String
  },
  data() {
    return {
      codeHovering: false
    }
  },
  methods: {
    async copyCode() {
      const codeElement = this.$refs.codeRef
      try {
        let code = codeElement.textContent
        if (code[code.length - 1].codePointAt() === 10) {
          code = code.slice(0, -1)
        }
        await navigator.clipboard.writeText(code)
        this.$message.success('代码已复制到剪贴板')
      } catch (err) {
        this.$message.error('❌ 复制失败：' + err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.fence-code-block {
  position: relative;
}
</style>
