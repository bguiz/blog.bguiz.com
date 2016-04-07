'use strict';

const React = require('react');

let AliasPost = React.createClass({
  render() {
    return (
      <div>
        <h1>AliasPost</h1>
        <pre>
          {JSON.stringify(this.props, undefined, '  ')}
        </pre>
      </div>
    );
  },
});

module.exports = AliasPost;
