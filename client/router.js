import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home';
import Register from './components/register';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/register', name: 'register', component: Register }
];

const history = createWebHistory();

const router = createRouter({ routes, history });

export default router;
