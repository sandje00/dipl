import { createRouter, createWebHistory } from 'vue-router';
import Auth from '@/components/auth';
import Boards from '@/components/Boards';
import Docs from '@/components/Docs';
import Home from '@/components/Home';
import Login from '@/components/auth/Login';
import Overview from '@/components/Overview';
import Projects from '@/components/Projects';
import Register from '@/components/Register';
import Verify from '@/components/auth/Verify';

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
  },
  { path: '/overview', name: 'overview', component: Overview },
  { path: '/projects', name: 'projects', component: Projects },
  { path: '/boards', name: 'boards', component: Boards },
  { path: '/docs', name: 'docs', component: Docs }
];

const history = createWebHistory();

const router = createRouter({ routes, history });

export default router;
