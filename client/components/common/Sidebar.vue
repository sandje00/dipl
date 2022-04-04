<template>
  <div class="sidebar">

  </div>
</template>

<script>
export default {
  name: 'app-sidebar'
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  width: var(--measure-sidebar-width);
  z-index: var(--z-sidebar);
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-background-primary);
  border-right: 1px solid var(--color-border);
  overflow-x: hidden;
}
</style>
