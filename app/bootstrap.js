/*
  Application Bootstrap
*/ 

// Application singleton
var app = require('app');

module.exports = function(){
  // Hydrate app global -- Assign don't overwrite!
  app.events = require('./constants/events');
  app.routes = require('./constants/routes');
}