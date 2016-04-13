'use strict';

const React = require('react');

const DISQUS_ID = 'bguiz';
const BASE_URL = 'http://blog.bguiz.com'

let DisqusComments = React.createClass({
  render() {
    let scriptContent =
`var disqus_shortname = '${DISQUS_ID}';
var disqus_url = '${BASE_URL}${this.props.post.meta.url}/';
var disqus_identifier = disqus_url;
var disqus_title = "${this.props.post.meta.title.replace(/\"/g, '\'')}";
(function() {
var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();`
    return (
      <div>
        <div id="disqus_thread">
          <noscript>
            Please enable JavaScript to view the
            <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a>
          </noscript>
        </div>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
          __html: scriptContent,
        }}></script>
      </div>
    );
  },
});

module.exports = DisqusComments;


