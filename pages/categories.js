import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {updateItem} from '../store/Actions'
import { postData, putData } from "../utils/fetchData";

const Categories = () => {
  const auth = useSelector((state) => state.auth);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const createCategory = async () => {
    if (auth.user.role !== "admin")
      return dispatch({
        type: "Error",
        payload: { error: "Authentication is not vaild." },
      });

    if (!name)
      return dispatch({
        type: "Error",
        payload: { error: "Name can not be left blank." },
      });

    dispatch({ type: "Loading", payload: { loading: true } });

    let res;
    if (id) {
      res = await putData(`categories/${id}`, { name }, auth.token);
      if (res.err)
        return dispatch({ type: "Error", payload: { error: res.err } });
      const newData = category.Categories.map((item) =>
        item._id === id ? res.category : item
      );
      dispatch({ type: "ADD_CATEGORIES", payload: newData });
    } else {
      res = await postData("categories", { name }, auth.token);
      if (res.err)
        return dispatch({ type: "Error", payload: { error: res.err } });
      dispatch({
        type: "ADD_CATEGORIES",
        payload: [...category.Categories, res.newCategory],
      });
    }
    setName("");
    setId("");
    return dispatch({ type: "success", payload: { success: res.msg } });
  };

  const handleEditCategory = (catogory) => {
    setId(catogory._id);
    setName(catogory.name);
  }; 


  return ( 
    <div className="col-md-6 mx-auto my-3">
      <Head>
        <title>Categories</title>
      </Head>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-secondary ml-1" onClick={createCategory}>
          {id ? "Update" : "Create"}
        </button>
      </div>

      {category.Categories.map((catogory) => (
        <div key={catogory._id} className="card my-2 text-capitalize">
          <div className="card-body d-flex justify-content-between">
            {catogory.name}

            <div style={{ cursor: "pointer" }}>
              <i
                className="fas fa-edit mr-2 text-info"
                onClick={() => handleEditCategory(catogory)}
              ></i>

              <i
                className="fas fa-trash-alt text-danger"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() =>
                  dispatch({
                    type: "DELETE_CATEGORY_ID",
                    payload:{id: catogory._id,Case:"DELETE_CATEGORY" },
                  })
                } 
              ></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
