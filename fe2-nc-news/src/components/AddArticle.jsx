import React, { Component } from "react";
import * as api from "../api";
import { Link, navigate } from "@reach/router";
import "../css/AddArticle.css";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    created: false
  };
  render() {
    if (this.state.created) {
      return (
        <div>
          <h1>Your New Article</h1>
          <h2>{this.state.title}</h2>
          <p>Topic: {this.state.topic}</p>
          <p>{this.state.body}</p>
          <Link to={`/articles/${this.state.topic}`}>
            Back to {this.state.topic} articles
          </Link>
        </div>
      );
    }
    return (
      <form className="main" onSubmit={this.handleSubmit}>
        <h1>Add article here</h1>
        <label htmlFor="title">Title: </label>
        <textarea
          placeholder="Enter title here"
          className="textareatitle"
          id="title"
          type="text"
          onChange={this.handleChange}
        />
        <label htmlFor="body">Text: </label>
        <textarea
          placeholder="Enter text here"
          className="textareabody"
          id="body"
          type="text"
          onChange={this.handleChange}
        />
        <select
          className="addArticleTopicDropDown"
          name="topic"
          id="topic"
          onChange={this.handleChange}
        >
          <option value="" selected={true} disabled>
            Choose a Topic...
          </option>
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
        <button className="button">Post</button>
      </form>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    const { user } = this.props;
    event.preventDefault();
    api
      .addArticle(this.state.topic, { ...this.state, created_by: user })
      .then(({ article }) => {
        this.setState({
          created: true
        });
      })
      .catch(err => {
        navigate("/error", {
          replace: true,
          state: {
            code: err.response.status,
            msg: err.response.data.msg
          }
        });
      });
  };
}

export default AddArticle;
