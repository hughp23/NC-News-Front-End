import React, { Component } from "react";
import { Link } from "@reach/router";
import "../css/Nav.css";
import * as api from "../api";

class Nav extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;
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
              <li className="linkList">
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
  }

  componentDidMount() {
    api.getTopics().then(({ topics }) => {
      console.log(topics, "topics");
      this.setState({ topics });
    });
  }
}

export default Nav;
