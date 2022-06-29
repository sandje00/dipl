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
import { computed, onBeforeMount, ref, watch } from 'vue';
import api from '@/api/tasks';
import BoardColumn from './BoardColumn';
import status from '../../../common/status';

const filterTasks = (tasks, status) => tasks.filter(it => it.status === status);

export default {
  name: 'task-board',
  props: {
    currentProjectId: { type: Number, default: 0 }
  },
  setup(props) {
    const projectId = computed(() => props.currentProjectId || null);

    const tasks = ref([]);

    const fetchTasks = async (projectId) => {
      return api.getAll({ join: true, projectId })
        .then(({ data }) => { tasks.value = data.tasks; })
        .catch(err => console.log(err));
    }
    onBeforeMount(() => fetchTasks(projectId.value));
    watch(projectId, () => fetchTasks(projectId.value));

    const tasksToDo = computed(() => filterTasks(tasks.value, status.TO_DO));
    const tasksInProgress = computed(() => filterTasks(tasks.value, status.IN_PROGRESS));
    const tasksDone = computed(() => filterTasks(tasks.value, status.DONE));

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

    const onTaskCreated = () => fetchTasks(projectId.value);

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
