<template>
  <app-layout>
    <task-board></task-board>
  </app-layout>
</template>

<script>
import AppLayout from '../layout';
import TaskBoard from './Board';

export default {
  name: 'boards-view',
  components: { AppLayout, TaskBoard }
}
</script>
