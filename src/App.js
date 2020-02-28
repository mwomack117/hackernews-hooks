import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";
import Button from "./components/Button";
import Table from "./components/Table";
import Search from "./components/Search";

const PATH_BASE = "https://hn.algolia.com/api/v1/search?query=";
const PARAM_QUERY = "redux";
const PARAM_HITS_PER_PAGE = "&hitsPerPage=20";
const PARAM_PAGE = "&page=";

const App = () => {
  const [results, setResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState(PARAM_QUERY);
  const [searchKey, setSearchKey] = useState("");

  const setSearchTopStories = result => {
    const { hits, page } = result;
    const oldHits = page !== 0 ? result.hits : [];
    const updatedHits = [...oldHits, ...hits];

    setResults({ hits: updatedHits, page });
  };

  const fetchSearchTopStories = (searchTerm, page = 0) => {
    axios
      .get(PATH_BASE + searchTerm + PARAM_HITS_PER_PAGE + PARAM_PAGE + page)
      .then(response => {
        setSearchTopStories(response.data);
        // setResults(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSearchTopStories(searchTerm);
    setSearchKey(searchTerm);
  }, []);

  const onSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const onSearchSubmit = event => {
    setSearchKey(searchTerm);
    fetchSearchTopStories(searchTerm);
    event.preventDefault();
  };

  const onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    const updatedHits = results.hits.filter(isNotId);
    // same as ^^ // const updatedHits = result.hits.filter(item => item.objectID !== id);
    setResults({ ...results, hits: updatedHits });
  };

  const page = (results && results.page) || 0;
  return (
    <div className="page">
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
      {results && <Table list={results.hits} onDismiss={onDismiss} />}
      <div className="interactions">
        {page >= 1 && (
          <Button onClick={() => fetchSearchTopStories(searchTerm, page - 1)}>
            Back
          </Button>
        )}
        <Button onClick={() => fetchSearchTopStories(searchTerm, page + 1)}>
          More
        </Button>
        <p>Page: {page + 1}</p>
      </div>
    </div>
  );
};

export default App;
