import React, { Component } from "react";
import * as api from "../api";

class AddComment extends Component {
  state = {
    body: ""
  };
  render() {
    return (
      <form className="main" onSubmit={this.handleSubmit}>
        <h1>Add comment here</h1>
        <label htmlFor="title">Comment: </label>
        <input id="body" type="text" onChange={this.handleChange} />
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
    console.log(this.props, "addComment props");
    const { id, user } = this.props;
    console.log(user, id);
    event.preventDefault();
    api
      .addComment(id, {
        ...this.state,
        belongs_to: id,
        created_by: user
      })
      .then(({ comment }) => {
        console.log(comment);
      });
  };
}

export default AddComment;
