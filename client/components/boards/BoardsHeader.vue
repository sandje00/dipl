<template>
  <h1 class="ml-xl pt-m title">Boards</h1>
  <base-select
    v-model="currentProject"
    :options="projectsList"
    class="mx-l mt-m"
  ></base-select>
</template>

<script>
import { ref, onBeforeMount, watch } from 'vue';
import api from '@/api/projects';
import BaseSelect from '../common/BaseSelect';

const keyValuesToArray = (objArr, key) => objArr.map(it => it[key]);

export default {
  name: 'boards-header',
  emits: [ 'project-change' ],
  setup(_props, { emit }) {
    const allProjects = ref([]);
    const projectsList = ref([]);
    const currentProject = ref('All Projects');
    onBeforeMount(() => {
      const attributes = JSON.stringify([ 'id', 'title' ]);
      return api.getAll({ attributes })
        .then(({ data: { projects } }) => {
          allProjects.value = projects;
          projectsList.value = keyValuesToArray(allProjects.value, 'title');
          projectsList.value.unshift(currentProject.value);
        })
        .catch(err => console.error(err));
    });

    watch(currentProject, async () => {
      const id = currentProject.value === 'All Projects'
        ? 0
        : allProjects.value.find(it => (it.title === currentProject.value)).id;
      emit('project-change', id);
    });

    return {
      projectsList,
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
