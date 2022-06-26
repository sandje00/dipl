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
import api from '@/api/tasks';
import BaseButton from '../common/BaseButton';
import BaseInput from '../common/BaseInput';
import BaseModal from '../common/BaseModal';
import BaseSelect from '../common/BaseSelect';
import BaseTextarea from '../common/BaseTextarea';
import category from '../../../common/type';
import priority from '../../../common/priority';
import { reactive } from 'vue';
import values from 'lodash/values';

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
      status: props.status
    });

    const submit = async () => {
      return api.create(newTask)
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
