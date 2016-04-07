'use strict';

const React = require('react');
const ReactRouter = require('react-router');

const data = require('../../data/data.js');

let Link = ReactRouter.Link;

let ArchivePage = React.createClass({
  render() {
    return (
      <div id="page-archive" className="page page-archive">
        <div id="page-content" className="page-content">
          <ul className="archive-list">
          {Object.keys(data.props.routes).map((url) => {
            return (
              <li className="archive-item"
                key={url}>
                <Link to={url}>{data.props.routes[url].meta.title}</Link>
              </li>
            );
          })}
          </ul>
        </div>
      </div>
    );
  },
});

module.exports = ArchivePage;
