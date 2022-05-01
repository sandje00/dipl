import client from './client';

const url = {
  getAll: '/projects',
  addNew: '/projects',
  getOne: id => `/projects/${id}`
};

function getAll() {
  return client.get(url.getAll);
}

function addNew(project) {
  return client.post(url.addNew, project);
}

function getOne(projectId) {
  return client.post(url.getOne(projectId));
}

export default {
  getAll,
  addNew,
  getOne
};
