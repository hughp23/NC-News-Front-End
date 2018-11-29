import React, { Component } from "react";
import Popup from "reactjs-popup";
import AddArticle from "./AddArticle";

class SideBar extends Component {
  render() {
    return (
      <div className="sideBar">
        <form className="userSearchBar">
          <label>Username: </label>
          <input type="text" />
        </form>
        <Popup
          trigger={<button className="button"> Post New Article </button>}
          modal
          closeOnDocumentClick
        >
          <AddArticle />
        </Popup>
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
