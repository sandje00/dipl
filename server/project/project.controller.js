'use strict';

const {
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
  OK
} = require('../shared/errors/status');
const { Note, sequelize, Task } = require('../shared/database');
const HttpError = require('../shared/errors/httpError');
const Project = require('./project.model');
const { UniqueConstraintError } = require('sequelize');

const msg = {
  SUCCESS_ADD_PROJECT: 'You have added new project successfully.',
  SUCCESS_UPDATE_PROJECT: 'You have updated a project successfully.'
};

async function getAll({ user: { id } }, res) {
  // TODO Add pagination
  const projects = await Project.findAll({ where: { userId: id } });
  return res.status(OK).json({ projects });
}

async function create(req, res) {
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

async function update({ body, project }, res) {
  try {
    project.set({ ...body });
    await project.save();
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new HttpError(BAD_REQUEST, err.errors[0].message);
    }
    throw err;
  }
  return res.status(OK).json({ message: msg.SUCCESS_UPDATE_PROJECT });
}

async function getAllTitles({ user: { id } }, res) {
  const projects = await Project.findAll({
    attributes: [ 'title' ],
    where: { userId: id }
  });
  return res.status(OK).json({
    projects: keyValuesToArray(projects, 'title')
  });
}

async function deleteOne({ project }, res) {
  await sequelize.transaction(async (t) => {
    await Note.destroy(
      { where: { projectId: project.id } },
      { transaction: t }
    );
    await Task.destroy(
      { where: { projectId: project.id } },
      { transaction: t }
    );
    await project.destroy({ transaction: t });
  });
  return res.status(NO_CONTENT).send();
}

module.exports = {
  getAll,
  create,
  getOne,
  update,
  getAllTitles,
  deleteOne
};

function keyValuesToArray(objArr, key) {
  return objArr.map(it => it[key]);
}
