<template>
  <router-link
    :to="to"
    class="base-tab">
    {{ title }}
  </router-link>
</template>

<script>
export default {
  name: 'base-tab',
  props: {
    title: { type: String, required: true },
    to: { type: Object, required: true }
  }
}
</script>

<style lang="scss" scoped>
.base-tab {

}
</style>
