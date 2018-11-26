import React, { Component } from "react";
import * as api from "../api";

class Article extends Component {
  state = {
    article: {}
  };
  render() {
    const { article } = this.state;
    return (
      <div>
        <h1>Article</h1>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
      </div>
    );
  }

  componentDidUpdate() {
    console.log(this.props, "props");
    const { id } = this.props;
    console.log(id);
    api.getArticleById(id).then(article => {
      this.setState({ article });
    });
  }
}

export default Article;
