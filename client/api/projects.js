import client from './client';

const url = {
  getAll: '/projects',
  getAllRepos: '/projects/repos',
  create: '/projects',
  getOne: id => `/projects/${id}`,
  update: id => `/projects/${id}`,
  deleteOne: id => `/projects/${id}`,
  createRepo: id => `/projects/${id}/create-repo`,
  linkToRepo: id => `/projects/${id}/link-to-repo`
};

function getAll(params) {
  return client.get(url.getAll, { params });
}

function getAllRepos() {
  return client.get(url.getAllRepos);
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

function linkToRepo(projectId, repo) {
  return client.post(url.linkToRepo(projectId), repo);
}

export default {
  getAll,
  getAllRepos,
  create,
  getOne,
  update,
  deleteOne,
  createRepo,
  linkToRepo
};
