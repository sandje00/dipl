import auth from './modules/auth';
import { createStore } from 'vuex';

const refreshUser = store => !store.state.auth.user && store.dispatch('auth/fetchUser');

const store = createStore({
  modules: { auth },
  plugins: [ refreshUser ]
});

export default store;
