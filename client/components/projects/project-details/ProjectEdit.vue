<template>
  <span class="mt-m">Title:</span>
  <base-input
    v-model="projectData.title"
  ></base-input>
  <span class="mt-l">Description:</span>
  <base-textarea
    v-model="projectData.description"
  ></base-textarea>
  <div class="mt-m flex-h">
    <base-button @click="submit" class="mr-m">
      Submit
    </base-button>
    <base-button @click="toggleEditMode" class="mr-m" secondary>
      Discard
    </base-button>
  </div>
  <hr class="mt-xxl divider">
  <span class="mt-l mb-m">Repo:</span>
  <div v-if="repo?.name" class="flex-v">
    <a
      :href="repo?.html_url"
      target="_blank"
      class="mb-m repo-link"
    >
      {{ repo?.full_name }}
    </a>
    <base-button
      @click="unlinkRepo"
      class="mb-m align-self-start"
      secondary
      alert>
      Unlink repo
    </base-button>
  </div>
  <link-to-repo-section
    v-else
    :projectId="id"
    @repo-linked="onRepoLinked">
  </link-to-repo-section>
</template>

<script>
import api from '@/api/projects';
import BaseButton from '../../common/BaseButton';
import BaseInput from '../../common/BaseInput';
import BaseTextarea from '../../common/BaseTextarea';
import LinkToRepoSection from './LinkToRepoSection';
import { ref } from 'vue';

export default {
  name: 'project-edit',
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    repo: { type: Object, default: () => ({}) }
  },
  emits: [
    'toggle-edit-mode',
    'project-updated'
  ],
  setup(props, { emit }) {
    const projectData = ref({ ...props });

    const toggleEditMode = () => emit('toggle-edit-mode');

    const projectUpdated = project => emit('project-updated', project);
    const submit = async () => {
      const data = {};
      Object.keys(projectData.value).forEach(key => {
        if (projectData.value[key] !== props[key]) {
          data[key] = projectData.value[key];
        }
      });
      return Object.keys(data).length && api.update(props.id, data)
        .then(() => projectUpdated(projectData.value))
        .catch(err => console.error(err));
    };

    const onRepoLinked = repo => {
      projectData.value.repo = repo;
      projectUpdated(projectData.value);
    };

    const unlinkRepo = () => alert('TODO :)');

    return {
      projectData,
      toggleEditMode,
      submit,
      onRepoLinked,
      unlinkRepo
    };
  },
  components: {
    BaseButton,
    BaseInput,
    BaseTextarea,
    LinkToRepoSection
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/stylesheets/base/_typography.scss';

.repo-link {
  font-size: $font-size-large;
}

.controls {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.divider {
  border: 1px solid var(--color-border);
}
</style>
