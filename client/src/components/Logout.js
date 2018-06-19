import React, { Component } from "react";
import { Redirect } from "react-router-dom";

type Props = {};

class Logout extends Component<Props> {
  componentWillMount() {
    localStorage.removeItem("user");
  }
  render() {
    return <Redirect to="/" push />;
  }
}

export default Logout;
