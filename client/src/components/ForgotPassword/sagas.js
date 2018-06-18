import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import type { Saga } from "redux-saga";
import type { ForgotPasswordRequest, ForgotPasswordValues } from "./types";
import {
  FORGOT_PASSWORD_REQUESTING,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR
} from "./constants";

const forgotPasswordUrl = "/api/auth/forgot-password";

function forgotPasswordApi(values: ForgotPasswordValues) {
  return axios
    .post(forgotPasswordUrl, values)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

function* forgotPasswordFlow(action: ForgotPasswordRequest): Saga<void> {
  try {
    yield put(showLoading());
    yield call(forgotPasswordApi, action.values);
    yield put(hideLoading());
    yield put({ type: FORGOT_PASSWORD_SUCCESS });
  } catch (error) {
    yield put(hideLoading());
    yield put({ type: FORGOT_PASSWORD_ERROR, error });
  }
}

function* forgotPasswordWatcher(): any {
  yield takeEvery(FORGOT_PASSWORD_REQUESTING, forgotPasswordFlow);
}

export default forgotPasswordWatcher;
