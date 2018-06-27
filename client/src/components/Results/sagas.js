import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import type { Saga } from "redux-saga";
import type { searchYelpAction, EventAction, EventValues } from "./types";
import { SEARCH_YELP, SAVE_EVENT } from "./constants";
import {
  searchYelpSuccess,
  searchYelpError,
  saveEventSuccess,
  saveEventError
} from "./actions";

const searchYelpUrl = "/api/search";
const saveEventUrl = "/api/events";

function searchYelpApi(query: string) {
  return axios
    .get(`${searchYelpUrl}${query}`)
    .then(function(response) {
      return response.data.results;
    })
    .catch(function(error) {
      throw error;
    });
}

function saveEventApi(event: EventValues) {
  return axios
    .post(saveEventUrl, event)
    .then(function(response) {
      return response.data.event;
    })
    .catch(function(error) {
      throw error;
    });
}

function* searchYelpFlow(action: searchYelpAction): Saga<void> {
  try {
    yield put(showLoading());
    const response = yield call(
      (searchYelpApi: Function),
      (action.query: string)
    );
    yield put(hideLoading());
    yield put(searchYelpSuccess(response));
  } catch (error) {
    yield put(hideLoading());
    yield put(searchYelpError(error));
  }
}

function* saveEventFlow(action: EventAction): Saga<void> {
  try {
    yield put(showLoading());
    const response = yield call(
      (saveEventApi: Function),
      (action.event: EventValues)
    );
    yield put(hideLoading());
    yield put(saveEventSuccess(response));
  } catch (error) {
    yield put(hideLoading());
    yield put(saveEventError(error));
  }
}

function* searchYelpWatcher(): any {
  yield takeEvery(SEARCH_YELP, searchYelpFlow);
  yield takeEvery(SAVE_EVENT, saveEventFlow);
}

export default searchYelpWatcher;
