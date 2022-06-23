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
</template>

<script>
import api from '@/api/projects';
import BaseButton from '../../common/BaseButton';
import BaseInput from '../../common/BaseInput';
import BaseTextarea from '../../common/BaseTextarea';
import { ref } from 'vue';

export default {
  name: 'project-edit',
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' }
  },
  emits: [ 'toggle-edit-mode', 'project-updated' ],
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

    return {
      projectData,
      toggleEditMode,
      submit
    };
  },
  components: {
    BaseButton,
    BaseInput,
    BaseTextarea
  }
}
</script>
