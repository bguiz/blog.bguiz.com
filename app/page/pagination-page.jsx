'use strict';

const React = require('react');
const Helmet = require('react-helmet');
const ReactRouter = require('react-router');

const Markdown = require('../layout/markdown.jsx');
const PostTags = require('../layout/post-tags.jsx');
const data = require('../../data/data.js');

const SUMMARY_TRUNCATE_LENGTH = 350;
let Link = ReactRouter.Link;

let PaginationPage = React.createClass({
  render() {
    let pagination = this.getPaginationData();
    let prevNextComponent = this._renderPreviousNext(pagination);
    return (
      <div>
        <Helmet
          title={`Page ${pagination.id}`}>
        </Helmet>
        <h1>Page <em>{pagination.id}</em></h1>
        <ul>
        {pagination.pages.map((page, index) => {
          let url = page.meta.url;
          let summary = pagination.summaries[index];
          return (
            <li key={url}>
              <Link to={url}>
                <h2>{page.meta.title}</h2>
              </Link>
              <div>
                <Markdown
                  markdown={`${summary}&nbsp;&hellip;`} />
                <Link to={url}>
                  <span>continue reading &raquo;</span>
                </Link>
              </div>
              <div>
                <span>Tagged with:</span>
                <PostTags
                  post={page} />
              </div>
            </li>
          );
        })}
        </ul>
        {prevNextComponent}
      </div>
    );
  },

  _renderPreviousNext(pagination) {
    let prevComponent, nextComponent;
    if (pagination.hasPrevious) {
      prevComponent = (
        <Link
          to={`/page/${pagination.id-1}`}
          className="pagination-prev">
          <span>Previous</span>
        </Link>);
    }
    if (pagination.hasNext) {
      nextComponent = (
        <Link
          to={`/page/${pagination.id+1}`}
          className="pagination-next">
          <span>Next</span>
        </Link>);
    }
    return (
      <div className="pagination-prevnext">
        {prevComponent}
        {nextComponent}
      </div>);
  },

  getPaginationData() {
    let id = this.props.pageId || parseInt(this.props.routeParams.pageId, 10);
    if (!id || isNaN(id)) {
      id = 1;
    }
    let paginationGroup = data.props.pagination[id - 1];
    let urls = paginationGroup
      .map((url) => {
        return url.replace(/\/$/, '');
      })
      .filter((url) => {
        return !!data.props.routes[url];
      });
    let pages = urls.map((url) => {
      return data.props.routes[url];
    });
    let summaries = pages.map((page) => {
      return page.body.substring(
        0,
        Math.min(page.body.length, SUMMARY_TRUNCATE_LENGTH));
    });
    let hasPrevious = (id - 1 > 0);
    let hasNext = (id < data.props.pagination.length)
    return {
      id,
      urls,
      pages,
      summaries,
      hasPrevious,
      hasNext,
    };
  },

});

module.exports = PaginationPage;
