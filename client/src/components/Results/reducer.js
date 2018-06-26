import {
  SEARCH_YELP,
  SEARCH_YELP_SUCCESS,
  SEARCH_YELP_ERROR,
  SAVE_EVENT,
  SAVE_EVENT_SUCCESS,
  SAVE_EVENT_ERROR
} from "./constants";
import type { ResultsState } from "./types";

type State = ResultsState;

const initialState = {
  results: [],
  event: {},
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

    case SAVE_EVENT:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: "saving event in the API",
            time: new Date()
          }
        ],
        errors: []
      };

    case SAVE_EVENT_SUCCESS:
      return {
        ...state,
        event: action.event,
        requesting: false,
        successful: true,
        messages: [
          {
            body: `successfully received event from the API.`,
            time: new Date()
          }
        ],
        errors: []
      };

    case SAVE_EVENT_ERROR:
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
