import Layout from "../components/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store";
import Notify from "../components/Notify";

import { createContext, useReducer, useEffect } from "react";
import { getData } from "../utils/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { isUserLogedIn, addToCart } from "../actions";
import { getOrdersInitially } from "../actions/order.action";
import DeleteModel from "../components/DeleteModel";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(isUserLogedIn());

    const cart_items = JSON.parse(localStorage.getItem("Cart__Items"));
    const payload = {
      SingleProduct: {},
      cart: cart_items,
    };
    if (cart_items) dispatch(addToCart(payload));
  }, []);

  useEffect(() => {
    localStorage.setItem("Cart__Items", JSON.stringify(cart.cart));
  }, [cart]);

  useEffect(() => {
    if (auth.token) dispatch(getOrdersInitially(auth.token));
    if (auth.user && auth.user.role === "admin") {
      getData("user", auth.token).then((res) => {
        res.err
          ? dispatch({ type: "Error", payload: { error: res.err } })
          : dispatch({ type: "INITIAL_USERS", payload: res.users });
      });
    }
    getData("categories").then((res) => {
      res.err
        ? dispatch({ type: "Error", payload: { error: res.err } })
        : dispatch({ type: "ADD_CATEGORIES", payload: res.categories });
    });
  }, [auth.token]);

  return (
    <Provider store={store}>
      <div>
        <Layout>
          <Notify />
          <DeleteModel />
          <Component {...pageProps} />
        </Layout>
      </div>
    </Provider>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);
