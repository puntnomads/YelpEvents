import { all } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import ResultsSaga from "./components/Results/sagas";
import LoginSaga from "./components/Login/sagas";

export default function* IndexSaga(): Saga<void> {
  yield all([ResultsSaga(), LoginSaga()]);
}
