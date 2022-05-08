<template>
  <div class="mt-l pa-m task-card">
    <div class="flex-h justify-space-between align-items-end">
      <h3 class="task-card-title">{{ title }}</h3>
      <span>{{ type }}</span>
    </div>
    <p>{{ description }}</p>
    <span class="pt-m">{{ priority }}</span>
    <div class="flex-h justify-end">
      <div
        v-if="projectId"
        class="flex-h justify-center align-items-center"
      >
        <icon-projects :width="24" :height="24">
        </icon-projects>
        <span>{{ projectId }}</span>
      </div>
      <div
        v-if="parentTaskId"
        class="flex-h justify-center align-items-center"
      >
        <icon-task :width="24" :height="24">
        </icon-task>
        <span>{{ parentTaskId }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import category from '../../../common/type';
import IconProjects from '../icons/IconProjects';
import IconTask from '../icons/IconTask';
import priority from '../../../common/priority';
// import status from '../../../common/status';
import values from 'lodash/values';

export default {
  name: 'task-card',
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    type: {
      type: String,
      default: category.TASK,
      validator: val => values(category).includes(val)
    },
    priority: {
      type: String,
      default: priority.MEDIUM,
      validator: val => values(priority).includes(val)
    }/* ,
    status: {
      type: String,
      default: status.TODO,
      validator: val => values(status).includes(val)
    }, */,
    projectId: { type: [Number, null] },
    parentTaskId: { type: [Number, null] }
  },
  components: { IconProjects, IconTask }
};
</script>

<style lang="scss" scoped>
.task-card {
  width: 90%;
  background-color: var(--color-background-primary);
  border: 1px solid var(--color-border);
  border-radius: 10px;

  &-title {
    color: var(--color-text-primary);
  }

  span {
    // TODO Extract to a different .scss file
    display: inline-block;
  }
}
</style>
