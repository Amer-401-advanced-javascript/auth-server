'use strict';

const userSchema = require('./users-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class user{
  constructor(userSchema){
    this.userSchema = userSchema;
  }

  read(username){      
    let check = username ? {username} : {};
    return this.userSchema.find(check); //{username: username}
  }

  async create(record){
    record.password =  await bcrypt.hash(record.password, 10);
    let newUser = new this.userSchema(record);
    let token = this.userSchema.generateTokens(record.username);
    return [await newUser.save(), token];
  }

  async verifyToken(token){
    let SECRET = 'secretToken'; //shouldbeSecret
    
    try {
      //we can use callback here 
      // like let decoded = await jwt.verify(token, SECRET, (error, decoded) =>{
      //and here we return new Promise rejecting or resolving
      //});
      let decoded = await jwt.verify(token, SECRET);       
      let username = decoded.username;
      let checkUserDb = await this.userSchema.find({username});
      return checkUserDb;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new user(userSchema);