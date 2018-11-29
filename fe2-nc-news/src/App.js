import React, { Component } from "react";
import "./css/App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Homepage from "./components/Homepage";
import Articles from "./components/Articles";
import Article from "./components/Article";
import AddArticle from "./components/AddArticle";
import Footer from "./components/Footer";
import User from "./components/User";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import AddComment from "./components/AddComment";

class App extends Component {
  state = {
    user: {}
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header className="header" />
        <Login login={this.login} user={user}>
          <Nav />
          <SideBar user={user} />
          <Router className="router-wrapper">
            <Homepage path="/" />
            <Articles user={user} path="/articles/:topic" />
            <Article user={user} path="/articles/article/:id" />
            <AddArticle user={user} path="/articles/new_article" />
            <AddComment user={user} path="/article/comments/new_comment" />
            <User path="/user/:username" />
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
}

export default App;
