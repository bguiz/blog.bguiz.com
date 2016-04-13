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
      '3rd-party/font-awesome/css/font-awesome.min.css',
  },
});

module.exports = renderServer;
