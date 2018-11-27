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
    return (
      <main className="main">
        <Link to="/articles/new_article">Post New Article</Link>
        <ul>
          {articles.map(article => {
            return (
              <li key={`${article.title}`}>
                <h3>{article.title}</h3>
                <p>Comment Count: {article.comment_count}</p>
                <p>Votes: {article.votes}</p>
                <button>Vote up</button>
                <button>Vote down</button>
                {console.log(article._id)}
                <Link to={`/articles/article/${article._id}`}>
                  Read More...
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props;
    console.log(topic, "topic");
    if (prevProps.topic !== topic) {
      api.getArticles(topic).then(({ articles }) => {
        console.log(articles, "articles");
        this.setState({ articles });
      });
    }
  }
}

export default Articles;
