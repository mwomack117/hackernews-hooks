import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import PropTypes from "prop-types";

import Button from "./components/Button";
import Table from "./components/Table";
import Search from "./components/Search";

import {
  PATH_BASE,
  PARAM_HITS_PER_PAGE,
  PARAM_QUERY,
  PARAM_PAGE
} from "./constants";

const App = () => {
  const [results, setResults] = useState({});
  const [searchTerm, setSearchTerm] = useState(PARAM_QUERY);
  const [searchKey, setSearchKey] = useState("");
  const [error, setError] = useState(null);

  const needsToSearchTopStories = searchTerm => {
    return !results[searchTerm];
  };

  const setSearchTopStories = result => {
    const { hits, page } = result;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];

    const newResults = { ...results, [searchKey]: { hits: updatedHits, page } };
    setResults(newResults);
  };

  const fetchSearchTopStories = (searchTerm, page = 0) => {
    axios
      .get(PATH_BASE + searchTerm + PARAM_HITS_PER_PAGE + PARAM_PAGE + page)
      .then(response => {
        setSearchTopStories(response.data);
        console.log(response.data);
        console.log("api-hit");
      })
      .catch(error => {
        setError(error);
        console.log(error);
      });
  };

  useEffect(() => {
    setSearchKey(searchTerm);
    fetchSearchTopStories(searchTerm);
  }, []);

  const onSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const onSearchSubmit = event => {
    setSearchKey(searchTerm);

    if (needsToSearchTopStories(searchTerm)) {
      fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  };

  const onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    const updatedHits = results[searchKey].hits.filter(isNotId);
    // same as ^^ // const updatedHits = result.hits.filter(item => item.objectID !== id);
    setResults({ ...results, [searchKey]: { hits: updatedHits } });
  };

  const page = (results && results[searchKey] && results[searchKey].page) || 0;
  const list = (results && results[searchKey] && results[searchKey].hits) || [];

  return (
    <div className="page">
      <p>Learn React</p>
      {console.log(results)}
      <div className="interactions">
        <Search
          value={searchTerm}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        >
          Search
        </Search>
      </div>
      {error ? (
        <div className="interactions">
          <p>
            Something went wrong{" "}
            <span role="img" aria-label="confused imoji">
              🤔
            </span>
          </p>
        </div>
      ) : (
        <Table list={list} onDismiss={onDismiss} />
      )}
      <div className="interactions">
        <Button onClick={() => fetchSearchTopStories(searchKey, page + 1)}>
          More
        </Button>
        <p>Page: {page + 1}</p>
      </div>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired
};

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default App;
