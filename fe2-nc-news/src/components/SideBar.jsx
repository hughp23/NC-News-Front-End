import React, { Component } from "react";
import Popup from "reactjs-popup";
import AddArticle from "./AddArticle";
// import Users from "./Users";

class SideBar extends Component {
  render() {
    const { user } = this.props;
    const savedData = JSON.parse(localStorage.getItem("user"));
    // console.log(savedData);
    return (
      <div className="sideBar">
        <div>
          <h3>
            You are logged in as{" "}
            {savedData ? savedData.user.username : user.username}
          </h3>
          <img src="{}" alt=""/>
        </div>
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
