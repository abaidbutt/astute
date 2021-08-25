import { cartConstants } from "./constants";
import { postData, getData } from "../utils/fetchData";

export const addToCart = ({ SingleProduct, cart }) => {
  return async (dispatch) => {
    const check = cart.every((item) => {
      return item._id !== SingleProduct._id;
    });
    if (!check)
      return dispatch({
        type: "Error",
        payload: {
          error: "The Person has already been added to your bookings.",
        },
      });
      
    if (Object.keys(SingleProduct).length === 0)
      return dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: [...cart],
      });
    return dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: [...cart, { ...SingleProduct }],
    });
  };
};

export const increase = (data, id) => {
  return async (dispatch) => {
    const newData = [...data];
    newData.forEach((item) => {
      if (item._id === id) item.quantity += 1;
    });
    return dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: newData,
    });
  };
};
export const decrease = (data, id) => {
  return async (dispatch) => {
    const newData = [...data];
    newData.forEach((item) => {
      if (item._id === id) item.quantity -= 1;
    });
    return dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: newData,
    });
  };
};

export const deleteCartItem = ({ cart, id }) => {
  return async (dispatch) => {
    const newData = cart.filter((item) => item._id !== id);
    return dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: newData,
    });
  };
};

// export const updateItem = (data, id, post, type) => {
//   const newData = data.map(item => (item._id === id ? post : item))
//   return ({ type, payload: newData})
// }
