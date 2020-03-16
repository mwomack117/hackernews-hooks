import React from "react";

import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <h2>Hacker News</h2>
        <Navigation />
      </nav>
    </div>
  );
};

export default Header;
