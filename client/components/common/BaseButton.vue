<template>
  <button
    :class="[
      { neutral, secondary },
      !neutral && !secondary && 'primary',
      rounded ? 'px-m rounded' : 'px-xl'
    ]"
    class="py-s button"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    neutral: { type: Boolean, default: false },
    secondary: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/base/_typography.scss';

.button {
  font-size: $font-size-regular;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
}

.primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.secondary {
  background-color: var(--color-background-button-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.neutral {
  background-color: var(--color-background-button-neutral);
  color: var(--color-text-secondary);
  font-weight: $font-weight-bold;
}

.rounded {
  border-radius: 50%;
}
</style>
