import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginPage from "./views/LoginPage.js";
import RegistrationPage from "./views/RegistrationPage";
import AdminPage from "./views/AdminPage.js";
import HomePage from "./views/HomePage.js";

var history = createBrowserHistory();
// console.log(history);
export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/LoginPage" component={LoginPage} history={history}/>
        <Route path="/AdminPage" component={AdminPage} history={history}/>
        <Route path="/HomePage" component={HomePage} history={history}/>
        <Route path="/" component={RegistrationPage} />
      </Switch>
    </Router>
  );
}
