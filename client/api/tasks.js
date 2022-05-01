import client from './client';

const url = {
  addNew: '/tasks',
  getOne: id => `/tasks/${id}`,
  edit: id => `/tasks/${id}`
};

function addNew(task) {
  return client.post(url.addNew, task);
}

function getOne(taskId) {
  return client.post(url.getOne(taskId));
}

function edit(taskId, data) {
  return client.patch(url.edit(taskId), data);
}

export default {
  addNew,
  getOne,
  edit
};
