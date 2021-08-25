import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { getData, postData } from "../utils/fetchData";
import { cartConstants } from "../actions/constants";
import { getOrdersInitially } from "../actions";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const Router = useRouter();

  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [pakage, setpakage] = useState("");
  const [value, onChange] = useState(null);
  const [timeSelector, settimeSelector] = useState("");

  const handlePayment = async () => {
    if (!address || !mobile || !pakage || !value || !timeSelector)
      return dispatch({
        type: "Error",
        payload: { error: "Please fill All The fields..." },
      });

    dispatch({ type: "Loading" });

    postData(
      "order",
      {
        address,
        mobile,
        total: pakage,
        dateofBooking: value,
        timeOfBooking: timeSelector,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "Error", payload: { error: res.err } });
      dispatch({ type: "ADD_TO_CART_SUCCESS", payload: [] });
      dispatch(getOrdersInitially(auth.token));
      dispatch({
        type: "success",
        payload: { success: res.msg },
      });
      return Router.push(`/order/${res.newOrder._id}`);
    });
  };

  if (cart.cart.length === 0)
    return (
      <div className="col-12 text-center text-secondary  my-3">
        <h2 className="text-uppercase">There Are No Bookings...</h2>
      </div>
    );
  return (
    <div className="row mx-1 mx-md-5">
      <Head>
        <title>Bookings Page</title>
      </Head>

      <div className="col-md-8 text-secondary table-responsive my-3">
        <h2 className="text-uppercase">Bookings</h2>

        <table className="table my-3">
          <tbody>
            {cart.cart.map((item) => (
              <tr>
                <td style={{ width: "100px", overflow: "hidden" }}>
                  <img
                    src={item.images[0].url}
                    alt={item.images[0].url}
                    className="img-thumbnail w-100"
                    style={{ minWidth: "80px", height: "80px" }}
                  />
                </td>

                <td style={{ minWidth: "100px" }} className=" align-middle">
                  <h5 className="text-capitalize text-secondary">
                    <Link href={`/product/${item._id}`}>
                      <a
                        className="text-secondary"
                        style={{ textDecoration: "none" }}
                      >
                        {item.title}
                      </a>
                    </Link>
                  </h5>

                  <h6 className="text-danger">Rs {item.price}</h6>
                  {/* {item.inStock > 0 ? (
                  <p className="mb-1 text-danger">In Stock: {item.inStock}</p>
                ) : (
                  <p className="mb-1 text-danger">Out Stock</p>
                )} */}
                </td>

                <td className="align-middle" style={{ minWidth: "240px" }}>
                  <div className="input-group-prepend px-0 my-2">
                    <select
                      name="Category"
                      id="Category"
                      value={pakage}
                      onChange={(e) => setpakage(e.target.value)}
                      className="custom-select text-capitalize"
                    >
                      <option value="all">Select suitable Package</option>
                      {item.pakages.map((item, index) => (
                        <option key={index} value={item.pakagePrice}>
                          {item.pakageName}
                        </option>
                      ))}
                    </select>
                  </div>{" "}
                </td>

                <td
                  className="align-middle"
                  style={{ minWidth: "50px", cursor: "pointer" }}
                >
                  <i
                    className="far fa-trash-alt text-danger"
                    aria-hidden="true"
                    style={{ fontSize: "18px" }}
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() =>
                      dispatch({
                        type: "DELETE_CART_ITEM_ID",
                        payload: { id: item._id, Case: "DELETE_CART_ITEM" },
                      })
                    }
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-md-4 my-3 text-right text-uppercase text-secondary border-primary outline-2">
        <form>
          <h4>Enter Details before you Apply for booking</h4>

          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            className="form-control mb-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="mobile">Mobile</label>
          <input
            type="number"
            name="mobile"
            id="mobile"
            className="form-control mb-2"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <div className="">
            <label>Select Day of Booking</label>
            <DatePicker
              onChange={(date) => onChange(date)}
              value={value}
              minDate={new Date()}
              className="form-control mb-2"
            />
          </div>
          <label>Select Time of Booking</label>

          <select
            value={timeSelector}
            onChange={(e) => settimeSelector(e.target.value)}
            className="form-control"
          >
            <option value="all">Select Time</option>
            <option value="9:00 am">9:00 am</option>
            <option value="10:00 am">10:00 am</option>
            <option value="11:00 am">11:00 am</option>
            <option value="12:00 pm">12:00 pm</option>
            <option value="1:00 pm">1:00 pm</option>
            <option value="2:00 pm">2:00 pm</option>
            <option value="3:00 pm">3:00 pm</option>
            <option value="4:00 pm">4:00 pm</option>
            <option value="5:00 pm">5:00 pm</option>
            <option value="6:00 pm">6:00 pm</option>
          </select>
        </form>

        <h3 className="pt-2">
          Total:{" "}
          {pakage ? (
            <span className="text-danger">Rs {pakage}</span>
          ) : (
            <span className="text-danger">
              {" "}
              Select A package to See Your Total cost
            </span>
          )}
        </h3>
        {auth.authenticate ? (
          <Link href={"#!"}>
            <a className="btn btn-dark my-2" onClick={handlePayment}>
              Proceed for Booking
            </a>
          </Link>
        ) : (
          <Link href={"/signin"}>
            <a className="btn btn-danger my-2">Login To Continue</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default cart;
