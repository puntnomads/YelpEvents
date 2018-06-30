import { all } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import ResultsSaga from "./components/Results/sagas";
import LoginSaga from "./components/Login/sagas";
import ForgotPasswordSaga from "./components/ForgotPassword/sagas";
import ResetPasswordSaga from "./components/ResetPassword/sagas";
import SignUpSaga from "./components/SignUp/sagas";
import UserEventsSaga from "./components/UserEvents/sagas";
import AutoCompleteSaga from "./components/Lib/AutoComplete/sagas";

export default function* IndexSaga(): Saga<void> {
  yield all([
    ResultsSaga(),
    LoginSaga(),
    ForgotPasswordSaga(),
    ResetPasswordSaga(),
    SignUpSaga(),
    UserEventsSaga(),
    AutoCompleteSaga()
  ]);
}
