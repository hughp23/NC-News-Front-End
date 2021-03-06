import React, { Component } from "react";
import Popup from "reactjs-popup";
import AddArticle from "./AddArticle";
import "../css/SideBar.css";
import { navigate } from "@reach/router/lib/history";
import SideBar from "react-sidebar";

class SideBarComponent extends Component {
  state = {
    textSearch: "",
  };
  render() {
    const { user } = this.props;
    const savedData = JSON.parse(localStorage.getItem("user"));
    return (
      <div className="sideBar">
        <div className="dropDownBox">
          <select
            className="sortdropDown"
            name="sortBy"
            id="sortBy"
            onChange={this.handleDropDownChange}
          >
            <option value="" selected={true} disabled>
              Sort By...
            </option>
            <option value="mostRecent">Most Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div>
          <Popup
            trigger={
              <button className="postArticleButton"> Post New Article </button>
            }
            modal
            closeOnDocumentClick
          >
            <AddArticle />
          </Popup>
        </div>
      </div>
    );
  }

  onClick = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
    searchArticles(this.state.textSearch);
  };

  handleDropDownChange = event => {
    event.preventDefault();
    const { value } = event.target;
    const { sortArticlesBy } = this.props;
    sortArticlesBy(value);
  };
}

export default SideBarComponent;
