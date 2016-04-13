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
const postPageCss = require('./post-page.css');

let Link = ReactRouter.Link;

let PostPage = React.createClass({
  render() {
    let post = this.getPostData();
    return (
      <div id="page-post" className="page page-post">
        <Helmet
          meta={post.helmet.meta}
          link={post.helmet.link}
          title={post.meta.title}>
        </Helmet>
        <h1 id="page-title" styleName="page-title">{post.meta.title}</h1>
        <div id="page-body" className="page-body">
          <div styleName="post-date">{post.meta.displayDate}</div>
          <Markdown
            markdown={post.body}
            src={post.meta.src}/>
        </div>
        <div id="page-footer" className="page-footer">
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
    post.helmet = post.helmet || {
      meta: [
        {
          name: 'og:title',
          content:
            ((post.meta.title && `${post.meta.title} - Brendan Graetz`) ||
              'Brendan Graetz'),
        },
        {
          name: 'og:url',
          content: 'http://blog.bguiz.com'+post.meta.url,
        },
        {
          name: 'og:image',
          content: post.meta.image || 'http://blog.bguiz.com/images/logo-400px.png',
        },
        {
          name: 'og:type',
          content: 'article',
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'http://bguiz.com/'+post.meta.url,
        }
      ],
    };
    return post;
  }

});

module.exports = reactCssModules(PostPage, postPageCss);
