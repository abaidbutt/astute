import Head from "next/head";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import OrderDetail from "../../components/OrderDetail";
import { getOrderDetail } from "../../actions";

const DetailOrder = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);
  const router = useRouter(); 
  const dispatch = useDispatch();

  const [orderDetail, setOrderDetail] = useState([])
console.log(orderDetail)
  useEffect(() => {
      const newArr = order.orders.filter(order => order._id === router.query.id)
      setOrderDetail(newArr)
  },[order])
          
  if (!auth.user) return null; 
  return (
    <div className="my-3 mx-1 mx-md-5">
      <Head>
        <title>Detail Orders</title>
      </Head>

      <div>
        <button className="btn btn-dark" onClick={() => router.back()}>
          <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i> Go
          Back
        </button>
      </div>

      <OrderDetail orderDetail={orderDetail} />
    </div>
  );
};

export default DetailOrder;
