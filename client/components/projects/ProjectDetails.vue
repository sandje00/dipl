<template>
  <div class="flex-v pa-m container">
    <base-button
      v-if="!isEditMode"
      @click="toggleEditMode"
      class="edit-button"
      neutral
    >
      Edit
    </base-button>
    <span class="mt-m label">Title:</span>
    <h2 v-if="!isEditMode" class="title">
      {{ project.title }}
    </h2>
    <base-input
      v-else
      v-model="projectData.title"
    ></base-input>
    <span class="mt-l label">Description:</span>
    <div v-if="!isEditMode" class="mt-m">
      <span v-if="!project.description">
        There is no description provided
      </span>
      <p v-else class=" description">
        {{ project.description }}
      </p>
    </div>
    <base-textarea
      v-else
      v-model="projectData.description"
    ></base-textarea>
    <div v-if="isEditMode" class="mt-m flex-h">
      <base-button
        class="mr-m"
      >
        Submit
      </base-button>
      <base-button
        @click="toggleEditMode"
        class="mr-m"
        neutral
      >
        Discard
      </base-button>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import api from '@/api/projects';
import BaseButton from '../common/BaseButton';
import BaseInput from '../common/BaseInput';
import BaseTextarea from '../common/BaseTextarea';

export default {
  name: 'project-details',
  props: {
    projectId: { type: String, required: true }
  },
  setup(props) {
    const project = ref({});
    const projectData = ref({});
    const fetchProject = async () => {
      return api.getOne(parseInt(props.projectId))
        .then(({ data }) => {
          project.value = data.project;
          projectData.value = data.project;
        })
        .catch(err => console.log(err));
    };
    onBeforeMount(() => fetchProject());

    const isEditMode = ref(false);
    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value;
    };

    return {
      project,
      projectData,
      isEditMode,
      toggleEditMode
    };
  },
  components: { BaseButton, BaseInput, BaseTextarea }
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
