import client from './client';

const url = {
  register: '/users/register',
  getOne: '/users/'
};

function register(data) {
  return client.post(url.register, data);
}

function getOne() {
  return client.get(url.getOne);
}

export default {
  register,
  getOne
};
