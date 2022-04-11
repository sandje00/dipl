import client from './client';

const url = {
  verify: token => `/users/verify/${token}`,
  login: '/users/login',
  logout: '/users/logout'
};

function verify(token) {
  return client.get(url.verify(token));
}

function login(credentials) {
  return client.post(url.login, credentials);
}

function logout() {
  return client.post(url.logout);
}

export default { verify, login, logout };
