'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const Helmet = require('react-helmet');

const Navbar = require('./layout/navbar.jsx');
const Footbar = require('./layout/footbar.jsx');

require('reset-css/reset.css');
require('./root.css');

let Link = ReactRouter.Link;

let Root = React.createClass({
  render() {
    return (
      <div id="root-page" className="root-page">
        <Helmet
          title="Brendan Graetz"
          titleTemplate="%s - Brendan Graetz">
        </Helmet>
        <Navbar />
        <div id="root-content" className="root-content">
          {this.props.children}
        </div>
        <Footbar />
      </div>
    );
  },
});

module.exports = Root;
