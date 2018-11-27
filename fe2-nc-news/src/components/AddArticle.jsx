import React, { Component } from "react";
import * as api from "../api";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: ""
  };
  render() {
    console.log(this.props.user, "user props");
    return (
      <form className="main" onSubmit={this.handleSubmit}>
        <h1>Add article here</h1>
        <label htmlFor="title">Title: </label>
        <input id="title" type="text" onChange={this.handleChange} />
        <label htmlFor="body">Text: </label>
        <input id="body" type="text" onChange={this.handleChange} />
        <select name="topic" id="topic">
          <option value="">Choose a Topic...</option>
          <option value="coding">Coding</option>
          <option value="football">Football</option>
          <option value="cooking">Cooking</option>
        </select>
        <button>Post</button>
      </form>
    );
  }

  handleChange(event) {
    console.log(event.target.id);
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit(event) {
    const { user } = this.props;
    event.preventDefault();
    api
      .addArticle(this.state.topic, { ...this.state, created_by: user })
      .then(({ article }) => {
        console.log(article);
      });
  }
}

export default AddArticle;
