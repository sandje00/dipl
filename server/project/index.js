'use strict';

const authenticate = require('../shared/auth');
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
  .post('/', ctrl.create)
  .get('/:projectId', ctrl.getOne)
  .patch('/:projectId', ctrl.update);

module.exports = { path: '/projects', router };

async function getProject(req, _, next, projectId) {
  return Project.findByPk(projectId)
    .then(project => {
      if (!project) throw new HttpError(NOT_FOUND, { message: 'Project not found.' });
      req.project = project;
      next();
    });
}
