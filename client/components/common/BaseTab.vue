<template>
  <router-link
    :to="to"
    class="pa-s base-tab">
    {{ title }}
  </router-link>
</template>

<script>
export default {
  name: 'base-tab',
  props: {
    title: { type: String, required: true },
    to: { type: Object, required: true }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/base/_typography.scss';

.base-tab {
  color: var(--color-text-secondary);
  font-weight: $font-weight-bold;

  &:hover {
    color: var(--color-primary);
  }

  &.router-link-exact-active {
    color: var(--color-primary);
    background-color: var(--color-primary-light);
    border-radius: 5px;
  }
}
</style>
