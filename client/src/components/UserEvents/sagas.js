import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import type { Saga } from "redux-saga";
import type { getEventsAction, DeleteEventAction, EventValues } from "./types";
import { GET_EVENTS, DELETE_EVENT } from "./constants";
import {
  getEventsSuccess,
  getEventsError,
  deleteEventSuccess,
  deleteEventError
} from "./actions";

const getEventsUrl = "/api/events";
const deleteEventUrl = "/api/events";

function getEventsApi(id: string) {
  return axios
    .get(`${getEventsUrl}/${id}`)
    .then(function(response) {
      return response.data.events;
    })
    .catch(function(error) {
      throw error;
    });
}

function deleteEventApi(eventId: string, userId: string) {
  return axios
    .delete(`${deleteEventUrl}?e=${eventId}&u=${userId}`)
    .then(function(response) {
      return response.data.event;
    })
    .catch(function(error) {
      throw error;
    });
}

function* getEventsFlow(action: getEventsAction): Saga<void> {
  try {
    yield put(showLoading());
    const response = yield call((getEventsApi: Function), (action.id: string));
    yield put(hideLoading());
    yield put(getEventsSuccess(response));
  } catch (error) {
    yield put(hideLoading());
    yield put(getEventsError(error));
  }
}

function* deleteEventFlow(action: DeleteEventAction): Saga<void> {
  try {
    yield put(showLoading());
    const response = yield call(
      (deleteEventApi: Function),
      (action.eventId: string),
      (action.userId: string)
    );
    yield put(hideLoading());
    yield put(deleteEventSuccess(response));
  } catch (error) {
    yield put(hideLoading());
    yield put(deleteEventError(error));
  }
}

function* getEventsWatcher(): any {
  yield takeEvery(GET_EVENTS, getEventsFlow);
  yield takeEvery(DELETE_EVENT, deleteEventFlow);
}

export default getEventsWatcher;
