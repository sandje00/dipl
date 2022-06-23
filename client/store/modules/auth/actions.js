import authApi from '@/api/auth';
import usersApi from '@/api/users';

export const login = ({ commit }, credentials) => {
  return authApi.login(credentials)
    .then(({ data: { user } }) => {
      commit('login', user);
      localStorage.setItem('isAuthenticated', true);
      return Promise.resolve();
    });
};

export const logout = ({ commit }) => {
  return authApi.logout()
    .then(() => {
      commit('logout');
      localStorage.removeItem('isAuthenticated');
    });
};

export const fetchUser = ({ commit }) => {
  return usersApi.getOne()
    .then(({ data: { user } }) => commit('setUser', user));
};
