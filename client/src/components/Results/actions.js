import {
  SEARCH_YELP,
  SEARCH_YELP_SUCCESS,
  SEARCH_YELP_ERROR
} from "./constants";
import type { searchYelpAction } from "./types";

export const searchYelp = function searchYelp(query: string): searchYelpAction {
  return {
    type: SEARCH_YELP,
    query
  };
};

export const searchYelpSuccess = function searchYelpSuccess(result: Object) {
  return {
    type: SEARCH_YELP_SUCCESS,
    result
  };
};

export const searchYelpError = function searchYelpError(error: Object) {
  return {
    type: SEARCH_YELP_ERROR,
    error
  };
};
