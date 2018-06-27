import {
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_ERROR
} from "./constants";

import type { EventsState } from "./types";

type State = EventsState;

const initialState = {
  events: [],
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
    case GET_EVENTS:
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

    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.events,
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

    case GET_EVENTS_ERROR:
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

    case DELETE_EVENT:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: "deleting event in the API",
            time: new Date()
          }
        ],
        errors: []
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        event: action.event,
        requesting: false,
        successful: true,
        messages: [
          {
            body: `successfully deleted event from the API.`,
            time: new Date()
          }
        ],
        errors: []
      };

    case DELETE_EVENT_ERROR:
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
