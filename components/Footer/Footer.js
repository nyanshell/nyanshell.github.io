/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';
import Button from '../Button';
// import Icon from 'react-mdl/lib/Icon';
import Menu from '../Menu/src/menu';
import MainButton from '../Menu/src/main-button';
import ChildButton from '../Menu/src/child-button';


function Footer() {
  let effect = 'zoomin',
      pos = 'br',
      method = 'hover';
  return (
    <footer className="mdl-mini-footer">
      <div className="mdl-mini-footer__left-section">
      </div>
      <div className="mdl-mini-footer__right-section">
        <Menu effect={effect} method={method} position={pos}>
          <MainButton iconResting="home" iconActive="info" />
          <ChildButton
            onClick={function(e){ console.log(e); e.preventDefault(); }}
            icon="star"
            label="View on Github"
            href="https://github.com/nobitagit/react-material-floating-button/" />
        </Menu>
      </div>
    </footer>
  );
}

export default Footer;
