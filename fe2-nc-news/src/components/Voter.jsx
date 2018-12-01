import React, { Component } from "react";
import * as api from "../api.js";

class Voter extends Component {
  state = {
    votes: 0,
    voteChange: 0
  };
  render() {
    const thumbsDownSymbol = "👎";
    const heartEyesSymbol = "😍";
    const { voteChange } = this.state;
    const { id } = this.props;
    return (
      <div>
        <button
          id={id}
          value="up"
          disabled={voteChange === 1}
          onClick={this.onClick}
        >
          {heartEyesSymbol}
        </button>
        <button
          id={id}
          value="down"
          disabled={voteChange === -1}
          onClick={this.onClick}
        >
          {thumbsDownSymbol}
        </button>
      </div>
    );
  }

  componentDidMount() {
    const { id, dataType, articleId } = this.props;
    dataType === "articles"
      ? api.getArticleById(id).then(data => {
          this.setState({ votes: data.article.votes });
        })
      : api.getComments(articleId).then(data => {
          this.setState({ votes: data.votes });
        });
  }

  onClick = event => {
    const { id, value } = event.target;
    const { voteChange } = this.state;
    const { dataType, vote } = this.props;
    api.updateVote(dataType, id, value).then(votes => {
      this.setState({
        votes,
        voteChange: voteChange + (value === "up" ? 1 : -1)
      });
      vote(id, value, votes);
    });
  };
}

export default Voter;
