const initState = {
  orders: [],
};
const Order = (state = initState, action) => {
  switch (action.type) {
    case 'INITIAL_ORDERS':
      state = {
        ...state,
        orders: action.payload,
      };
      break;

  } 
  return state;
};
export default Order;
