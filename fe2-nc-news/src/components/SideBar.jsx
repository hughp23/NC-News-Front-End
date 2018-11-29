import React, { Component } from "react";
import Popup from "reactjs-popup";
import AddArticle from "./AddArticle";
// import Users from "./Users";

class SideBar extends Component {
  state = {
    textSearch: ""
  };
  render() {
    const { user } = this.props;
    const savedData = JSON.parse(localStorage.getItem("user"));
    // console.log(savedData);
    return (
      <div className="sideBar">
        <div className="userLoginName">
          <h3>
            You are logged in as{" "}
            {savedData ? savedData.user.username : user.username}
          </h3>
          {/* <img
            src={savedData ? savedData.user.avatar_url : user.avatar_url}
            alt=""
          /> */}
        </div>
        <div>
          <Popup
            trigger={<button className="button"> Post New Article </button>}
            modal
            closeOnDocumentClick
          >
            <AddArticle />
          </Popup>
        </div>
        <button onClick={this.onClick}>Logout</button>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="search">Search Articles: </label>
          <input type="text" onChange={this.handleChange} />
        </form>
        <select name="sortBy" id="sortBy" onChange={this.handleDropDownChange}>
          <option value="">Sort By...</option>
          <option value="mostRecent">Most Recent</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    );
  }

  onClick = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  handleChange = event => {
    const { value } = event.target;
    const { searchArticles } = this.props;
    searchArticles(value);
    this.setState({ textSearch: value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { searchArticles } = this.props;
    console.log(this.state.textSearch);
    searchArticles(this.state.textSearch);
  };

  handleDropDownChange = event => {
    event.preventDefault();
    console.dir(event.target);
    const { value } = event.target;
    const { sortArticlesBy } = this.props;
    sortArticlesBy(value);
  };
}

export default SideBar;
