<template>
  <div class="flex-v justify-center align-items-center main">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-layout'
}
</script>

<style lang="scss" scoped>
$form-layout-max-width: 30rem;

.main {
  height: 100vh;
  background-color: var(--color-background-secondary);

  .container {
    max-width: $form-layout-max-width;
    background-color: var(--color-background-primary);
    border: 1px solid var(--color-border);
    border-radius: 10px;
  }
}
</style>
