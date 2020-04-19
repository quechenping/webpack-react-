import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Root from "./root/index";

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/root" component={Root} />
    </Switch>
  </HashRouter>
);

export default BasicRoute;
