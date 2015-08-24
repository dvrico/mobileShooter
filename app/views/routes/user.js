var Base = require('../view');

module.exports = Base.extend({
  session: {
    user: ['string', true]
  },

  template: require('templates/views/user.jade'),
  autoRender: true,

  initialize: function(){
    console.log('init user', this);
  }
});