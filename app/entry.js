'use strict';

const reactpubEntry = require('reactpub/entry');
const reactHelmet = require('react-helmet');

const routes = require('./routes.jsx');
const data = require('../data/data.js');

let renderServer = reactpubEntry({
  reactOnClient: true,
  reactHelmet,
  routes,
  routeMetadata: data,
  additionalAssets: {
    appCss: 'app.css',
    vendorFontAwesomeCss:
      'http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css',
  },
});

module.exports = renderServer;
