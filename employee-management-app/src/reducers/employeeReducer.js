import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  data: [],
  emp : {}
};

export default createReducer(initialState, {
  DATA_FETCH_INITIATED: (state) => ({ ...state, status: "loading" }),
  DATA_FETCHEMP_INITIATED: (state) => ({ ...state, status: "loadingEmployee" }),
  DATA_FETCH_SUCCESS: (state, action) => ({ ...state, ...action.payload }),
  DATA_FETCH_FAILED: (state) => ({ ...state, ...initialState }),
  RECEIVE_API_DATA: (state, action) => ({ ...state, emp:action.emp}),
});
