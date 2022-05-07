<template>
  <div class="pa-m">
    <form>
      <base-input
        type="text"
        label="Title"
      ></base-input>
      <base-button>
        Submit
      </base-button>
    </form>
  </div>
</template>

<script>
import BaseButton from '../common/BaseButton';
import BaseInput from '../common/BaseInput';

export default {
  name: 'new-project',
  components: { BaseButton, BaseInput }
};
</script>

<style lang="scss" scoped>

</style>
