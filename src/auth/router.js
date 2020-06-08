'use strict';

const express = require('express');
const router = express.Router();
const userModel = require('./models/users-model');
const basicAuth = require('./middleware/basic');


router.get('/list', getAllHandler);
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
            req.token = data.pop();
            res.status(200).json({User: data[0], Token: req.token});
          }).catch(next);
      }else{
        res.send('the user already exists');
      }    
    }).catch(next);
}

function signInHandler(req, res, next){    
  res.json({token:req.token, record : req.body});
}


function getAllHandler (req, res, next) {
  userModel.read().then(data => {
    res.json(data);
  });
}

module.exports = router;