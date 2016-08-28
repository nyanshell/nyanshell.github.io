/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import Header from './Header';
// import Footer from '../Footer';
import s from './Layout.css';
import Menu from '../Menu/src/menu';
import MainButton from '../Menu/src/main-button';
import ChildButton from '../Menu/src/child-button';

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    let effect = 'zoomin',
        pos = 'br',
        method = 'hover';
    return (
      <div className="mdl-layout mdl-js-layout" ref={node => (this.root = node)}>
        <div className="mdl-layout__inner-container">
          <main className="mdl-layout__content">
            <div {...this.props} className={cx(s.content, this.props.className)} />
            <Menu effect={effect} method={method} position={pos}>
              <MainButton iconResting="home" iconActive="info" />
              <ChildButton
                onClick={function(e){ e.preventDefault(); }}
                icon="star"
                label="View on Github"
                href="https://github.com/nobitagit/react-material-floating-button/" />
            </Menu>
          </main>
        </div>
      </div>
    );
  }
}

export default Layout;
