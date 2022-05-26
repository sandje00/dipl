'use strict';

const { BAD_REQUEST, CREATED, OK } = require('../shared/errors/status');
const HttpError = require('../shared/errors/httpError');
const { Project } = require('../shared/database');
const Task = require('./task.model');
const { UniqueConstraintError } = require('sequelize');

const msg = {
  SUCCESS_ADD_TASK: 'You have added new task successfully.',
  SUCCESS_UPDATE_TASK: 'You have updated task successfully.'
};

async function getAll({ user: { id } }, res) {
  const tasks = await Task.findAll({
    attributes: {
      exclude: [ 'userId', 'projectId', 'parentTaskId' ]
    },
    where: { userId: id },
    include: [{
      model: Project,
      as: 'project',
      attributes: [ 'id', 'title' ]
    }, {
      model: Task,
      as: 'parentTask',
      attributes: [ 'id', 'title' ]
    }]
  });
  return res.status(OK).json({ tasks });
}

async function create(req, res) {
  const newTask = { ...req.body, userId: req.user.id };
  try {
    await Task.create(newTask);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new HttpError(BAD_REQUEST, err.errors[0].message);
    }
    throw err;
  }
  return res.status(CREATED).json({ message: msg.SUCCESS_ADD_TASK });
}

function getOne({ task }, res) {
  return res.status(OK).json({ task });
}

async function update({ body, task }, res) {
  try {
    task.set({ ...body });
    await task.save();
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new HttpError(BAD_REQUEST, err.errors[0].message);
    }
    throw err;
  }
  return res.status(OK).json({ message: msg.SUCCESS_UPDATE_TASK });
}

module.exports = {
  getAll,
  create,
  getOne,
  update
};
