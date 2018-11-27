import React, { Component } from "react";
import * as api from "../api";
// import UpdateButton from "./UpdateButton";
import Collapsible from "react-collapsible";
import "../css/Comments.css";

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
    console.log(event.target);
    const { id, value } = event.target;
    api.updateVote("comments", id, value).then(comment => {
      this.setState({ comment });
    });
  };
}

export default Comments;
