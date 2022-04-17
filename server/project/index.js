'use strict';

const authenticate = require('../shared/auth');
const ctrl = require('./project.controller');
const router = require('express').Router();

router
  .use(authenticate)
  .get('/', ctrl.getAll);

module.exports = { path: '/projects', router };
