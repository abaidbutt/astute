import { postData, getData } from "../utils/fetchData";

export const getOrdersInitially = (token) => {
  return async (dispatch) => {
    getData("order", token).then((res) => {
      if (res.err)
        return dispatch({ type: "Error", payload: { error: res.err } });
      return dispatch({ type: "INITIAL_ORDERS", payload: res.orders });
    });
  };
};

