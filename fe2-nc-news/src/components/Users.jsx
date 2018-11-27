import React, { Component } from "react";
import * as api from "../api";

class Users extends Component {
  state = {
    users: []
  };
  render() {
    return (
      <div>
        <h1>Users</h1>
      </div>
    );
  }

  componentDidMount() {}
}

export default Users;
