<template>
  <div class="flex-v mt-l">
    <task-card
      v-for="task in tasks"
      :key="task.id"
      v-bind="task"
    ></task-card>
  </div>
</template>

<script>
import TaskCard from './TaskCard';

export default {
  name: 'task-list',
  props: {
    tasks: { type: Array, default: () => ([]) }
  },
  components: { TaskCard }
};
</script>

<style lang="scss" scoped>

</style>
