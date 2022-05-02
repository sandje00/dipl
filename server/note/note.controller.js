'use strict';

const { BAD_REQUEST, CREATED, OK } = require('../shared/errors/status')
const HttpError = require('../shared/errors/httpError');
const Note = require('./note.model');
const { UniqueConstraintError } = require('sequelize');

const msg = {
  SUCCESS_ADD_NOTE: 'You have added a note successfully.',
  SUCCESS_UPDATE_NOTE: 'You have updated a note successfully.'
};

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

module.exports = {
  create,
  getOne,
  update
};
