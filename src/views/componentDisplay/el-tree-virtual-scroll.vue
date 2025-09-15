<template>
  <component-page>
    <virtual-scroll-md />
  </component-page>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import VirtualScrollMd from 'cwd/docs/virutal-scroll.md'

@Component({
  components: {
    VirtualScrollMd
  }
})
export default class VirtualScroll extends Vue {}
</script>
