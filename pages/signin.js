import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessages from "../components/ErrorMessage";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {login} from '../actions'

const signin = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const router = useRouter();


  const InitialValues = {
    email: "",
    password: "",
  };
  const ValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is a required field"),
    password: Yup.string()
      .required("No password provided.")
    
  });

  const OnSubmit = async (values) => {
    const userData = {
      email: values.email,
      password: values.password,
    };
   dispatch(login(userData))
  };

  useEffect(() => {
    if(auth.authenticate) router.push("/")
  }, [auth])
  return (
    <div>
      <Head>
        <title>Login Page</title>
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
              <h2 className="h3 mb-3 font-weight-normal ">Login</h2>
            </div>
          </div>

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

          <button
            className="btn btn-lg btn-secondary btn-block my-3 "
            type="submit"
          >
            Sign In
          </button>
          <p className="my-2 pl-4 pl-md-5">
            You Don't Have An Account?
            <Link href="/register">
              <a
                style={{
                  color: "crimson",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Register
              </a>
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default signin;
