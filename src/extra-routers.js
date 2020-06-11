'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./auth/middleware/bearer-auth');
const aclMiddleware = require('./auth/middleware/authorize');


router.get('/secret', bearerMiddleware, aclMiddleware('read'),secretHandler);



function secretHandler(req, res, next){
  res.status(200).json(req.user);
}

module.exports = router;