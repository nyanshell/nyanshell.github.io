'use strict';

import { Children } from 'react';

import MainButton from '../main-button';

var buttons = {
  main: null,
  child: []
};

function getChildren(children){
  // console.log('get children', Children.forEach);
  Children.forEach(children, function(child){
    if(child.type === MainButton){
      buttons.main = child;
      return;
    }
    buttons.child.push(child);
  });

  return buttons;
}

module.exports = getChildren;
