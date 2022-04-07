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
.main {
  height: 100vh;
  background-color: var(--color-background-secondary);

  .container {
    max-width: 30rem; // TODO Define inside _measures.scss
    background-color: var(--color-background-primary);
    border: 1px solid var(--color-border);
    border-radius: 10px;
  }
}
</style>
