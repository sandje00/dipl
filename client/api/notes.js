import client from './client';

const url = {
  addNew: '/notes',
  getOne: id => `/notes/${id}`
};

function addNew(note) {
  return client.post(url.addNew, note);
}

function getOne(noteId) {
  return client.get(url.getOne(noteId));
}

export default {
  addNew,
  getOne
};
