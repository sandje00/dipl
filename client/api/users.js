import client from './client';

const url = {
  register: '/users/register'
};

function register(data) {
  return client.post(url.register, data);
}

export default { register }
