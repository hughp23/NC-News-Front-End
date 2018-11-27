import React from "react";

const UpdateButton = ({comment}) => {
  return (
    <div>
      <button id={`${comment._id}`} value="up" onClick={this.handleClick}>
        Vote up
      </button>
      <button id={`${comment._id}`} value="down" onClick={this.handleClick}>
        Vote down
      </button>
    </div>
  );
};

export default UpdateButton;
