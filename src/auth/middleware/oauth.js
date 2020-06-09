'use strict';

require('dotenv').config();
const superagent = require('superagent');
const userModel = require('../models/users-model');

async function middlewareHandle(req, res, next){
  try {
    let code = req.query.code;
    let codeExchangedForToken = await codeHandler(code);
    let userInfoTokenFor = await TokenHandler(codeExchangedForToken);
    let insertData = await dbHandler(userInfoTokenFor);
    req.userData = insertData;
    next();
  } catch (error) {
    next(error);
  }
  
}



async function codeHandler (code){    
  let url = 'https://github.com/login/oauth/access_token';
  let tok = await superagent.post(url)
    .send({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET, 
      redirect_uri: process.env.API_SERVER, 
      code: code,
    });
  let token= tok.body.access_token;
  return token;
}

async function TokenHandler(token){ 
  let user = await superagent.get('https://api.github.com/user')
    .set('Authorization', `token ${token}`)
    .set('user-agent', 'express-app');
  return user.body;
}

async function dbHandler(user){
  let findTheUser = await userModel.read(user.name);
  if (!findTheUser[0]){
    let dbUser = {
      username: user.name,
      password: 'oAuth',
    };
    let createUser = await userModel.create(dbUser);    
    return createUser;
  } else{    
    return findTheUser;
  }
}

module.exports = middlewareHandle;