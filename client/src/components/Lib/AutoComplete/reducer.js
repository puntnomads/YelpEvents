import {
  SEARCH_GOOGLE_PLACES,
  SEARCH_GOOGLE_PLACES_SUCCESS,
  SEARCH_GOOGLE_PLACES_ERROR
} from "./constants";
import type { AutoCompleteState } from "./types";

type State = AutoCompleteState;

const initialState = {
  results: [],
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function searchGooglePlacesReducer(
  state: State = initialState,
  action: Object
): State {
  switch (action.type) {
    case SEARCH_GOOGLE_PLACES:
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

    case SEARCH_GOOGLE_PLACES_SUCCESS:
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

    case SEARCH_GOOGLE_PLACES_ERROR:
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
