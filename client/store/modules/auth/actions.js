import authApi from '@/api/auth';
import usersApi from '@/api/users';

export const login = ({ commit }, credentials) => {
  return authApi.login(credentials)
    .then(({ data: { user } }) => Promise.resolve(commit('login', user)));
};

export const logout = ({ commit }) => {
  return authApi.logout()
    .then(() => commit('logout'));
};

export const fetchUser = ({ commit }) => {
  return usersApi.getOne()
    .then(({ data: { user } }) => commit('setUser', user));
};
