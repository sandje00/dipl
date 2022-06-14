<template>
  <div></div>
</template>

<script>
import api from '@/api/oauth2';
import { onBeforeMount } from 'vue';
import pick from 'lodash/pick';
import { useRoute } from 'vue-router';

export default {
  name: 'oauth-redirect',
  setup() {
    const route = useRoute();
    const exchangeCodeForToken = async () => {
      return api.accessToken(pick(route.query, ['code', 'state']))
        .then(({ data: { data } }) => {
          console.log(data);
        })
        .catch(err => console.log(err));
    };
    onBeforeMount(() => exchangeCodeForToken());
  }
}
</script>

<style lang="scss" scoped>

</style>
