<template>
  <span class="mt-m">Title:</span>
  <h2>{{ title }}</h2>
  <span class="mt-l">Description:</span>
  <span v-if="!description">
    There is no description provided
  </span>
  <p v-else class="description">
    {{ description }}
  </p>
  <div v-if="repo?.full_name" class="flex-v">
    <span class="mt-l">Repo:</span>
    <a
      :href="repo?.html_url"
      target="_blank"
      class="repo-link"
    >
      {{ repo?.full_name }}
    </a>
  </div>
  <div class="flex-h justify-center align-items-center controls">
    <base-button @click="toggleEditMode" class="ml-m" secondary>
      Edit
    </base-button>
    <base-button v-if="!repo?.full_name" @click="createRepo" class="ml-m" secondary>
      Create GitHub repo
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
    description: { type: String, default: '' },
    repo: { type: Object, default: () => ({}) }
  },
  emits: [ 'toggle-edit-mode', 'repo-updated' ],
  setup(props, { emit }) {
    const toggleEditMode = () => emit('toggle-edit-mode');

    const router = useRouter();

    const deleteProject = () => {
      const result = confirm(`Are you sure you want to delete project ${props.title} and all of its tasks and notes?`);
      return result && api.deleteOne(props.id)
        .then(() => router.push({ name: 'projects-all' }))
        .catch(err => console.error(err));
    };

    const repoUpdated = repo => emit('repo-updated', repo);
    const createRepo = async () => {
      const isPrivate = confirm('Do you want repo to be private?');
      return api.createRepo(props.id, isPrivate)
        .then(({ data: { repo } }) => repoUpdated(repo))
        .catch(({ status, data: { error } }) => {
          if (status !== 403) console.log(error);
          const result = confirm(error);
          return result && router.push({ name: 'oauth-authorize' });
        });
    };

    return {
      toggleEditMode,
      deleteProject,
      createRepo
    };
  },
  components: { BaseButton }
};
</script>

<style lang="scss" scoped>
@import '../../../assets/stylesheets/base/_typography.scss';

.description, .repo-link {
  font-size: $font-size-large;
}

.controls {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
