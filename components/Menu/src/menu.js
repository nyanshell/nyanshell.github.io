'use strict';

import React, { PropTypes } from 'react';

import getClasses from './utils/get-classes';
import getChildren from './utils/get-children';
import childrenValidator from './utils/children-validator';
import ul from '../mfb/src/mfb.css';


class Menu extends React.Component {

  static propTypes = {
    effect: PropTypes.oneOf(['zoomin', 'slidein', 'slidein-spring', 'fountain']).isRequired,
    position: React.PropTypes.oneOf(['tl', 'tr', 'bl', 'br']).isRequired,
    children: childrenValidator
  };

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  };

  toggleMenu(evt) {
    evt.preventDefault();

    if(this.props.method === 'hover'){
      return;
    }
    // flip the state from open to close and viceversa
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    // console.log('css', s);
    var classes = getClasses(this.props);
    var buttons = getChildren(this.props.children);

    var main = buttons.main && React.cloneElement(buttons.main, {
      onClick: this.toggleMenu
    });

    return (
      <ul className={classes}
          data-mfb-toggle={this.props.method}
          data-mfb-state={this.state.isOpen ? 'open' : 'closed'}>
        <li className="mfb-component__wrap">
          {main}
          <ul className="mfb-component__list">
            {buttons.child}
          </ul>
        </li>
      </ul>
    );
  }
};

export default Menu;