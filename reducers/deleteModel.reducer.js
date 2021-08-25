const initState = {
  DeleteCartItem: {},
  DeleteUser: {},
  DeleteCategory:{},
  DeleteProduct:{}
};
const Cart = (state = initState, action) => {
  switch (action.type) {
    case "DELETE_CART_ITEM_ID":
      state = {
        ...state,
        DeleteCartItem: action.payload,
      };  
      break;  
      case "DELETE_USER_ID":
        state = {
          ...state,
          DeleteUser: action.payload,
        };
        break; 
        case "DELETE_CATEGORY_ID":
          state = {
            ...state,
            DeleteCategory: action.payload,
          };
          break;
          case "DELETE_PRODUCT_ID":
            state = {
              ...state,
              DeleteProduct: action.payload,
            };
            break;
  }
  return state;
};
export default Cart;
