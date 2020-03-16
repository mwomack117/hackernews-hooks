import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";

import * as ROUTES from "../../constants/routes";

import Button from "../Button";
import Table from "../Table";
import Search from "../Search";
import Header from "../Header";
import Loading from "../Loading";

import {
  PATH_BASE,
  PARAM_HITS_PER_PAGE,
  PARAM_QUERY,
  PARAM_PAGE
} from "../../constants/apiParams.js";

const App = () => {
  const [results, setResults] = useState({});
  const [searchTerm, setSearchTerm] = useState(PARAM_QUERY);
  const [searchKey, setSearchKey] = useState(PARAM_QUERY);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

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
    setLoading(false);
  };

  const fetchSearchTopStories = (searchTerm, page = 0) => {
    setLoading(true);

    axios
      .get(PATH_BASE + searchTerm + PARAM_HITS_PER_PAGE + PARAM_PAGE + page)
      .then(response => {
        setSearchTopStories(response.data);
        console.log("API call", response.data);
      })
      .catch(error => {
        setError(error);
        console.log(error);
      });
  };

  useEffect(() => {
    setSearchKey(searchTerm);

    if (needsToSearchTopStories(searchTerm)) {
      fetchSearchTopStories(searchTerm);
    }
  }, [searchKey]);

  const onSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const onSearchSubmit = event => {
    setSearchKey(searchTerm);

    event.preventDefault();
  };

  const onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    const updatedHits = results[searchKey].hits.filter(isNotId);
    // same as ^^ // const updatedHits = results[searchKey].hits.filter(item => item.objectID !== id);
    setResults({ ...results, [searchKey]: { hits: updatedHits } });
  };

  const page = (results && results[searchKey] && results[searchKey].page) || 0;
  const list = (results && results[searchKey] && results[searchKey].hits) || [];

  return (
    <Router>
      <div className="page">
        <Header
          value={searchTerm}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        >
          Search
        </Header>

        <Switch>
          <Route exact path={"/"}>
            <Search
              value={searchTerm}
              onChange={onSearchChange}
              onSubmit={onSearchSubmit}
            >
              Search
            </Search>
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
              {isLoading ? (
                <Loading />
              ) : (
                <Button
                  onClick={() => fetchSearchTopStories(searchKey, page + 1)}
                >
                  More
                </Button>
              )}
            </div>
          </Route>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        </Switch>
      </div>
    </Router>
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
