<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :class="color"
  >
    <slot></slot>
  </svg>
</template>

<script>
const colors = ['text-primary', 'text-secondary'];

export default {
  name: 'base-icon',
  props: {
    width: { type: [Number, String], default: 24 },
    height: { type: [Number, String], default: 24 },
    viewBox: { type: String, default: '0 0 24 24' },
    color: {
      type: String,
      default: 'text-primary',
      validator: val => colors.includes(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-primary {
  fill: var(--color-text-primary);
}

.text-secondary {
  fill: var(--color-text-secondary);
}
</style>
