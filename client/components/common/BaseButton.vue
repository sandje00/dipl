<template>
  <button
    :class="[
      { neutral, secondary, alert, icon },
      !neutral && !secondary && !icon && 'primary',
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
    alert: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    icon: { type: Boolean, default: false }
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
  color: var(--color-primary);
  border: 1px solid var(--color-primary);

  &.alert {
    color: var(--color-alert);
    font-weight: $font-weight-bold;
    border-color: var(--color-alert);
  }
}

.neutral {
  background-color: var(--color-background-button-neutral);
  color: var(--color-text-secondary);
  font-weight: $font-weight-bold;
}

.rounded {
  border-radius: 50%;
}

.icon {
  background: none;
  border: none;
  padding: 0;
}
</style>
