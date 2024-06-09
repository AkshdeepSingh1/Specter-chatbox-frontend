import React ,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createUserRoute } from '../utils/APIRoutes';

//import styled from "styled-components";
export default function Register() {
   const navigate = useNavigate();
   useEffect(() => {
    console.log("useEffect executed (component mounted)")
    
  }, [])
   useEffect(()=>{
    if(localStorage.getItem('user'))
    {
      navigate('/');
    }
    // eslint-disable-next-line
  },[])


    const toastOptions ={
        position:'bottom-right',
        autoClose:2000,
        pauseonHover:true,
        draggable:true,
        theme:'dark'
     };
    const [values, setValues] = useState({
        username : "",
        email:"",
        password:""
    })
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            //api request
        
            const {username,email,password}=values;
         console.log('inside handlevalidation');

           let data = await fetch(createUserRoute,{
            method:'POST',
            body:JSON.stringify({username,email,password}),
            headers:{
              'Content-Type':'application/json'
             }
           })
           data = await data.json();

           if(data.status===false)
           {
            toast.error(data.error,toastOptions)
           }
          if(data.status === true)
          {
            //localStorage.setItem('user',JSON.stringify(data.newUser))
            navigate(`/entrypoint/multiFactorAuthentication?email=${encodeURIComponent(email)}`);
            console.log(data);
          }
         
        }
    }
    const handleChange = (event)=>{
        setValues({...values,[event.target.name]:event.target.value})
    }
    const handleValidation =()=>{
     const {username,password}=values;
     if(password.length<8)
     {
     toast.error("Password length should be atleast 8 characters",toastOptions);
     return false;
    }
    if(username.length<=3)
     {
     toast.error("User name length should be atleast 3 characters",toastOptions);
     return false;
    }
    return true;
}

  return (
    <div className='container'>
    <form onSubmit={(event)=>{handleSubmit(event)}}>
    <div className="mb-3 my-4">
    <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
    <input 
    type="text" 
    className="form-control" 
    name="username"
    onChange={(e)=>{handleChange(e)}}
    />
  </div>
  <div className="mb-3 my-4">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input 
    type="email" 
    className="form-control" 
    name="email"
    onChange={(e)=>{handleChange(e)}}
    />
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input 
    type="password" 
    className="form-control" 
    name="password"
    onChange={(e)=>{handleChange(e)}}
    /></div>
  <button className='btn-login-signup' type="submit">Sign up</button>
</form>
    <ToastContainer/>
    </div>
  )
}
