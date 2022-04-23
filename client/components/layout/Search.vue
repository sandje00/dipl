<template>
  <div class="flex-h align-items-center ml-m search">
    <icon-search class="mt-s"></icon-search>
    <base-input placeholder="Search" borderless></base-input>
  </div>
</template>

<script>
import BaseInput from '../common/BaseInput';
import IconSearch from '../icons/IconSearch';

export default {
  name: 'search-box',
  components: { BaseInput, IconSearch }
}
</script>

<style lang="scss" scoped>
.search {
  border-bottom: 1px solid var(--color-border);
}
</style>
