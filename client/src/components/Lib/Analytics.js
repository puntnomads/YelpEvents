import { Component } from "react";
import ReactGA from "react-ga";
import type { ContextRouter } from "react-router-dom";

type Props = {
  ...ContextRouter
};

class Analytics extends Component<Props> {
  componentDidMount() {
    ReactGA.initialize("");
    this.sendPageChange(
      this.props.location.pathname,
      this.props.location.search
    );
  }
  componentDidUpdate(prevProps: Props) {
    if (
      this.props.location.pathname !== prevProps.location.pathname ||
      this.props.location.search !== prevProps.location.search
    ) {
      this.sendPageChange(
        this.props.location.pathname,
        this.props.location.search
      );
    }
  }
  sendPageChange(pathname: string, search: string = "") {
    const page = pathname + search;
    ReactGA.set({ page });
    ReactGA.pageview(page);
  }
  render() {
    return null;
  }
}

export default Analytics;
