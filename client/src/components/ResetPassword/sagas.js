import { call, put, takeEvery } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import axios from "axios";
import type { Saga } from "redux-saga";
import type { ResetPasswordValues, ResetPasswordRequest } from "./types";
import {
  RESET_PASSWORD_REQUESTING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from "./constants";

const resetPasswordUrl = "/api/auth/reset-password";

function resetPasswordApi(values: ResetPasswordValues) {
  return axios
    .post(`${resetPasswordUrl}/${values.token}`, values)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

function* resetPasswordFlow(action: ResetPasswordRequest): Saga<void> {
  try {
    yield put(showLoading());
    yield call(resetPasswordApi, action.values);
    yield put(hideLoading());
    yield put({ type: RESET_PASSWORD_SUCCESS });
  } catch (error) {
    yield put(hideLoading());
    yield put({ type: RESET_PASSWORD_ERROR, error });
  }
}

function* resetPasswordWatcher(): any {
  yield takeEvery(RESET_PASSWORD_REQUESTING, resetPasswordFlow);
}

export default resetPasswordWatcher;
