<template>
  <component-page>
    <template #default="{ onMounted }">
      <virtual-scroll-md :on-mounted="onMounted" />
    </template>
  </component-page>
</template>
<script>
import VirtualScrollMd from 'cwd/docs/virutal-scroll.md'

export default {
  name: 'VirtualScrollComponentPage',
  components: {
    VirtualScrollMd
  }
}
</script>
