import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { Router } from "@reach/router";
import Homepage from "./components/Homepage";
import Articles from "./components/Articles";
import Article from "./components/Article";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header className="header" />
        <Nav className="nav" />
        <Router>
          <Homepage path="/" />
          <Articles path="/articles/:topic" />
          <Article path="/article/:id" />
        </Router>
        <Sidebar />
      </div>
    );
  }
}

export default App;
