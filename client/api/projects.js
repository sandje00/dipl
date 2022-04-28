import client from './client';

const url = {
  getAll: '/projects',
  addNew: '/projects'
};

function getAll() {
  return client.get(url.getAll);
}

function addNew(project) {
  return client.post(url.addNew, project);
}

export default { getAll, addNew };
