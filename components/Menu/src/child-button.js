'use strict';

import React from 'react';
import classnames from 'classnames';
import s from '../mfb/src/mfb.css';


var ChildButton = React.createClass({
  render: function(){
    var iconClass = classnames('mfb-component__child-icon', this.props.icon);
    var className = classnames('mfb-component__button--child', this.props.className);
    return (
      <li>
        <a href={this.props.href}
           data-mfb-label={this.props.label}
           onClick={this.props.onClick}
           className={className}>
          <i className={iconClass}></i>
        </a>
      </li>
    );
  }
});

module.exports = ChildButton;
