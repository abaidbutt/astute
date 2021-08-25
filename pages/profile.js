import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { patchData } from "../utils/fetchData";
import valid from "../utils/valid";
import { imageUpload } from "../utils/imageUpload";

const profile = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const order = useSelector(state => state.order)
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [cf_password, setcf_password] = useState("");
  const [avatar, setavatar] = useState("");

  useEffect(() => {
    if (auth.user) setname(auth.user.name);
  }, [auth.user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password !== "" || cf_password !== "") {
      if (password !== cf_password) {
        return dispatch({
          type: "Error",
          payload: { error: "Password and Confirm Password don't match" },
        });
      }
      const errMsg = valid(name, auth.user.email, password);
      if (errMsg)
        return dispatch({ type: "Error", payload: { error: errMsg } });
      dispatch({ type: "Loading" });
      patchData("user/resetPassword", { password }, auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "Error", payload: { error: res.err } });
        setpassword("");
        setcf_password("");
        return dispatch({ type: "success", payload: { success: res.msg } });
      });
    }

    if (name !== auth.user.name || avatar) updateInfor();
  };

  const updateInfor = async () => {
    let media;
    dispatch({ type: "Loading" });
    if (avatar) media = await imageUpload([avatar]);
    patchData(
      "user",
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "Error", payload: { error: res.err } });

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });

      return dispatch({ type: "success", payload: { success: res.msg } });
    });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file)
      return dispatch({
        type: "Error",
        payload: { error: "File does not exist." },
      });

    if (file.size > 1024 * 1024)
      //1mb
      return dispatch({
        type: "Error",
        payload: { error: "The largest image size is 1mb." },
      });

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      //1mb
      return dispatch({
        type: "Error",
        payload: { error: "Image format is incorrect." },
      });
    setavatar(file);
    // setData({...data, avatar: file})
  };

  if (!auth.user) return null;
  return (
    <div className="profile_page px-5">
      <Head>
        <title>Profile</title>
      </Head>

      <section className="row text-secondary my-3">
        <div className="col-md-4">
          <h3 className="text-center text-uppercase">
            {auth.user.role === "user" ? "User Profile" : "Admin Profile"}
          </h3>

          <div className="avatar">
            <img
              src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
              alt="avatar"
            />
            <span>
              <i aria-hidden className="fas fa-camera"></i>
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                onChange={changeAvatar}
              />
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              placeholder="Your name"
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              defaultValue={auth.user.email}
              className="form-control"
              disabled={true}
              onChange={() => {}}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              value={password}
              className="form-control"
              placeholder="Your new password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cf_password">Confirm New Password</label>
            <input
              type="password"
              name="cf_password"
              value={cf_password}
              className="form-control"
              placeholder="Confirm new password"
              onChange={(e) => setcf_password(e.target.value)}
            />
          </div>

          <button
            className="btn btn-info"
            disabled={auth.loading}
            onClick={handleUpdateProfile}
          >
            Update
          </button>
        </div>

        <div className="col-md-8">
          <h3 className="text-uppercase">Bookings</h3>

          <div className="my-3 table-responsive">
            <table
              className="table-bordered table-hover w-100 text-uppercase"
              style={{ minWidth: "600px", cursor: "pointer" }}
            >
              <thead className="bg-light font-weight-bold">
                <tr>
                  <td className="p-2">id</td>
                  <td className="p-2">Total</td>
                  <td className="p-2">Date of Booking</td>
                  <td className="p-2">Time Of Booking</td>
                  <td className="p-2">Approved</td>
                </tr>
              </thead>

              <tbody>
                {order.orders.map((order) => (
                  <tr key={order._id}>
                    <td className="p-2">
                      <Link href={`/order/${order._id}`}>
                        <a>{order._id}</a>
                      </Link>
                    </td>
                    <td className="p-2">
                    Rs {order.total}
                    </td>
                    <td className="p-2">
                      {new Date(order.dateofBooking).toLocaleDateString()}
                    </td>
                    <td className="p-2">{order.timeOfBooking}</td>
                    <td className="p-2">
                      {order.Accepted ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
               
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default profile;
