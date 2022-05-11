<template>
  <div class="flex-h px-xl py-m">
    <board-column
      column-title="to do"
      :tasks="tasksToDo"
    ></board-column>
    <board-column
      column-title="in progress"
      :tasks="tasksInProgress"
    ></board-column>
    <board-column
      column-title="done"
      :tasks="tasksDone"
    ></board-column>
  </div>
</template>

<script>
import BoardColumn from './BoardColumn';
import { computed } from 'vue';
import status from '../../../common/status';

export default {
  name: 'task-board',
  setup() {
    const tasks = [
      {
        id: 1,
        title: 'Core UI',
        description: 'Blablablablabla',
        type: 'TASK',
        priority: 'MAJOR',
        status: 'TO_DO',
        project: {
          id: 1,
          title: 'Cool Project'
        },
        parentTask: {}
      },
      {
        id: 2,
        title: 'Header',
        description: 'Hahahahaha',
        type: 'SUBTASK',
        priority: 'MAJOR',
        status: 'IN_PROGRESS',
        project: {
          id: 1,
          title: 'Cool Project'
        },
        parentTask: {
          id: 1,
          title: 'Core UI'
        }
      },
      {
        id: 3,
        title: 'Project Setup',
        description: 'Hahahahaha',
        type: 'TASK',
        priority: 'MAJOR',
        status: 'DONE',
        project: {
          id: 1,
          title: 'Cool Project'
        },
        parentTask: {}
      }
    ];
    const tasksToDo = computed(() => tasks.filter(it => it.status === status.TO_DO));
    const tasksInProgress = computed(() => tasks.filter(it => it.status === status.IN_PROGRESS));
    const tasksDone = computed(() => tasks.filter(it => it.status === status.DONE));


    return { tasksToDo, tasksInProgress, tasksDone };
  },
  components: { BoardColumn }
}
</script>

<style lang="scss" scoped>

</style>
