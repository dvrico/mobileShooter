/*
  Main application container view
*/

var View     = require('ampersand-view'),
    Switcher = require('ampersand-view-switcher'),
    app      = require('app');

module.exports = View.extend({
  template: require('templates/app.jade'),
  autoRender: true,

  initialize: function(){
    // Initialize main view
  },

  render: function(){
    this.renderWithTemplate();

    /*
      Initialize view switcher

      The view switcher will encapsulate the main app container and
      is responsible for switching, appending and removing route views.
    */

    var switcher = new Switcher(this.queryByHook('main-view'), {
      // show: function onShow(newView) {
      //   // set our document title
      //   document.title = view.pageTitle || 'my awesome app';
      //   // scroll to the top
      //   document.body.scrollTop = 0;
      // },

      // hide: function onHide(oldView, callback){
      //   callback();
      // }
    });


    /*
      Listen for view switch triggers

      The app router witll trigger ROUTE events upon 
      succesful initialization of new child views.

      The initialized view will be passed as the first
      parameter of the event handler.
    */

    // Listen for routing events on the `app`
    this.listenTo(app, app.events.ROUTE, function(view){
      setTimeout(function(){
        // set the new view
        switcher.set(view);
      });
    });
  }
});