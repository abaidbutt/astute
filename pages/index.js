import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../utils/fetchData";
import ProductItem from "../components/product/ProductItem";
import Home from "../components/Home";
import ContactUs from "../components/ContactUs";
import filterSearch from "../utils/filterSearch";
import Filter from "../components/Filter";
import { useRouter } from "next/router";
import { Container, Col, Row } from "react-bootstrap";
const index = (props) => {
  const [products, setProducts] = useState(props.products);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <Home />
      <div className="container-fluid bg-light pt-5">
        <div className="row text-center">
          <div className="col-md-4 text-center">
            <Filter />
          </div>
          <div className="col-md-8 text-center">
            <div
              className="products bg-light pt-0 mt-0 pb-0 mb-0"
              id="productScrollId"
            >
              {products.length === 0 ? (
                <h2 className="text-center">No Products</h2>
              ) : (
                products.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {props.result < page * 8 ? (
        ""
      ) : (
        <div className="container-fluid bg-light">
          <div className="row text-center">
            <div className="col-12 text-center">
              <button
                className="btn btn-outline-info mb-4"
                onClick={handleLoadmore}
              >
                Load more
              </button>
            </div>
          </div>
        </div>
      )}
      <ContactUs />
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `product?limit=${
      page * 8
    }&category=${category}&sort=${sort}&title=${search}`
  );
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}
export default index;
