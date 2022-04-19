<template>
  <h1 class="ml-xl pt-m page-title">Projects</h1>
  <div class="flex-h justify-end page-controls">
    <base-button class="mr-m">
      New Project +
    </base-button>
  </div>
</template>

<script>
import BaseButton from '../common/BaseButton';

export default {
  name: 'projects-header',
  components: { BaseButton }
}
</script>

<style lang="scss" scoped>
.page {
  &-title {
    color: var(--color-text-primary);
  }

  &-controls {
    // TODO The same as in ProfileContainer.vue
    width: 95%;
  }
}
</style>
