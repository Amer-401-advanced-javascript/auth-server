'use strict';

const express = require('express');
const app = express();
const userRoute = require('./auth/router');

//globalmiddleware
//express middleware
app.use(express.json());
app.use(express.static('public'));
//3rd Party middleware


/////////////////////////////////////

app.use(userRoute);

//////////////////////////////////////////

module.exports = {
  start: (port)=>{
    const PORT = port || process.env.PORT || 3000;
    app.listen( PORT, console.log(`up and running on ${PORT} port`));
  },
};