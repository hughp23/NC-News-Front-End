import React, { Component } from "react";
import * as api from "../api";
// import UpdateButton from "./UpdateButton";
import Collapsible from "react-collapsible";
import "../css/Comments.css";
import { navigate } from "@reach/router";
import Popup from "reactjs-popup";
import Voter from "./Voter";

class Comments extends Component {
  state = {
    comments: []
  };
  render() {
    const savedData = JSON.parse(localStorage.getItem("user"));
    const { comments } = this.state;
    const { id } = this.props;
    return (
      <div className="comment">
        <Collapsible className="collapsibleList" trigger={"Show Comments"}>
          <ul className="commentList">
            {comments.map(comment => {
              return (
                <li key={comment._id}>
                  <h4>Username: {comment.created_by.username}</h4>
                  <p>{comment.body}</p>
                  <p>Posted: {comment.created_at.slice(0, 10)}</p>
                  <p>Votes: {comment.votes}</p>
                  <Voter
                    dataType="comments"
                    articleId={id}
                    id={comment._id}
                    vote={this.vote}
                  />
                  {savedData.user.username === comment.created_by.username ? (
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
          <Popup
            trigger={<button className="userButton"> Post New Comment </button>}
            modal
            closeOnDocumentClick
          >
            <form className="main" onSubmit={this.handleSubmit}>
              <h1>Add comment here</h1>
              <label htmlFor="title">Comment: </label>
              <textarea id="body" type="text" onChange={this.handleChange} />
              <button>Post</button>
            </form>
          </Popup>
        </Collapsible>
      </div>
    );
  }

  componentDidMount() {
    const { id } = this.props;
    api
      .getComments(id)
      .then(({ comments }) => {
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

  onClick = event => {
    const { id } = event.target;
    api
      .deleteComment(id)
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

  vote = (id, value, votes) => {
    const { comments } = this.state;
    const updatedComments = comments.map(comment => {
      if (comment._id === id) {
        return { ...comment, votes: votes };
      } else return comment;
    });
    this.setState({ comments: updatedComments });
  };
}

export default Comments;
