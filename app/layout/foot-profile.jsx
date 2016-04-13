'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const reactCssModules = require('react-css-modules');

const navigationLinks = require('./navigation-links.js');
const footProfileCss = require('./foot-profile.css');

let Link = ReactRouter.Link;

let FootProfile = React.createClass({
  render() {
    return (
      <div id="footprofile" styleName="footprofile">
        <div
          styleName="footprofile-logo">
          <img
            src="/images/logo-100px.png"
            alt="Brendan Graetz" />
        </div>
        <div
          styleName="footprofile-links">
          <ul styleName="footer-links">
            {navigationLinks.map((link) => {
              let icon = (
                <span
                  styleName="footer-link-icon"
                  className={link.class}>
                </span>
              );
              let text = (
                <span
                  styleName="footer-link-text">
                  {link.text}
                </span>
              );
              let elem =
                (link.href.match(/^[a-zA-Z]+\:\/\//)) ?
                  (
                    <a
                      href={link.href}
                      title={link.desc}>
                      {icon}{text}
                    </a>
                  ) :
                  (
                    <Link
                      to={link.href}
                      title={link.desc}>
                      {icon}{text}
                    </Link>
                  );
              return (
                <li
                  styleName="footer-item"
                  key={link.id}>
                  {elem}
                </li>
              );
            })}
          </ul>
        </div>
        <div styleName="clear" />
      </div>
    );
  },
});

module.exports = reactCssModules(FootProfile, footProfileCss);
