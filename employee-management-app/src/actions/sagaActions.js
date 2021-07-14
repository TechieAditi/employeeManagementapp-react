export const receiveApiData = (emp) => { return {type: "RECEIVE_API_DATA", emp, }; };
export const handlerClicked = () => {
  return {
    type: "HANDLER_CLICKED",
  };
};
export const handlerCardClicked= (emp_id) => {
  return {
    type: "HANDLER_CARD_CLICKED",
    emp_id
    
  };
};


export const dataFetchInitated = () => {
  return {
    type: "DATA_FETCH_INITIATED",
  };
};
export const dataFetchEmpInitated = () => {
  return {
    type: "DATA_FETCHEMP_INITIATED",
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
