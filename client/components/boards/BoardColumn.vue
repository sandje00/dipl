<template>
  <div class="mt-m board-column">
    <div class="flex-h justify-space-between align-items-center">
      <h2 class="board-column-title">
        {{ columnTitle }}
      </h2>
      <base-button @click="toggleNewTaskOpen" neutral rounded>
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
        @dblclick="toggleOptionsOpen"
      ></task-card>
    </div>
    <new-task-modal
      :isOpen="isNewTaskOpen"
      :status="status"
      @close-modal="toggleNewTaskOpen"
      @task-created="$emit('task-created')"
    ></new-task-modal>
    <task-options-modal
      :isOpen="isOptionsOpen"
      @close-modal="toggleOptionsOpen"
    ></task-options-modal>
  </div>
</template>

<script>
import BaseButton from '../common/BaseButton';
import NewTaskModal from './NewTaskModal';
import TaskCard from './TaskCard';
import TaskOptionsModal from './TaskOptionsModal';
import { ref } from 'vue';
import useDragAndDrop from '@/composables/useDragAndDrop';
import useToggle from '@/composables/useToggle';

const toUpperSnakeCase = str => str.toUpperCase().split(' ').join('_');

export default {
  name: 'board-column',
  props: {
    columnTitle: { type: String, required: true },
    tasks: { type: Array, default: () => ([]) }
  },
  emits: [ 'column-change', 'task-created' ],
  setup(props, { emit }) {
    const status = ref(toUpperSnakeCase(props.columnTitle));

    const {
      toggleDraggable,
      onDragStart,
      onDragEnd,
      onDrop
    } = useDragAndDrop();

    const columnChange = id => emit('column-change', { id, status: status.value });

    const {
      isTrue: isNewTaskOpen,
      toggle: toggleNewTaskOpen
    } = useToggle();

    const {
      isTrue: isOptionsOpen,
      toggle: toggleOptionsOpen
    } = useToggle();

    return {
      status,
      toggleDraggable,
      onDragStart,
      onDragEnd,
      onDrop,
      columnChange,
      isNewTaskOpen,
      toggleNewTaskOpen,
      isOptionsOpen,
      toggleOptionsOpen
    };
  },
  components: {
    BaseButton,
    NewTaskModal,
    TaskCard,
    TaskOptionsModal
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
