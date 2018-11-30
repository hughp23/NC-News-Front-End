import React from "react";
import "../css/Header.css";
import { Link } from "@reach/router";

const Header = () => {
  return (
    <div className="header">
      <Link className="headerLink" to="/">{<h1 className="mainTitle">NorthCoders News</h1>}</Link>
      {/* <h1 className="mainTitle">NorthCoders News</h1> */}
    </div>
  );
};

export default Header;
