'use strict';

const authenticate = require('../shared/auth');
const ctrl = require('./project.controller');
const router = require('express').Router();

router
  .use(authenticate)
  .get('/', ctrl.getAll)
  .post('/', ctrl.addNew);

module.exports = { path: '/projects', router };
