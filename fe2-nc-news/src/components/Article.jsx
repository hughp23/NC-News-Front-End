import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";
import { navigate } from "@reach/router";
import User from "./User";
import Popup from "reactjs-popup";
import "../css/Article.css";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true,
    disabledUp: false,
    disabledDown: false
  };
  render() {
    const thumbsDownSymbol = "👎";
    const heartEyesSymbol = "😍";
    const { article, isLoading, disabledUp, disabledDown, err } = this.state;
    if (err) return <p>{err}</p>;
    if (isLoading) return <p>Page is Loading...</p>;
    return (
      <main className="main">
        <h1 className="articleTitle">{article.title}</h1>
        <p className="articleBody">{article.body}</p>
        <div className="singleArticleInfo">
          By:{" "}
          <Popup
            trigger={
              <button className="userButton">
                {" "}
                {article.created_by.username}{" "}
              </button>
            }
            modal
            closeOnDocumentClick
          >
            <User username={article.created_by.username} />
          </Popup>
          <p>Posted: {article.created_at.slice(0, 10)}</p>
        </div>
        <p>Votes: {article.votes}</p>
        {!disabledUp ? (
          <button id={`${article._id}`} value="up" onClick={this.handleClick}>
            {heartEyesSymbol}
          </button>
        ) : (
          <button
            disabled
            id={`${article._id}`}
            value="up"
            onClick={this.handleClick}
          >
            {heartEyesSymbol}
          </button>
        )}
        {!disabledDown ? (
          <button id={`${article._id}`} value="down" onClick={this.handleClick}>
            {thumbsDownSymbol}
          </button>
        ) : (
          <button
            disabled
            id={`${article._id}`}
            value="down"
            onClick={this.handleClick}
          >
            {thumbsDownSymbol}
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
    api
      .getArticleById(id)
      .then(({ article }) => {
        this.setState({ article, isLoading: false });
      })
      .catch(err => {
        navigate("/error", {
          replace: true,
          state: {
            code: err.response.status,
            msg: err.response.data.msg
          }
        });
      });
  }

  handleClick = event => {
    const { id, value } = event.target;
    api
      .updateVote("articles", id, value)
      .then(article => {
        value === "up"
          ? this.setState({ article, disabledUp: true })
          : this.setState({ article, disabledDown: true });
      })
      .catch(err => {
        navigate("/error", {
          replace: true,
          state: {
            code: err.response.status,
            msg: err.response.data.msg
          }
        });
      });
  };
}

export default Article;
