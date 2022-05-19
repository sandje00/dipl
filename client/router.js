import { createRouter, createWebHistory } from 'vue-router';
import AllProjects from '@/components/projects/AllProjects';
import Auth from '@/components/auth';
import Boards from '@/components/boards';
import Docs from '@/components/Docs';
import ForgotPassword from '@/components/auth/ForgotPassword';
import get from 'lodash/get';
import Home from '@/components/Home';
import Login from '@/components/auth/Login';
import NewProject from '@/components/projects/NewProject';
import Overview from '@/components/Overview';
import ProjectDetails from '@/components/projects/ProjectDetails';
import Projects from '@/components/projects';
import Register from '@/components/Register';
import ResetPassword from '@/components/auth/ResetPassword';
import store from './store';
import Verify from '@/components/auth/Verify';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/register', name: 'register', component: Register },
  {
    path: '/auth',
    component: Auth,
    children: [
      { path: 'verify/:token', component: Verify, props: true },
      { path: 'login', name: 'login', component: Login },
      { path: 'forgot-password', name: 'forgot-password', component: ForgotPassword },
      {
        path: 'reset/:token',
        name: 'reset-password',
        component: ResetPassword,
        props: true
      }
    ]
  },
  {
    path: '/overview',
    name: 'overview',
    component: Overview,
    meta: { requiresAuth: true }
  },
  {
    path: '/projects',
    component: Projects,
    children: [
      {
        path: 'all',
        name: 'all-projects',
        component: AllProjects,
        meta: { requiresAuth: true }
      },
      {
        path: 'new',
        name: 'new-project',
        component: NewProject,
        meta: { requiresAuth: true }
      },
      {
        path: 'details/:projectId',
        name: 'project-details',
        component: ProjectDetails,
        props: true,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/boards',
    name: 'boards',
    component: Boards,
    meta: { requiresAuth: true }
  },
  {
    path: '/docs',
    name: 'docs',
    component: Docs,
    meta: { requiresAuth: true }
  }
];

const history = createWebHistory();

const router = createRouter({ routes, history });

const isAuthenticated = () => get(store.state, 'auth.user');
const requiresAuth = route => route.matched.some(it => it.meta.requiresAuth);

router.beforeEach((to, _from, next) => {
  if (requiresAuth(to) && isAuthenticated() === 'false') {
    return next({ name: 'login' });
  }
  else return next();
});

export default router;
