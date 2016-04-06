'use strict';

const React = require('react');
const ReactRouter = require('react-router');

const data = require('../data/data.js');

let Link = ReactRouter.Link;

let Index = React.createClass({
  render() {
    return (
      <div>
        <ul>
        {(data.props.pagination[0]).map((url) => {
          return (
            <li key={url}>
              <Link to={url}>{data.props.routes[url].meta.title}</Link>
            </li>
          );
        })}
        </ul>
      </div>
    );
  },
});

module.exports = Index;
