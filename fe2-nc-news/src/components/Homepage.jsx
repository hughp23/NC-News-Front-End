import React, { Component } from "react";
import Articles from "./Articles";

class Homepage extends Component {
  state = {
    articles: []
  };
  render() {
    return (
      <main className="main">
        <Articles />
      </main>
    );
  }
}

export default Homepage;
