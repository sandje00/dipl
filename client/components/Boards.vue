<template>
  <div class="boards">
    <app-sidebar></app-sidebar>
  </div>
</template>

<script>
import AppSidebar from './common/Sidebar.vue';

export default {
  name: 'boards-view',
  components: { AppSidebar }
}
</script>

<style lang="scss" scoped>
.boards {
  height: 100vh;
  background-color: var(--color-background-secondary);
  margin-left: var(--measure-sidebar-width);
}
</style>
