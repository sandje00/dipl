<template>
  <h1 class="ml-xl pt-m page-title">Projects</h1>
  <div class="flex-h ml-l pt-l page-navigation">
    <base-tab
      title="All Projects"
      :to="{ name: 'projects-all' }"
    ></base-tab>
    <base-tab
      title="New Project"
      :to="{ name: 'project-new' }"
    ></base-tab>
  </div>
</template>

<script>
import BaseTab from '../common/BaseTab';

export default {
  name: 'projects-header',
  components: { BaseTab }
};
</script>

<style lang="scss" scoped>
.page {
  &-title {
    color: var(--color-text-primary);
  }
}
</style>
