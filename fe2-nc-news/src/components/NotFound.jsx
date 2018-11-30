import React from "react";
import { Link } from "@reach/router";

const NotFound = () => {
  return (
    <div>
      <h1>You have Gone Wrong Turn Around And Go Home</h1>
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
