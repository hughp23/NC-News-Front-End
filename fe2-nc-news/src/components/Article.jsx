import React, { Component } from "react";
import * as api from "../api";

class Article extends Component {
  state = {
    article: [],
    comments: [],
    isLoading: true
  };
  render() {
    const { article, comments, isLoading } = this.state;
    if (isLoading) return <p>Page is Loading...</p>;
    return (
      <main className="main">
        <h1>Article</h1>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <p>{article.created_by.username}</p>
        <ul>
          {comments.map(comment => {
            return (
              <li key={comment._id}>
                <h4>Username: {comment.created_by.username}</h4>
                <p>{comment.body}</p>
                <p>Posted: {comment.created_at.slice(0, 10)}</p>
                <p>Votes: {comment.votes}</p>
                <button
                  id={`${comment._id}`}
                  value="up"
                  onClick={this.handleClick}
                >
                  Vote up
                </button>
                <button
                  id={`${comment._id}`}
                  value="down"
                  onClick={this.handleClick}
                >
                  Vote down
                </button>
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
    const { id } = this.props;
    api.getArticleById(id).then(({ article }) => {
      console.log(article, "article");
      this.setState({ article, isLoading: false });
    });
    api.getComments(id).then(({ comments }) => {
      console.log(comments, "comments");
      this.setState({ comments });
    });
  }

  handleClick = event => {
    console.log(event.target);
    const { id, value } = event.target;
    api.updateVote("comments", id, value).then(comment => {
      this.setState({ comment });
    });
  };
}

export default Article;
