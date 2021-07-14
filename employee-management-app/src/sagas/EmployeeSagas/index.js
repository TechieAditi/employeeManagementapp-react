import { put, takeLatest,all, call, delay } from "redux-saga/effects";
import {
  dataFetchInitated,
  dataFetchFailure,
  dataFetchSuccess,
  receiveApiData,
  dataFetchEmpInitated
} from "../../actions/sagaActions";
import axios from "axios";

function* handleDataFetchSaga(action) {
  try {
    yield put(dataFetchInitated());

    const response = yield call(
      axios.get,
      `http://dummy.restapiexample.com/api/v1/employees`
    );
    yield delay(2000);
    yield put(dataFetchSuccess(response.data));
    console.log("data",response.data)
  } catch (error) {
    yield put(dataFetchFailure());
  }
}
function* handleDataFetchEmployee(action) {
  for(let i=0;i<5;i++){
  try {
    yield put(dataFetchEmpInitated());
    const response = yield call(
      axios.get,
      `http://dummy.restapiexample.com/api/v1/employee/${action.emp_id}`
    );
    yield delay(2000);
    console.log("fetched",response.data)
  
    yield put(receiveApiData(response.data));
    yield put(dataFetchSuccess({status:""}));
  } catch (error) {
    if(i<4) yield delay(500);
    else
    yield put(dataFetchFailure());
  }
}
}


// eslint-disable-next-line import/prefer-default-export
export function* watchForHandleDataFetch() {
  
  yield all([
    takeLatest("HANDLER_CLICKED",handleDataFetchSaga),
    takeLatest("HANDLER_CARD_CLICKED",handleDataFetchEmployee)
  ])
}
