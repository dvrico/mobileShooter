var app    = require('app'),
    Router = require('ampersand-router');

module.exports = Router.extend({
  /*
    Routes Hash
  */ 

  routes: {
    "users/:user": "user",  // User route
    "users":      "users", // Users route
    "(/)":         "home",  // Home route
  },


  /*
    Internals methods
  */ 

  // execute: function(callback, args) {
  //   args.push(parseQueryString(args.pop()));
  //   if (callback) callback.apply(this, args);
  // },

  page: function(View, params){
    // app.currentView = new View(params);
    app.trigger(app.events.ROUTE, new View(params));
  },


  /*
    Route Handlers
  */ 

  home: function(){
    require.ensure(['./views/routes/home'], function(require){
      this.page( require('./views/routes/home') );
    }.bind(this));
  },

  users: function(){
    require.ensure(['./views/routes/users'], function(require){
      this.page( require('./views/routes/users') );
    }.bind(this));
  },

  user: function(user){
    require.ensure(['./views/routes/user'], function(require){
      this.page( require('./views/routes/user'), {user: user} );
    }.bind(this));
  }
});