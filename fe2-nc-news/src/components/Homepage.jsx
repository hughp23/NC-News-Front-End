import React, { Component } from "react";
import * as api from "../api";
import Articles from "./Articles";

class Homepage extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    console.log(articles);
    return (
      <main>
        <h1>Homepage</h1>
        <Articles />
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
