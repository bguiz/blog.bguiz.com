'use strict';

const React = require('react');
const Helmet = require('react-helmet');
const ReactRouter = require('react-router');
const reactCssModules = require('react-css-modules');

const Markdown = require('../layout/markdown.jsx');
const PostTags = require('../layout/post-tags.jsx');
const paginationPageCss = require('./pagination-page.css');
const data = require('reactpub/settings.js').get('data');

const SUMMARY_TRUNCATE_LENGTH = 350;
let Link = ReactRouter.Link;

let PaginationPage = React.createClass({
  render() {
    let pagination = this.getPaginationData();
    let prevNextComponent = this._renderPreviousNext(pagination);
    return (
      <div id="page-pagination" className="page page-pagination">
        <Helmet
          title={pagination.title}>
        </Helmet>
        <h1 id="page-title" className="page-title">
          {pagination.title}
        </h1>
        <div id="page-body" className="page-body">
          <ul className="pagination-list">
          {pagination.pages.map((page, index) => {
            let url = page.meta.url;
            let summary = pagination.summaries[index];
            return (
              <li className="pagination-item"
                key={url}>
                <div className="pagination-item-header">
                  <Link to={url}>
                    <h2>{page.meta.title}</h2>
                  </Link>
                </div>
                <div className="pagination-item-body">
                  <Markdown
                    markdown={`${summary}&nbsp;&hellip;`} />
                  <Link to={url}>
                    <span>continue reading &raquo;</span>
                  </Link>
                </div>
                <div styleName="pagination-item-footer">
                  <span>Tagged in:</span>
                  <PostTags
                    post={page} />
                </div>
              </li>
            );
          })}
          </ul>
        </div>
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
          styleName="pagination-newer">
          <span>&laquo; Newer</span>
        </Link>);
    }
    if (pagination.hasNext) {
      nextComponent = (
        <Link
          to={`/page/${pagination.id+1}`}
          styleName="pagination-older">
          <span>Older &raquo;</span>
        </Link>);
    }
    return (
      <div styleName="pagination-nav">
        {prevComponent}
        {nextComponent}
        <Link
          to={`/archives`}
          styleName="pagination-archives">
          - Archives -
        </Link>
        <div styleName="pagination-clear" />
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
    let hasNext = (id < data.props.pagination.length);
    let title = (id < 2) ?
      'Brendan Graetz' :
      `Page ${id} - Brendan Graetz`;
    return {
      id,
      urls,
      pages,
      summaries,
      hasPrevious,
      hasNext,
      title,
    };
  },
});

module.exports = reactCssModules(PaginationPage, paginationPageCss);
