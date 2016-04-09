'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const marked = require('marked');
const moment = require('moment');
const reactCssModules = require('react-css-modules');

const data = require('../../data/data.js');
const postListCss = require('./post-list.css');
const PostTags = require('./post-tags.jsx');

let Link = ReactRouter.Link;

let PostList = React.createClass({
  render() {
    return (
      <ul styleName="post-list">
        {this.props.urls.map((url) => {
          let post = data.props.routes[url];
          return (
            <li styleName="post-list-item"
              key={url}>
              <div styleName="post-list-date">{
                moment(post.meta.date)
                  .zone('+08:00')
                  .format('YYYY/MM/DD')
              }</div>
              <div styleName="post-list-title">
                <Link to={url}>{post.meta.title}</Link>
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
});

module.exports = reactCssModules(PostList, postListCss);
