import { all } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import ResultsSaga from "./components/Results/sagas";

export default function* IndexSaga(): Saga<void> {
  yield all([ResultsSaga()]);
}
