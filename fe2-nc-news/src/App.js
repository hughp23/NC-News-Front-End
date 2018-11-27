import React, { Component } from "react";
import "./App.css";
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

class App extends Component {
  state = {
    user: {}
  };
  render() {
    console.log(this.state.user, "user");
    return (
      <div className="App">
        <Header className="header" />
        <Login login={this.login} user={this.state.user}>
          <Nav />
          <Router>
            <Homepage path="/" />
            <Articles path="/articles/:topic" />
            <Article path="/articles/article/:id" />
            <AddArticle path="/articles/new_article" />
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
