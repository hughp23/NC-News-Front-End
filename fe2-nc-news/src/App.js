import React, { Component } from "react";
import "./css/App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Articles from "./components/Articles";
import Article from "./components/Article";
import AddArticle from "./components/AddArticle";
import User from "./components/User";
import Login from "./components/Login";
import SideBarComponent from "./components/SideBar";
import NotFound from "./components/NotFound";
import BadRequest from "./components/BadRequest";
import * as api from "./api";
import SideBar from "react-sidebar";
import SidebarExampleSidebar from "./components/ExampleSideBar";

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  state = {
    user: {},
    searchtext: "",
    sortBy: "",
    topics: [],
    sideBarOpen: false,
    sideBarDocked: mql.matches
  };
  render() {
    const { user, searchtext, sortBy, topics } = this.state;
    return (
      <div className="App">
        <Header className="header" />
        <Login path="/login" login={this.login} user={user}>
          <Nav topics={topics} />
          {/* <SidebarExampleSidebar /> */}
          <SideBarComponent
            user={user}
            searchArticles={this.searchArticles}
            sortArticlesBy={this.sortArticlesBy}
          />
          <Router className="router-wrapper">
            <Articles searchtext={searchtext} sortBy={sortBy} path="/" />
            <Articles
              sortBy={sortBy}
              user={user}
              path="/articles/:topic"
              searchText={searchtext}
            />
            <Article user={user} path="/articles/article/:id" />
            <AddArticle
              topics={topics}
              user={user}
              path="/articles/new_article"
            />
            <User path="/user/:username" />
            <BadRequest path="/error" />
            <NotFound default />
          </Router>
        </Login>
      </div>
    );
  }

  login = user => {
    const savedData = localStorage.getItem("user");
    if (savedData) this.setState(JSON.parse(savedData));
    else this.setState({ user });
    this.saveData();
  };

  saveData = () => {
    localStorage.setItem("user", JSON.stringify(this.state));
  };

  searchArticles = text => {
    this.setState({ searchtext: text });
  };

  sortArticlesBy = sort => {
    this.setState({ sortBy: sort });
  };

  componentDidMount() {
    api.getTopics().then(({ topics }) => {
      this.setState({ topics });
    });
  }
}

export default App;
