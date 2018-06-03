import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import type { Saga } from "redux-saga";
import type { searchYelpAction } from "./types";
import { SEARCH_YELP } from "./constants";
import { searchYelpSuccess, searchYelpError } from "./actions";

const searchYelpUrl = "/api/search";

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

function* searchYelpWatcher(): any {
  yield takeEvery(SEARCH_YELP, searchYelpFlow);
}

export default searchYelpWatcher;
