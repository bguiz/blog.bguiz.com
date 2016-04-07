'use strict';

const React = require('react');
const ReactRouter = require('react-router');

let Link = ReactRouter.Link;

let Navbar = React.createClass({
  render() {
    return (
      <div id="nav" className="nav">
        <ul>
          {links.map((link) => {
            let elem = (link.href.match(/^[a-zA-Z]+\:\/\//)) ?
              (<a
                  href={link.href}
                  className={link.class}
                  alt={link.desc}
                  >{link.text}</a>) :
              (<Link
                  to={link.href}
                  className={link.class}
                  alt={link.desc}
                  >{link.text}</Link>);
            return (
              <li key={link.id}>
                {elem}
              </li>
            );
          })}
        </ul>
      </div>
    );
  },

});

let links = [
  {
    id: 'home',
    href: '/',
    text: 'Home',
    desc: 'Brendan Graetz',
  },
  {
    "id": "archives",
    "href": "/archives",
    "text": "Archives",
    "desc": "Archives"
  },
  {
    "id": "feed",
    "href": "http://blog.bguiz.com/feed.xml",
    "text": "Feed",
    "desc": "RSS Feed"
  },
  {
    id: 'twitter',
    href: 'https://twitter.com/bguiz',
    text: 'Twitter',
    desc: '@bguiz on Twtter',
  },
  {
    "id": "github",
    "href": "https://github.com/bguiz",
    "text": "Github",
    "desc": "@bguiz on github"
  },
  {
    "id": "stackoverflow",
    "href": "http://stackoverflow.com/users/194982/bguiz",
    "text": "Stackoverflow",
    "desc": "@bguiz on stackoverflow"
  },
  {
    "id": "linkedin",
    "href": "http://linkedin.com/in/brendangraetz/",
    "text": "LinkedIn",
    "desc": "@bguiz on LinkedIn"
  },
  {
    "id": "reddit",
    "href": "http://reddit.com/u/bguiz",
    "text": "Reddit",
    "desc": "@bguiz on Reddit"
  },
  {
    "id": "googleplus",
    "href": "https://plus.google.com/112370545733832378774?rel=author",
    "text": "Google+",
    "desc": "@bguiz on Google+"
  }
];

module.exports = Navbar;
