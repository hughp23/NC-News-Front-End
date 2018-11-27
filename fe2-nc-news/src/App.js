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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header className="header" />
        <Nav />
        <Router>
          <Homepage path="/" />
          <Articles path="/articles/:topic" />
          <Article path="/articles/article/:id" />
          <AddArticle path="/articles/new_article" />
          <Users path="/users" />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
