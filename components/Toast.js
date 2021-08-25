import React, { useEffect, useState } from "react";
import { clearingErrors } from "../actions";
import { useDispatch, useSelector } from "react-redux";

const Toast = ({ msg, bgColor }) => {
  const dispatch = useDispatch();
  const [addHideClass, setaddHideClass] = useState("show");
  return (
    <div
      className={`toast ${addHideClass} position-fixed text-light ${bgColor}`}
      style={{ top: "5px", right: "5px", zIndex: 9, minWidth: "280px" }}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className={`toast-header ${bgColor} text-light `}>
        <strong className="me-auto text-light">{msg.title}</strong>
        <button
          onClick={() => {
            setaddHideClass("hide"), dispatch(clearingErrors());
          }}
          type="button"
          className="btn-close"
        ></button>
      </div>
      <div className="toast-body">{msg.msg}</div>
    </div>
  );
};

export default Toast;
