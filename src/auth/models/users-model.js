'use strict';

const userSchema = require('./users-schema');
const bcrypt = require('bcrypt');

class user{
  constructor(userSchema){
    this.userSchema = userSchema;
  }

  read(recordUserName){      
    // let username = record.username;
    return this.userSchema.find({username:recordUserName}); //{username: username}
  }

  async create(record){
    record.password =  await bcrypt.hash(record.password, 10);
    let newUser = new this.userSchema(record);
    return newUser.save();
  }
  
  update(record_id, record){

  }

  delete(record_id){

  }
}




module.exports = new user(userSchema);