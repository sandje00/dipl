<template>
  <teleport to="body">
    <div class="modal">
      <div @click="$emit('close')" class="modal-overlay"></div>
      <div class="position-center modal-content">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'base-modal',
  emits: [ 'close' ]
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-modal);

  &-overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: var(--z-modal-overlay);
    background: rgba(0,0,0,0.85);
  }

  &-content {
    z-index: var(--z-modal-content);
    max-height: 90%;
    overflow: auto;
    background: var(--color-white);
    padding: 20px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.7);
    border-radius: 4px;
    width: 25rem;

    .text {
      color: var(--color-text-primary);
    }
  }
}
</style>
