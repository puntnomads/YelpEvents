import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import axiosInterceptor from "./Lib/axiosInterceptor";
import ErrorBoundary from "./Lib/ErrorBoundary";
import Analytics from "./Lib/Analytics";

class Main extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Fragment>
          <Route path="/" component={Analytics} />
          <Route path="/" component={axiosInterceptor} />
          <Switch>
            <Route exact path="/" component={Home} />
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
