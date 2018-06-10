import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import type { Saga } from "redux-saga";
import type { SignUpRequest, Values } from "./types";
import {
  SIGN_UP_REQUESTING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from "./constants";

const signupUrl = "/api/auth/signup";

function signUpApi(values: Values) {
  return axios
    .post(signupUrl, values)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      throw error;
    });
}

function* signUpFlow(action: SignUpRequest): Saga<void> {
  try {
    yield put(showLoading());
    const response = yield call(signUpApi, action.values);
    yield put(hideLoading());
    yield put({ type: SIGN_UP_SUCCESS, response });
  } catch (error) {
    yield put(hideLoading());
    yield put({ type: SIGN_UP_ERROR, error });
  }
}

function* signUpWatcher(): any {
  yield takeEvery(SIGN_UP_REQUESTING, signUpFlow);
}

export default signUpWatcher;
