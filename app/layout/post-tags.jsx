'use strict';

const React = require('react');
const ReactRouter = require('react-router');

let Link = ReactRouter.Link;

let PostTags = React.createClass({
  render() {
    return (
      <ul>
        {this.props.post.meta.tags.map((tag) => {
          return (
            <li key={tag}>
              <Link to={`/tags/${tag}`}>{tag}</Link>
            </li>
          );
        })}
      </ul>
    );
  },
});

module.exports = PostTags;
