<template>
  <span v-if="successMessage" class="pa-l success-message">
    {{ successMessage }}
  </span>
  <form
    v-else
    @submit.prevent="send"
    class="flex-v justify-center align-center align-items-stretch pa-l">
    <base-input
      v-model="email"
      name="email"
      type="text"
      label="E-mail"
      :error="errors.email"
    ></base-input>
    <base-button class="mt-m">
      Send password reset e-mail
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
  name: 'forgot-password',
  setup() {
    const successMessage = ref('');

    const validationSchema = { email: { required: true } };

    const { errors, handleSubmit } = useForm({ validationSchema });

    const { value: email } = useField('email');

    const send = handleSubmit(({ email }, { resetForm }) => {
      api
        .forgotPassword(email)
        .then(({ data: { message } }) => {
          successMessage.value = message;
          resetForm();
        })
        .catch(err => console.log(err));
    });

    return { successMessage, errors, email, send };
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
