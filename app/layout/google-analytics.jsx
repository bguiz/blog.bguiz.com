'use strict';

const React = require('react');

const GA_ID = 'UA-37884921-1';

let GoogleAnalytics = React.createClass({
  render() {
    let scriptContent =
`(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', '${GA_ID}', 'auto');
ga('send', 'pageview');`
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: scriptContent,
        }}></script>
    );
  },
});

module.exports = GoogleAnalytics;


