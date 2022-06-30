<template>
  <div class="mt-l pa-m task-card">
    <div class="flex-h justify-space-between align-items-start">
      <div class="flex-h align-items-start">
        <base-button class="drag-indicator" icon>
          <icon-drag>
          </icon-drag>
        </base-button>
        <h3 class="task-card-title">
          {{ title }}
        </h3>
      </div>
      <div class="flex-h align-items-start">
        <span>{{ type }}</span>
        <base-button icon>
          <icon-more>
          </icon-more>
        </base-button>
      </div>
    </div>
    <p class="py-m">{{ description }}</p>
    <span :class="[priority]" class="pt-m priority">
      {{ priority }}
    </span>
    <div class="mt-l">
      <div
        v-if="project?.id"
        class="flex-h align-items-center mt-xs"
      >
        <icon-projects class="mr-xs" :width="24" :height="24">
        </icon-projects>
        <span>{{ project.title }}</span>
      </div>
      <div
        v-if="parentTask?.id"
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
import BaseButton from '../common/BaseButton';
import category from '../../../common/type';
import IconDrag from '../icons/IconDrag';
import IconMore from '../icons/IconMore';
import IconProjects from '../icons/IconProjects';
import IconTask from '../icons/IconTask';
import priority from '../../../common/priority';
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
  components: {
    BaseButton,
    IconDrag,
    IconMore,
    IconProjects,
    IconTask
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/base/_typography.scss';

.task-card {
  width: 90%;
  background-color: var(--color-background-primary);
  border: 1px solid var(--color-border);
  border-radius: 10px;

  .drag-indicator {
    cursor: grab;
  }

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
