<template>
  <div class="projects">
    <app-sidebar></app-sidebar>
  </div>
</template>

<script>
import AppSidebar from './Sidebar';

export default {
  name: 'projects-view',
  components: { AppSidebar }
}
</script>

<style lang="scss" scoped>
.projects {
  height: 100vh;
  background-color: var(--color-background-secondary);
  margin-left: var(--measure-sidebar-width);
}
</style>
