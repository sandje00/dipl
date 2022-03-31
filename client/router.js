import { createRouter, createWebHistory } from 'vue-router';
import Auth from './components/auth';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/Register';
import Verify from './components/auth/Verify';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/register', name: 'register', component: Register },
  {
    path: '/auth',
    component: Auth,
    children: [
      { path: 'verify/:token', component: Verify, props: true },
      { path: 'login', name: 'login', component: Login }
    ]
  }
];

const history = createWebHistory();

const router = createRouter({ routes, history });

export default router;
