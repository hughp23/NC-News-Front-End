import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";
import { navigate } from "@reach/router";
import User from "./User";
import Popup from "reactjs-popup";
import "../css/Article.css";
import Voter from "./Voter";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true
  };
  render() {
    const { article, isLoading, err } = this.state;
    console.log(article, "article beforre render");
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
          {/* <p>{article.comments.length} Comments</p> */}
        </div>
        <p>Votes: {article.votes}</p>
        <Voter dataType="articles" id={article._id} vote={this.vote} />
        <Popup
          trigger={<button className="userButton"> Post New Comment </button>}
          modal
          closeOnDocumentClick
        >
          <form className="main" onSubmit={this.handleSubmit}>
            <h1>Add comment here</h1>
            <label htmlFor="title">Comment: </label>
            <textarea id="body" type="text" onChange={this.handleChange} />
            <button>Post</button>
          </form>
        </Popup>
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

  vote = (id, value, votes) => {
    const { article } = this.state;
    this.setState({
      article: { ...article, votes: votes }
    });
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    const { id } = this.props;
    const { body } = this.state;
    const savedData = JSON.parse(localStorage.getItem("user"));
    event.preventDefault();
    api
      .addComment(id, {
        body,
        belongs_to: id,
        created_by: savedData.user
      })
      .then(data => {
        window.location.reload();
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
