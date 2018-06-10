import { call, put, takeEvery } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import axios from "axios";
//import history from "../../history";
import type { Saga } from "redux-saga";
import type {
  LoginRequest,
  ConfirmUserEmailRequest,
  LoginValues,
  TokenValues
} from "./types";
import {
  LOGIN_REQUESTING,
  GOOGLE_LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CONFIRM_USER_EMAIL_REQUESTING
} from "./constants";
import { setUser } from "../User/actions";

const loginUrl = "/api/auth/login";
const googleLoginUrl = "/api/auth/google";
const confirmUserEmailUrl = "/api/auth/confirmation";

function loginApi(values: LoginValues) {
  return axios
    .post(loginUrl, values)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

function googleLoginApi(values) {
  const options = {
    method: "POST",
    body: values
  };
  return fetch(googleLoginUrl, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      throw error;
    });
}

function confirmUserEmailApi(values: TokenValues) {
  return axios
    .post(confirmUserEmailUrl, values)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

function* loginFlow(action: LoginRequest): Saga<void> {
  try {
    yield put(showLoading());
    const response = yield call(loginApi, action.values);
    yield put(hideLoading());
    yield put(setUser(response));
    yield put({ type: LOGIN_SUCCESS });
    //history.push("/");
  } catch (error) {
    yield put(hideLoading());
    yield put({ type: LOGIN_ERROR, error });
  }
}

function* googleLoginFlow(action): Saga<void> {
  try {
    yield put(showLoading());
    const response = yield call(googleLoginApi, action.values);
    yield put(hideLoading());
    yield put(setUser(response));
    yield put({ type: LOGIN_SUCCESS });
    //history.push("/");
  } catch (error) {
    yield put(hideLoading());
    yield put({ type: LOGIN_ERROR, error });
  }
}

function* confirmUserEmailFlow(action: ConfirmUserEmailRequest): Saga<void> {
  try {
    yield put(showLoading());
    yield call(confirmUserEmailApi, action.values);
    yield put(hideLoading());
  } catch (error) {
    yield put(hideLoading());
  }
}

function* loginWatcher(): any {
  yield takeEvery(LOGIN_REQUESTING, loginFlow);
  yield takeEvery(GOOGLE_LOGIN_REQUESTING, googleLoginFlow);
  yield takeEvery(CONFIRM_USER_EMAIL_REQUESTING, confirmUserEmailFlow);
}

export default loginWatcher;
