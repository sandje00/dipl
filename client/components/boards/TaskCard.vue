<template>
  <div
    :draggable="isDraggable"
    @click="isDraggable = !isDraggable"
    class="mt-l pa-m task-card">
    <div class="flex-h justify-space-between align-items-end">
      <h3 class="task-card-title">{{ title }}</h3>
      <span>{{ type }}</span>
    </div>
    <p class="py-m">{{ description }}</p>
    <span :class="[priority]" class="pt-m priority">
      {{ priority }}
    </span>
    <div class="mt-l">
      <div
        v-if="project.id"
        class="flex-h align-items-center mt-xs"
      >
        <icon-projects class="mr-xs" :width="24" :height="24">
        </icon-projects>
        <span>{{ project.title }}</span>
      </div>
      <div
        v-if="parentTask.id"
        class="flex-h align-items-center mt-xs"
      >
        <icon-task class="mr-xs">
        </icon-task>
        <span>{{ parentTask.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import category from '../../../common/type';
import IconProjects from '../icons/IconProjects';
import IconTask from '../icons/IconTask';
import priority from '../../../common/priority';
import { ref } from 'vue';
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
    },
    project: { type: Object, default: () => ({}) },
    parentTask: { type: Object, default: () => ({}) }
  },
  setup() {
    const isDraggable = ref(false);
    return { isDraggable };
  },
  components: { IconProjects, IconTask }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/base/_typography.scss';

.task-card {
  width: 90%;
  background-color: var(--color-background-primary);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  cursor: move;

  &-title {
    color: var(--color-text-primary);
  }

  .priority {
    font-weight: $font-weight-bold;

    &.MINOR {
      color: var(--color-minor);
    }

    &.MEDIUM {
      color: var(--color-medium);
    }

    &.MAJOR {
      color: var(--color-major);
    }
  }
}
</style>
