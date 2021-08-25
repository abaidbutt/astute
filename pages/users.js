import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { patchData, postData } from "../utils/fetchData";

const Users = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const ORDER = useSelector((state) => state.order);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();


  if (!auth.user) return null;
  return (
    <div className="table-responsive px-xl-5">
      <Head>
        <title>Users</title>
      </Head>

      <table className="table w-100">
        <thead>
          <tr>
            <th></th>
            <th>Action</th>

            <th>Request To become Seller</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
           
          </tr>
        </thead>

        <tbody>
          {users.Users.map((user, index) => (
            <tr key={user._id} style={{ cursor: "pointer" }}>
              <th>{index + 1}</th>
              <th>
                <Link
                  href={
                    auth.user.root && auth.user.email !== user.email
                      ? `/edit_user/${user._id}`
                      : "#!"
                  }
                >
                  <a>
                    <i className="fas fa-edit text-info mr-2" title="Edit"></i>
                  </a>
                </Link>

                {auth.user.root && auth.user.email !== user.email ? (
                  <i
                    className="fas fa-trash-alt text-danger ml-2"
                    title="Remove"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() =>
                      dispatch({
                        type: "DELETE_USER_ID",
                        payload:{id: user._id,Case:"DELETE_USER" },
                      })
                    } 

                  ></i>
                ) : null
                  }
              </th>
              <th>
              {
                  user.adminRequest ==="true"? (
                    <i className="fas fa-check text-success"> </i>
                  ) : (
                    <i className="fas fa-times text-danger"></i>
                  )
                 }
              </th>
              <th>
                <img
                  src={user.avatar}
                  alt={user.avatar}
                  style={{
                    width: "30px",
                    height: "30px",
                    overflow: "hidden",
                    objectFit: "cover",
                  }}
                />
              </th>
              <th>{user.Name}</th>
              <th>{user.email}</th>
              
              <th>
                {user.role === "admin" ? (
                  user.root ? (
                    <i className="fas fa-check text-success"> Root</i>
                  ) : (
                    <i className="fas fa-check text-success"></i>
                  )
                ) : (
                  <i className="fas fa-times text-danger"></i>
                )}
              </th>
     
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
