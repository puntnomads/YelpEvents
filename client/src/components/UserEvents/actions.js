import {
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_ERROR
} from "./constants";

import type {
  getEventsAction,
  DeleteEventAction,
  EventValues,
  EventAction
} from "./types";

export const getEvents = function getEvents(id: string): getEventsAction {
  return {
    type: GET_EVENTS,
    id
  };
};

export const getEventsSuccess = function getEventsSuccess(
  events: Array<EventValues>
) {
  return {
    type: GET_EVENTS_SUCCESS,
    events
  };
};

export const getEventsError = function getEventsError(error: Object) {
  return {
    type: GET_EVENTS_ERROR,
    error
  };
};

export const deleteEvent = function deleteEvent(
  eventId: string,
  userId: string
): DeleteEventAction {
  return {
    type: DELETE_EVENT,
    eventId,
    userId
  };
};

export const deleteEventSuccess = function deleteEventSuccess(
  event: EventValues
): EventAction {
  return {
    type: DELETE_EVENT_SUCCESS,
    event
  };
};

export const deleteEventError = function deleteEventError(error: Object) {
  return {
    type: DELETE_EVENT_ERROR,
    error
  };
};
