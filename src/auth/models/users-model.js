'use strict';

const userSchema = require('./users-schema');
const bcrypt = require('bcrypt');

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
    
    return [await newUser.save(),token];
  }
  
  update(record_id, record){
  }

  delete(record_id){
  }
}

module.exports = new user(userSchema);