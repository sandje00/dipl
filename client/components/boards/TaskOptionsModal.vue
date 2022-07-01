<template>
  <base-modal v-if="isOpen" @close="$emit('close-modal')">

  </base-modal>
</template>

<script>
import BaseModal from '../common/BaseModal';

export default {
  name: 'task-options-modal',
  props: {
    isOpen: { type: Boolean, default: false }
  },
  emits: [ 'close-modal' ],
  components: {
    BaseModal
  }
}
</script>

<style lang="scss" scoped>

</style>
