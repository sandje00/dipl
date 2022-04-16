<template>
  <div class="main">
    <app-sidebar></app-sidebar>
    <app-header></app-header>
    <slot></slot>
  </div>
</template>

<script>
import AppHeader from './Header';
import AppSidebar from './Sidebar';

export default {
  name: 'app-layout',
  components: { AppHeader, AppSidebar }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  background-color: var(--color-background-secondary);
  margin-top: var(--measure-header-height);
  margin-left: var(--measure-sidebar-width);
}
</style>
