'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const Helmet = require('react-helmet');

const Navbar = require('./navbar.jsx');

let Link = ReactRouter.Link;

let Root = React.createClass({
  render() {
    return (
      <div id="root" className="root">
        <Helmet
          title="Brendan Graetz"
          titleTemplate="%s - Brendan Graetz">
        </Helmet>
        <Navbar />
        <div id="content" className="content">
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = Root;
