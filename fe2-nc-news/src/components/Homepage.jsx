import React, { Component } from "react";
import Articles from "./Articles";

class Homepage extends Component {
  state = {
    articles: []
  };
  render() {
    return (
      <main className="main">
        <Articles path="/articles/:topic" />
      </main>
    );
  }
}

export default Homepage;
