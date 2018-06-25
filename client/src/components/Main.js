import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Authenticated from "./Authenticated";
import Authorized from "./Authorized";
import Home from "./Home";
import Results from "./Results";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Logout from "./Logout";
import SignUp from "./SignUp";
import axiosInterceptor from "./Lib/axiosInterceptor";
import ErrorBoundary from "./Lib/ErrorBoundary";
import Analytics from "./Lib/Analytics";

type Props = {};

class Main extends Component<Props> {
  render() {
    return (
      <ErrorBoundary>
        <Fragment>
          <Route path="/" component={Analytics} />
          <Route path="/" component={axiosInterceptor} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Results} />
            <Route exact path="/login" component={Authenticated(Login)} />
            <Route
              exact
              path="/reset-password/:token"
              component={ResetPassword}
            />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signup" component={Authenticated(SignUp)} />
            <Route
              render={function() {
                return <p>Not Found</p>;
              }}
            />
          </Switch>
        </Fragment>
      </ErrorBoundary>
    );
  }
}

export default Main;
