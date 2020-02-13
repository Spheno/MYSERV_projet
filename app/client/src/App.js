import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/signup" component={RegisterPage} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Redirect from="*" to="/" />
      </Switch>
    );
  }
}

export default App;
