import { createRouter, createWebHistory } from 'vue-router';
import Auth from '@/components/auth';
import Boards from '@/components/boards';
import Docs from '@/components/Docs';
import ForgotPassword from '@/components/auth/ForgotPassword';
import Home from '@/components/Home';
import Login from '@/components/auth/Login';
import OAuth from '@/components/oauth2';
import OAuthAuthorize from '@/components/oauth2/Authorize';
import OAuthRedirect from '@/components/oauth2/Redirect';
import Overview from '@/components/Overview';
import Projects from '@/components/projects';
import ProjectsAll from '@/components/projects/projects-all';
import ProjectDetails from '@/components/projects/project-details';
import ProjectNew from '@/components/projects/ProjectNew';
import Register from '@/components/Register';
import ResetPassword from '@/components/auth/ResetPassword';
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
        name: 'projects-all',
        component: ProjectsAll,
        meta: { requiresAuth: true }
      },
      {
        path: 'new',
        name: 'project-new',
        component: ProjectNew,
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
  },
  {
    path: '/oauth2',
    component: OAuth,
    children: [
      {
        path: 'authorize',
        name: 'oauth-authorize',
        component: OAuthAuthorize,
        meta: { requiresAuth: true }
      },
      {
        path: 'redirect',
        name: 'oauth-redirect',
        component: OAuthRedirect,
        meta: { requiresAuth: true }
      }
    ]
  }
];

const history = createWebHistory();

const router = createRouter({ routes, history });

const isAuthenticated = () => localStorage.getItem('isAuthenticated') === 'true';
const requiresAuth = route => route.matched.some(it => it.meta.requiresAuth);

router.beforeEach((to, _from, next) => {
  if (requiresAuth(to) && !isAuthenticated()) {
    return next({ name: 'login' });
  }
  else return next();
});

export default router;
