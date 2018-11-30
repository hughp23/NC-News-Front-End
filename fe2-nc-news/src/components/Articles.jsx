import React, { Component } from "react";
import * as api from "../api";
import { Link, navigate } from "@reach/router";
// import Article from "./Article";
import "../css/Articles.css";
import Popup from "reactjs-popup";
import AddArticle from "./AddArticle";
import _ from "underscore";
import User from "./User";

class Articles extends Component {
  state = {
    articles: [],
    disabledUp: false,
    disabledDown: false
  };
  render() {
    const { searchtext, sortBy } = this.props;
    console.log(this.props);
    console.log(sortBy, "text");
    const { articles, disabledDown, disabledUp } = this.state;
    const thumbsDownSymbol = "👎";
    const heartEyesSymbol = "😍";
    // const { created_at } = articles;
    let articlesToShow;
    if (sortBy === "mostRecent") {
      articlesToShow = _.sortBy(articles, "created_at");
    } else if (sortBy === "oldest") {
      articlesToShow = _.sortBy(articles, "created_at").reverse();
    } else if (searchtext && searchtext.length) {
      articlesToShow = articles.filter(article => {
        return article.body.toLowerCase().includes(searchtext.toLowerCase());
      });
    } else articlesToShow = articles;
    console.log(articlesToShow);
    return (
      <main className="main">
        <h1>Welcome To Northcoders News!</h1>
        <Popup
          trigger={<button className="button"> Post New Article </button>}
          modal
          closeOnDocumentClick
        >
          <AddArticle />
        </Popup>
        <ul>
          {articlesToShow.map((article, index) => {
            return (
              <li className="articleList" key={article._id}>
                <Link
                  className="articleTitle"
                  to={`/articles/article/${article._id}`}
                  params={{ user: this.props.user }}
                >
                  {<h2>{article.title}</h2>}
                </Link>
                <div className="articleInfo">
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
                <div className="buttonsAndLink">
                  <div className="commentsAndVotes">
                    <p>Comments: {article.comment_count}</p>
                    <p>Votes: {article.votes}</p>
                  </div>
                  <div className="votingButtons">
                    {!disabledUp ? (
                      <button
                        className="voteButton"
                        name={index}
                        id={`${article._id}`}
                        value="up"
                        onClick={this.handleClick}
                      >
                        {heartEyesSymbol}
                      </button>
                    ) : (
                      <button
                        className="voteButton"
                        disabled
                        name={index}
                        id={`${article._id}`}
                        value="up"
                        onClick={this.handleClick}
                      >
                        {heartEyesSymbol}
                      </button>
                    )}
                    {!disabledDown ? (
                      <button
                        className="voteButton"
                        name={index}
                        id={`${article._id}`}
                        value="down"
                        onClick={this.handleClick}
                      >
                        {thumbsDownSymbol}
                      </button>
                    ) : (
                      <button
                        className="voteButton"
                        disabled
                        name={index}
                        id={`${article._id}`}
                        value="down"
                        onClick={this.handleClick}
                      >
                        {thumbsDownSymbol}
                      </button>
                    )}
                  </div>
                  <div className="readMoreLink">
                    <Link
                      to={`/articles/article/${article._id}`}
                      params={{ user: this.props.user }}
                    >
                      Read More...
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  componentDidMount() {
    const { topic } = this.props;
    api
      .getArticles(topic)
      .then(({ articles }) => {
        this.setState({ articles });
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

  componentDidUpdate(prevProps) {
    const { topic } = this.props;
    // console.log(prevProps.topic);
    // console.log(topic, "topic");
    if (prevProps.topic !== topic) {
      api
        .getArticles(topic)
        .then(({ articles }) => {
          this.setState({ articles });
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
  }

  handleClick = event => {
    const { id, value } = event.target;
    const { articles } = this.state;
    api.updateVote("articles", id, value).catch(err => {
      navigate("/error", {
        replace: true,
        state: {
          code: err.response.status,
          msg: err.response.data.msg
        }
      });
    });
    const updatedArticles = articles.map(article => {
      if (article._id === id) {
        return { ...article, votes: article.votes + (value === "up" ? 1 : -1) };
      } else return article;
    });
    if (value === "up") {
      this.setState({
        articles: updatedArticles,
        disabledUp: true
      });
    } else this.setState({ articles: updatedArticles, disabledDown: true });
  };

  filterByText = (text, body) => {
    const regex = new RegExp(text, "gi");
    return regex.include(body);
  };
}

export default Articles;
