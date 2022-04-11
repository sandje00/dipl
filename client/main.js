import App from './App.vue';
import { createApp } from 'vue';
import { defineRules } from '@/utils/validation';
import router from './router';
import store from './store';

defineRules();

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
