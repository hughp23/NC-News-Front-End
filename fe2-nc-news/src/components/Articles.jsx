import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
// import Article from "./Article";

class Articles extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    // console.log(articles, "<--- Articles");
    console.log(articles);
    return (
      <div>
        <h2>Articles</h2>
        <ul>
          {articles.map(article => {
            return (
              <li key={`${article.title}`}>
                <h3>{article.title}</h3>
                <p>Comment Count: {article.comment_count}</p>
                <p>Votes: {article.votes}</p>
                {console.log(article._id)}
                <Link to={`/articles/${article._id}`}>Read More...</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props;
    if (prevProps.topic !== topic) {
      api.getArticles(topic).then(({ articles }) => {
        this.setState({ articles });
      });
    }
  }
}

export default Articles;
