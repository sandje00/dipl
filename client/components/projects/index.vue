<template>
  <app-layout>
    <template v-slot:page-header>
      <projects-header></projects-header>
    </template>
    <projects-list></projects-list>
  </app-layout>
</template>

<script>
import AppLayout from '../layout';
import ProjectsHeader from './ProjectsHeader';
import ProjectsList from './ProjectsList';

export default {
  name: 'projects-view',
  components: {
    AppLayout,
    ProjectsHeader,
    ProjectsList
  }
}
</script>
