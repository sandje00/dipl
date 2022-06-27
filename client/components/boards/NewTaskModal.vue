<template>
  <base-modal v-if="isOpen" @close="$emit('close-modal')">
    <h2 class="pt-m pl-l title">New Task</h2>
    <div
      class="flex-v justify-center align-center align-items-stretch pa-l">
      <base-input
        v-model="newTask.title"
        type="text"
        label="Title"
      ></base-input>
      <base-textarea
        v-model="newTask.description"
        label="Description"
      ></base-textarea>
      <base-select
        v-model="newTask.type"
        :options="taskType"
        label="Type"
      ></base-select>
      <base-select
        v-model="newTask.priority"
        :options="taskPriority"
        label="Priority"
      ></base-select>
      <base-select
        v-model="currentProject"
        :options="projectsList"
        label="Project"
      ></base-select>
      <base-select
        v-model="currentTask"
        :options="tasksList"
        label="Parent task"
      ></base-select>
      <div class="flex-h justify-center mt-xl">
        <base-button
          @click="submit"
          class="mr-m">
          Submit
        </base-button>
        <base-button
          @click="$emit('close-modal')"
          class="mr-m"
          neutral>
          Cancel
        </base-button>
      </div>
    </div>
  </base-modal>
</template>

<script>
import { onBeforeMount, reactive, ref, watch } from 'vue';
import apiProjects from '@/api/projects';
import apiTasks from '@/api/tasks';
import BaseButton from '../common/BaseButton';
import BaseInput from '../common/BaseInput';
import BaseModal from '../common/BaseModal';
import BaseSelect from '../common/BaseSelect';
import BaseTextarea from '../common/BaseTextarea';
import category from '../../../common/type';
import priority from '../../../common/priority';
import values from 'lodash/values';

const keyValuesToArray = (objArr, key) => objArr.map(it => it[key]);

export default {
  name: 'new-task-modal',
  props: {
    isOpen: { type: Boolean, default: false },
    status: { type: String, required: true }
  },
  emits: [ 'close-modal' ],
  setup(props, { emit }) {
    const newTask = reactive({
      title: '',
      description: '',
      type: category.TASK,
      priority: priority.MEDIUM,
      status: props.status,
      projectId: null,
      parentTaskId: null
    });

    const allProjects = ref([]);
    const projectsList = ref([]);
    const currentProject = ref('');
    const fetchAllProjects = async () => {
      const attributes = JSON.stringify([ 'id', 'title' ]);
      return apiProjects.getAll({ attributes })
        .then(({ data: { projects } }) => {
          allProjects.value = projects;
          projectsList.value = keyValuesToArray(allProjects.value, 'title');
          projectsList.value.unshift('');
        })
        .catch(err => console.error(err));
    };

    const allTasks = ref([]);
    const tasksList = ref([]);
    const currentTask = ref('');
    const fetchAllTasks = async (projectId) => {
      const attributes = JSON.stringify([ 'id', 'title' ]);
      return apiTasks.getAll({ attributes, projectId })
        .then(({ data: { tasks } }) => {
          allTasks.value = tasks;
          tasksList.value = keyValuesToArray(allTasks.value, 'title');
          tasksList.value.unshift('');
        })
        .catch(err => console.error(err));
    };

    const fetchAllChoices = async () => {
      await fetchAllProjects();
      await fetchAllTasks(newTask.projectId);
    };
    onBeforeMount(() => fetchAllChoices());

    watch(currentProject, async () => {
      const { id } = allProjects.value.find(it => it.title === currentProject.value);
      newTask.projectId = id || null;
      await fetchAllTasks(newTask.projectId);
    });
    watch(currentTask, () => {
      const { id } = allTasks.value.find(it => it.title === currentTask.value);
      newTask.parentTaskId = id || null;
    });

    const submit = async () => {
      return apiTasks.create(newTask)
        .then(({ data: { message } }) => {
          console.log(message);
          emit('close-modal');
        })
        .catch(({ data: { error } }) => console.log(error));
    };

    return {
      newTask,
      taskType: [ ...values(category) ],
      taskPriority: [ ...values(priority) ],
      projectsList,
      currentProject,
      tasksList,
      currentTask,
      submit
    };
  },
  components: {
    BaseButton,
    BaseInput,
    BaseModal,
    BaseSelect,
    BaseTextarea
  }
};
</script>

<style lang="scss" scoped>
.title {
  color: var(--color-text-primary);
}
</style>
