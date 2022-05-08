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
    <router-link
      :to="{ name: 'forgot-password' }"
      class="link pt-xl align-self-center">
      Forgot password?
    </router-link>
  </form>
</template>

<script>
import { useForm, useField } from 'vee-validate';
import BaseButton from '../common/BaseButton';
import BaseInput from '../common/BaseInput';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

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

    const store = useStore();
    const router = useRouter();
    // TODO Message snackbars
    const login = handleSubmit((values, { resetForm }) => {
      store.dispatch('auth/login', values)
        .then(() => {
          resetForm();
          router.push({ name: 'overview' });
        })
        .catch(({ data: { error } }) => console.log(error));
    });

    return { errors, usernameOrEmail, password, login };
  },
  components: { BaseButton, BaseInput }
}
</script>

<style lang="scss" scoped>
.link {
  // TODO Extract into separate .scss file
  display: inline-block;
}
</style>
