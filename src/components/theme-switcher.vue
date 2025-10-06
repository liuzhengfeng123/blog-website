<template>
  <div class="theme-switcher" @click="toggleTheme">
    <i :class="theme === THEME_STORAGE_MAP.light ? 'el-icon-sunny' : 'el-icon-moon'" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import elementUIStyle from '@/styles/hljs/element-ui.css'
import atomOneDarkStyle from '@/styles/hljs/atom-one-dark.css'

const THEME_STORAGE_KEY = 'theme'
const THEME_STORAGE_MAP = {
  light: 'light',
  dark: 'dark'
}

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
  beforeCreate() {
    this.THEME_STORAGE_MAP = THEME_STORAGE_MAP
  },
  created() {
    const storageTheme = localStorage.getItem(THEME_STORAGE_KEY) || THEME_STORAGE_MAP.light
    this.$store.commit('toggleTheme', storageTheme)

    const firstStyleTag = document.head.querySelector('style') || null
    const styleText = this.theme === THEME_STORAGE_MAP.light ? elementUIStyle.toString() : atomOneDarkStyle.toString()
    const styleTag = document.createElement('style')
    styleTag.textContent = styleText
    styleTag.id = 'codeStyleId'
    // document.documentElement.setAttribute('theme', this.theme)
    document.head.insertBefore(styleTag, firstStyleTag)
  },
  mounted() {},
  methods: {
    toggleTheme() {
      const html = document.documentElement
      const currentTheme = this.theme
      const newTheme = currentTheme === THEME_STORAGE_MAP.dark ? THEME_STORAGE_MAP.light : THEME_STORAGE_MAP.dark
      this.$store.commit('toggleTheme', newTheme)
      html.setAttribute('theme', newTheme)
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)

      const styleTag = document.head.querySelector('#codeStyleId')
      const newStyleText = newTheme === THEME_STORAGE_MAP.dark ? atomOneDarkStyle.toString() : elementUIStyle.toString()
      styleTag.textContent = newStyleText
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
  color: var(--text-color);
  transition: background-color $theme-switch-transition-duration;
  cursor: pointer;

  @include horizontallyCenter;

  i {
    font-size: 20px;
  }

  &:hover {
    background-color: #efefef;

    @include other-theme {
      background-color: #444950;
    }
  }
}
</style>
