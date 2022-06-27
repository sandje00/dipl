import client from './client';

const url = {
  getAll: '/projects',
  getAllTitles: '/projects/titles',
  create: '/projects',
  getOne: id => `/projects/${id}`,
  update: id => `/projects/${id}`,
  deleteOne: id => `/projects/${id}`,
  createRepo: id => `/projects/${id}/create-repo`,
};

function getAll(params) {
  return client.get(url.getAll, { params });
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

function deleteOne(projectId) {
  return client.delete(url.deleteOne(projectId));
}

function createRepo(projectId, isPrivate) {
  return client.post(url.createRepo(projectId), null, {
    params: { isPrivate }
  });
}

export default {
  getAll,
  getAllTitles,
  create,
  getOne,
  update,
  deleteOne,
  createRepo
};
