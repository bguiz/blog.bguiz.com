'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const reactCssModules = require('react-css-modules');
const footbarCss = require('./footbar.css');

let Link = ReactRouter.Link;

let Footbar = React.createClass({
  render() {
    return (
      <div id="footbar" styleName="footbar">
        Copyright &copy; 2008-present Brendan Graetz
      </div>
    );
  },

});

module.exports = reactCssModules(Footbar, footbarCss);
