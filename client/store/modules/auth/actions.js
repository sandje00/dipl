import api from '@/api/auth';

export const login = ({ commit }, credentials) => {
  return api.login(credentials)
    .then(({ data: { user } }) => Promise.resolve(commit('login', user)));
};

export const logout = ({ commit }) => {
  return api.logout()
    .then(() => commit('logout'));
};
