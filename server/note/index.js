'use strict';

const authenticate = require('../shared/auth');
const ctrl = require('./note.controller');
const HttpError = require('../shared/errors/httpError');
const Note = require('./note.model');
const { NOT_FOUND } = require('../shared/errors/status');
const router = require('express').Router();

router.param('noteId', getNote);

router
  .use(authenticate)
  .get('/:projectId?', ctrl.getAll)
  .post('/', ctrl.create)
  .get('/:noteId', ctrl.getOne)
  .patch('/:noteId', ctrl.update);

module.exports = { path: '/notes', router };

async function getNote(req, _, next, noteId) {
  return Note.findByPk(noteId)
    .then(note => {
      if (!note) throw new HttpError(NOT_FOUND, { message: 'Note not found.' });
      req.note = note;
      next();
    })
}
