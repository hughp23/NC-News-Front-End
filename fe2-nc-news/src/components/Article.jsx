import React, { Component } from "react";
import * as api from "../api";

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
            return (
              <li key={comment._id}>
                <h4>Username: {comment.created_by.username}</h4>
                <p>{comment.body}</p>
                <p>Posted: {comment.created_at.slice(0, 10)}</p>
                <button>Vote up</button>
                <button>Vote down</button>
              </li>
            );
          })}
        </ul>
        <label>Add Comment:</label>
        <input type="text" />
        <button>Submit</button>
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
