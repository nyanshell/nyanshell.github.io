'use strict';

import React from 'react';
import classnames from 'classnames';
// import s from '../mfb/src/mfb.css';
import { Icon } from 'react-mdl';


var ChildButton = React.createClass({
  render: function(){
    var className = classnames('mfb-component__button--child', this.props.className);
    return (
      <li>
        <a href={this.props.href}
           data-mfb-label={this.props.label}
           onClick={this.props.onClick}
           className={className}>
          <Icon className="mfb-component__child-icon" name={this.props.icon}/>
        </a>
      </li>
    );
  }
});

module.exports = ChildButton;
