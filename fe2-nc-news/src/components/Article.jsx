import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";

class Article extends Component {
  state = {
    article: [],
    comments: []
  };
  render() {
    const { article, comments } = this.state;
    console.log(article, "article");
    return (
      <main className="main">
        <h1>Article</h1>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <ul>
          {comments.map(comment => {
            return <li>comment</li>;
          })}
        </ul>
      </main>
    );
  }

  componentDidMount() {
    // console.log(this.props, "props");
    const { id } = this.props;
    // console.log(id);
    api.getArticleById(id).then(({ article }) => {
      console.log(article);
      this.setState({ article });
    });
    api.getComments(id).then(({ comments }) => {
      console.log(comments, "comments");
      this.setState({ comments });
    });
  }
}

export default Article;
