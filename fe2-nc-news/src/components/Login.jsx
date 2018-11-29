import React, { Component } from "react";
import * as api from "../api";
import "../css/Login.css";

class Login extends Component {
  state = {
    username: "tickle122"
  };
  render() {
    const savedData = localStorage.getItem("user");
    if (this.props.user.username || savedData) return this.props.children;
    return (
      <div className="loginPage">
        <div className="loginGrid">
          <h1>Welcome to Northcoders News</h1>
          <p>Please Login</p>
          <div className="loginForm">
            <form onSubmit={this.onSubmit}>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                id="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
              />
              <button className='button'>Log In</button>
            </form>
          </div>
        </div>
      </div>
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
