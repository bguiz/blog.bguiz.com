'use strict';

const React = require('react');
const ReactRouter = require('react-router');

const PostList = require('../layout/post-list.jsx');
const data = require('../../data/data.js');

let Link = ReactRouter.Link;

let ArchivePage = React.createClass({
  render() {
    return (
      <div id="page-archive" className="page page-archive">
        <div id="page-content" className="page-content">
          <PostList urls={Object.keys(data.props.routes)} />
        </div>
      </div>
    );
  },
});

module.exports = ArchivePage;
