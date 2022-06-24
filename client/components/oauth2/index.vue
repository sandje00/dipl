<template>
  <form-layout>
    <router-view>
    </router-view>
  </form-layout>
</template>

<script>
import FormLayout from '../common/FormLayout';

export default {
  name: 'oauth-view',
  components: { FormLayout }
};
</script>
