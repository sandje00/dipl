import client from './client';

const url = {
  verify: token => `/users/verify/${token}`,
  login: '/users/login',
  logout: '/users/logout',
  forgotPassword: '/users/forgot-password',
  resetPassword: '/users/reset-password'
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

function resetPassword(body) {
  return client.post(url.resetPassword, body);
}

export default {
  verify,
  login,
  logout,
  forgotPassword,
  resetPassword
};
