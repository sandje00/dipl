'use strict';

const authenticate = require('../shared/auth');
const ctrl = require('./task.controller');
const HttpError = require('../shared/errors/httpError');
const { NOT_FOUND } = require('../shared/errors/status');
const router = require('express').Router();
const Task = require('./task.model');

router.param('taskId', getTask);

router
  .use(authenticate)
  .get('/', ctrl.getAll)
  .post('/', ctrl.create)
  .get('/:taskId', ctrl.getOne)
  .patch('/:taskId', ctrl.update)
  .delete('/:taskId', ctrl.deleteOne);

module.exports = { path: '/tasks', router };

async function getTask(req, _, next, taskId) {
  return Task.findByPk(taskId)
    .then(task => {
      if (!task) throw new HttpError(NOT_FOUND, { message: 'Task not found.' });
      req.task = task;
      next();
    });
}
