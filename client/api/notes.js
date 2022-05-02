import client from './client';

const url = {
  addNew: '/notes'
};

function addNew(note) {
  return client.post(url.addNew, note);
}

export default { addNew };
