'use strict';

const userModel = require('../models/users-model');
module.exports = (req, res, next)=>{
  if(!req.headers.authorization){
    next('User is not loggedin');
    return;
  }

  let bearerToken = req.headers.authorization.split(' ').pop();

  userModel.verifyToken(bearerToken).then(userData => {
    req.user = userData;
    next();
  }).catch(err => next(err));
  
  
  
 
};