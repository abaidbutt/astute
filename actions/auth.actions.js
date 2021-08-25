import Cookie from "js-cookie";

import {
  authConstants,
  reset_password,
  userContants,
  UpdaetNew_password, 
} from "./constants";
import { postData, getData } from "../utils/fetchData";
import router from "next/router";


export const login = (userData) => {
  return async (dispatch) => {
    dispatch({ type: "Loading", payload: { loading: true } });
    const res = await postData("auth/login", userData);
    if (res.err)
      return dispatch({ type: "Error", payload: { error: res.err } });
    dispatch({ type: "success", payload: { success: res.msg } });

    dispatch({
      type: "AUTH",
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });

    localStorage.setItem("firstLogin", true);
  };
};

export const signup = (userData) => {
  return async (dispatch) => { 
    dispatch({ type: "Loading" });
    const res = await postData("auth/register", userData);
    if (res.err)
      return dispatch({ type: "Error", payload: { error: res.err } });
    return dispatch({ type: "success", payload: { success: res.msg } });
  };
};
export const isUserLogedIn = () => {
  return async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");
        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }

    // getData('categories').then(res => {
    //     if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

    //     dispatch({
    //         type: "ADD_CATEGORIES",
    //         payload: res.categories
    //     })
    // })
  };
};

export const signout = () => {
  return async (dispatch) => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "logout", payload: { success: "Logged out!" } });
    router.push('/')
    return router.reload('/');
  };
};

export const clearingErrors = (userData) => {
  return async (dispatch) => {
    dispatch({ type: "ClearingErrors" });

  };
};
export const Reset_password = (email) => {
  return async (dispatch) => {
    dispatch({ type: reset_password.RESET_PASSWORD_REQUEST });
    const res = await axiosInstance.post("/reset-password", { email });
    console.log(res.data.message);
    if (res.status === 201) {
      dispatch({
        type: reset_password.RESET_PASSWORD_SUCCESS,
        payload: { message: res.data.message },
      });
    }
    // } else {
    //   dispatch({
    //     type: userContants.USER_REGISTER_FAILURE,
    //     payload: { error: res.data.message },
    //   });
    // }
  };
};
export const UpdateNew_password = (info) => {
  return async (dispatch) => {
    dispatch({ type: UpdaetNew_password.UPDATE_NEW_PASSWORD_REQUEST });
    const res = await axiosInstance.post("/new-password", info);
    console.log(res);
    if (res.status === 201) {
      dispatch({
        type: UpdaetNew_password.UPDATE_NEW_PASSWORD_SUCCESS,
        payload: { message: res.data.message },
      });
    }
    // } else {
    //   dispatch({
    //     type: userContants.USER_REGISTER_FAILURE,
    //     payload: { error: res.data.message },
    //   });
    // }
  };
};
