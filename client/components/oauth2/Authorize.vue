<template>
  <base-button @click="authGithub">
    Authorize GitHub
  </base-button>
</template>

<script>
import api from '@/api/oauth2';
import BaseButton from '../common/BaseButton';

export default {
  name: 'oauth-authorize',
  setup() {
    const authGithub = async () => {
      return api.authorize()
        .then(({ data: { githubAuthUri } }) => window.open(githubAuthUri))
        .catch(err => console.error(err));
    };
    return { authGithub };
  },
  components: { BaseButton }
};
</script>
