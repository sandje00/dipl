<template>
  <label v-if="label">{{ label }}</label>
  <input
    :value="modelValue"
    :class="{ error, borderless }"
    v-bind="{...$attrs, onInput: updateModelValue }"
    class="mt-s px-m py-s input"
  >
  <span class="pl-xs error">{{ error }}</span>
</template>

<script>
import useModelValue from '@/composables/useModelValue';

export default {
  name: 'base-input',
  props: {
    label: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    error: { type: String, default: '' },
    borderless: { type: Boolean, default: false }
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
  border: 1px solid var(--color-text-secondary);
  border-radius: 5px;

  &:focus {
    outline: none;
  }

  &.error {
    border-color: var(--color-error);
  }

  &.borderless {
    border: none;
  }
}

.error {
  color: var(--color-error);

  &::after {
    content: " ";
    font-size: 0;
    white-space: pre;
  }
}
</style>
