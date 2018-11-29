import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
// import Article from "./Article";
import "../css/Articles.css";
import Popup from "reactjs-popup";
import AddArticle from "./AddArticle";

class Articles extends Component {
  state = {
    articles: [],
    disabledUp: false,
    disabledDown: false
  };
  render() {
    const { articles, disabledDown, disabledUp } = this.state;
    const thumbsDownSymbol = "👎";
    const heartEyesSymbol = "😍";
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
        {/* <Link to="/articles/new_article">Post New Article</Link> */}
        <ul>
          {articles.map((article, index) => {
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
                  <Link to={`/user/${article.created_by.username}`}>
                    {article.created_by.username}
                  </Link>
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
    api.getArticles(topic).then(({ articles }) => {
      this.setState({ articles });
    });
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props;
    // console.log(prevProps.topic);
    // console.log(topic, "topic");
    if (prevProps.topic !== topic) {
      api.getArticles(topic).then(({ articles }) => {
        this.setState({ articles });
      });
    }
  }

  // vote = (id, value) => {
  //   api.updateVote("articles", id, value).then(article => {
  //     this.setState({ article });
  //   });
  // };

  handleClick = event => {
    const { id, value } = event.target;
    const { articles } = this.state;
    api.updateVote("articles", id, value).catch(err => console.log(err));
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

    // map over articles from state
    // if article id  === id : return { ... article: votes: }
    // this.setState({ articles: updatedArticles })
  };
}

export default Articles;
