<template>
  <div class="header">
    <div class="flex-h justify-space-between pa-s top-container">
      <search-box></search-box>
      <profile-container></profile-container>
    </div>
  </div>
</template>

<script>
import ProfileContainer from './ProfileContainer';
import SearchBox from './Search';

export default {
  name: 'app-header',
  components: { ProfileContainer, SearchBox }
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

  .top-container {
    // TODO Find better way instead of this workaround
    max-width: 95%;
  }
}
</style>
