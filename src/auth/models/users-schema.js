'use strict';

const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required :true},
});

userSchema.pre('save', async ()=> {
  // console.log(this,'usdisuidouaoi');
    
});

userSchema.statics.auth =  function (username, password){ 
  this.find({username}).then(data => {
    bcrypt.compare(password, data[0].password).then(result => {
      return  result ? data : 'invalid password';
    });
  });
};


userSchema.statics.generateTokens = function( userName ){
  let token = jwt.sign({username: userName}, 'secretToken');
  return token;
};

module.exports = mongoose.model('userModel', userSchema);