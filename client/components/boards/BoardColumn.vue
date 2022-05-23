<template>
  <div class="mt-m board-column">
    <div class="flex-h justify-space-between align-items-center">
      <h2 class="board-column-title">
        {{ columnTitle }}
      </h2>
      <base-button
        @click="toggleOpen"
        neutral
        rounded>
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
        @dragstart="startDrag($event, task.id)"
      ></task-card>
    </div>
  </div>
  <new-task-modal
    :isOpen="isOpen"
    :status="status"
    @close-modal="toggleOpen"
  ></new-task-modal>
</template>

<script>
import BaseButton from '../common/BaseButton';
import NewTaskModal from './NewTask';
import TaskCard from './TaskCard';
import useDragAndDrop from '@/composables/useDragAndDrop';
import useModal from '@/composables/useModal';

const toUpperSnakeCase = str => str.toUpperCase().split(' ').join('_');

export default {
  name: 'board-column',
  props: {
    columnTitle: { type: String, required: true },
    tasks: { type: Array, default: () => ([]) }
  },
  emits: [ 'column-change' ],
  setup(props, { emit }) {
    const status = toUpperSnakeCase(props.columnTitle);
    const { startDrag, onDrop } = useDragAndDrop();
    const columnChange = id => emit('column-change', { id, status });

    const { isOpen, toggleOpen } = useModal();

    return {
      status,
      startDrag,
      onDrop,
      columnChange,
      isOpen,
      toggleOpen
    };
  },
  components: {
    BaseButton,
    NewTaskModal,
    TaskCard
  }
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
