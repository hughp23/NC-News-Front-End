import React, { Component } from "react";
import * as api from "../api";

class Users extends Component {
  state = {
    user: {}
  };
  render() {
    const { user } = this.state;
    return (
      <div>
        <h1>Users</h1>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props, "props");
    api.getUsers(this.props.username).then(user => {
      this.setState({ user });
    });
  }
}

export default Users;
