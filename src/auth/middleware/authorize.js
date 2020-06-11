'use strict';

let jwt = require('jsonwebtoken');
let userModel = require('../models/users-model');

module.exports =  (permission)=> {
  return  (req, res, next)=>{
    let token = req.headers.authorization.split(' ').pop();    
    let tok = jwt.verify(token, 'secretToken');
    userModel.readAndRole(tok)
    
    next();
  };
};