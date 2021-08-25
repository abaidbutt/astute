import Link from "next/link";
import PaypalBtn from "./paypalBtn";
import { useDispatch, useSelector } from "react-redux";
import { patchData, postData } from "../utils/fetchData";

const OrderDetail = ({ orderDetail }) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const ORDER = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const handleDelivered = (order) => {
    dispatch({ type: "Loading", payload: { loading: true } });

    patchData(`order/delivered/${order._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "Error", payload: { error: res.err } });
      dispatch({
        type: "success",
        payload: { success: "Order Has Been Marked As Delievered" },
      });

      const { Accepted } = res.result;

      const newData = ORDER.orders.map((item) =>
        item._id === order._id
          ? {
              ...order,
              Accepted,
            }
          : item
      );
      return dispatch({ type: "INITIAL_ORDERS", payload: newData });
    });
  };

  if (!auth.user) return null;
  return (
    <>
      {orderDetail.map((order) => (
        <div key={order._id} style={{ margin: "20px auto" }} className="row ">
          <div className="col-12 col-lg-8">
            <div className="text-uppercase my-3" style={{ maxWidth: "600px" }}>
              <h3 className="text-break">Order Id {order._id}</h3>

              <div className="mt-4 text-secondary">
                <p>Name: {order.user.Name}</p>
                <p>Email: {order.user.email}</p>
                <p>Address: {order.address}</p>
                <p>Mobile: {order.mobile}</p>
                <p>
                  Booking Date:{" "}
                  {new Date(order.dateofBooking).toLocaleDateString()}
                </p>
                <p>Booking Time: {order.timeOfBooking}</p>
                <p>Total Cost: {order.total}</p>

                <div
                  className={`alert ${
                    order.Accepted ? "alert-success" : "alert-danger"
                  }
                        d-flex justify-content-between align-items-center`}
                  role="alert"
                >
                  {order.Accepted
                    ? "Booking Approved You Will Contacted Soon"
                    : "Your Booking is in processing"}
                  {auth.user.role === "admin" && !order.Accepted && (
                    <button
                      className="btn btn-dark text-uppercase"
                      onClick={() => handleDelivered(order)}
                    >
                      Mark as Approved
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderDetail;
