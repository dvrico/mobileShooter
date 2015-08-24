var express    = require('express'),
    proxy      = require('http-proxy').createProxyServer(),
    publicPath = require('path').resolve(__dirname, '..' , 'public'),
    app        = express()
    isProd     = process.env.NODE_ENV === 'production';

// We point to our static assets
app.use(express.static(publicPath));

// We only want to run the workflow when not in production
if (!isProd) {

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  require('./bundle.js')(); 

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/dist/*', function (req, res) {
    proxy.web(req, res, {target: 'http://localhost:8080'});
  });
}

// Catchall - redirect to app base
app.get('*', function(req, res){
  res.sendfile(publicPath + '/index.html');
});

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

// And run the server
app.listen(process.env.PORT || 3000, function () {
  console.log('Server running on port ' + (process.env.PORT || 3000));

  // If in development ENV, launch local server in browser
  if (!isProd) require('child_process').spawn('open', ['http://localhost:3000']);
});