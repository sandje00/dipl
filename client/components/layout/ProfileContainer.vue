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
    return { username };
  },
  components: { IconAccount }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/base/_typography.scss';

.profile-container {
  color: var(--color-text-primary);
  cursor: pointer;

  .username {
    font-weight: $font-weight-bold;
    font-size: $font-size-large;

    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      margin-bottom: var(--spc-xxs);
      margin-left: var(--spc-s);
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid var(--color-text-primary);
    }
  }
}
</style>
