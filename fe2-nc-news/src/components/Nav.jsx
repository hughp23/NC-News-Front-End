import React from "react";
import { Link, navigate } from "@reach/router";
import "../css/Nav.css";
import Popup from "reactjs-popup";
import AddArticle from "./AddArticle";

const Nav = props => {
  const { topics, user } = props;
  const savedData = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="nav">
      <ul className="navBar">
        <div className="links">
          <li className="linkList">
            {" "}
            <Link className="navLink" to="/">
              Home
            </Link>
          </li>
          {topics.map(topic => {
            return (
              <li key={topic._id} className="linkList">
                {" "}
                <Link className="navLink" to={`/articles/${topic.slug}`}>
                  {topic.title}
                </Link>
              </li>
            );
          })}
        </div>
        <div className="navOptions">
          <div className="userLoginName">
            <h5 className="userLoginNameText">
              You are logged in as{" "}
              {savedData ? savedData.user.username : user.username}
            </h5>
          </div>
          <div className="logoutButtonBox">
            <button className="logoutButton" onClick={onClick}>
              Logout
            </button>
          </div>
          <div className="articleSearchForm">
            <form onSubmit={onSubmit}>
              <input
                placeholder="Search Articles..."
                className="articleSearchInput"
                type="text"
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="dropDownBox">
            <select
              className="sortdropDown"
              name="sortBy"
              id="sortBy"
              onChange={handleDropDownChange}
            >
              <option value="" selected={true} disabled>
                Sort By...
              </option>
              <option value="mostRecent">Most Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="postArticleButtonBox">
            <Popup
              trigger={
                <button className="postArticleButton">
                  {" "}
                  Post New Article{" "}
                </button>
              }
              modal
              closeOnDocumentClick
            >
              <AddArticle />
            </Popup>
          </div>
        </div>
      </ul>
    </div>
  );
};

const onClick = () => {
  localStorage.removeItem("user");
  navigate("/login");
  window.location.reload();
};

const handleChange = event => {
  const { value } = event.target;
  const { searchArticles } = this.props;
  searchArticles(value);
  this.setState({ textSearch: value });
};

const onSubmit = event => {
  event.preventDefault();
  const { searchArticles } = this.props;
  searchArticles(this.state.textSearch);
};

const handleDropDownChange = event => {
  event.preventDefault();
  const { value } = event.target;
  const { sortArticlesBy } = this.props;
  sortArticlesBy(value);
};

const openSideBar = event => {};

export default Nav;
