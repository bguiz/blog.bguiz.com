'use strict';

const React = require('react');
const Helmet = require('react-helmet');
const ReactRouter = require('react-router');

const PostList = require('../layout/post-list.jsx');
const data = require('reactpub/settings.js').get('data');

let Link = ReactRouter.Link;

let TagPage = React.createClass({
  render() {
    let tag = this.getTagData();
    return (
      <div id="page-tag" className="page page-tag">
        <Helmet
          meta={tag.helmet.meta}
          link={tag.helmet.link}
          title={tag.helmet.title}>
        </Helmet>
        <h1 id="page-title" className="page-title">Tagged <em>{tag.id}</em></h1>
        <div id="page-body" className="page-body">
          <ul className="tag-list">
          <PostList urls={tag.urls} />
          </ul>
        </div>
      </div>
    );
  },

  getTagData() {
    let id = this.props.routeParams.tagId;
    let tagMap = data.props.tagMap;
    let urls = tagMap[id]
      .map((url) => {
        return url.replace(/\/$/, '');
      })
      .filter((url) => {
        return !!data.props.routes[url];
      });
    let helmet = {
      meta: [
        {
          name: 'og:title',
          content: `Tagged "${id}" - Brendan Graetz`,
        },
        {
          name: 'og:url',
          content: 'http://blog.bguiz.com'+`/tags/${id}`,
        },
        {
          name: 'og:image',
          content: 'http://blog.bguiz.com/images/logo-400px.png',
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'http://bguiz.com'+`/tags/${id}`,
        }
      ],
      title: `Tagged "${id}"`,
    };
    return {
      id,
      urls,
      helmet,
    };
  }

});

module.exports = TagPage;
