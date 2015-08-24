/*
  Staance CMS - Main Entrypoint
*/

// Require shared styles
require("styles/style.scss");

// Application singleton
var app    = require('app'),
    User   = require('./models/user'),
    Main   = require('./views/main'),
    Router = require('./router');


/*
  Application Bootstrap
*/

// Bootstrap application global (hydrates `app`)
require('./bootstrap')();

// Initialize user
app.user = new User(window.lu || {});

// Initialize router
app.router = new Router();

// Initialize main view nad append to document root
document.body.appendChild(new Main().el);

// Start routing
app.router.history.start();

// Catch all internal link navigation
document.onclick = function(event) {
  event = event || window.event;
  var target = event.target || event.srcElement;

  if(target.nodeName === "A" && target.href && target.host === window.location.host) {
    event.preventDefault();
    app.router.navigate(target.pathname, true);
  }
};