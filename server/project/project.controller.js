'use strict';

const { OK } = require('../shared/errors/status');
const Project = require('./project.model');

async function getAll({ user: { id } }, res) {
  // TODO Add pagination
  const projects = await Project.findAll({ where: { userId: id } });
  return res.status(OK).json({ projects });
}

module.exports = { getAll };
