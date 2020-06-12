'use strict';

const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required :true},
  role: {type:String, default: 'user', enum: ['user', 'writer', 'editor', 'admin' ], required: true},
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


userSchema.statics.generateTokens =  function( record ){
  try{
    let token = jwt.sign({username: record.username}, 'secretToken');
    return token;
  }catch(err){
    console.log(err);
    
  }
};

module.exports = mongoose.model('userModel', userSchema);