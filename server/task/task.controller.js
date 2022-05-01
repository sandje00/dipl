'use strict';

const { BAD_REQUEST, CREATED, OK } = require('../shared/errors/status')
const HttpError = require('../shared/errors/httpError');
const Task = require('./task.model');
const { UniqueConstraintError } = require('sequelize');

const msg = {
  SUCCESS_ADD_TASK: 'You have added new task successfully'
};

async function addNew(req, res) {
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

module.exports = {
  addNew,
  getOne
};
