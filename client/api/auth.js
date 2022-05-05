import client from './client';

const url = {
  verify: token => `/users/verify/${token}`,
  login: '/users/login',
  logout: '/users/logout',
  forgotPassword: '/users/forgotPassword'
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

function forgotPassword(email) {
  return client.post(url.forgotPassword, { email });
}

export default {
  verify,
  login,
  logout,
  forgotPassword
};
