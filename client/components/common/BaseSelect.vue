<template>
  <select
    :value="modelValue"
    v-bind="{...$attrs, onChange: updateModelValue }"
    class="px-m py-s select"
  >
    <option
      v-for="option in options"
      :key="option"
      :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>

<script>
import useModelValue from '@/composables/useModelValue';

export default {
  name: 'base-select',
  props: {
    options: { type: Array, required: true },
    modelValue: { type: String, required: true }
  },
  setup(props, context) {
    const { updateModelValue } = useModelValue(props, context);
    return { updateModelValue };
  }
};
</script>

<style lang="scss" scoped>
.select {
  font-size: inherit;
  background: none;
  border: 1px solid var(--color-text-secondary);
  border-radius: 5px;
}
</style>
