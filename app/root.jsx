'use strict';

const React = require('react');
const ReactRouter = require('react-router');

const Navbar = require('./navbar.jsx');

let Link = ReactRouter.Link;

let Root = React.createClass({
  render() {
    return (
      <div id="root" className="root">
        <Navbar />
        <div id="content" className="content">
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = Root;
