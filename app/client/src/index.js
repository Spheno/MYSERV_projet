import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from './redux/configureStore'

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import * as serviceWorker from "./serviceWorker";

import "./styles/tailwind.css"; /* tailwindCSS stylesheet */
import "react-phone-number-input/style.css"; /* style of phone number input in all pages */
import 'react-confirm-alert/src/react-confirm-alert.css'; /* confirm alert css */

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
