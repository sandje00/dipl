<template>
  <h1 class="ml-xl pt-m page-title">Projects</h1>
  <div class="flex-h page-navigation">
    <base-tab
      title="All Projects"
      :to="{ name: 'all-projects' }"
    ></base-tab>
    <base-tab
      title="New Project"
      :to="{ name: 'new-project' }"
    ></base-tab>
  </div>
</template>

<script>
import BaseTab from '../common/BaseTab';

export default {
  name: 'projects-header',
  components: { BaseTab }
}
</script>

<style lang="scss" scoped>
.page {
  &-title {
    color: var(--color-text-primary);
  }

  /* &-navigation {
    // TODO The same as in ProfileContainer.vue
    width: 95%;
  } */
}
</style>
