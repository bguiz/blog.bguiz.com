'use strict';

const reactpubEntry = require('reactpub/entry');

const routes = require('./routes.jsx');
const data = require('../data/data.js');

let reactOnClient = true;

let renderServer = reactpubEntry({
  reactOnClient,
  routes,
  routeMetadata: data,
});

module.exports = renderServer;
