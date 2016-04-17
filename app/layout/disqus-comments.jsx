'use strict';

const React = require('react');
const ReactDisqusThread = require('react-disqus-thread');

const DISQUS_ID = 'bguiz';
const BASE_URL = 'http://blog.bguiz.com'

let DisqusComments = React.createClass({
  render() {
    let url = `${BASE_URL}${this.props.location.pathname}`;
    return (
      <ReactDisqusThread
        shortname={DISQUS_ID}
        identifier={url}
        title={this.props.post.meta.title}
        url={url} />
    );
  },
});

module.exports = DisqusComments;
