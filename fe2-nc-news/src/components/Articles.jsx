import React, { Component } from "react";
import * as api from "../api";
import { Link, navigate } from "@reach/router";
// import Article from "./Article";
import "../css/Articles.css";
import Popup from "reactjs-popup";
import AddArticle from "./AddArticle";
import _ from "underscore";
import User from "./User";
import Voter from "./Voter";

class Articles extends Component {
  state = {
    articles: []
  };
  render() {
    const { searchtext, sortBy } = this.props;
    const { articles } = this.state;
    let articlesToShow;
    if (sortBy === "mostRecent") {
      articlesToShow = _.sortBy(articles, "created_at").reverse();
    } else if (sortBy === "oldest") {
      articlesToShow = _.sortBy(articles, "created_at");
    } else if (searchtext && searchtext.length) {
      articlesToShow = articles.filter(article => {
        return article.body.toLowerCase().includes(searchtext.toLowerCase());
      });
    } else articlesToShow = articles;
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
                  className="articlesTitle"
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
                    <Voter
                      id={article._id}
                      dataType="articles"
                      vote={this.vote}
                    />
                  </div>
                  <div className="readMoreLink">
                    <Link
                      className="linkToArticle"
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

  // handleClick = event => {
  //   const { id, value } = event.target;
  //   const { articles } = this.state;
  //   api.updateVote("articles", id, value).catch(err => {
  //     navigate("/error", {
  //       replace: true,
  //       state: {
  //         code: err.response.status,
  //         msg: err.response.data.msg
  //       }
  //     });
  //   });
  //   const updatedArticles = articles.map(article => {
  //     if (article._id === id) {
  //       return { ...article, votes: article.votes + (value === "up" ? 1 : -1) };
  //     } else return article;
  //   });
  //   if (value === "up
  //     this.setState({  // console.log(data.article);
  //       articles: updatedArticles,
  //       disabledUp: true
  //     });
  //   } else this.setState({ articles: updatedArticles, disabledDown: true });
  // };

  vote = (id, value, votes) => {
    const { articles } = this.state;
    const updatedArticles = articles.map(article => {
      if (article._id === id) {
        return { ...article, votes: votes };
      } else return article;
    });
    this.setState({ articles: updatedArticles });
  };

  filterByText = (text, body) => {
    const regex = new RegExp(text, "gi");
    return regex.include(body);
  };
}

export default Articles;
