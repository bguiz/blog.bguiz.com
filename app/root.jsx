'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const Helmet = require('react-helmet');

const Navbar = require('./layout/navbar.jsx');
const FootProfile = require('./layout/foot-profile.jsx');
const Footbar = require('./layout/footbar.jsx');

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
  }
];

const htmlAttributes = {
  "lang": "en-GB",
};

const link = [
  {
    "rel": "canonical",
    "href": "http://bguiz.com/",
  },
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
