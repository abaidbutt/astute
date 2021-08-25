import { combineReducers } from "redux";

import auth_reducer from "./auth.reducer";
import cart_reducer from "./cart.reducer";
import order_reducer from './order.reducer'
import user_reducer from './user.reducer'
import deleteModel_reducer from './deleteModel.reducer'
import category_reducer from './category.reducer'

const rootReducer = combineReducers({
  auth: auth_reducer,
  cart: cart_reducer,
  order:order_reducer,
  users:user_reducer,
  deleteModel:deleteModel_reducer,
  category:category_reducer
});

export default rootReducer; 
 