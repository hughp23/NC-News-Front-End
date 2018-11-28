import React, { Component } from "react";
import * as api from "../api";
// import UpdateButton from "./UpdateButton";
import Collapsible from "react-collapsible";
import "../css/Comments.css";
import AddComment from "./AddComment";
import { Link } from "@reach/router";

class Comments extends Component {
  state = {
    comments: []
  };
  render() {
    const { comments } = this.state;
    return (
      <div className="comment">
        <Collapsible
          className="collapsibleList"
          trigger={`${comments.length} Comments`}
        >
          <ul className="commentList">
            {comments.map(comment => {
              return (
                <li key={comment._id}>
                  <h4>Username: {comment.created_by.username}</h4>
                  <p>{comment.body}</p>
                  <p>Posted: {comment.created_at.slice(0, 10)}</p>
                  <p>Votes: {comment.votes}</p>
                  {/* <UpdateButton comment={comment} /> */}
                  <button
                    id={`${comment._id}`}
                    value="up"
                    onClick={this.handleClick}
                  >
                    Vote up
                  </button>
                  <button
                    id={`${comment._id}`}
                    value="down"
                    onClick={this.handleClick}
                  >
                    Vote down
                  </button>
                </li>
              );
            })}
          </ul>
          <AddComment user={this.props.user} id={this.props.id} />
        </Collapsible>
      </div>
    );
  }

  componentDidMount() {
    const { id } = this.props;
    api.getComments(id).then(({ comments }) => {
      console.log(comments, "comments");
      this.setState({ comments });
    });
  }

  updateVote = () => {};

  handleClick = event => {
    const { id, value } = event.target;
    const { comments } = this.state;

    api.updateVote("comments", id, value).catch(err => console.log(err));
    const updatedComments = comments.map(comment => {
      if (comment._id === id) {
        return { ...comment, votes: comment.votes + (value === "up" ? 1 : -1) };
      } else return comment;
    });
    console.log(updatedComments, "newArticles");
    this.setState({ comments: updatedComments });

    // map over articles from state
    // if article id  === id : return { ... article: votes: }
    // this.setState({ articles: updatedComments })
  };
}

export default Comments;
