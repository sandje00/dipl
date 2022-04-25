<template>
  <div class="flex-h px-xl py-m board">
    <div class="mt-m board-column">
      <div
        class="flex-h justify-space-between align-items-center"
      >
        <h2 class="board-column-title">
          to do
        </h2>
        <base-button neutral rounded>
          <h2>+</h2>
        </base-button>
      </div>
    </div>
    <div class="mt-m board-column">
      <div
        class="flex-h justify-space-between align-items-center"
      >
        <h2 class="board-column-title">
          in progress
        </h2>
        <base-button neutral rounded>
          <h2>+</h2>
        </base-button>
      </div>
    </div>
    <div class="mt-m board-column">
      <div
        class="flex-h justify-space-between align-items-center"
      >
        <h2 class="board-column-title">
          done
        </h2>
        <base-button neutral rounded>
          <h2>+</h2>
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '../common/BaseButton';

export default {
  name: 'task-board',
  components: { BaseButton }
}
</script>

<style lang="scss" scoped>
.board {
  &-column {
    width: 33.33%;
    height: 100%;
    padding-right: 5rem; // Exception

    &-title {
      text-transform: uppercase;
    }
  }
}
</style>
