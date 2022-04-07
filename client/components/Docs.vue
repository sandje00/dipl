<template>
  <div class="docs">
    <app-sidebar></app-sidebar>
  </div>
</template>

<script>
import AppSidebar from './Sidebar';

export default {
  name: 'docs-view',
  components: { AppSidebar }
}
</script>

<style lang="scss" scoped>
.docs {
  height: 100vh;
  background-color: var(--color-background-secondary);
  margin-left: var(--measure-sidebar-width);
}
</style>
