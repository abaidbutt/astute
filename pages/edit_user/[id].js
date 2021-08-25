import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { patchData, postData } from "../../utils/fetchData";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const ORDER = useSelector((state) => state.order);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [editUser, setEditUser] = useState([]);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    users.Users.forEach((user) => {
      if (user._id === id) {
        setEditUser(user);
        setCheckAdmin(user.role === "admin" ? true : false);
      }
    });
  }, [users]);

  const handleCheck = () => {
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  const handleSubmit = () => {
    let role = checkAdmin ? "admin" : "user";
    if (num % 2 !== 0) {
      dispatch({ type: "Loading" });
      patchData(`user/${editUser._id}`, { role }, auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "Error", payload: { error: res.err } });

        const newData = users.Users.map((item) =>
          item._id === editUser._id
            ? {
                ...editUser,
                role, 
                adminRequest:"false"
              }
            : item
        );
         dispatch({ type: "INITIAL_USERS", payload: newData });

        return dispatch({type: 'success', payload: {success: res.msg}})
      });
    }
  };

  return (
    <div className="edit_user my-3">
      <Head>
        <title>Edit User</title>
      </Head>

      <div>
        <button className="btn ml-5 btn-dark" onClick={() => router.back()}>
          <i className="fas fa-long-arrow-alt-left" aria-hidden></i> Go Back
        </button>
      </div>

      <div className=" col-md-4 pl-5 pl-md-0 mx-auto my-4">
        <h2 className="text-uppercase text-secondary">Edit User</h2>

        <div className="form-group">
          <label htmlFor="name" className="d-block">
            Name
          </label>
          <input type="text" id="name" defaultValue={editUser.Name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="d-block">
            Email
          </label>
          <input
            type="text"
            id="email"
            defaultValue={editUser.email}
            disabled
          />
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            id="isAdmin"
            checked={checkAdmin}
            style={{ width: "20px", height: "20px" }}
            onChange={handleCheck}
          />

          <label
            htmlFor="isAdmin"
            style={{ transform: "translate(4px, -3px)" }}
          >
            isAdmin
          </label>
        </div>

        <button className="btn btn-dark" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditUser;
