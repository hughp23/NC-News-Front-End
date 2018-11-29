import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true,
    disabledUp: false,
    disabledDown: false
  };
  render() {
    const { article, isLoading, disabledUp, disabledDown } = this.state;
    if (isLoading) return <p>Page is Loading...</p>;
    return (
      <main className="main">
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <p>Author: {article.created_by.username}</p>
        <p>Posted: {article.created_at.slice(0, 10)}</p>
        <p>Votes: {article.votes}</p>
        {!disabledUp ? (
          <button id={`${article._id}`} value="up" onClick={this.handleClick}>
            Vote up
          </button>
        ) : (
          <button
            disabled
            id={`${article._id}`}
            value="up"
            onClick={this.handleClick}
          >
            Vote up
          </button>
        )}
        {!disabledDown ? (
          <button id={`${article._id}`} value="down" onClick={this.handleClick}>
            Vote down
          </button>
        ) : (
          <button
            disabled
            id={`${article._id}`}
            value="down"
            onClick={this.handleClick}
          >
            Vote down
          </button>
        )}

        <Comments
          topic={article.belongs_to}
          user={this.props.user}
          id={article._id}
        />
      </main>
    );
  }

  componentDidMount() {
    const { id } = this.props;
    api.getArticleById(id).then(({ article }) => {
      this.setState({ article, isLoading: false });
    });
  }

  handleClick = event => {
    const { id, value } = event.target;
    api.updateVote("articles", id, value).then(article => {
      value === "up"
        ? this.setState({ article, disabledUp: true })
        : this.setState({ article, disabledDown: true });
    });
  };
}

export default Article;
