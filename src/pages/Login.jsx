import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

//import styled from "styled-components";
export default function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseonHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    console.log("useEffect executed (component mounted)");
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      //api request

      const { email, password } = values;
      console.log("inside handlevalidation");

      let data = await fetch(loginRoute, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();

      if (data.status === false) {
        toast.error(data.error, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.existingUser));
        navigate("/");
        console.log(data);
      }
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { email, password } = values;
    console.log("inside handlevalidation");
    if (email.length < 1) {
      toast.error("User name and password required", toastOptions);
      return false;
    }
    if (password.length < 1) {
      toast.error("User name and password required", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div className="container">
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <Link to="/entrypoint/forgetPasswordRequest">
          {" "}
          <div className="forget-btn">Forget Password?</div>{" "}
        </Link>
        <button className="btn-login-signup" type="submit">
          Log in
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
