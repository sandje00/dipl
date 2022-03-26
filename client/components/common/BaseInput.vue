<template>
  <label v-if="label">{{ label }}</label>
  <input
    :value="modelValue"
    :class="{ error }"
    v-bind="{...$attrs, onInput: updateModelValue }"
    class="input">
</template>

<script>
import useModelValue from '../../composables/useModelValue';

export default {
  name: 'base-input',
  props: {
    label: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    error: { type: String, default: '' }
  },
  setup(props, context) {
    const { updateModelValue } = useModelValue(props, context);
    return { updateModelValue };
  }
}
</script>

<style lang="scss" scoped>
.input {
  font-size: inherit;
  background: none;

  &:focus {
    outline: none;
  }
}
</style>
