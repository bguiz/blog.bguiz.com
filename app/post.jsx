'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const Helmet = require('react-helmet');

const Markdown = require('./markdown.jsx');
const data = require('../data/data.js');

let Link = ReactRouter.Link;

let Post = React.createClass({
  render() {
    let post = this.getPostData();
    return (
      <div>
        <Helmet
          title={post.meta.title}>
        </Helmet>
        <h1>{post.meta.title}</h1>
        <Markdown
          markdown={post.body}
          src={post.meta.src}/>
        <div>
          <div>
            Tagged in:
          </div>
          <ul>
            {post.meta.tags.map((tag) => {
              return (
                <li key={tag}>
                  <Link to={`/tags/${tag}`}>{tag}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  },

  getPostData() {
    let path = this.props.location.pathname.replace(/\/$/, '');
    path = data.props.aliases[path] || path;
    let post = data.props.routes[path] || {};
    return post;
  }

});

module.exports = Post;
