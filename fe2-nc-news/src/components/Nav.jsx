import React from "react";
import { Link } from "@reach/router";
import "../css/Nav.css";

const Nav = props => {
  const { topics } = props;
  return (
    <div className="nav">
      <ul className="navBar">
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
      </ul>
    </div>
  );
};

const openSideBar = (event) => {

}

export default Nav;
