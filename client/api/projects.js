import client from './client';

const url = {
  getAll: '/projects',
  getAllTitles: '/projects/titles',
  create: '/projects',
  getOne: id => `/projects/${id}`,
  update: id => `/projects/${id}`
};

function getAll(search) {
  return client.get(url.getAll, { params: { search } });
}

function getAllTitles() {
  return client.get(url.getAllTitles);
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
  getAllTitles,
  create,
  getOne,
  update
};
