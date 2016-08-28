'use strict';

import React from 'react';
import classnames from 'classnames';
import { Icon } from 'react-mdl';

var MainButton = React.createClass({
  getDefaultProps: function(){
    return {
      href: '#',
      onClick: function(){},
      iconResting: '',
      iconActive: '',
      label: null
    };
  },
  render: function(){
    // var iconResting = classnames('mfb-component__main-icon--resting', this.props.iconResting);
    // var iconActive = classnames('mfb-component__main-icon--active', this.props.iconActive);
    var iconResting = this.props.iconResting;
    var iconActive = this.props.iconActive;
    console.log('label', this.props.label);
    console.log('main icon resting', iconResting);
    var mainClass = classnames('mfb-component__button--main', this.props.className);
    if(this.props.label){
      return (
        <a href={this.props.href} className={mainClass} onClick={this.props.onClick} data-mfb-label={this.props.label}>
          <Icon className="mfb-component__main-icon--resting" name={iconResting}/>
          <Icon className="mfb-component__main-icon--active" name={iconActive}/>
        </a>
      );
    } else {
      return (
        <a href={this.props.href} className={mainClass} onClick={this.props.onClick}>
          <Icon className="mfb-component__main-icon--resting" name={iconResting}/>
          <Icon className="mfb-component__main-icon--active" name={iconActive}/>
        </a>
      );
    }
  }
});

module.exports = MainButton;
