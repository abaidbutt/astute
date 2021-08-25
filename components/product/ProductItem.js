import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { addToCart } from "../../actions";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const AUTH = useSelector((state) => state.auth);

  const handleAddToCart = (SingleProduct) => {
    const payload = {
      SingleProduct,
      cart: cart.cart,
    };
    dispatch(addToCart(payload));
  };

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            View
          </a>
        </Link>
        <button
          className="btn btn-success"
          style={{ marginLeft: "5px", flex: 1 }}
          disabled={cart.cart.length === 1 ? true : false}
          onClick={() => handleAddToCart(product)}
        >
          Book Now
        </button>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        {/* <Link href={`create/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            Edit
          </a>
        </Link> */}
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px", flex: 1 }}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "DELETE_PRODUCT_ID",
              payload: { id: product._id, Case: "DELETE_PRODUCT" },
            })
          }
        >
          Delete
        </button>
      </>
    );
  };
  if (!AUTH.user) return null;
  return (
    <>
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              // className="card-img-top"
              src={product.images[0].url}
              alt={product.images[0].url}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card" style={{ width: "18rem" }}>
        {/* {
                auth.user && auth.user.role === 'admin' &&
                <input type="checkbox" checked={product.checked}
                className="position-absolute"
                style={{height: '20px', width: '20px'}}
                onChange={() => handleCheck(product._id)} />
            } */}
        <img
          className="card-img-top"
          src={product.images[0].url}
          alt={product.images[0].url}
        />
        <div className="card-body">
          <h5 className="card-title text-capitalize" title={product.title}>
            {product.title}
          </h5>

          <div className="row justify-content-between mx-0">
            <h6 className="text-danger px-0">Rs {product.price}</h6>
            {/* {product.inStock > 0 ? (
            <h6 className="text-danger">In Stock: {product.inStock}</h6>
          ) : (
            <h6 className="text-danger">Out Stock</h6>
          )} */}
          </div>

          <p className="card-text" title={product.description}>
            {product.description}
          </p>

          <div className="row justify-content-between mx-0">
            {!AUTH.user || AUTH.user.role !== "admin"
              ? userLink()
              : adminLink()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
