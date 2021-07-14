
export default (state = {}, { type, emp }) => {
  console.log(emp);
  console.log("action",type)
  switch (type) {
    case "RECEIVE_API_DATA":
      return emp ;
    default:
      return state;
  }
};
