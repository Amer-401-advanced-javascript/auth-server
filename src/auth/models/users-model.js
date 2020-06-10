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
    let SECRET = 'thisShouldBeSecret'; //shouldbeSecret
    // let you = jwt.verify(token, SECRET, (err , decoded)=>{
    //   if(err){
    //     console.log('error', err);
    //     return Promise.reject(err); 
    //   }else{
    //     console.log('decoded', decoded);
    //     let username = decoded['username'];
    //     this.userSchema.find({username}).then(data=> {
    //       console.log(username);
    //       return Promise.resolve(username);
    //     }).catch(error=> console.error(error));  
    //   }
    // });
    // console.log(you, 'dhsjdhsjdhsjdhjsh');
    try {
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