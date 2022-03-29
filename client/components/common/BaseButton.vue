<template>
  <button class="px-xl py-s button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'base-button'
}
</script>

<style lang="scss" scoped>
.button {
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: 5px;

  &:focus {
    outline: none;
  }
}
</style>
