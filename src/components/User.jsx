import React, { Component } from "react";
import * as api from "../api";


class User extends Component {
  state = {
    user: {}
  };
  render() {
    const { user } = this.state;
    return (
      <div>
        <h1>{user.name}</h1>
        <img src={user.avatar_url} alt="Not Available" />
        <p>Username: {user.username}</p>
      </div>
    );
  }

  componentDidMount() {
    const { username } = this.props;
    api.getUser(username).then(data => {
      this.setState({ user: data[0] });
    });
  }
}

export default User;
