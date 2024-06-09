import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyEmail } from "../utils/APIRoutes";

//import styled from "styled-components";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
export default function ForgetPassword() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseonHover: true,
    draggable: true,
    theme: "dark",
  };
  const query = useQuery();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  useEffect(() => {
    console.log("useEffect executed (component mounted)");
    const emailFromQuery = query.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [query]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      // API request
      console.log("inside handleValidation");

      let data = await fetch(verifyEmail, {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();

      if (data.status === false) {
        toast.error(data.error, toastOptions);
      } else if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.newUser));
        navigate(`/`);
        toast.success("OTP Verified Successfully.", toastOptions);
        console.log(data);
        // You can add navigation to the next step here if needed
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "otp") {
      setOtp(value);
    }
  };

  const handleValidation = () => {
    console.log("inside handleValidation");
    if (otp.length < 1) {
      toast.error("OTP is required", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div className="container mt-16">
      <div className="forget-password-heading mb-3">Verify your email</div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label mt-3">
            Enter OTP
          </label>
          <input
            type="text"
            className="form-control"
            name="otp"
            value={otp}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <button className="btn-login-signup" type="submit">
          Verify
        </button>
        <Link to="/entrypoint/register">
          {" "}
          <div className="forget-btn  text-center">
            Go back to home sign up page
          </div>{" "}
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
}
