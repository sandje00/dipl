import client from './client';

const url = {
  getAll: '/tasks',
  create: '/tasks',
  getOne: id => `/tasks/${id}`,
  update: id => `/tasks/${id}`
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

export default {
  getAll,
  create,
  getOne,
  update
};
