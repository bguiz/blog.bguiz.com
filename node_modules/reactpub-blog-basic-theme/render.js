'use strict';

const reactpubEntry = require('reactpub/entry');
const reactHelmet = require('react-helmet');
const reactGa = require('react-ga');

function themeRender() {
  const config = require('reactpub/settings').get('config');
  const data = require('reactpub/settings').get('data');
  const routes = require('./routes.jsx');

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

  let additionalAssets = {
    appCss: 'app.css',
    vendorFontAwesomeCss:
      '3rd-party/font-awesome/css/font-awesome.min.css',
  };

  return reactpubEntry({
    reactOnClient: true,
    reactHelmet,
    reactGa,
    reactGaOptions,
    routerOnUpdate,
    routes,
    routeMetadata: data,
    additionalAssets,
  });
}

module.exports = themeRender;
