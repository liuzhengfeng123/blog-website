<template>
  <div
    class="fence-code-block"
    @mouseenter="codeHovering = true"
    @mouseleave="codeHovering = false"
  >
    <transition name="fade">
      <el-button
        v-show="codeHovering"
        class="copy-code-btn"
        size="mini"
        title="Copy Code"
        icon="el-icon-copy-document"
        @click="copyCode"
      />
    </transition>
    <pre><code ref="codeRef" v-text="codeContent" /></pre>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    codeContent: String
  }
})
export default class FenceCodeBlock extends Vue {
  codeHovering = false

  async copyCode() {
    const codeElement = this.$refs.codeRef
    try {
      await navigator.clipboard.writeText(codeElement.textContent)
      this.$message.success('代码已复制到剪贴板')
    } catch (err) {
      this.$message.success('❌ 复制失败：' + err)
    }
  }
}
</script>
<style lang="scss" scoped>
.fence-code-block {
  position: relative;
}
</style>
