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
    <div
      @drop="onDrop($event, columnChange)"
      @dragover.prevent
      @dragenter.prevent
      class="flex-v mt-l drop-area"
    >
      <task-card
        v-for="task in tasks"
        :key="task.id"
        v-bind="task"
        @click="toggleDraggable"
        @dragstart="onDragStart($event, task.id)"
        @dragend="onDragEnd($event)"
      ></task-card>
    </div>
  </div>
</template>

<script>
import BaseButton from '../common/BaseButton';
import TaskCard from './TaskCard';
import useDragAndDrop from '@/composables/useDragAndDrop';

const toUpperSnakeCase = str => str.toUpperCase().split(' ').join('_');

export default {
  name: 'board-column',
  props: {
    columnTitle: { type: String, required: true },
    tasks: { type: Array, default: () => ([]) }
  },
  emits: [ 'column-change' ],
  setup(props, { emit }) {
    const {
      toggleDraggable,
      onDragStart,
      onDragEnd,
      onDrop
    } = useDragAndDrop();
    const columnChange = id => emit('column-change', {
      id,
      status: toUpperSnakeCase(props.columnTitle)
    });

    return {
      toggleDraggable,
      onDragStart,
      onDragEnd,
      onDrop,
      columnChange,
    };
  },
  components: { BaseButton, TaskCard }
};
</script>

<style lang="scss" scoped>
.board-column {
  width: 33.33%;
  height: 100%;
  padding-right: 5rem;

  &-title {
    text-transform: uppercase;
  }

  .drop-area {
    padding-bottom: 50vh;
  }
}
</style>
