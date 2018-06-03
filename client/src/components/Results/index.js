import React, { Component } from "react";
import { connect } from "react-redux";
import type { ResultsState } from "./types";
import { searchYelp } from "./actions";
import ErrorBoundary from "../Lib/ErrorBoundary";

type Props = {
  history: Object,
  location: Object,
  match: Object,
  results: ResultsState,
  searchYelp: Function
};

class Results extends Component<Props> {
  componentDidMount() {
    const query = this.props.location.search;
    this.props.searchYelp(query);
  }
  render() {
    return (
      <ErrorBoundary>
        <div>
          <h1>Results</h1>
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state: ResultsState) => ({
  results: state.results
});

const connected = connect(mapStateToProps, { searchYelp })(Results);

export default connected;
