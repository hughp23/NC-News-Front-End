import React, { Component } from "react";
import * as api from "../api";
import Articles from "./Articles";

class Homepage extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    // console.log(articles);
    return (
      <main>
        <h1>Homepage</h1>
        <h2>Articles</h2>
        <ul>
          {articles.map(article => {
            return (
              <li key={`${article.title}`}>
                <h3>{article.title}</h3>
                <p>{article.body}</p>
              </li>
            );
          })}
        </ul>
        <Articles path=":topic" />
      </main>
    );
  }

  componentDidMount() {
    api.getArticles().then(({ articles }) => {
      this.setState({ articles });
    });
  }
}

export default Homepage;
