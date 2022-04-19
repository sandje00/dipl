<template>
  <div class="pa-l">
    <span v-if="responseMessage" class="text">{{ responseMessage }}</span>
    <div v-else class="flex-v justify-center align-center align-items-stretch">
      <h3 class="text">
        Click on the button below to verify your email account
      </h3>
      <base-button @click="verifyEmail" class="mt-m">
        Verify your e-mail
      </base-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/auth';
import BaseButton from '../common/BaseButton'
import { ref } from 'vue';

export default {
  name: 'verify-email',
  props: {
    token: { type: String, required: true }
  },
  setup(props) {
    const responseMessage = ref('');

    const verifyEmail = () => {
      api.verify(props.token)
        .then(({ data: { message } }) => {
          responseMessage.value = message;
        })
        .catch(({ data: { error } }) => {
          responseMessage.value = error;
        });
    }

    return { responseMessage, verifyEmail }
  },
  components: { BaseButton }
}
</script>

<style lang="scss" style>
@import '../../assets/stylesheets/base/_typography.scss';

.text {
  color: var(--color-text-secondary);
  font-size: $font-size-large;
  text-align: center;
}
</style>
