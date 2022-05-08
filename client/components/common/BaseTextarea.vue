<template>
  <label v-if="label">{{ label }}</label>
  <textarea
    :value="modelValue"
    v-bind="{...$attrs, onInput: updateModelValue }"
    class="mt-s pa-s textarea"
  ></textarea>
</template>

<script>
import useModelValue from '@/composables/useModelValue';

export default {
  name: 'base-textarea',
  props: {
    label: { type: String, default: '' },
    modelValue: { type: String, default: '' }
  },
  setup(props, context) {
    const { updateModelValue } = useModelValue(props, context);
    return { updateModelValue };
  }
};
</script>

<style lang="scss" scoped>
.textarea {
  font-size: inherit;
  background: none;
  outline: none;
  resize: none;
  border: 1px solid var(--color-text-secondary);
  border-radius: 5px;
  min-height: 30vh;
}
</style>
