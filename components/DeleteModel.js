import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCartItem, deleteUser } from "../actions";
import { deleteData } from "../utils/fetchData";

const DeleteModel = () => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const users = useSelector((state) => state.users);
  const category = useSelector((state) => state.category);
  const deleteModel = useSelector((state) => state.deleteModel);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = () => {
    if (deleteModel.DeleteCartItem.Case === "DELETE_CART_ITEM") {
      const data = {
        cart: cart.cart,
        id: deleteModel.DeleteCartItem.id,
      };
      dispatch(deleteCartItem(data));
    }

    if (deleteModel.DeleteUser.Case === "DELETE_USER") {
      deleteData(`user/${deleteModel.DeleteUser.id}`, auth.token).then(
        (res) => {
          if (res.err)
            return dispatch({ type: "Error", payload: { error: res.err } });
          return dispatch({ type: "success", payload: { success: res.msg } });
        }
      );
      const data = {
        users: users.Users,
        id: deleteModel.DeleteUser.id,
      };
      dispatch(deleteUser(data));
      dispatch({ type: "ADD_MODAL", payload: {} });
    }

    if (deleteModel.DeleteCategory.Case === "DELETE_CATEGORY") {
      deleteData(
        `categories/${deleteModel.DeleteCategory.id}`,
        auth.token
      ).then((res) => {
        if (res.err)
          return dispatch({ type: "Error", payload: { error: res.err } });
        dispatch({ type: "success", payload: { success: res.msg } });
        const newData = category.Categories.filter(
          (item) => item._id !== deleteModel.DeleteCategory.id
        );
        return dispatch({ type: "ADD_CATEGORIES", payload: newData });
      });
    }

    if (deleteModel.DeleteProduct.Case === "DELETE_PRODUCT") {
      dispatch({ type: "Loading" });
      deleteData(`product/${deleteModel.DeleteProduct.id}`, auth.token).then(
        (res) => {
          if (res.err)
            return dispatch({ type: "Error", payload: { error: res.err } });
          router.reload("/");
          return dispatch({ type: "success", payload: { success: res.msg } });
        }
      );
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Do you want to delete this item?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleSubmit}
            >
              Yes
            </button>
            <button
              type="button"
              data-dismiss="modal"
              className="btn btn-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
