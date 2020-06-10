'use strict';

const express = require('express');
const router = express.Router();
const userModel = require('./models/users-model');
const basicAuth = require('./middleware/basic');
const oauth = require('./middleware/oauth.js');


router.get('/list', getAllHandler);
router.post('/signup', signUpHandler);
router.post('/signin', basicAuth, signInHandler);
router.get('/oauth', oauth ,oauthHandler);




//////route handler

function signUpHandler(req, res, next){
  const user = req.body;
  userModel.read(user.username)
    .then( data => {
      if(!data[0]){
        userModel.create(user)
          .then(data => {            
            res.cookie('token', data.pop(), {expires: new Date(Date.now() + 900000 )});
            res.status(200).json({User: data[0]});
          }).catch(next);
      }else{
        res.send('the user already exists');
      }    
    }).catch(next);
}

function signInHandler(req, res, next){
  res.cookie('token', req.token);
  res.json({record : req.body});  
}


async function getAllHandler (req, res, next) {
  let data = await userModel.read();
  res.json(data);
}

function oauthHandler( req, res, next){  
  let data = req.userData;  
  res.status(200).json(data);
}

module.exports = router;