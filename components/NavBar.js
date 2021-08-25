import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { signout } from "../actions";

const NavBar = () => {
  const [nav, setNav] = useState("");
  const opensidebar = (e) => {
    document.getElementById("menu").style.width = "250px";
  };
  const closesidebar = (e) => {
    document.getElementById("menu").style.width = "0px";
  };

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const isActive = (r) => {
    if (r === router.pathname) {
      return "active";
    } else {
      return "";
    }
  };

  const handleLogout = () => {
    dispatch(signout());
  };

  const renderLoggedInMenu = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link href="/cart">
            <a className={"nav-link" + isActive("/art")}>
              <i
                className="fas fa-shopping-cart position-relative"
                aria-hidden="true"
              >
                <span
                  className="position-absolute"
                  style={{
                    padding: "3px 6px",
                    background: "#ed143dc2",
                    borderRadius: "50%",
                    top: "-10px",
                    right: "-10px",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  {cart.cart.length}
                </span>
              </i>{" "}
              Bookings
            </a>
          </Link>
        </li>
        <li className="nav-item ">
          <Link href="/profile">
            <a className={"nav-link " + isActive("/profile")}>
              <img
                className="rounded-circle"
                style={{ height: "26px" }}
                src={auth.user.avatar}
              ></img>
              <span className="p-1">{auth.user.name}</span>
            </a>
          </Link>
        </li>
        <li className="nav-item ">
          <a
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
            className={"nav-link "}
          >
            Logout
          </a>
        </li>
      </ul>
    );
  };
  const renderLoggedInMenuSidebar = () => {
    return (
      <>
        <Link href="/cart">
          <a
            onClick={closesidebar}
            className={"nav-link sidebar-item" + isActive("/art")}
          >
            <i
              className="fas fa-shopping-cart position-relative"
              aria-hidden="true"
            >
              <span
                className="position-absolute"
                style={{
                  padding: "3px 6px",
                  background: "#ed143dc2",
                  borderRadius: "50%",
                  top: "-10px",
                  right: "-10px",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                {cart.cart.length}
              </span>
            </i>{" "}
            Bookings
          </a>
        </Link>

        <Link href="/profile">
          <a
            onClick={closesidebar}
            className={"nav-link sidebar-item" + isActive("/profile")}
          >
            <img
              className="rounded-circle"
              style={{ height: "26px" }}
              src={auth.user.avatar}
            ></img>
            <span className="p-1">{auth.user.name}</span>
          </a>
        </Link>

        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleLogout();
            closesidebar();
          }}
          className={"nav-link sidebar-item"}
        >
          Logout
        </a>
      </>
    );
  };
  const renderNonLoggedInMenu = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link href="/cart">
            <a className={"nav-link" + isActive("/art")}>
              <i
                className="fas fa-shopping-cart position-relative"
                aria-hidden="true"
              >
                <span
                  className="position-absolute"
                  style={{
                    padding: "3px 6px",
                    background: "#ed143dc2",
                    borderRadius: "50%",
                    top: "-10px",
                    right: "-10px",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  {cart.cart.length}
                </span>
              </i>{" "}
              Bookings
            </a>
          </Link>
        </li>
        <li className="nav-item ">
          <Link href="/signin">
            <a className={"nav-link " + isActive("/signin")}>
              <i aria-hidden className="fas fa-user p-1"></i>
              Sign In
            </a>
          </Link>
        </li>
      </ul>
    );
  };
  const renderNonLoggedInMenuSideBar = () => {
    return (
      <>
        <Link href="/cart">
          <a
            onClick={closesidebar}
            className={"nav-link sidebar-item" + isActive("/art")}
          >
            <i
              className="fas fa-shopping-cart position-relative"
              aria-hidden="true"
            >
              <span
                className="position-absolute"
                style={{
                  padding: "3px 6px",
                  background: "#ed143dc2",
                  borderRadius: "50%",
                  top: "-10px",
                  right: "-10px",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                {cart.cart.length}
              </span>
            </i>{" "}
            Bookings
          </a>
        </Link>
        <Link href="/signin">
          <a
            onClick={closesidebar}
            className={"nav-link sidebar-item" + isActive("/signin")}
          >
            <i aria-hidden className="fas fa-user p-1"></i>
            Sign In
          </a>
        </Link>
      </>
    );
  };
  const adminRouter = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ">
          <Link href="/profile">
            <a className={"nav-link " + isActive("/profile")}>
              <img
                className="rounded-circle"
                style={{ height: "26px" }}
                src={auth.user.avatar}
              ></img>
              <span className="p-1">{auth.user.name}</span>
            </a>
          </Link>
        </li>
        {auth.user.root && (
          <li className="nav-item ">
            <Link href="/users">
              <a className={"nav-link " + isActive("/users")}>Users</a>
            </Link>
          </li>
        )}
        <li className="nav-item ">
          <Link href="/create">
            <a className={"nav-link " + isActive("/create")}>Products</a>
          </Link>
        </li>
        <li className="nav-item ">
          <Link href="/categories">
            <a className={"nav-link " + isActive("/categories")}>Categories</a>
          </Link>
        </li>
        <li className="nav-item ">
          <a
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
            className={"nav-link "}
          >
            Logout
          </a>
        </li>
      </ul>
    );
  };
  const adminRouterSidebar = () => {
    return (
      <>
        <Link href="/profile">
          <a
            onClick={closesidebar}
            className={"nav-link sidebar-item" + isActive("/profile")}
          >
            <img
              className="rounded-circle"
              style={{ height: "26px" }}
              src={auth.user.avatar}
            ></img>
            <span className="p-1">{auth.user.name}</span>
          </a>
        </Link>

        <Link href="/users">
          <a
            onClick={closesidebar}
            className={"nav-link sidebar-item" + isActive("/users")}
          >
            Users
          </a>
        </Link>

        <Link href="/create">
          <a
            onClick={closesidebar}
            className={"nav-link sidebar-item" + isActive("/create")}
          >
            Products
          </a>
        </Link>

        <Link href="/categories">
          <a
            onClick={closesidebar}
            className={"nav-link sidebar-item" + isActive("/categories")}
          >
            Categories
          </a>
        </Link>

        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleLogout();
            closesidebar();
          }}
          className={"nav-link sidebar-item"}
        >
          Logout
        </a>
      </>
    );
  };
  const handleScroll = () => {
    // console.log(window.scrollY);
    if (window.scrollY >= 80) {
      setNav("navbar-dark bg-dark");
    }
    if (window.scrollY < 80) {
      setNav("");
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }
  return (
    <nav className={`navbar navbar-expand-sm px-md-4 sticky-top ${nav}`}>
      <Link href="/">
        <img src={"/logos.png"} style={{ height: "55px", cursor: "pointer" }} />
      </Link>
      <button
        className="navbar-toggler "
        type="button"
        data-toggle="collapse"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <div id="mainbox" onClick={opensidebar}>
          &#9776;
        </div>
      </button>
      <div id="menu" className="sidemenu text-center">
        {!auth.authenticate
          ? renderNonLoggedInMenuSideBar()
          : auth.user.role === "admin"
          ? adminRouterSidebar()
          : renderLoggedInMenuSidebar()}

        <a href="#" className="closebtn sidebar-button" onClick={closesidebar}>
          &times;
        </a>
      </div>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        {!auth.authenticate
          ? renderNonLoggedInMenu()
          : auth.user.role === "admin"
          ? adminRouter()
          : renderLoggedInMenu()}
      </div>
    </nav>
  );
};

export default NavBar;
