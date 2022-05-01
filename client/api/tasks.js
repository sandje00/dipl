import client from './client';

const url = {
  addNew: '/tasks'
};

function addNew(project) {
  return client.post(url.addNew, project);
}

export default { addNew };
