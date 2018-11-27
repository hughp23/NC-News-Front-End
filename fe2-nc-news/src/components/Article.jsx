import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";

class Article extends Component {
  state = {
    article: [],
    comments: [],
    isLoading: true
  };
  render() {
    const { article, isLoading } = this.state;
    if (isLoading) return <p>Page is Loading...</p>;
    return (
      <main className="main">
        <h1>Article</h1>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <p>{article.created_by.username}</p>
        <button disabled="false">Delete</button>
        <Comments id={article._id} />
        <label>Add Comment:</label>
        <input type="text" />
        <button>Submit</button>
      </main>
    );
  }

  componentDidMount() {
    const { id } = this.props;
    api.getArticleById(id).then(({ article }) => {
      console.log(article, "article");
      this.setState({ article, isLoading: false });
    });
  }
}

export default Article;
