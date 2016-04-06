'use strict';

const React = require('react');
const Helmet = require('react-helmet');
const ReactRouter = require('react-router');

const data = require('../data/data.js');

let Link = ReactRouter.Link;

let TagPage = React.createClass({
  render() {
    let tag = this.getTagData();
    return (
      <div>
        <Helmet
          title={`Tagged "${tag.id}"`}>
        </Helmet>
        <h1>Tagged <em>{tag.id}</em></h1>
        <ul>
        {tag.urls.map((url) => {
          return (
            <li key={url}>
              <Link to={url}>{data.props.routes[url].meta.title}</Link>
            </li>
          );
        })}
        </ul>
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
    return {
      id,
      urls,
    };
  }

});

module.exports = TagPage;
