import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import ErrorPage from "./components/Error/ErrorPage";

/* Instead of adding all the icons of font awesome, we make our own lib with only what we need */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faShoppingCart, faHeart, faCogs } from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faShoppingCart, faHeart, faCogs)

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/signup" component={RegisterPage} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
