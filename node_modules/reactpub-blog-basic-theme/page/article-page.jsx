'use strict';

const React = require('react');

const ReactRouter = require('react-router');
const Helmet = require('react-helmet');
const reactCssModules = require('react-css-modules');
const moment = require('moment');

const Markdown = require('../layout/markdown.jsx');
const PostTags = require('../layout/post-tags.jsx');
const DisqusComments = require('../layout/disqus-comments.jsx');
const ShareButtons = require('../layout/share-buttons.jsx');
const data = require('reactpub/settings.js').get('data');
const config = require('reactpub/settings.js').get('config');
const articlePageCss = require('./article-page.css');

let ArticlePage = React.createClass({
  render() {
    let article = this.getArticleData();
    return (
      <div id="page-article" className="page page-article">
        <Helmet
          meta={article.header.meta}
          link={article.header.link}
          title={article.header.title}>
        </Helmet>
        <h1 id="page-title" styleName="page-title">{article.meta.title}</h1>
        <div id="page-body" className="page-body">
          <div styleName="article-date">{article.meta.displayDate}</div>
          <Markdown
            markdown={article.body}
            src={article.meta.src}/>
        </div>
        <div id="page-footer" className="page-footer">
          <ShareButtons
            url={`${config.baseUrl}${this.props.location.pathname}`}
            title={article.header.title} />
          <div>
            <span>Tagged in:</span>
            <PostTags post={article} />
          </div>
          <div>
            <DisqusComments
              location={this.props.location}
              post={article} />
          </div>
        </div>
      </div>
    );
  },

  getArticleData() {
    let path = this.props.location.pathname.replace(/\/$/, '');
    let article = data.props.routes[path] || {};
    let title =
      ((article.meta.title && `${article.meta.title} - ${config.siteName}`) ||
        config.siteName);
    article.header = article.header || {
      title,
      meta: [
        {
          name: 'og:title',
          content: title,
        },
        {
          name: 'og:url',
          content: `${config.baseUrl}${this.props.location.pathname}/`,
        },
        {
          name: 'og:image',
          content: `${config.baseUrl}${(article.meta.image || config.defaultImage)}`,
        },
        {
          name: 'og:type',
          content: 'article',
        }
      ],
      link: [
        {
          rel: 'canonical',
          content: `${config.baseUrl}${this.props.location.pathname}/`,
        }
      ],
    };
    return article;
  },
});

module.exports = reactCssModules(ArticlePage, articlePageCss);


