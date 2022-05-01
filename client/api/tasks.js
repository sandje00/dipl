import client from './client';

const url = {
  addNew: '/tasks',
  getOne: id => `/tasks/${id}`
};

function addNew(task) {
  return client.post(url.addNew, task);
}

function getOne(taskId) {
  return client.post(url.getOne(taskId));
}

export default {
  addNew,
  getOne
};
