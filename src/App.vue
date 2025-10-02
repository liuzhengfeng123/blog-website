<template>
  <div id="app">
    <header>
      <span>el-tree-virtual-scroll</span>
      <div class="header__right">
        <theme-switcher />
        <a
          href="https://github.com/liuzhengfeng123/el-tree-virtual-scroll.git"
          target="_blank"
        >
          <github-icon />
        </a>
      </div>
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
import ThemeSwitcher from './components/theme-switcher'

export default {
  name: 'App',
  components: {
    GithubIcon,
    ThemeSwitcher
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
  border-bottom: 1px solid var(--divider-light);

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 20px;
  box-sizing: border-box;
  background-color: var(--bgc);
  z-index: 2;
  transition:
    border-color 0.5s,
    background-color 0.5s;
}

.header__right {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>

<style>
body {
  color: var(--text-color);
}
</style>
