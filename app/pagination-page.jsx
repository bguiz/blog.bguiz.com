'use strict';

const React = require('react');
const Helmet = require('react-helmet');
const ReactRouter = require('react-router');

const data = require('../data/data.js');

let Link = ReactRouter.Link;

let PaginationPage = React.createClass({
  render() {
    let pagination = this.getPaginationData();
    return (
      <div>
        <Helmet
          title={`Page ${pagination.id}`}>
        </Helmet>
        <h1>Page <em>{pagination.id}</em></h1>
        <ul>
        {pagination.urls.map((url) => {
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

  getPaginationData() {
    let id = this.props.routeParams.pageId;
    let paginationGroup = data.props.pagination[id - 1];
    let urls = paginationGroup
      .map((url) => {
        return url.replace(/\/$/, '');
      })
      .filter((url) => {
        return !!data.props.routes[url];
      });
    return {
      id,
      urls,
    };
  }

});

module.exports = PaginationPage;
