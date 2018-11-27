import React, { Component } from "react";

class AddArticle extends Component {
  render() {
    return (
      <main className="main">
        <h1>Add article here</h1>
        <label htmlFor="title">Title: </label>
        <input type="text" />
        <button>Submit</button>
      </main>
    );
  }
}

export default AddArticle;
