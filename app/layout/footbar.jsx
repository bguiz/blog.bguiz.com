'use strict';

const React = require('react');
const ReactRouter = require('react-router');

let Link = ReactRouter.Link;

let Footbar = React.createClass({
  render() {
    return (
      <div id="foot" className="foot">
        Copyright &copy; 2008-present Brendan Graetz
      </div>
    );
  },

});

module.exports = Footbar;
