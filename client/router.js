import { createRouter, createWebHistory } from 'vue-router';
import Auth from '@/components/auth';
import Boards from '@/components/boards';
import Docs from '@/components/Docs';
import { getCookieValue } from '@/utils/cookie';
import Home from '@/components/Home';
import Login from '@/components/auth/Login';
import Overview from '@/components/Overview';
import Projects from '@/components/projects';
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
  {
    path: '/overview',
    name: 'overview',
    component: Overview,
    meta: { requiresAuth: true }
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects,
    meta: { requiresAuth: true }
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

const isAuthenticated = () => getCookieValue('isAuthenticated');
const requiresAuth = route => route.matched.some(it => it.meta.requiresAuth);

router.beforeEach((to, _from, next) => {
  // TODO Figure out how to solve this IsAuthenticated() workaround properly
  if (requiresAuth(to) && isAuthenticated() === 'false') {
    return next({ name: 'login' });
  }
  else return next();
});

export default router;
