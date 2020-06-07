'use strict';

const mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required :true},
});

// userSchema.methods.auth = function (hashed){
// if(hashed){read if read return then compare wiht the hashed 

// }
// };

module.exports = mongoose.model('userModel', userSchema);