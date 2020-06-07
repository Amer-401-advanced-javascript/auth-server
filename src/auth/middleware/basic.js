'use strict';

const base64 = require('base-64');
const user = require('../models/users-model');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

function basicAuth (req, res, next){
    
  let baseDecode = req.headers.authorization.split(' ').pop();
  let decoded = base64.decode(baseDecode);
  let [username, password] = decoded.split(':'); 
  console.log(username);
  
  user.read(username).then(data =>{      
    // if(data[0]){
    bcrypt.compare(password, data[0].password).then( result =>{
      console.log(result,'pppppppppppppppppppppppppp');
      if(result){
        let secret = 'secretToken'; //this should be in the .env
        let token = jwt.sign({username}, secret);
        req.token = token;
        next();
      }else{
        res.send('invalid password');
      }
    }).catch(err => {
         console.log('error');
                
    });
    // }
  }).catch(err =>{
    res.send('invalid username');
      
  });
}

module.exports = basicAuth;