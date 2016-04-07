'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const reactCssModules = require('react-css-modules');
const navbarCss = require('./navbar.css');

let Link = ReactRouter.Link;

let Navbar = React.createClass({
  render() {
    return (
      <div id="navbar" styleName="navbar">
        <ul id="navbar-list" styleName="navbar-list">
          {links.map((link) => {
            let elem = (link.href.match(/^[a-zA-Z]+\:\/\//)) ?
              (<a
                  href={link.href}
                  className={link.class}
                  alt={link.desc}
                  >{(!link.class) ? link.text : ''}</a>) :
              (<Link
                  to={link.href}
                  className={link.class}
                  alt={link.desc}
                  >{(!link.class) ? link.text : ''}</Link>);
            return (
              <li
                styleName="navbar-item"
                key={link.id}>
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
    text: 'Brendan Graetz',
    desc: 'Brendan Graetz',
  },
  {
    "id": "archives",
    "href": "/archives",
    "text": "Archives",
    "desc": "Archives",
    class: 'fa fa-files-o',
  },
  // {
  //   "id": "feed",
  //   "href": "/feed.xml",
  //   "text": "Feed",
  //   "desc": "RSS Feed"
  // },
  {
    id: 'twitter',
    href: 'https://twitter.com/bguiz',
    text: 'Twitter',
    desc: '@bguiz on Twtter',
    class: 'fa fa-twitter',
  },
  {
    "id": "github",
    "href": "https://github.com/bguiz",
    "text": "Github",
    "desc": "@bguiz on github",
    class: 'fa fa-github',
  },
  {
    "id": "stackoverflow",
    "href": "http://stackoverflow.com/users/194982/bguiz",
    "text": "Stackoverflow",
    "desc": "@bguiz on stackoverflow",
    class: 'fa fa-stack-overflow',
  },
  {
    "id": "linkedin",
    "href": "http://linkedin.com/in/brendangraetz/",
    "text": "LinkedIn",
    "desc": "@bguiz on LinkedIn",
    class: 'fa fa-linkedin',
  },
  {
    "id": "reddit",
    "href": "http://reddit.com/u/bguiz",
    "text": "Reddit",
    "desc": "@bguiz on Reddit",
    class: 'fa fa-reddit',
  },
  {
    "id": "googleplus",
    "href": "https://plus.google.com/112370545733832378774?rel=author",
    "text": "Google+",
    "desc": "@bguiz on Google+",
    class: 'fa fa-google-plus',
  }
];

module.exports = reactCssModules(Navbar, navbarCss);
