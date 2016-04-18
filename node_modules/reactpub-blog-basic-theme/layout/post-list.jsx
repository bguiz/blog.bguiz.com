'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const marked = require('marked');
const moment = require('moment');
const reactCssModules = require('react-css-modules');

const data = require('reactpub/settings.js').get('data');
const postListCss = require('./post-list.css');
const PostTags = require('./post-tags.jsx');

let Link = ReactRouter.Link;

let PostList = React.createClass({
  render() {
    let posts = this.getPosts();
    return (
      <ul styleName="post-list">
        {posts.map((post) => {
          return (
            <li styleName="post-list-item"
              key={post.meta.url}>
              <div styleName="post-list-date">{post.meta.displayDate}</div>
              <div styleName="post-list-title">
                <Link to={post.meta.url}>{post.meta.title}</Link>
              </div>
              <div styleName="post-list-tags">
                <span>Tagged in:</span>
                <PostTags post={post} />
              </div>
            </li>
          );
        })}
      </ul>
    );
  },

  getPosts() {
    let posts = this.props.urls.map((url) => {
      let post = data.props.routes[url];
      post.meta.displayDate =
        moment(post.meta.date)
          .zone('+08:00')
          .format('YYYY/MM/DD');
      return post;
    }).sort((postA, postB) => {
      return postB.meta.date - postA.meta.date;
    });
    return posts;
  },
});

module.exports = reactCssModules(PostList, postListCss);
