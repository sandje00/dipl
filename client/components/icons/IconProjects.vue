<template>
  <base-icon :width="36" :height="36">
    <g>
      <rect fill="none" :height="24" :width="24"></rect>
    </g>
    <g>
      <g>
        <g>
          <path d="M3,3v8h8V3H3z M9,9H5V5h4V9z M3,13v8h8v-8H3z M9,19H5v-4h4V19z M13,3v8h8V3H13z M19,9h-4V5h4V9z M13,13v8h8v-8H13z M19,19h-4v-4h4V19z"></path>
        </g>
      </g>
    </g>
  </base-icon>
</template>

<script>
import BaseIcon from '../common/BaseIcon';

export default {
  name: 'icon-projects',
  components: { BaseIcon }
}
</script>
