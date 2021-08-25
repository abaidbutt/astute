import { useEffect, useRef, useContext } from "react";
import { patchData, postData } from "../utils/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getOrdersInitially } from "../actions";

const PaypalBtn = ({ order }) => {
  const refPaypalBtn = useRef();
  const ORDER = useSelector((state) => state.order);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    paypal
      .Buttons({
        style: {
          shape: "rect",
          color: "gold",
          layout: "vertical",
          label: "paypal",
        },

        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{ amount: { value: order.total } }],
          });
        },

        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            patchData(`order/payment/${order._id}`, {
              paymentId: details.payer.payer_id
            }, auth.token).then(
              (res) => {
                if (res.err)
                  return dispatch({
                    type: "NOTIFY",
                    payload: { error: res.err },
                  });
       
                const newData = ORDER.orders.map((item) =>
                  item._id === order._id
                    ? {
                        ...order,
                        paid: true,
                        dateOfPayment: details.create_time,
                        paymentId: details.payer.payer_id,
                        method: "Paypal",
                      }
                    : item
                );
                return dispatch({ type: "INITIAL_ORDERS", payload: newData });

              }
            );
            // alert(
            //   "Transaction completed by " + details.payer.name.given_name + "!"
            // );
          });
        },

        onError: function (err) {
          console.log(err);
        },
      })
      .render(refPaypalBtn.current);
  }, []);

  return <div ref={refPaypalBtn}></div>;
};

export default PaypalBtn;
