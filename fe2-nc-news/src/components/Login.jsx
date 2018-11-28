import React, { Component } from "react";
import * as api from "../api";

class Login extends Component {
  state = {
    username: "tickle122"
  };
  render() {
    console.log(this.state.username, "username");
    if (this.props.user.username) return this.props.children;
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" onChange={this.handleChange} />
        <button>Log In</button>
      </form>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    api.login(this.state.username).then(user => {
      console.log(user[0], "user");
      this.props.login(user[0]);
    });
  };
}

export default Login;
