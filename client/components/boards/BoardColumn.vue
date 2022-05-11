<template>
  <div class="mt-m board-column">
    <div class="flex-h justify-space-between align-items-center">
      <h2 class="board-column-title">
        {{ columnTitle }}
      </h2>
      <base-button neutral rounded>
        <h2>+</h2>
      </base-button>
    </div>
    <task-list :tasks="tasks"></task-list>
  </div>
</template>

<script>
import BaseButton from '../common/BaseButton';
import TaskList from './TaskList';

export default {
  name: 'board-column',
  props: {
    columnTitle: { type: String, required: true },
    tasks: { type: Array, default: () => ([]) }
  },
  components: { BaseButton, TaskList }
}
</script>

<style lang="scss" scoped>
$column-padding-right: 5rem;

.board-column {
  width: 33.33%;
  height: 100%;
  padding-right: $column-padding-right;

  &-title {
    text-transform: uppercase;
  }
}
</style>
