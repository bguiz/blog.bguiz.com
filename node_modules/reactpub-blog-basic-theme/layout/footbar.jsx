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
        <p styleName="footbar-text">
          Copyright &copy; 2008-present Brendan Graetz
        </p>
      </div>
    );
  },

});

module.exports = reactCssModules(Footbar, footbarCss);
