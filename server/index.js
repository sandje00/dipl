'use strict';

require('express-async-errors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const database = require('./shared/database');
const errorHandler = require('./shared/errors/errorHandler');
const express = require('express');
const helmet = require('helmet');
const { logRequests } = require('./shared/logger');
const { port } = require('./config');
const router = require('./router');

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/api/v1', logRequests, router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(errorHandler);

database.initialize();
