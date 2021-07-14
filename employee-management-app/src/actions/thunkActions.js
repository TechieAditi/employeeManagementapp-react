import store from "../store";
import axios from "axios";
export const dataFetchInitated = () => {
  return {
    type: "DATA_FETCH_INITIATED",
  };
};

export const dataFetchSuccess = (payload) => {
  return {
    type: "DATA_FETCH_SUCCESS",
    payload,
  };
};

export const dataFetchFailure = () => {
  return {
    type: "DATA_FETCH_FAILED",
  };
};

export const fetchDataThunk = () => {
  store.dispatch(dataFetchInitated());
  return function (dispatch, getState) {
    return axios
      .get(`http://dummy.restapiexample.com/api/v1/employees`)
      .then((response) => {
        setTimeout(function () {
          dispatch(dataFetchSuccess(response.data));
        }, 2000);
      })
      .catch((err) => dispatch(dataFetchFailure()));
  };
};
