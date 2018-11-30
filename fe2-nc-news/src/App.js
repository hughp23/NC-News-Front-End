import React, { Component } from "react";
import "./css/App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Articles from "./components/Articles";
import Article from "./components/Article";
import AddArticle from "./components/AddArticle";
import Footer from "./components/Footer";
import User from "./components/User";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import NotFound from "./components/NotFound";
import BadRequest from "./components/BadRequest";

class App extends Component {
  state = {
    user: {},
    searchtext: "",
    sortBy: ""
  };
  render() {
    const { user, searchtext, sortBy } = this.state;
    console.log(sortBy, "text in state");
    return (
      <div className="App">
        <Header className="header" />
        <Login path='/login' login={this.login} user={user}>
          <Nav />
          <SideBar
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
            <AddArticle user={user} path="/articles/new_article" />
            <User path="/user/:username" />
            <BadRequest path="/error" />
            <NotFound default />
          </Router>
          <Footer />
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
    console.log(text, "text search");
    this.setState({ searchtext: text });
  };

  sortArticlesBy = sort => {
    console.log(sort, "sort");
    this.setState({ sortBy: sort });
  };
}

export default App;
