<template>
  <app-layout>
    <button @click="authGithub">
      Authorize GitHub
    </button>
  </app-layout>
</template>

<script>
// This is temporary code used to test OAuth flow
import api from '@/api/oauth2';
import AppLayout from './layout';

export default {
  name: 'overview-view',
  setup() {
    const authGithub = async () => {
      return api.authorize()
        .then(({ data: { githubAuthUri } }) => window.open(githubAuthUri))
        .catch(err => console.error(err));
    };
    return { authGithub };
  },
  components: { AppLayout }
}
</script>
