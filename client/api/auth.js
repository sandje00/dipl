import client from './client';

const url = {
  verify: token => `/users/verify/${token}`,
  login: '/users/login'
};

function verify(token) {
  return client.get(url.verify(token));
}

function login(data) {
  return client.post(url.login, data);
}

export default { verify, login };
