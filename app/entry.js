'use strict';

const reactpubEntry = require('reactpub/entry');

const routes = require('./routes.jsx');
const data = require('../data/data.js');

let renderServer = reactpubEntry({
  reactOnClient: true,
  useHelmet: true,
  routes,
  routeMetadata: data,
  additionalAssets: {
    appCss: 'app.css',
  },
});

module.exports = renderServer;
