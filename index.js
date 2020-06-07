'use strict';
const mongoose = require('mongoose');
const server = require('./src/server');
const MONGODB_URL = 'mongodb://localhost:27017/auth_server';

mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
});

server.start();