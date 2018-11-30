import React, { Component } from "react";
import * as api from "../api";
import "../css/Login.css";

class Login extends Component {
  state = {
    username: "tickle122",
    password: "ncnews"
  };
  render() {
    const { username, password, err } = this.state;
    console.log(err);
    const savedData = localStorage.getItem("user");
    if (this.props.user.username || savedData) return this.props.children;
    return (
      <div className="loginPage">
        <div className="loginGrid">
          <h1>Welcome to Northcoders News</h1>
          {err ? (
            <p className="loginErrorMessage">
              Username/Password Invalid, try again
            </p>
          ) : (
            <p>Please Login</p>
          )}
          <div className="loginForm">
            <form onSubmit={this.onSubmit}>
              <label htmlFor="username">Username: </label>
              <input
                className="loginInputBox"
                type="text"
                id="username"
                onChange={this.handleChange}
                value={username}
              />{" "}
              {""}
              <label htmlFor="password">Password: </label>
              <input
                className="loginInputBox"
                type="password"
                id="password"
                onChange={this.handleChange}
                value={password}
              />
              <div className="loginButtonBox">
                <button className="loginButton">Log In</button>
              </div>
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
    api
      .login(this.state.username)
      .then(user => {
        console.log(user[0], "user");
        this.props.login(user[0]);
      })
      .catch(err => {
        console.log(err, "err");
        this.setState({ err });
      });
  };
}

export default Login;
