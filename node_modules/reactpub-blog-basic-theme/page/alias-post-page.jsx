'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const Helmet = require('react-helmet');

const data = require('reactpub/settings.js').get('data');

let Link = ReactRouter.Link;

let AliasPost = React.createClass({
  render() {
    let post = this.getPostData();
    return (
      <div id="page-alias" className="page page-alias">
        <Helmet
          meta={[{
            "http-equiv": 'refresh',
            "content": `0; url=${post.meta.url}`,
          }]}
        />
        <h1 id="page-title" className="page-title">{post.meta.title}</h1>
        <div id="page-body" className="page-body">
          <Link
            to={post.meta.url}>
            This post has moved&hellip;
          </Link>
        </div>
      </div>
    );
  },

  getPostData() {
    let path = this.props.location.pathname.replace(/\/$/, '');
    path = data.props.aliases[path] || path;
    let post = data.props.routes[path] || {};
    return post;
  },
});

module.exports = AliasPost;
