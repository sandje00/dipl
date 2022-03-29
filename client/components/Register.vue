<template>
  <form-layout>
    <span v-if="successMessage" class="pa-l success-message">
      {{ successMessage }}
    </span>
    <form
      v-else
      @submit.prevent="register"
      class="flex-v justify-center align-center align-items-stretch pa-l"
    >
      <base-input
        v-model="username"
        type="text"
        name="username"
        label="Username"
        :error="errors.username"
      ></base-input>
      <base-input
        v-model="email"
        name="email"
        type="text"
        label="E-mail"
        :error="errors.email"
      ></base-input>
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
        Register
      </base-button>
    </form>
  </form-layout>
</template>

<script>
import { useForm, useField } from 'vee-validate';
import api from '../api/users';
import BaseButton from './common/BaseButton';
import BaseInput from './common/BaseInput';
import FormLayout from './common/FormLayout';
import pick from 'lodash/pick';
import { ref } from 'vue';

export default {
  name: 'register-view',
  setup() {
    const successMessage = ref('');

    const validationSchema = {
      username: { required: true, min: 2, max: 50 },
      email: { required: true, email: true },
      password: { required: true, min: 8 },
      repeat: { required: true, confirmed: '@password' }
    };
    // TODO Figure out how to display a custom error message
    const { errors, handleSubmit } = useForm({ validationSchema });

    const { value: username } = useField('username');
    const { value: email } = useField('email');
    const { value: password } = useField('password');
    const { value: repeat } = useField('repeat');
    // TODO Message snackbars
    const register = handleSubmit((values, { resetForm }) => {
      const data = pick(values, ['username', 'email', 'password']);
      api
        .register(data)
        .then(({ data: { message } }) => {
          successMessage.value = message;
          resetForm();
        })
        .catch(({ data: { error } }) => console.log(error));
    });

    return {
      successMessage,
      errors,
      username,
      email,
      password,
      repeat,
      register
    }
  },
  components: { BaseButton, BaseInput, FormLayout }
}
</script>

<style lang="scss" scoped>
.register {
  .success-message {
    display: inline-block;
    color: var(--color-text-secondary);
    font-size: 1.2rem; // TODO Define inside _typography.scss
  }
}
</style>
