import React from "react";
import Login from "./Login";

const SideBar = () => {
  return (
    <div className="sideBar">
      <form className="userSearchBar">
        <label>Username: </label>
        <input type="text" />
      </form>
    </div>
  );
};

export default SideBar;
