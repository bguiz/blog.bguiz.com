'use strict';

const reactpubEntry = require('reactpub/entry');
const reactHelmet = require('react-helmet');
const reactGa = require('react-ga');

const routes = require('./routes.jsx');
const data = require('../data/data.js');
const config = require('./config.js');

function routerOnUpdate() {
  let url = `${config.baseUrl}${this.state.location.pathname}`;
  console.log('routerOnUpdate', url, this, arguments);
  reactGa.pageview(url);
}
let reactGaOptions = {
  id: config.googleAnalyticsId,
  options: {
    debug: (typeof document !== 'undefined'),
    gaOptions: {},
  },
};

let renderServer = reactpubEntry({
  reactOnClient: true,
  reactHelmet,
  reactGa,
  reactGaOptions,
  routerOnUpdate,
  routes,
  routeMetadata: data,
  additionalAssets: {
    appCss: 'app.css',
    vendorFontAwesomeCss:
      '3rd-party/font-awesome/css/font-awesome.min.css',
  },
});

module.exports = renderServer;
