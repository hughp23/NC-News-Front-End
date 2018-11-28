import React, { Component } from "react";
import { Link } from "@reach/router";

class SideBar extends Component {
  render() {
    return (
      <div className="sideBar">
        <form className="userSearchBar">
          <label>Username: </label>
          <input type="text" />
        </form>
        <Link to="/articles/new_article">Post New Article</Link>{" "}
        <button onClick={this.onClick}>Logout</button>
      </div>
    );
  }

  onClick = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
}

export default SideBar;
