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
import { List, ListItem, ListItemContent, Grid, Cell } from 'react-mdl';
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';


class HomePage extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
  };

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout className={s.content}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <h4>Write Works</h4>
        <List>
          {this.props.articles.map((article, i) =>
            <ListItem key={i}>
              <ListItemContent>
                <div>
                  <a className={s.a} href={article.url}>{article.title}</a>
                </div>
                <div>
                  {article.date}
                </div>
                <hr/>
              </ListItemContent>
            </ListItem>
          )}
        </List>
        <p>
          <br /><br />
        </p>
      </Layout>
    );
  }

}

export default HomePage;
