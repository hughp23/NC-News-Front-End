import React, { Component } from "react";
import { Link } from "@reach/router";
import "../css/Nav.css";

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <ul className="navBar">
          <li className="linkList">
            {" "}
            <Link className="navLink" to="/">
              Home
            </Link>
          </li>
          {/* <Link to="/users">Users</Link>
           */}
          <li className="linkList">
            {" "}
            <Link className="navLink" to="/articles/coding">
              Coding
            </Link>
          </li>
          <li className="linkList">
            <Link className="navLink" to="/articles/football">
              Football
            </Link>
          </li>
          <li className="linkList">
            <Link className="navLink" to="/articles/cooking">
              Cooking
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
