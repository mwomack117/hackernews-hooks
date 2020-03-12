import React from "react";
import classNames from "classnames";

import Button from "./Button";

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
  const sortClass = classNames("button-reverse", {
    "button-active": sortKey === activeSortKey
  });

  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
      <span>
        <i className="material-icons">swap_vert</i>
      </span>
    </Button>
  );
};

export default Sort;
