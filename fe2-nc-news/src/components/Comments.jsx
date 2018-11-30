import React, { Component } from "react";
import * as api from "../api";
// import UpdateButton from "./UpdateButton";
import Collapsible from "react-collapsible";
import "../css/Comments.css";
import { navigate } from "@reach/router";

class Comments extends Component {
  state = {
    comments: []
  };
  render() {
    console.log(this.props);
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
                  {comment.created_by.username === this.props.user.username ? (
                    <button id={comment._id} onClick={this.onClick}>
                      Delete
                    </button>
                  ) : (
                    <button disabled>Delete</button>
                  )}
                </li>
              );
            })}
          </ul>
          <form className="main" onSubmit={this.handleSubmit}>
            <h1>Add comment here</h1>
            <label htmlFor="title">Comment: </label>
            <textarea id="body" type="text" onChange={this.handleChange} />
            <button>Post</button>
          </form>
        </Collapsible>
        {/* <Redirect to={`/articles/${this.props.topic}`} /> */}
      </div>
    );
  }

  componentDidMount() {
    const { id } = this.props;
    api
      .getComments(id)
      .then(({ comments }) => {
        console.log(comments, "comments");
        this.setState({ comments });
      })
      .catch(err => {
        navigate("/error", {
          replace: true,
          state: {
            code: err.response.status,
            msg: err.response.data.msg
          }
        });
      });
  }

  handleChange = event => {
    console.log(event.target.id);
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    console.log(event.target);
    console.log(this.props, "addComment props");
    const { id, user } = this.props;
    const { body } = this.state;
    console.log(user, id);
    event.preventDefault();
    api
      .addComment(id, {
        body,
        belongs_to: id,
        created_by: user
      })
      .then(data => {
        console.log(data.comment);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

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

  onClick = event => {
    const { id } = event.target;
    api.deleteComment(id).then(data => {
      console.log(data, "deletedData");
      window.location.reload();
    });
  };
}

export default Comments;
