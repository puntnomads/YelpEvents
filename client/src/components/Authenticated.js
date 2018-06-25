import * as React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";

type Props = {
  history: Object,
  location: Object,
  match: Object
};

const AuthenticationHOC = (WrappedComponent: React.ComponentType<any>) => {
  class Authenticated extends Component<Props> {
    componentWillMount() {
      this.checkAuthentication(this.props);
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }
    checkAuthentication(params) {
      const { history } = params;
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        if (user && user.token) {
          history.replace({ pathname: "/events" });
        }
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return withRouter(Authenticated);
};

export default AuthenticationHOC;
