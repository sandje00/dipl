<template>
  <div class="flex-v justify-center align-items-center register">
    <div class="register-form">
      <form
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
    </div>
  </div>
</template>

<script>
import { useForm, useField } from 'vee-validate';
import BaseButton from '../common/BaseButton';
import BaseInput from '../common/BaseInput';

export default {
  name: 'register-view',
  setup() {
    const validationSchema = {
      username: { required: true, min: 2, max: 50 },
      email: { required: true, email: true },
      password: { required: true, min: 8 },
      repeat: { required: true, confirmed: '@password' }
    };

    const { errors } = useForm({ validationSchema });

    const { value: username } = useField('username');
    const { value: email } = useField('email');
    const { value: password } = useField('password');
    const { value: repeat } = useField('repeat');

    return { errors, username, email, password, repeat }
  },
  components: { BaseButton, BaseInput }
}
</script>

<style lang="scss" scoped>
.register {
  height: 100vh;
  background-color: var(--color-background);

  &-form {
    max-width: 30rem; // TODO Define inside _measures.scss
    background-color: var(--color-background-form);
    border: 1px solid var(--color-border);
    border-radius: 10px;
  }
}
</style>
