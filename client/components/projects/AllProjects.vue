<template>
  <div class="flex-h flex-wrap pa-m projects-list">
    <h2 v-if="!projects.length">
      There are no projects to show.
    </h2>
    <project-card
      v-for="project in projects"
      :key="project.id"
      v-bind="project"
      class="mt-l mr-xl"
    ></project-card>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import api from '@/api/projects';
import ProjectCard from './ProjectCard';

export default {
  name: 'all-projects',
  setup() {
    const projects = ref([]);
    const fetchProjects = async () => {
      return api.getAll()
        .then(({ data }) => { projects.value = data.projects; })
        .catch(err => console.log(err));
    };

    onBeforeMount(() => fetchProjects());

    return { projects };
  },
  components: { ProjectCard }
}
</script>
