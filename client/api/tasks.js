import client from './client';

const url = {
  create: '/tasks',
  getOne: id => `/tasks/${id}`,
  update: id => `/tasks/${id}`
};

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
  create,
  getOne,
  update
};
