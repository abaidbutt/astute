import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessages from "../components/ErrorMessage";
import { signup } from "../actions";
import { useRouter } from "next/router";

const register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [confirmpasswordError, setconfirmpasswordError] = useState("");
  const [check, setcheck] = useState(false)
  
  const InitialValues = {
    Name: "",
    email: "",
    password: "",
    reTypePassword: "",
  };
  const ValidationSchema = Yup.object({
    Name: Yup.string().required(),
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is a required field"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    reTypePassword: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const OnSubmit = async (values) => {
    if (values.password !== values.reTypePassword) {
      setconfirmpasswordError(
        "Your password and Confirm Password Doesn't Match"
      );
    } else {
        const userData = {
          Name: values.Name,
          email: values.email,
          password: values.password,
          check
        };
     
  

      setconfirmpasswordError("");
      dispatch(signup(userData)).then(
        (res) => res.type === "success" && router.push("/signin")
      );
    }
  };
  return (
    <div>
      <Head>
        <title>Sign Up Page</title>
      </Head>

      <Formik
        initialValues={InitialValues}
        validationSchema={ValidationSchema}
        onSubmit={OnSubmit}
      >
        <Form
          className="form-signin mx-5 my-4 mx-3 mx-md-auto"
          style={{ maxWidth: "500px" }}
        >
          <div className="row text-center">
            <div className="col-12">
              <h2 className="h3 mb-3 font-weight-normal ">Sign Up</h2>
            </div>
          </div>
          <Field
            type="text"
            className="form-control mb-2"
            placeholder="Name"
            name="Name"
          />

          <ErrorMessage name="Name" component={ErrorMessages} />

          <Field
            type="email"
            className="form-control mb-2"
            placeholder="Email address"
            name="email"
          />

          <ErrorMessage name="email" component={ErrorMessages} />

          <Field
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            name="password"
          />
          <div>
            <ErrorMessage name="password" component={ErrorMessages} />
          </div>
          <Field
            type="password"
            className="form-control mb-2"
            placeholder="Confirm Password"
            name="reTypePassword"
          />
          <div>
            <ErrorMessage name="reTypePassword" component={ErrorMessages} />
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="true" id="flexCheckDefault" onChange={(e) => setcheck(e.target.value)} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Become A Seller
            </label>
          </div>
          <div>
            {confirmpasswordError ? (
              <p style={{ color: "red" }}>{confirmpasswordError}</p>
            ) : null}
          </div>
          <button
            className="btn btn-lg btn-secondary btn-block my-3 "
            type="submit"
          >
            Sign Up
          </button>
          <p className="my-2 pl-0 pl-md-5">
            Already Have An Account?
            <Link href="/signin">
              <a
                style={{
                  color: "crimson",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Login
              </a>
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default register;
