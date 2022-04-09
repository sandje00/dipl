import client from './client';

const url = {
  verify: token => `/users/verify/${token}`,
  login: '/users/login'
};

function verify(token) {
  return client.get(url.verify(token));
}

function login(credentials) {
  return client.post(url.login, credentials);
}

export default { verify, login };
