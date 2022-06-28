'use strict';

const authenticate = require('../shared/auth');
const authGithub = require('../shared/auth/authGithub');
const ctrl = require('./project.controller');
const HttpError = require('../shared/errors/httpError');
const { NOT_FOUND } = require('../shared/errors/status');
const Project = require('./project.model');
const router = require('express').Router();

router.param('projectId', getProject);

router
  .use(authenticate)
  .get('/', ctrl.getAll)
  .get('/titles', ctrl.getAllTitles)
  .get('/repos', authGithub, ctrl.getAllRepos)
  .post('/', ctrl.create)
  .get('/:projectId', ctrl.getOne)
  .patch('/:projectId', ctrl.update)
  .delete('/:projectId', ctrl.deleteOne)
  .use(authGithub)
  .post('/:projectId/create-repo', ctrl.createRepo)
  .post('/:projectId/link-to-repo', ctrl.linkToRepo);

module.exports = { path: '/projects', router };

async function getProject(req, _, next, projectId) {
  return Project.findByPk(projectId)
    .then(project => {
      if (!project) throw new HttpError(NOT_FOUND, { message: 'Project not found.' });
      req.project = project;
      next();
    });
}
