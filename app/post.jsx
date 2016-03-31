'use strict';

const React = require('react');

const Markdown = require('./markdown.jsx');
const data = require('../data/data.js');

let Post = React.createClass({
  render() {
    let post = this.getPostData();
    return (
      <div>
        <h1>{post.meta.title}</h1>
        <Markdown
          markdown={post.body}
          src={post.meta.src}/>
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
