import App from './App.vue';
import { createApp } from 'vue';
import { defineRules } from '@/utils/validation';
import router from './router';

defineRules();

const app = createApp(App);

app.use(router);

app.mount('#app');
