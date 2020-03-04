import React from "react";
import PropTypes from "prop-types";

import Button from "./Button";

const largeColumn = {
  width: "40%"
};

const midColumn = {
  width: "27%"
};

const smallColumn = {
  width: "11%"
};

const Table = ({ list, onDismiss }) => (
  <div className="table">
    <div className="table-header">
      <span style={largeColumn}>Article Title</span>
      <span style={midColumn}>Author</span>
      <span style={smallColumn}>Comments</span>
      <span style={smallColumn}>Points</span>
      <span style={smallColumn}></span>
    </div>
    {list.map(item => (
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>{item.author}</span>
        <span style={smallColumn}>{item.num_comments}</span>
        <span style={smallColumn}>{item.points}</span>
        <span style={smallColumn}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Button.defaultProps = { className: "" };

export default Table;
