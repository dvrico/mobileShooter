# Staance CMS

This is the Staance CMS repo, further documentation coming soon.

#### Setup

After you clone the repo, run `setup.sh` to install necessary dependencies 
and validate your development environment. It will prompt you with necessary 
steps if the automated installation is not sufficient.


#### Development

To start the server run `npm start` or `node server` from the repo root.
The automated build system auto-refreshes on file change and hot-loads 
updated modules. refer to [Webpack Docs](http://webpack.github.io/) to learn what's going on.



#### Deployment

The Heroku deployment process is automated using NPM's `postinstall` hook, refer to `server/deploy.js` 
to review the deployment build process.
