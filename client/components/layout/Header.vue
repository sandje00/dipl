<template>
  <div class="flex-h justify-space-between pa-s top-container">
    <search-box></search-box>
    <profile-container></profile-container>
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
.top-container {
  // TODO Find better way instead of this workaround
  max-width: 95%;
}
</style>
