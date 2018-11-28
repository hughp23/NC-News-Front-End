import React from "react";
import { Link } from "@reach/router";

const SideBar = () => {
  return (
    <div className="sideBar">
      <form className="userSearchBar">
        <label>Username: </label>
        <input type="text" />
      </form>
      <Link to="/articles/new_article">Post New Article</Link>
    </div>
  );
};

export default SideBar;
