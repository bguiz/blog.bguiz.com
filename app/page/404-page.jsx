'use strict';

const React = require('react');
const Helmet = require('react-helmet');
const ReactRouter = require('react-router');

let Link = ReactRouter.Link;

let Four04Page = React.createClass({
  render() {
    return (
      <div id="page-404" className="page page-404">
        <Helmet
          title="Page not found">
        </Helmet>
        <h1 id="page-title" className="page-title">Page not found</h1>
        <div id="page-content" className="page-content">
          <p>
            Please try a different URL!
          </p>
        </div>
      </div>
    );
  },

});

module.exports = Four04Page;
