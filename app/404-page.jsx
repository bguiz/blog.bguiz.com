'use strict';

const React = require('react');
const Helmet = require('react-helmet');
const ReactRouter = require('react-router');

const data = require('../data/data.js');

let Link = ReactRouter.Link;

let Four04Page = React.createClass({
  render() {
    return (
      <div>
        <Helmet
          title="Page not found">
        </Helmet>
        <h1>Page not found</h1>
        <div>
          <p>
            Please try a different URL!
          </p>
        </div>
      </div>
    );
  },

});

module.exports = Four04Page;
