<template>
  <div class="flex-h flex-wrap pa-m projects-list">
    <project-card
      v-for="project in projects"
      :key="project.id"
      v-bind="project"
      class="mt-l mr-xl"
    ></project-card>
  </div>
</template>

<script>
import ProjectCard from './Project';

export default {
  name: 'projects-list',
  setup() {
    // TODO Fetch projects via API call
    const projects = [
      {
        id: 1,
        title: 'Test1',
        description: 'Hahahahaha',
        imgUrl: null,
        userId: 1
      },
      {
        id: 2,
        title: 'Test2',
        description: 'Hahahahaha',
        imgUrl: null,
        uderId: 1
      },
      {
        id: 3,
        title: 'Test3',
        description: 'Hahahahaha',
        imgUrl: null,
        uderId: 1
      }
    ];

    return { projects };
  },
  components: { ProjectCard }
}
</script>

<style lang="scss">

</style>
