<template>
  <app-layout>
    <template v-slot:page-header>
      <projects-header></projects-header>
    </template>
  </app-layout>
</template>

<script>
import AppLayout from '../layout';
import ProjectsHeader from './ProjectsHeader';

export default {
  name: 'projects-view',
  components: { AppLayout, ProjectsHeader }
}
</script>
