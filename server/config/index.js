'use strict';

const auth = require('./auth');
const db = require('./db');
const mail = require('./mail');
const oauth2 = require('./oauth2');

const port = process.env.PORT || 3000;

module.exports = { port, db, auth, mail, oauth2 };
