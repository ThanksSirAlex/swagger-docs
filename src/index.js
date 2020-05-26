import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Doc from "layouts/Doc.js";
import './i18n'
import "assets/css/mimir.css?v=1.8.0";

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/" component={Doc} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
