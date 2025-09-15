<template>
  <div id="app">
    <header>
      <span>el-tree-virtual-scroll</span>
      <a
        href="https://github.com/liuzhengfeng123/el-tree-virtual-scroll.git"
        target="_blank"
      >
        <github-icon />
      </a>
    </header>
    <section>
      <div class="head-placeholder" />
      <main>
        <router-view />
      </main>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import GithubIcon from '@/assets/svg/github-icon.vue'

@Component({
  components: {
    GithubIcon
  }
})
export default class App extends Vue {}
</script>
<style lang="scss" scoped>
header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid #eee;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 20px;
  box-sizing: border-box;
  background-color: #fff;

  z-index: 2;
}

section {
  .head-placeholder {
    height: 60px;
  }
}
</style>
