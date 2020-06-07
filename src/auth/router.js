'use strict';

const express = require('express');
const router = express.Router();
const userModel = require('./models/users-model');
const basicAuth = require('./middleware/basic');


router.post('/signup', signUpHandler);
router.post('/signin', basicAuth, signInHandler);



//////route handler

function signUpHandler(req, res, next){
  const user = req.body;
  userModel.read(user.username)
    .then( data => {
      if(!data[0]){
        userModel.create(user)
          .then(data => {
            res.status(200).json(data);
          }).catch(next);
      }else{
        res.send('the user already exists');
      }    
    }).catch(next);
}

function signInHandler(req, res, next){
  console.log(req.token);
    
  res.json({token:req.token, record : req.body});
}

module.exports = router;