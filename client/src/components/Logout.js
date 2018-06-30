import React, { Component } from "react";
import { Redirect } from "react-router-dom";

type Props = {};

class Logout extends Component<Props> {
  componentWillMount() {
    localStorage.removeItem("user");
    localStorage.removeItem("search");
  }
  render() {
    return <Redirect to="/" push />;
  }
}

export default Logout;
