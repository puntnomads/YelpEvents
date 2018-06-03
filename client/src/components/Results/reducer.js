import {
  SEARCH_YELP,
  SEARCH_YELP_SUCCESS,
  SEARCH_YELP_ERROR
} from "./constants";
import type { ResultsState } from "./types";

type State = ResultsState;

const initialState = {
  results: {},
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function searchYelpReducer(
  state: State = initialState,
  action: Object
): State {
  switch (action.type) {
    case SEARCH_YELP:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: "getting results from the api",
            time: new Date()
          }
        ],
        errors: []
      };

    case SEARCH_YELP_SUCCESS:
      return {
        ...state,
        results: action.results,
        requesting: false,
        successful: true,
        messages: [
          {
            body: `successfully received results from the api.`,
            time: new Date()
          }
        ],
        errors: []
      };

    case SEARCH_YELP_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat([
          {
            body: action.error.toString(),
            time: new Date()
          }
        ])
      };

    default:
      return state;
  }
};

export default reducer;
