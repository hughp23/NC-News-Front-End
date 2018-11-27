import React, { Component } from "react";
import * as api from "../api";
// import Articles from "./Articles";

class Homepage extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    // console.log(articles);
    return (
      <main className="main">
        <h1>Homepage</h1>
        <ul>
          {articles.map(article => {
            return (
              <li key={`${article.title}`}>
                <h3>{article.title}</h3>
                <p>{article.body}</p>
                <p>{article.belongs_to}</p>
              </li>
            );
          })}
        </ul>
        {/* <Articles /> */}
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
