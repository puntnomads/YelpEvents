import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Results from "./Results";
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
