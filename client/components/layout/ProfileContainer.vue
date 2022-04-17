<template>
  <div class="flex-h align-items-center profile-container">
    <icon-account></icon-account>
    <span class="mr-m pl-s py-m username">{{ username }}</span>
  </div>
</template>

<script>
import { computed } from 'vue';
import get from 'lodash/get';
import IconAccount from '../icons/IconAccount';
import { useStore } from 'vuex';

export default {
  name: 'profile-container',
  setup() {
    const store = useStore();
    const username = computed(() => get(store.state, 'auth.user.username'));

    return { username }
  },
  components: { IconAccount }
}
</script>

<style lang="scss" scoped>
.profile-container {
  color: var(--color-text-secondary);
  cursor: pointer;

  .username {
    display: inline-block;
    font-weight: 700;
    font-size: 1.2rem;

    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      margin-bottom: var(--spc-xxs);
      margin-left: var(--spc-s);
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid var(--color-text-secondary);
    }
  }
}
</style>
