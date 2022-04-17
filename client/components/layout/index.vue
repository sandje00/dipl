<template>
  <div class="main">
    <app-sidebar></app-sidebar>
    <div class="header-section">
      <app-header></app-header>
      <slot name="page-header"></slot>
    </div>
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
  margin-top: var(--measure-header-section-height);
  margin-left: var(--measure-sidebar-width);

  .header-section {
    height: var(--measure-header-section-height);
    width: 100%;
    z-index: var(--z-layout);
    position: fixed;
    top: 0;
    background-color: var(--color-background-primary);
    border-bottom: 1px solid var(--color-border);
  }
}
</style>
