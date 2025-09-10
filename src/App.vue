<template>
  <div id="app">
    <el-button type="primary">click me</el-button>
  </div>
</template>
<script>
import exampleMd from 'cwd/docs/example.md'
import md from 'cwd/md-loader/config.js'

console.log(md.render(exampleMd))

export default {
  name: 'App',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.photo-album {
  width: 300px;
  border-radius: 50%;

  img {
    background-size: 100%;
  }
}
</style>
