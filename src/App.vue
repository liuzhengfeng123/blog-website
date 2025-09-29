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
      <main>
        <router-view />
      </main>
    </section>
  </div>
</template>
<script>
import GithubIcon from '@/assets/svg/github-icon.vue'

export default {
  name: 'App',
  components: {
    GithubIcon
  }
}
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
</style>
