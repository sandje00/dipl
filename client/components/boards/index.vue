<template>
  <app-layout>
    <template v-slot:page-header>
      <boards-header
        @project-change="onProjectChange"
      ></boards-header>
    </template>
    <task-board
      :currentProjectId="currentProjectId"
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
    const currentProjectId = ref(0);
    const onProjectChange = projectId => {
      currentProjectId.value = projectId;
    };

    return {
      currentProjectId,
      onProjectChange
    }
  },
  components: {
    AppLayout,
    BoardsHeader,
    TaskBoard
  }
};
</script>
