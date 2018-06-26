import {
  SEARCH_YELP,
  SEARCH_YELP_SUCCESS,
  SEARCH_YELP_ERROR,
  SAVE_EVENT,
  SAVE_EVENT_SUCCESS,
  SAVE_EVENT_ERROR
} from "./constants";
import type { searchYelpAction, EventValues, EventAction } from "./types";

export const searchYelp = function searchYelp(query: string): searchYelpAction {
  return {
    type: SEARCH_YELP,
    query
  };
};

export const searchYelpSuccess = function searchYelpSuccess(
  results: Array<EventValues>
) {
  return {
    type: SEARCH_YELP_SUCCESS,
    results
  };
};

export const searchYelpError = function searchYelpError(error: Object) {
  return {
    type: SEARCH_YELP_ERROR,
    error
  };
};

export const saveEvent = function saveEvent(event: EventValues): EventAction {
  return {
    type: SAVE_EVENT,
    event
  };
};

export const saveEventSuccess = function saveEventSuccess(
  event: EventValues
): EventAction {
  return {
    type: SAVE_EVENT_SUCCESS,
    event
  };
};

export const saveEventError = function saveEventError(error: Object) {
  return {
    type: SAVE_EVENT_ERROR,
    error
  };
};
