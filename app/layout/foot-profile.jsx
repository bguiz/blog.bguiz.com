'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const reactCssModules = require('react-css-modules');
const footProfileCss = require('./foot-profile.css');

let Link = ReactRouter.Link;

let FootProfile = React.createClass({
  render() {
    return (
      <div id="footprofile" styleName="footprofile">
        <p>
          <img
            styleName="footprofile-logo"
            src="/images/logo-100px.png"
            alt="Brendan Graetz" />
        </p>
        <p styleName="footprofile-blurb">Brendan Graetz</p>
        <p></p>
        <ul styleName="footer-links">
          <li styleName="footer-link">
            <a href="/archives"
              className="archives">
              <span styleName="footer-link-icon" className="fa fa-files-o"></span>
              <span styleName="footer-link-text">Archives</span>
            </a>
          </li>
          <li styleName="footer-link">
            <a href="https://twitter.com/bguiz"
              className="twitter">
              <span styleName="footer-link-icon" className="fa fa-twitter"></span>
              <span styleName="footer-link-text">@bguiz</span>
            </a>
            </li>
          <li styleName="footer-link">
            <a href="https://github.com/bguiz"
              className="github">
              <span styleName="footer-link-icon" className="fa fa-github"></span>
              <span styleName="footer-link-text">Github</span>
            </a>
          </li>
          <li styleName="footer-link">
            <a href="http://stackoverflow.com/users/194982/bguiz"
              className="stackoverflow">
              <span styleName="footer-link-icon" className="fa fa-stack-overflow"></span>
              <span styleName="footer-link-text">Stackoverflow</span>
            </a>
          </li>
          <li styleName="footer-link">
            <a href="http://linkedin.com/in/brendangraetz/"
              className="linkedin">
              <span styleName="footer-link-icon" className="fa fa-linkedin"></span>
              <span styleName="footer-link-text">LinkedIn</span>
            </a>
          </li>
          <li styleName="footer-link">
            <a href="http://reddit.com/u/bguiz"
              className="reddit">
              <span styleName="footer-link-icon" className="fa fa-reddit"></span>
              <span styleName="footer-link-text">Reddit</span>
            </a>
          </li>
          <li styleName="footer-link">
            <a href="https://plus.google.com/112370545733832378774?rel=author"
              className="googleplus">
              <span styleName="footer-link-icon" className="fa fa-google-plus"></span>
              <span styleName="footer-link-text">+bguiz.com</span>
            </a>
          </li>
        </ul>
      </div>
    );
  },
});

module.exports = reactCssModules(FootProfile, footProfileCss);
