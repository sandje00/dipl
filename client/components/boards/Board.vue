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

const filterTasks = (tasks, status, projectTitle) => {
  return tasks
    .filter(
      projectTitle === 'All Projects'
      ? it => it.status === status
      : it => it.project.title === projectTitle && it.status === status
    );
};

export default {
  name: 'task-board',
  props: {
    currentProject: { type: String, default: 'All Projects' }
  },
  setup(props) {
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
      },
      {
        id: 4,
        title: 'First task',
        description: 'Hahahahaha',
        type: 'TASK',
        priority: 'MAJOR',
        status: 'TO_DO',
        project: {
          id: 2,
          title: 'Awesome Project'
        },
        parentTask: {}
      }
    ];
    const tasksToDo = computed(() => filterTasks(tasks.value, status.TO_DO, props.currentProject));
    const tasksInProgress = computed(() => filterTasks(tasks.value, status.IN_PROGRESS, props.currentProject));
    const tasksDone = computed(() => filterTasks(tasks.value, status.DONE, props.currentProject));

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
