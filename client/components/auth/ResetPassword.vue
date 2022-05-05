<template>
  <span v-if="successMessage" class="pa-l success-message">
    {{ successMessage }}
  </span>
  <form
    v-else
    @submit.prevent="reset"
    class="flex-v justify-center align-center align-items-stretch pa-l">
    <base-input
      v-model="password"
      name="password"
      type="password"
      label="Password"
      :error="errors.password"
    ></base-input>
    <base-input
      v-model="repeat"
      name="repeat"
      type="password"
      label="Repeat password"
      :error="errors.repeat"
    ></base-input>
    <base-button class="mt-m">
      Reset password
    </base-button>
  </form>
</template>

<script>
import { useForm, useField } from 'vee-validate';
import api from '@/api/auth';
import BaseButton from '../common/BaseButton';
import BaseInput from '../common/BaseInput';
import { ref } from 'vue';

export default {
  name: 'reset-password',
  props: {
    token: { type: String, required: true }
  },
  setup(props) {
    const successMessage = ref('');

    const validationSchema = {
      password: { required: true, min: 8 },
      repeat: { required: true, confirmed: '@password' }
    }

    const { errors, handleSubmit } = useForm({ validationSchema });

    const { value: password } = useField('password');
    const { value: repeat } = useField('repeat');

    const reset = handleSubmit(({ password }, { resetForm }) => {
      api
        .resetPassword({ token: props.token, password })
        .then(({ data: { message } }) => {
          successMessage.value = message;
          resetForm();
        })
        .catch(err => console.log(err))
    });

    return { successMessage, errors, password, repeat, reset };
  },
  components: { BaseButton, BaseInput }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/base/_typography.scss';

.success-message {
  display: inline-block;
  color: var(--color-text-primary);
  font-size: $font-size-large;
}
</style>
