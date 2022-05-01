'use strict';

const authenticate = require('../shared/auth');
const ctrl = require('./task.controller');
const router = require('express').Router();

router
  .use(authenticate)
  .post('/', ctrl.addNew);

module.exports = { path: '/tasks', router };
