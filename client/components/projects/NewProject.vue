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

export default {
  name: 'new-project',
  setup() {
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
          resetForm(({ data: { error } }) => console.log(error));
        })
        .catch();
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

<style lang="scss" scoped>

</style>
