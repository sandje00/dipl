<template>
  <div class="header"></div>
</template>

<script>
export default {
  name: 'app-header'
}
</script>

<style lang="scss" scoped>
.header {
  height: var(--measure-header-height);
  width: 100%;
  z-index: var(--z-layout);
  position: fixed;
  top: 0;
  background-color: var(--color-background-primary);
  border-bottom: 1px solid var(--color-border);
}
</style>
