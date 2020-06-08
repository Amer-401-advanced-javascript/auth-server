'use strict';

const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required :true},
});

userSchema.methods.auth =  function (username, password){ 
  this.find({username}).then(data => {
    bcrypt.compare(password, data[0].password).then(result => {
      return  result ? data : 'invalid password';
    });
  });
};


module.exports = mongoose.model('userModel', userSchema);