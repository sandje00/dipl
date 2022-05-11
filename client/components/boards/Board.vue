<template>
  <div class="flex-h px-xl py-m">
    <board-column
      @column-change="handleColumnChange"
      column-title="to do"
      :tasks="tasksToDo"
    ></board-column>
    <board-column
      @column-change="handleColumnChange"
      column-title="in progress"
      :tasks="tasksInProgress"
    ></board-column>
    <board-column
      @column-change="handleColumnChange"
      column-title="done"
      :tasks="tasksDone"
    ></board-column>
  </div>
</template>

<script>
import BoardColumn from './BoardColumn';
import { computed } from 'vue';
import status from '../../../common/status';
import { ref } from 'vue';

export default {
  name: 'task-board',
  setup() {
    const tasks = ref([]);
    tasks.value = [
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
    const tasksToDo = computed(() => tasks.value.filter(it => it.status === status.TO_DO));
    const tasksInProgress = computed(() => tasks.value.filter(it => it.status === status.IN_PROGRESS));
    const tasksDone = computed(() => tasks.value.filter(it => it.status === status.DONE));

    const handleColumnChange = task => {
      tasks.value = tasks.value.map(it => {
        if (it.id === task.id) it.status = task.status;
        return it;
      });
    };

    return {
      tasksToDo,
      tasksInProgress,
      tasksDone,
      handleColumnChange
    };
  },
  components: { BoardColumn }
};
</script>

<style lang="scss" scoped>

</style>
