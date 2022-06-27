'use strict';

const {
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
  OK
} = require('../shared/errors/status');
const { UniqueConstraintError } = require('sequelize');
const { Project, sequelize } = require('../shared/database');
const HttpError = require('../shared/errors/httpError');
const Task = require('./task.model');

const msg = {
  SUCCESS_ADD_TASK: 'You have added new task successfully.',
  SUCCESS_UPDATE_TASK: 'You have updated task successfully.'
};

async function getAll({
  user: { id: userId },
  query: {
    attributes,
    join,
    projectId
  }
}, res) {
  const defaultAttributes = [ 'id', 'title', 'description', 'type', 'priority', 'status' ]; // Change as new functionalities are added
  const where = projectId === undefined
    ? { where: { userId } }
    : { where: { userId, projectId } };
  const include = join && {
    include: [{
      model: Project,
      as: 'project',
      attributes: [ 'id', 'title' ]
    }, {
      model: Task,
      as: 'parentTask',
      attributes: [ 'id', 'title' ]
    }]
  };
  const tasks = await Task.findAll({
    attributes: attributes && JSON.parse(attributes) || defaultAttributes,
    ...where,
    ...include
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

async function deleteOne({ task }, res) {
  await sequelize.transaction(async (t) => {
    await Task.destroy(
      { where: { parentTaskId: task.id } },
      { transaction: t }
    );
    await task.destroy({ transaction: t });
  });
  return res.status(NO_CONTENT).send();
}

module.exports = {
  getAll,
  create,
  getOne,
  update,
  deleteOne
};
