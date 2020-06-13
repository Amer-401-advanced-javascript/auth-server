'use strict';

const base64 = require('base-64');
const user = require('../models/users-model');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');


function basicAuth (req, res, next){
  let baseDecode = req.headers.authorization.split(' ').pop();
  let decoded = base64.decode(baseDecode);
  let [username, password] = decoded.split(':');   
  user.read(username).then(data =>{     
    bcrypt.compare(password, data[0].password).then(async result =>{
      if(result){
        let secret = 'secretToken'; //this should be in the .env
        try{
          
          
          let token =await jwt.sign({username},secret);
          req.token = token;
          console.log(req.token);
                    
          next();
        }catch(err){console.log(err);}
        
      }else{
        res.send('invalid password');
      }
    }).catch(err => {
      throw new Error(err);       
    });
  }).catch(err =>{
    res.send(`invalid username ${err}`);
  });
}

module.exports = basicAuth;