import React, { Component } from "react";
import { Link } from "@reach/router";

class Nav extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/articles/coding">Coding</Link>
        {" | "}
        <Link to="/articles/football">Football</Link>
        {" | "}
        <Link to="/articles/cooking">Cooking</Link>
      </div>
    );
  }
}

export default Nav;
