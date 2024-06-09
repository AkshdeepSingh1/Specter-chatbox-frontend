import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { requestPasswordReset } from '../utils/APIRoutes';

//import styled from "styled-components";
export default function ForgetPassword() {
  const navigate = useNavigate();
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 2000,
    pauseonHover: true,
    draggable: true,
    theme: 'dark'
  };
  const [values, setValues] = useState({
    email: ""
  })
  useEffect(() => {
    console.log("useEffect executed (component mounted)")

  }, [])

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [])
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      //api request

      const { email } = values;
      console.log('inside handlevalidation');

      let data = await fetch(requestPasswordReset, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      data = await data.json();

      if (data.status === false) {
        toast.error(data.error, toastOptions)
      }
      if (data.status === true) {
        toast.success("Email Sent Successfully.", toastOptions);
        console.log(data);
      }

    }
  }
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  const handleValidation = () => {
    const { email } = values;
    console.log('inside handlevalidation');
    if (email.length < 1) {
      toast.error("User name and password required", toastOptions);
      return false;
    }
    return true;
  }

  return (


    <div className='container mt-16'>
        <div className='forget-password-heading mb-3'>Forgot your Password?</div>
      <form onSubmit={(event) => { handleSubmit(event) }}>
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label mt-3">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={(e) => { handleChange(e) }} />
        </div>
        <button className='btn-login-signup' type="submit">Send Forget Password Email</button>
        <Link to="/entrypoint/login"> <div className='forget-btn  text-center'>Go back to home log in page</div> </Link>
      </form>
      <ToastContainer />
    </div>
  )
}
