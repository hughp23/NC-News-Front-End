import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    created: false
  };
  render() {
    console.log(this.props.user, "user props");
    if (this.state.created) {
      return (
        <div>
          <h1>Your New Article</h1>
          <h2>{this.state.title}</h2>
          <p>Topic: {this.state.topic}</p>
          <p>{this.state.body}</p>
          <Link to={`/articles/${this.state.topic}`}>Back to {this.state.topic} articles</Link>
        </div>
      );
    }
    return (
      <form className="main" onSubmit={this.handleSubmit}>
        <h1>Add article here</h1>
        <label htmlFor="title">Title: </label>
        <input id="title" type="text" onChange={this.handleChange} />
        <label htmlFor="body">Text: </label>
        <input id="body" type="text" onChange={this.handleChange} />
        <select name="topic" id="topic" onChange={this.handleChange}>
          <option value="">Choose a Topic...</option>
          <option id="coding" value="coding">
            Coding
          </option>
          <option id="football" value="football">
            Football
          </option>
          <option id="cooking" value="cooking">
            Cooking
          </option>
        </select>
        <button>Post</button>
      </form>
    );
  }

  handleChange = event => {
    console.log(event.target.id);
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    const { user } = this.props;
    console.log(this.state);
    event.preventDefault();
    api
      .addArticle(this.state.topic, { ...this.state, created_by: user })
      .then(({ article }) => {
        console.log(article);
        this.setState({
          created: true
        });
      });
  };
}

export default AddArticle;
