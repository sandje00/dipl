<template>
  <h1 class="ml-xl pt-m title">Boards</h1>
  <base-select
    v-model="currentProject"
    @change="$emit('project-change', currentProject)"
    :options="selectOptions"
    class="mx-l mt-m"
  ></base-select>
</template>

<script>
import { computed, ref } from 'vue';
import BaseSelect from '../common/BaseSelect';

export default {
  name: 'boards-header',
  emits: [ 'project-change' ],
  setup() {
    const projects = [ 'Cool Project', 'Awesome Project' ];
    const selectOptions = computed(() => ([
      'All Projects',
      ...projects
    ]));
    const currentProject = ref(selectOptions.value[0]);

    return {
      selectOptions,
      currentProject
    };
  },
  components: { BaseSelect }
};
</script>

<style lang="scss" scoped>
.title {
  color: var(--color-text-primary);
}
</style>
