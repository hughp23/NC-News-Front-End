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
import Users from "./components/Users";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import AddComment from "./components/AddComment";

class App extends Component {
  state = {
    user: {}
  };
  render() {
    return (
      <div className="App">
        <Header className="header" />
        <Login login={this.login} user={this.state.user}>
          <Nav />
          <SideBar />
          <Router className="router-wrapper">
            <Homepage path="/" />
            <Articles user={this.state.user} path="/articles/:topic" />
            <Article path="/articles/article/:id" />
            <AddArticle user={this.state.user} path="/articles/new_article" />
            <AddComment
              user={this.state.user}
              path="/article/comments/new_comment"
            />
            <Users path="/users/:username" />
          </Router>
        </Login>
        <Footer />
      </div>
    );
  }

  login = user => {
    this.setState({ user });
  };
}

export default App;
