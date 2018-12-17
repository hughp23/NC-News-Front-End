import React from "react";

const BadRequest = props => {
  const { code, msg } = props.location.state;
  return (
    <div>
      <h1>
        {code}: {msg}
      </h1>
    </div>
  );
};

export default BadRequest;
