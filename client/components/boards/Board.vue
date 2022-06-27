<template>
  <div class="flex-h px-xl py-m">
    <board-column
      @column-change="onColumnChange"
      @task-created="onTaskCreated"
      column-title="to do"
      :tasks="tasksToDo"
    ></board-column>
    <board-column
      @column-change="onColumnChange"
      @task-created="onTaskCreated"
      column-title="in progress"
      :tasks="tasksInProgress"
    ></board-column>
    <board-column
      @column-change="onColumnChange"
      @task-created="onTaskCreated"
      column-title="done"
      :tasks="tasksDone"
    ></board-column>
  </div>
</template>

<script>
import { computed, ref, onBeforeMount } from 'vue';
import api from '@/api/tasks';
import BoardColumn from './BoardColumn';
import status from '../../../common/status';

const filterTasks = (tasks, status, projectTitle) => {
  return tasks
    .filter(
      projectTitle === 'All Projects'
      ? it => it.status === status
      : it => it.project?.title === projectTitle && it.status === status
    );
};

export default {
  name: 'task-board',
  props: {
    currentProject: { type: String, default: 'All Projects' }
  },
  setup(props) {
    const tasks = ref([]);

    const fetchTasks = async () => {
      return api.getAll({ join: true })
        .then(({ data }) => { tasks.value = data.tasks; })
        .catch(err => console.log(err));
    }
    onBeforeMount(() => fetchTasks());

    const tasksToDo = computed(() => filterTasks(tasks.value, status.TO_DO, props.currentProject));
    const tasksInProgress = computed(() => filterTasks(tasks.value, status.IN_PROGRESS, props.currentProject));
    const tasksDone = computed(() => filterTasks(tasks.value, status.DONE, props.currentProject));

    const onColumnChange = async ({ id, status }) => {
      return api.update(id, { status })
        .then(() => {
          tasks.value = tasks.value.map(it => {
            if (it.id === id) it.status = status;
            return it;
          });
        })
        .catch(err => console.log(err));
    };

    const onTaskCreated = () => fetchTasks();

    return {
      tasksToDo,
      tasksInProgress,
      tasksDone,
      onColumnChange,
      onTaskCreated
    };
  },
  components: { BoardColumn }
};
</script>
