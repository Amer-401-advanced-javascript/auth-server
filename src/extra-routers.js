'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./auth/middleware/bearer-auth');
const aclMiddleware = require('./auth/middleware/authorize');


router.get('/secret', bearerMiddleware, aclMiddleware('read'),secretHandler);
router.delete('/delete', bearerMiddleware, aclMiddleware('delete'), deleteHandler);
router.put('/update', bearerMiddleware, aclMiddleware('update'), updateHandler);
router.post('/create', bearerMiddleware, aclMiddleware('create'), createHandler);



function secretHandler(req, res, next){
  res.status(200).json(req.user);
}

function deleteHandler( req, res, next){
  res.status(200).send('deleted');
}

function updateHandler(req, res, next){
  res.status(200).send('updated');
}
function createHandler(req, res, next){
  res.status(201).send('created');
}

module.exports = router;