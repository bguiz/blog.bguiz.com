'use strict';

const React = require('react');

let AliasPost = React.createClass({
  render() {
    return (
      <div id="page-alias" className="page page-alias">
        <h1 id="page-title" className="page-title">AliasPost</h1>
        <div id="page-body" className="page-body">
          <pre>
            {JSON.stringify(this.props, undefined, '  ')}
          </pre>
        </div>
      </div>
    );
  },
});

module.exports = AliasPost;
