<template>
  <div class="flex-v pa-m project-details">
    <project-edit
      v-if="isEditMode"
      v-bind="project"
      @toggle-edit-mode="toggleEditMode"
      @project-updated="onProjectUpdated"
    ></project-edit>
    <project-view
      v-else
      v-bind="project"
      @toggle-edit-mode="toggleEditMode"
    ></project-view>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import api from '@/api/projects';
import ProjectEdit from './ProjectEdit';
import ProjectView from './ProjectView';

export default {
  name: 'project-details',
   props: {
    projectId: { type: String, required: true }
  },
  setup(props) {
    const projectId = parseInt(props.projectId);
    const project = ref({});
    const fetchProject = async () => {
      return api.getOne(projectId)
        .then(({ data }) => { project.value = data.project; })
        .catch(err => console.log(err));
    };
    onBeforeMount(() => fetchProject());

    const isEditMode = ref(false);
    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value;
    };

    const onProjectUpdated = projectData => {
      project.value = { ...projectData };
      toggleEditMode();
    }

    return {
      project,
      isEditMode,
      toggleEditMode,
      onProjectUpdated
    };
  },
  components: {
    ProjectEdit,
    ProjectView
  }
}
</script>

<style lang="scss" scoped>
.project-details {
  position: relative;
}
</style>
