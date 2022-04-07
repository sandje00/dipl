<template>
  <div class="main">
    <app-sidebar></app-sidebar>
    <slot></slot>
  </div>
</template>

<script>
import AppSidebar from './AppSidebar';

export default {
  name: 'app-layout',
  components: { AppSidebar }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  background-color: var(--color-background-secondary);
  margin-left: var(--measure-sidebar-width);
}
</style>
