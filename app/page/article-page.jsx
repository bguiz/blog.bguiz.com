'use strict';

const React = require('react');

const ReactRouter = require('react-router');
const Helmet = require('react-helmet');
const reactCssModules = require('react-css-modules');
const moment = require('moment');

const Markdown = require('../layout/markdown.jsx');
const PostTags = require('../layout/post-tags.jsx');
const DisqusComments = require('../layout/disqus-comments.jsx');
const data = require('../../data/data.js');
const articlePageCss = require('./article-page.css');

let ArticlePage = React.createClass({
  render() {
    let article = this.getArticleData();
    return (
      <div id="page-article" className="page page-article">
        <Helmet
          title={article.meta.title}>
        </Helmet>
        <h1 id="page-title" styleName="page-title">{article.meta.title}</h1>
        <div id="page-body" className="page-body">
          <div styleName="article-date">{article.meta.displayDate}</div>
          <Markdown
            markdown={article.body}
            src={article.meta.src}/>
        </div>
        <div id="page-footer" className="page-footer">
          <div>
            <span>Tagged in:</span>
            <PostTags post={article} />
          </div>
          <div>
            <DisqusComments
              post={article} />
          </div>
        </div>
      </div>
    );
  },

  getArticleData() {
    let path = this.props.location.pathname.replace(/\/$/, '');
    let article = data.props.routes[path] || {};
    return article;
  },
});

module.exports = reactCssModules(ArticlePage, articlePageCss);


