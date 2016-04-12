'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const Helmet = require('react-helmet');

const Navbar = require('./layout/navbar.jsx');
const FootProfile = require('./layout/foot-profile.jsx');
const Footbar = require('./layout/footbar.jsx');
const GoogleAnalytics = require('./layout/google-analytics.jsx');

require('reset-css/reset.css');
require('./root.css');

let Link = ReactRouter.Link;

const meta = [
  {
    "name": "viewport",
    "content": "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0",
  },
  {
    "name": "description",
    "content": "Brendan Graetz",
  },
  {
    "property": "og:type",
    "content": "article",
  },
  {
    name: 'og:ttl',
    content: '600',
  },
  {
    name: 'og:site_name',
    content: 'Brendan Graetz',
  },
  {
    name: 'og:title',
    content: 'Brendan Graetz',
  },
  {
    name: 'og:url',
    content: 'http://blog.bguiz.com/',
  },
  {
    name: 'og:image',
    content: 'http://blog.bguiz.com/images/logo-400px.png',
  },
  {
    name: 'og:description',
    content: 'The blog that Brendan writes',
  },
  {
    name: 'og:locale',
    content: 'en_GB',
  },
  {
    name: 'og:type',
    content: 'article',
  }
];

const htmlAttributes = {
  lang: 'en-GB',
};

const link = [
  {
    rel: 'canonical',
    href: 'http://bguiz.com/',
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
          title="Brendan Graetz"
          titleTemplate="%s - Brendan Graetz"
          defaultTitle="Home">
        </Helmet>
        <GoogleAnalytics />
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
