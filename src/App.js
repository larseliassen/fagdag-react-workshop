import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import JobList from "./JobList.js";
import JobListing from "./JobListing.js";
import Header from "./Header.js"

const App = () => {
  return (     
    <BrowserRouter>
      <Header /> 
      <Route exact path="/">              
        <JobList />
      </Route>
      <Route exact path="/position/:id">
        <JobListing />
      </Route>
    </BrowserRouter>
  );
};

export default App;
