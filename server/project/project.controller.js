'use strict';

const { BAD_REQUEST, CREATED, OK } = require('../shared/errors/status');
const HttpError = require('../shared/errors/httpError');
const Project = require('./project.model');
const { UniqueConstraintError } = require('sequelize');

const msg = {
  SUCCESS_ADD_PROJECT: 'You have added new project successfully.',
  SUCCESS_EDIT_PROJECT: 'You have edited a project successfully.'
};

async function getAll({ user: { id } }, res) {
  // TODO Add pagination
  const projects = await Project.findAll({ where: { userId: id } });
  return res.status(OK).json({ projects });
}

async function addNew(req, res) {
  const newProject = { ...req.body, userId: req.user.id };
  try {
    await Project.create(newProject);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new HttpError(BAD_REQUEST, err.errors[0].message);
    }
    throw err;
  }
  return res.status(CREATED).json({ message: msg.SUCCESS_ADD_PROJECT });
}

function getOne({ project }, res) {
  return res.status(OK).json({ project });
}

async function edit({ body, project }, res) {
  try {
    project.set({ ...body });
    await project.save();
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new HttpError(BAD_REQUEST, err.errors[0].message);
    }
    throw err;
  }
  return res.status(OK).json({ message: msg.SUCCESS_EDIT_PROJECT });
}

module.exports = {
  getAll,
  addNew,
  getOne,
  edit
};
