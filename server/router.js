'use strict';

const router = require('express').Router();
const user = require('./user');
const project = require('./project');
const task = require('./task');

router.use(user.path, user.router);
router.use(project.path, project.router);
router.use(task.path, task.router);

module.exports = router;
