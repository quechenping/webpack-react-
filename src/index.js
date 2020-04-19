import React from "react";
import ReactDOM from "react-dom";
import Router from "./components/router";

const render = () => {
  ReactDOM.render(<Router />, document.getElementById("app"));
};
render();
