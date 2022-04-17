<template>
  <div class="main">
    <app-sidebar class="z-index-layout"></app-sidebar>
    <div class="z-index-layout header-section">
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
    position: fixed;
    top: 0;
    background-color: var(--color-background-primary);
    border-bottom: 1px solid var(--color-border);
  }
}

.z-index-layout {
  z-index: var(--z-layout);
}
</style>
