import { all, fork } from "redux-saga/effects";

import * as employeeSagas from "./EmployeeSagas";

export default function* rootSaga() {
  yield all([...Object.values(employeeSagas)].map(fork));
}
