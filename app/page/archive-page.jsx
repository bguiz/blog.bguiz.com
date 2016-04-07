'use strict';

const React = require('react');
const ReactRouter = require('react-router');

const data = require('../../data/data.js');

let Link = ReactRouter.Link;

let ArchivePage = React.createClass({
  render() {
    return (
      <div>
        <ul>
        {Object.keys(data.props.routes).map((url) => {
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

module.exports = ArchivePage;
