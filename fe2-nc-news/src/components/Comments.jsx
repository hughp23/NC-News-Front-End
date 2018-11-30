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
    const savedData = JSON.parse(localStorage.getItem("user"));
    console.log(savedData.user.username);
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
                  {comment.created_by.username === savedData.user.username ? (
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
    const { id } = this.props;
    const { body } = this.state;
    const savedData = JSON.parse(localStorage.getItem("user"));
    event.preventDefault();
    api
      .addComment(id, {
        body,
        belongs_to: id,
        created_by: savedData.user
      })
      .then(data => {
        window.location.reload();
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
  };

  handleClick = event => {
    const { id, value } = event.target;
    const { comments } = this.state;

    api.updateVote("comments", id, value).catch(err => {
      navigate("/error", {
        replace: true,
        state: {
          code: err.response.status,
          msg: err.response.data.msg
        }
      });
    });
    const updatedComments = comments.map(comment => {
      if (comment._id === id) {
        return { ...comment, votes: comment.votes + (value === "up" ? 1 : -1) };
      } else return comment;
    });
    console.log(updatedComments, "newArticles");
    this.setState({ comments: updatedComments });
  };

  onClick = event => {
    const { id } = event.target;
    api
      .deleteComment(id)
      .then(data => {
        console.log(data, "deletedData");
        window.location.reload();
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
  };
}

export default Comments;
