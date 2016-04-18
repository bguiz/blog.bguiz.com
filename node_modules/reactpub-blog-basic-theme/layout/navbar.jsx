'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const reactCssModules = require('react-css-modules');

const navigationLinks = require('./navigation-links.js');
const navbarCss = require('./navbar.css');

let Link = ReactRouter.Link;

let Navbar = React.createClass({
  render() {
    return (
      <div id="navbar" styleName="navbar">
        <ul id="navbar-list" styleName="navbar-list">
          {navigationLinks.map((link, index) => {
            let elem = (link.href.match(/^[a-zA-Z]+\:\/\//)) ?
              (
                <a
                  href={link.href}
                  className={link.class}
                  title={link.desc}>
                </a>
              ) :
              (
                <Link
                  to={link.href}
                  className={link.class}
                  title={link.desc}
                  >
                </Link>
              );
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

module.exports = reactCssModules(Navbar, navbarCss);
