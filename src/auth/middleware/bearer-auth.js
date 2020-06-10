'use strict';

const userModel = require('../models/users-model');
module.exports = (req, res, next)=>{
  console.log(req.headers );
  if(!req.headers.authorization){
    next('User is not loggedin');
    return;
  }

  let bearerToken = req.headers.authorization.split(' ').pop();

  userModel.verifyToken(bearerToken).then(userData => {
    console.log(userData);
    req.user = userData;
    next();
  }).catch(err => console.error(err));
  
  
  
 
};