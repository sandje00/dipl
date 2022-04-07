<template>
  <div class="overview">
    <app-sidebar></app-sidebar>
  </div>
</template>

<script>
import AppSidebar from './Sidebar';

export default {
  name: 'overview-view',
  components: { AppSidebar }
}
</script>

<style lang="scss" scoped>
.overview {
  height: 100vh;
  background-color: var(--color-background-secondary);
  margin-left: var(--measure-sidebar-width);
}
</style>
