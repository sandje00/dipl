<template>
  <span class="pa-l message">
    {{ responseMessage }}
  </span>
</template>

<script>
import api from '@/api/oauth2';
import { onBeforeMount } from 'vue';
import pick from 'lodash/pick';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'oauth-redirect',
  setup() {
    const responseMessage = ref('In progress...');
    const route = useRoute();
    const exchangeCodeForToken = async () => {
      return api.accessToken(pick(route.query, ['code', 'state']))
        .then(({ data: { message } }) => {
          responseMessage.value = message;
        })
        .catch(({ data: { error } }) => {
          responseMessage.value = error;
        });
    };
    onBeforeMount(() => exchangeCodeForToken());
    return { responseMessage };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/base/_typography.scss';

.message {
  color: var(--color-text-primary);
  font-size: $font-size-large;
}
</style>
