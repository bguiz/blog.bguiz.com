'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const Helmet = require('react-helmet');

const PostList = require('../layout/post-list.jsx');
const data = require('../../data/data.js');

let Link = ReactRouter.Link;

let ArchivePage = React.createClass({
  render() {
    return (
      <div id="page-archive" className="page page-archive">
        <Helmet
          meta={helmet.meta}
          link={helmet.link}
          title={helmet.title}>
        </Helmet>
        <h1 id="page-title" className="page-title">Blog Archives</h1>
        <div id="page-content" className="page-content">
          <PostList urls={Object.keys(data.props.routes)} />
        </div>
      </div>
    );
  },
});

const helmet = {
  meta: [
    {
      name: 'og:title',
      content: `Blog Archives - Brendan Graetz`,
    },
    {
      name: 'og:url',
      content: 'http://blog.bguiz.com'+`/archives`,
    },
    {
      name: 'og:image',
      content: 'http://blog.bguiz.com/images/logo-400px.png',
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'http://bguiz.com'+`/archives`,
    }
  ],
  title: `Blog Archives - Brendan Graetz`,
};

module.exports = ArchivePage;
