import client from './client';

const url = {
  getAll: '/projects',
  create: '/projects',
  getOne: id => `/projects/${id}`,
  update: id => `/projects/${id}`
};

function getAll() {
  return client.get(url.getAll);
}

function create(project) {
  return client.post(url.create, project);
}

function getOne(projectId) {
  return client.get(url.getOne(projectId));
}

function update(projectId, data) {
  return client.patch(url.update(projectId), data);
}

export default {
  getAll,
  create,
  getOne,
  update
};
