'use strict';

const React = require('react');
const Helmet = require('react-helmet');
const reactCssModules = require('react-css-modules');

const presentationsPageCss = require('./presentations-page.css');
const data = require('../../data/data.js');

let PresentationsPage = React.createClass({
  render() {
    let presentations = this.getPresentations();
    return (
      <div id="page-pagination" className="page page-pagination">
        <Helmet
          title={`Presentations`}>
        </Helmet>
        <h1 id="page-title" className="page-title">
          Presentations by Brendan Graetz
        </h1>
        <div id="page-body" className="page-body">
          <ul>
            {presentations.map((presentation) => {
              return (
                <li
                  styleName="presentation-item"
                  key={presentation.meta.url}>
                  <a
                    title={presentation.meta.title}
                    href={presentation.meta.url}>
                    <div styleName="presentation-item-title">
                      {presentation.meta.title}
                    </div>
                    <div styleName="presentation-item-subtitle">
                      {presentation.meta.subtitle}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  },

  getPresentations() {
    return data.props.presentations;
  },
});

module.exports = reactCssModules(PresentationsPage, presentationsPageCss);


