'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const reactCssModules = require('react-css-modules');

const postTagsCss = require('./post-tags.css');

let Link = ReactRouter.Link;

let PostTags = React.createClass({
  render() {
    return (
      <ul styleName="tags-list">
        {this.props.post.meta.tags.map((tag) => {
          return (
            <li
              styleName="tags-item"
              key={tag}>
              <Link to={`/tags/${tag}`}>{tag}</Link>
            </li>
          );
        })}
      </ul>
    );
  },
});

module.exports = reactCssModules(PostTags, postTagsCss);
