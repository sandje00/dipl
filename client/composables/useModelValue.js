'use strict';

export default function useModelValue(props, { emit }) {
  const updateModelValue = event => {
    let val = event.target.value;
    emit('update:modelValue', val);
  }
  return { updateModelValue };
}
