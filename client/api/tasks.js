import client from './client';

const url = {
  getAll: '/tasks',
  create: '/tasks',
  getOne: id => `/tasks/${id}`,
  update: id => `/tasks/${id}`,
  deleteOne: id => `/tasks/${id}`
};

function getAll() {
  return client.get(url.getAll);
}

function create(task) {
  return client.post(url.create, task);
}

function getOne(taskId) {
  return client.get(url.getOne(taskId));
}

function update(taskId, data) {
  return client.patch(url.update(taskId), data);
}

function deleteOne(taskId) {
  return client.delete(url.deleteOne(taskId));
}

export default {
  getAll,
  create,
  getOne,
  update,
  deleteOne
};
