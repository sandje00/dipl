'use strict';

const {
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
  OK
} = require('../shared/errors/status');
const HttpError = require('../shared/errors/httpError');
const Note = require('./note.model');
const { UniqueConstraintError } = require('sequelize');

const msg = {
  SUCCESS_ADD_NOTE: 'You have added a note successfully.',
  SUCCESS_UPDATE_NOTE: 'You have updated a note successfully.'
};

async function getAll({ user: { id: userId }, params: { projectId } }, res) {
  const notes = await Note.findAll({
    where: {
      user_id: userId,
      project_id: projectId || null
    }
  });
  return res.status(OK).json({ notes });
}

async function create(req, res) {
  const newNote = { ...req.body, userId: req.user.id };
  try {
    await Note.create(newNote);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new HttpError(BAD_REQUEST, err.errors[0].message);
    }
    throw err;
  }
  return res.status(CREATED).json({ message: msg.SUCCESS_ADD_NOTE });
}

function getOne({ note }, res) {
  return res.status(OK).json({ note });
}

async function update({ body, note }, res) {
  try {
    note.set({ ...body });
    await note.save();
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new HttpError(BAD_REQUEST, err.errors[0].message);
    }
    throw err;
  }
  return res.status(OK).json({ message: msg.SUCCESS_UPDATE_NOTE });
}

async function deleteOne({ note }, res) {
  await note.destroy();
  return res.status(NO_CONTENT).send();
}

module.exports = {
  getAll,
  create,
  getOne,
  update,
  deleteOne
};
