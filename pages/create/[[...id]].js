import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageUpload } from "../../utils/imageUpload";
import { postData, getData, putData } from "../../utils/fetchData";
import { useRouter } from "next/router";

const ProductsManager = () => {
  const auth = useSelector((state) => state.auth);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const initialState = {
    title: "",
    price: 0,
    inStock: 0,
    description: "",
    content: "",
    Category: "",
  };
  const [product, setProduct] = useState(initialState);
  const { title, price, description, content, Category } = product;
  const [images, setImages] = useState([]);
  const [pakageName, setpakageName] = useState("");
  const [pakagePrice, setpakagePrice] = useState("");
  const [PakageArray, setPakageArray] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`product/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
    }
  }, [id]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUploadInput = (e) => {
    // dispatch({type: 'Loading'})
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "Error",
        payload: { error: "Files does not exist." },
      });

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = "The largest image size is 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "Error", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "Error",
        payload: { error: "Select up to 5 images." },
      });
    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== "admin")
      return dispatch({
        type: "Error",
        payload: { error: "Authentication is not valid." },
      });

    if (
      !title ||
      !price ||
      !description ||
      !content ||
      !Category ||
      images.length === 0 ||
      PakageArray.length === 0
    )
      return dispatch({
        type: "Error",
        payload: { error: "Please add all the fields." },
      });

    dispatch({ type: "Loading" });
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "Error", payload: { error: res.err } });
    } else {
      res = await postData(
        "product",
        { ...product, PakageArray, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "Error", payload: { error: res.err } });
    }

    return dispatch({ type: "success", payload: { success: res.msg } });
  };

  const handlePakage = () => {
    if (!pakagePrice || !pakageName)
      return dispatch({
        type: "Error",
        payload: { error: "Please Enter Both fields" },
      });
    let sampleArray = [];
    sampleArray.push({
      pakageName,
      pakagePrice,
    });
    const newArray = PakageArray.concat(sampleArray);
    setPakageArray(newArray);
    setpakageName("");
    setpakagePrice("");
  };

  return (
    <div className="products_manager">
      <Head>
        <title>Products Manager</title>
      </Head>
      <form className="row mx-2 mx-lg-5">
        <div className="col-12 col-md-6">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Skill"
            className="d-block my-4 w-100 p-2"
            onChange={handleChangeInput}
          />

          <div className="row">
            <div className="col-12 ">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={price}
                placeholder="Price"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>

            {/* <div className="col-sm-6">
                            <label htmlFor="price">In Stock</label>
                            <input type="number" name="inStock" value={inStock}
                            placeholder="inStock" className="d-block w-100 p-2"
                            onChange={handleChangeInput} />
                        </div> */}
          </div>

          <textarea
            name="description"
            id="description"
            cols="30"
            rows="4"
            placeholder="Description"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={description}
          />

          <textarea
            name="content"
            id="content"
            cols="30"
            rows="6"
            placeholder="Content"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={content}
          />

          <div className="input-group-prepend px-0 my-2">
            <select
              name="Category"
              id="Category"
              value={Category}
              onChange={handleChangeInput}
              className="custom-select text-capitalize"
            >
              <option value="all">Categories</option>
              {category.Categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {PakageArray.length > 0 && (
            <div className="row">
              {PakageArray.map((value, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col-8">Name = {value.pakageName}</div>
                    <div className="col-4">Price = {value.pakagePrice} </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="row pt-2">
            <div className="col-8">
              <label htmlFor="price">Package Name</label>
              <input
                type="text"
                name="price"
                value={pakageName}
                placeholder="Enter Package Name"
                className="d-block w-100 p-2"
                onChange={(e) => setpakageName(e.target.value)}
              />
            </div>
            <div className="col-4">
              <label htmlFor="price">Package Price</label>
              <input
                type="number"
                name="price"
                value={pakagePrice}
                placeholder="Price"
                className="d-block w-100 p-2"
                onChange={(e) => setpakagePrice(e.target.value)}
              />
            </div>
          </div>
          <div className="row m-2">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handlePakage}
            >
              Add Package
            </button>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-info my-2 px-4"
          >
            {onEdit ? "Update Product" : "Create Product"}
          </button>
        </div>

        <div className="col-12 pb-5 pb-lg-0 col-md-6 my-4">
          <label>Select upto 5 Images Maximum</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Upload</span>
            </div>
            <div className="custom-file border rounded">
              <input
                type="file"
                className="custom-file-input"
                onChange={handleUploadInput}
                multiple
                accept="image/*"
              />
            </div>
          </div>

          <div className="row img-up mx-0">
            {images.map((img, index) => (
              <div key={index} className="file_img my-1">
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt=""
                  className="img-thumbnail rounded"
                />

                <span onClick={() => deleteImage(index)}>X</span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductsManager;
