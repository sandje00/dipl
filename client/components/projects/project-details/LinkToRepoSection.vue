<template>
  <div class="flex-v">
    <base-button
      v-if="!allRepos.length"
      @click="fetchAllRepos"
      class="align-self-start"
      secondary>
      Link to existing repo
    </base-button>
    <div v-else class="flex-v">
      <base-select
        v-model="currentRepo"
        :options="reposList"
        class="align-self-start mb-m"
      ></base-select>
      <base-button
        @click="linkToRepo"
        class="align-self-start mb-m">
        Link
      </base-button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import api from '@/api/projects';
import BaseButton from '../../common/BaseButton';
import BaseSelect from '../../common/BaseSelect';
import { useRouter } from 'vue-router';

const keyValuesToArray = (objArr, key) => objArr.map(it => it[key]);

export default {
  name: 'link-to-repo-section',
  props: {
    projectId: { type: Number, required: true }
  },
  emits: [ 'repo-linked' ],
  setup(props, { emit }) {
    const router = useRouter();
    const allRepos = ref([]);
    const reposList = ref([]);
    const currentRepo = ref('');
    const fetchAllRepos = async () => {
      return api.getAllRepos()
        .then(({ data: { repos } }) => {
          allRepos.value = repos;
          reposList.value = keyValuesToArray(allRepos.value, 'name')
          currentRepo.value = reposList.value[0];
        })
        .catch(({ status, data: { error } }) => {
          if (status !== 403) console.log(error);
          const result = confirm(error);
          return result && router.push({ name: 'oauth-authorize' });
        });
    };

    const chosenRepo = ref({});
    watch(currentRepo, () => {
      chosenRepo.value = allRepos.value.find(it => it.name === currentRepo.value);
    });

    const linkToRepo = async () => {
      return api.linkToRepo(props.projectId, chosenRepo.value)
        .then(() => emit('repo-linked', chosenRepo.value))
        .catch(err => console.error(err));
    };

    return {
      allRepos,
      reposList,
      currentRepo,
      fetchAllRepos,
      linkToRepo
    };
  },
  components: {
    BaseButton,
    BaseSelect
  }
};
</script>
