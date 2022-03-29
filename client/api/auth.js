import client from './client';

const url = {
  verify: token => `/users/verify/${token}`
};

function verify(token) {
  return client.get(url.verify(token));
}

export default { verify };
