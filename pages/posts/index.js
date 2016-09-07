import React, { PropTypes } from 'react';
import pako from 'pako';
import Layout from '../../components/Layout';
import s from './styles.css';


class Article extends React.Component {

  static propTypes = {
    article: PropTypes.object.isRequired,
  };

  componentDidMount() {
    document.title = this.props.article.title;
  }

  render() {
    let content = pako.inflate(window.atob(this.props.article.content), { to: 'string' });
    return (
      <Layout className={s.content}>
        <h1>{this.props.article.title}</h1>
        <div>{this.props.article.date}</div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Layout>
    );
  }

}

export default Article;
