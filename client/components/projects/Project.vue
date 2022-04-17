<template>
  <div class="flex-v justify-center align-items-center project-card">
    <div class="img-placeholder"></div>
    <h2 class="mt-m project-card-title">
      {{ title }}
    </h2>
  </div>
</template>

<script>
export default {
  name: 'project-card',
  props: {
    title: { type: String, required: true }
  }
}
</script>

<style lang="scss" scoped>
$project-card-size: 20rem;

.project-card {
  height: $project-card-size;
  width: $project-card-size;
  background-color: var(--color-background-primary);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  cursor: pointer;

  &-title {
    color: var(--color-text-secondary);
    text-align: center;
  }

  .img-placeholder {
    height: 100px;
    width: 100px;
    background-color: var(--color-gray-lighter-2);
  }
}
</style>
