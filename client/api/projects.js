import client from './client';

const url = {
  getAll: '/projects'
};

function getAll() {
  return client.get(url.getAll);
}

export default { getAll };
