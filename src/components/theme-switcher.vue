<template>
  <div class="theme-switcher" @click="toggleTheme">
    <i :class="theme === 'light' ? 'el-icon-sunny' : 'el-icon-moon'" />
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      isLightTheme: true
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  created() {},
  mounted() {},
  methods: {
    toggleTheme() {
      const html = document.documentElement
      const currentTheme = this.theme
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
      this.$store.commit('toggleTheme', newTheme)
      html.setAttribute('theme', newTheme)
    }
  }
}
</script>
<style lang="scss" scoped>
.theme-switcher {
  width: 35px;
  height: 35px;
  margin: {
    right: 30px;
  }
  border-radius: 50%;
  transition: background-color 0.2s;
  cursor: pointer;

  @include horizontallyCenter;

  i {
    font-size: 20px;
  }

  &:hover {
    background-color: #efefef;
  }
}
</style>
