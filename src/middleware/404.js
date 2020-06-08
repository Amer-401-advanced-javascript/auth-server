'use strict';

module.exports = (req, res, next)=>{
  res.staus(404);
  res.send('Page not Found');
  next();
};