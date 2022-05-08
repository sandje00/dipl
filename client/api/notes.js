import client from './client';

const url = {
  getAll: id => `/notes/${id || ''}`,
  create: '/notes',
  getOne: id => `/notes/${id}`,
  update: id => `/notes/${id}`
};

function getAll(projectId) {
  return client.get(url.getAll(projectId));
}

function create(note) {
  return client.post(url.create, note);
}

function getOne(noteId) {
  return client.get(url.getOne(noteId));
}

function update(noteId, data) {
  return client.patch(url.update(noteId), data);
}

export default {
  getAll,
  create,
  getOne,
  update
};
