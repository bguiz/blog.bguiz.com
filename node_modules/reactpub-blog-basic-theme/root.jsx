'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const Helmet = require('react-helmet');

const Navbar = require('./layout/navbar.jsx');
const FootProfile = require('./layout/foot-profile.jsx');
const Footbar = require('./layout/footbar.jsx');

const config = require('reactpub/settings.js').get('config');

require('reset-css/reset.css');
require('./root.css');

let Link = ReactRouter.Link;

const meta = [
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
  },
  {
    name: 'og:ttl',
    content: '600',
  },
  {
    name: 'og:site_name',
    content: config.siteName,
  },
  {
    name: 'og:title',
    content: config.siteName,
  },
  {
    name: 'og:url',
    content: `${config.baseUrl}/`,
  },
  {
    name: 'og:image',
    content: `${config.baseUrl}${config.defaultImage}`,
  },
  {
    name: 'og:description',
    content: config.siteDescription,
  },
  {
    name: 'og:locale',
    content: config.siteLocale,
  },
  {
    name: 'og:type',
    content: 'site',
  }
];

const htmlAttributes = {
  lang: config.siteLocale,
};

const link = [
  {
    rel: 'canonical',
    href: config.baseUrl,
  }
];

let Root = React.createClass({
  render() {
    return (
      <div id="root-page" className="root-page">
        <Helmet
          htmlAttributes={htmlAttributes}
          meta={meta}
          link={link}
          title={config.siteName}>
        </Helmet>
        <Navbar />
        <div id="root-content" className="root-content">
          {this.props.children}
        </div>
        <FootProfile />
        <Footbar />
      </div>
    );
  },
});

module.exports = Root;
