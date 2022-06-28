<template>
  <div class="pa-m">
    <form
      @submit.prevent="submit"
      class="flex-v"
    >
      <base-input
        v-model="title"
        type="text"
        name="title"
        label="Title"
        :error="errors.title"
      ></base-input>
      <base-textarea
        v-model="description"
        name="description"
        label="Description"
      ></base-textarea>
      <base-button class="align-self-start mt-m">
        Submit
      </base-button>
    </form>
  </div>
</template>

<script>
import { useForm, useField } from 'vee-validate';
import api from '@/api/projects';
import BaseButton from '../common/BaseButton';
import BaseInput from '../common/BaseInput';
import BaseTextarea from '../common/BaseTextarea';
import { useRouter } from 'vue-router';

export default {
  name: 'project-new',
  setup() {
    const router = useRouter();

    const validationSchema = {
      title: { required: true }
    };

    const { errors, handleSubmit } = useForm({ validationSchema });

    const { value: title } = useField('title');
    const { value: description } = useField('description');

    const submit = handleSubmit((values, { resetForm }) => {
      api
        .create(values)
        .then(({ data: { message } }) => {
          console.log(message);
          resetForm();
          router.push({ name: 'projects-all' });
        })
        .catch(({ data: { error } }) => console.error(error));
    });

    return { errors, title, description, submit };
  },
  components: {
    BaseButton,
    BaseInput,
    BaseTextarea
  }
};
</script>
