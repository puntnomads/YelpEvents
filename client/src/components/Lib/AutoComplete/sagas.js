import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import type { Saga } from "redux-saga";
import type { searchGooglePlacesAction } from "./types";
import { SEARCH_GOOGLE_PLACES } from "./constants";
import { searchGooglePlacesSuccess, searchGooglePlacesError } from "./actions";

const searchGooglePlacesUrl = "/api/places";

function searchGooglePlacesApi(input: string) {
  return axios
    .get(`${searchGooglePlacesUrl}?place=${input}`)
    .then(function(response) {
      return response.data.results;
    })
    .catch(function(error) {
      throw error;
    });
}

function* searchGooglePlacesFlow(action: searchGooglePlacesAction): Saga<void> {
  try {
    yield put(showLoading());
    const response = yield call(
      (searchGooglePlacesApi: Function),
      (action.input: string)
    );
    yield put(hideLoading());
    yield put(searchGooglePlacesSuccess(response));
  } catch (error) {
    yield put(hideLoading());
    yield put(searchGooglePlacesError(error));
  }
}

function* searchGooglePlacesWatcher(): any {
  yield takeEvery(SEARCH_GOOGLE_PLACES, searchGooglePlacesFlow);
}

export default searchGooglePlacesWatcher;
