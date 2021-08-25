import { cartConstants } from "../actions/constants";
const initState = {
  cart: [],
};
const Cart = (state = initState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        cart: action.payload,
      };
      break;
  }
  return state;
};
export default Cart;
