'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const Helmet = require('react-helmet');

const PostList = require('../layout/post-list.jsx');
const data = require('reactpub/settings.js').get('data');
const config = require('reactpub/settings.js').get('config');

let Link = ReactRouter.Link;

const title = 'Archives';

let ArchivePage = React.createClass({
  render() {
    let header = this.getHeader();
    return (
      <div id="page-archive" className="page page-archive">
        <Helmet
          meta={header.meta}
          link={header.link}
          title={header.title}>
        </Helmet>
        <h1 id="page-title" className="page-title">{title}</h1>
        <div id="page-content" className="page-content">
          <PostList urls={Object.keys(data.props.routes)} />
        </div>
      </div>
    );
  },

  getHeader() {
    return {
      meta: [
        {
          name: 'og:title',
          content: `${title} - ${config.siteName}`,
        },
        {
          name: 'og:url',
          content: `${config.baseUrl}${this.props.location.pathname}/`,
        },
        {
          name: 'og:image',
          content: `${config.baseUrl}${config.defaultUrl}`,
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `${config.baseUrl}${this.props.location.pathname}/`,
        }
      ],
    };
  },
});



module.exports = ArchivePage;
