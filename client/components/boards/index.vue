<template>
  <app-layout>
    <template v-slot:page-header>
      <boards-header
        @project-change="handleProjectChange"
      ></boards-header>
    </template>
    <task-board
      :current-project="currentProject"
    ></task-board>
  </app-layout>
</template>

<script>
import AppLayout from '../layout';
import BoardsHeader from './BoardsHeader';
import { ref } from 'vue';
import TaskBoard from './Board';

export default {
  name: 'boards-view',
  setup() {
    const currentProject = ref('All Projects');
    const handleProjectChange = project => {
      currentProject.value = project;
    };

    return {
      currentProject,
      handleProjectChange
    }
  },
  components: {
    AppLayout,
    BoardsHeader,
    TaskBoard
  }
};
</script>
