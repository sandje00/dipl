<template>
  <div class="flex-v justify-center align-items-center register">
    <div class="register-form">
      <form
        class="flex-v justify-center align-center align-items-stretch pa-l"
      >
        <base-input
          label="Username"
          error=""
        ></base-input>
        <base-input
          label="E-mail"
        ></base-input>
        <base-input
          label="Password"
        ></base-input>
        <base-input
          label="Repeat password"
        ></base-input>
        <base-button class="mt-m">
          Register
        </base-button>
      </form>
    </div>
  </div>
</template>

<script>
import BaseButton from '../common/BaseButton';
import BaseInput from '../common/BaseInput';

export default {
  name: 'register-view',
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
