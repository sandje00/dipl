import client from './client';

const url = {
  addNew: '/notes',
  getOne: id => `/notes/${id}`,
  update: id => `/notes/${id}`
};

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
  create,
  getOne,
  update
};
