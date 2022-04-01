<template>
  <form
    @submit.prevent="login"
    class="flex-v justify-center align-center align-items-stretch pa-l">
    <base-input
      v-model="usernameOrEmail"
      type="text"
      name="usernameOrEmail"
      label="Username or E-mail"
      :error="errors.usernameOrEmail"
    ></base-input>
    <base-input
      v-model="password"
      type="password"
      name="password"
      label="Password"
      :error="errors.password"
    ></base-input>
    <base-button class="mt-m">
      Log In
    </base-button>
  </form>
</template>

<script>
import { useForm, useField } from 'vee-validate';
import api from '../../api/auth';
import BaseButton from '../common/BaseButton';
import BaseInput from '../common/BaseInput';

export default {
  name: 'login-view',
  setup() {
    const validationSchema = {
      usernameOrEmail: { required: true },
      password: { required: true }
    };
    // TODO Figure out how to display a custom error message
    const { errors, handleSubmit } = useForm({ validationSchema });

    const { value: usernameOrEmail } = useField('usernameOrEmail');
    const { value: password } = useField('password');
    // TODO Message snackbars
    const login = handleSubmit((values, { resetForm }) => {
      api
        .login(values)
        .then(({ data: { token } }) => {
          // TODO Auth cookies and redirection
          console.log(token);
          resetForm();
        })
        .catch(({ data: { error } }) => console.log(error));
    });

    return { errors, usernameOrEmail, password, login };
  },
  components: { BaseButton, BaseInput }
}
</script>
