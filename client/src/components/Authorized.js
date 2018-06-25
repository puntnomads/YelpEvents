import * as React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import { checkUser } from "./Lib/checkUser";

type Props = {
  history: Object,
  location: Object,
  match: Object
};

const AuthorizationHOC = (WrappedComponent: React.ComponentType<any>) => {
  class Authorized extends Component<Props> {
    componentWillMount() {
      this.checkAuthorization(this.props);
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthorization(nextProps);
      }
    }
    checkAuthorization(params) {
      const { history } = params;
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        if (checkUser(user)) {
          return null;
        } else {
          history.replace({ pathname: "/logout" });
        }
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return withRouter(Authorized);
};

export default AuthorizationHOC;
