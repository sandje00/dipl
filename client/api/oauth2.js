import client from './client';

const url = {
  authorize: '/oauth2/authorize',
  accessToken: '/oauth2/access-token'
};

function authorize() {
  return client.get(url.authorize);
}

function accessToken(params) {
  return client.post(url.accessToken, null, { params });
}

export default {
  authorize,
  accessToken
};
