<template>
  <div class="pa-m container">
    <base-button class="edit-button" neutral>
      Edit
    </base-button>
    <span class="mt-m label">Title:</span>
    <h2 class="title">{{ project.title }}</h2>
    <span class="mt-l label">Description:</span>
    <span v-if="!project.description"></span>
    <p v-else class="mt-m description">
      {{ project.description }}
    </p>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import api from '@/api/projects';
import BaseButton from '../common/BaseButton';

export default {
  name: 'project-details',
  props: {
    projectId: { type: String, required: true }
  },
  setup(props) {
    const project = ref({});
    const fetchProject = async () => {
      return api.getOne(parseInt(props.projectId))
        .then(({ data }) => { project.value = data.project; })
        .catch(err => console.log(err));
    };

    onBeforeMount(() => fetchProject());

    return { project };
  },
  components: { BaseButton }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/base/_typography.scss';

.container {
  position: relative;

  .edit-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .label {
    // TODO Extract to separate .scss file
    display: inline-block;
  }

  .description {
    font-size: $font-size-large;
  }
}
</style>
