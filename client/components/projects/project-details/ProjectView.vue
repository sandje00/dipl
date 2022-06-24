<template>
  <span class="mt-m">Title:</span>
  <h2>{{ title }}</h2>
  <span class="mt-l">Description:</span>
  <div class="mt-m">
    <span v-if="!description">
      There is no description provided
    </span>
    <p v-else class="description">
      {{ description }}
    </p>
  </div>
  <div class="flex-h justify-center align-items-center controls">
    <base-button @click="toggleEditMode" class="ml-m" secondary>
      Edit
    </base-button>
    <base-button @click="toggleEditMode" class="ml-m" secondary>
      Project to GitHub repo
    </base-button>
    <base-button @click="deleteProject" class="ml-m" secondary alert>
      Delete
    </base-button>
  </div>
</template>

<script>
import api from '@/api/projects';
import BaseButton from '../../common/BaseButton';
import { useRouter } from 'vue-router';

export default {
  name: 'project-view',
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' }
  },
  emits: [ 'toggle-edit-mode' ],
  setup(props, { emit }) {
    const toggleEditMode = () => emit('toggle-edit-mode');

    const router = useRouter();
    const deleteProject = () => {
      const question = `Are you sure you want to delete project ${props.title} and all of its tasks and notes?`;
      const result = confirm(question);
      return result && api.deleteOne(props.id)
        .then(() => router.push({ name: 'projects-all' }))
        .catch(err => console.error(err));
    };

    return {
      toggleEditMode,
      deleteProject
    };
  },
  components: { BaseButton }
};
</script>

<style lang="scss" scoped>
@import '../../../assets/stylesheets/base/_typography.scss';

.description {
  font-size: $font-size-large;
}

.controls {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
