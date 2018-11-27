import React, { Component } from "react";
import { Link } from "@reach/router";

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Link to="/">Home</Link>
        {" | "}
        {/* <Link to="/users">Users</Link>
        {" | "} */}
        <Link to="/articles/coding">Coding</Link>
        {" | "}
        <Link to="/articles/football">Football</Link>
        {" | "}
        <Link to="/articles/cooking">Cooking</Link>
        <label>Username: </label>
        <input type="text" />
      </div>
    );
  }
}

export default Nav;
