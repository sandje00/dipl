<template>
  <base-icon :width="36" :height="36">
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M8 16h8v2H8 zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path>
  </base-icon>
</template>

<script>
import BaseIcon from '../common/BaseIcon';

export default {
  name: 'icon-docs',
  components: { BaseIcon }
}
</script>
