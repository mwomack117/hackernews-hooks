import React from "react";
import Search from "./Search";

const Header = ({ value, onChange, onSubmit, children }) => {
  return (
    <div className="header">
      <nav>
        <h2>Hacker News</h2>
        <Search
          className="interactions"
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          children={children}
        />
        <div></div>
      </nav>
    </div>
  );
};

export default Header;
