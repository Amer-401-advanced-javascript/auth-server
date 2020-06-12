'use strict';

let userModel = require('../models/users-model');

module.exports =  (permission)=> {
  return  (req, res, next)=>{
    let token = req.user;    
    try{
      let capabilities = userModel.can(token[0].role);
      let flag = capabilities.includes(permission);
      flag ? next() : next('access denied');
    }catch(error){
      console.log('error');
    }
  };
};