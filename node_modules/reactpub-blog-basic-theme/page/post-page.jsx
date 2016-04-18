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
const postPageCss = require('./post-page.css');

let Link = ReactRouter.Link;

let PostPage = React.createClass({
  render() {
    let post = this.getPostData();
    return (
      <div id="page-post" className="page page-post">
        <Helmet
          meta={post.header.meta}
          link={post.header.link}
          title={post.header.title}>
        </Helmet>
        <h1 id="page-title" styleName="page-title">{post.meta.title}</h1>
        <div id="page-body" className="page-body">
          <div styleName="post-date">{post.meta.displayDate}</div>
          <Markdown
            markdown={post.body}
            src={post.meta.src}/>
        </div>
        <div id="page-footer" className="page-footer">
          <ShareButtons
            url={`${config.baseUrl}${this.props.location.pathname}`}
            title={post.header.title} />
          <div>
            <span>Tagged in:</span>
            <PostTags post={post} />
          </div>
          <div>
            <DisqusComments
              location={this.props.location}
              post={post} />
          </div>
        </div>
      </div>
    );
  },

  getPostData() {
    let path = this.props.location.pathname.replace(/\/$/, '');
    path = data.props.aliases[path] || path;
    let post = data.props.routes[path] || {};
    // augment with display date
    if (!post.meta) {
      console.error('post without meta', post);
      // throw `Post is missing meta`;
      return undefined;
    }
    post.meta.displayDate =
      moment(post.meta.date)
        .zone('+08:00')
        .format('YYYY/MM/DD');
    let title =
      ((post.meta.title && `${post.meta.title} - ${config.siteName}`) ||
        config.siteName);
    post.header = post.header || {
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
          content: `${config.baseUrl}${(post.meta.image || config.defaultImage)}`,
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
    return post;
  }

});

module.exports = reactCssModules(PostPage, postPageCss);
