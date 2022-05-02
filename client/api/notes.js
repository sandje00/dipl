import client from './client';

const url = {
  addNew: '/notes',
  getOne: id => `/notes/${id}`,
  edit: id => `/notes/${id}`
};

function addNew(note) {
  return client.post(url.addNew, note);
}

function getOne(noteId) {
  return client.get(url.getOne(noteId));
}

function edit(noteId, data) {
  return client.patch(url.edit(noteId), data);
}

export default {
  addNew,
  getOne,
  edit
};
