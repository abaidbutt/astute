import React, { useState, useEffect } from "react";
import filterSearch from "../utils/filterSearch";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { getData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Filter = ({ state }) => {
  const Category = useSelector((state) => state.category);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();

  const handleCategory = (e) => {
    setCategory(e.target.value);

    filterSearch({ router, category: e.target.value });
  };
  function alertClicked(itemId) {
    setCategory(itemId);
    filterSearch({ router, category: itemId });
  }

  const handleSort = (e) => {
    setSort(e);
    filterSearch({ router, sort: e });
  };

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
  }, [search]);

  return (
    <div className="container-fluid bg-light">
      <div className="row text-center">
        <div className="col-12 text-center ">
          <h5 className="text-left">Search By Skill</h5>
          <form autoComplete="off" className="mt-2  px-0">
            <input
              type="text"
              className="form-control"
              list="title_product"
              placeholder="Search here"
              value={search.toLowerCase()}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="row ">
        {/* <div className="col-12 text-center">
          

          <div className=" px-0 mt-2">
            <select
              className="custom-select text-capitalize"
              value={category}
              onChange={handleCategory}
            >
              <option value="all">All Categories</option>

              {Category.Categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div> */}
        <div className="col-12 text-center">
          <h5 className="text-left">Filter By Categories</h5>
          <div className=" px-0 mt-2">
            <ListGroup>
              {Category.Categories.map((item) => (
                <ListGroup.Item
                  action
                  onClick={() => alertClicked(item._id)}
                  key={item._id}
                  active={category === item._id ? true : false}
                >
                  {item.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
        <div className="col-12 text-center">
          <h5 className="text-left">Sort</h5>
          <div className=" px-0 mt-2">
            <ListGroup horizontal>
              {sorted.map((item) => (
                <ListGroup.Item
                  action
                  onClick={() => handleSort(item.value)}
                  key={item.value}
                  active={sort === item.value ? true : false}
                >
                  {item.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
        <div className="col-12">
          {/* <div className=" px-0 mt-2">
            <select
              className="custom-select text-capitalize dropleft"
              value={sort}
              onChange={handleSort}
            >
              <option value="-createdAt">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="-sold">Best sales</option>
              <option value="-price">Price: Hight-Low</option>
              <option value="price">Price: Low-High</option>
            </select>
          </div> */}
        </div>
      </div>
    </div>
  );
};
const sorted = [
  { name: "Newest", value: "-createdAt" },
  { name: "Oldest", value: "oldest" },
  { name: "Sales", value: "-sold" },
  { name: "High Price", value: "-price" },
  { name: "Low Price", value: "price" },
];

export default Filter;
