import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import loader from "../assets/loading.gif"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { Buffer } from 'buffer'
export default function SetAvatar() {

     const api = "https://api.multiavatar.com/4645646";
   // const api = "http://api.multiavatar.com/hard";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 2000,
        pauseonHover: true,
        draggable: true,
        theme: 'dark'
    };

    const setProfilePicture = async () => { 
        if(selectedAvatar === undefined)
        {
            toast.error("Please select one Avatar",toastOptions)
        }
        else{
          const user = await JSON.parse(localStorage.getItem('user'));
          const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
            image: avatars[selectedAvatar],
          });
          if(data.isSet){
            user.isAvatarImageSet=true;
            user.avatarImage=data.image;
            localStorage.setItem('user',JSON.stringify(user));
            navigate('/');
          }else{
            toast.error("Error setting avatar. Please try again",toastOptions);
          }
        }
    }

    useEffect( () => {

        async function fetchData() {
            const data = [];
            for (let i = 0; i < 4; i++) {
                
                const image = await axios.get(`${api}/${Math.round(Math.random() * 10000)}`);
               // const image = await axios.get(`${api}`);
                //console.log("image",image.data);
                const buffer = new Buffer(image.data);

               // console.log(buffer.toString("base64"));
                data.push(buffer.toString("base64"));
            }
            // console.log(data);
            setAvatars(data);
            setIsLoading(false);
        }
        fetchData();

// eslint-disable-next-line 
    }, []);

    return (
        <>
        {
            isLoading?<Container>
                <img src={loader} className="loader" />
            </Container>:
        
            <Container>
                <div className="title-container">
                    <h1>Pick an <span>avatar</span> as your profile picture</h1>
                </div>
                <div className="avatars">                    
                    {avatars.map((avatar, index) => {
                        return (
                            <div key={index} className={`avatar${selectedAvatar === index ? " selected" : ""}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"
                                         onClick={() => setSelectedAvatar(index)}
                                    />
                            </div>
                        );
                    })}
                </div>
                <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
                <ToastContainer />
            </Container>
            }
        </>
    )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background: linear-gradient(to right,#01050B,#011533);
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
      span{
        background: linear-gradient(to right,#f52a4b,#4080f7);  
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid grey;
    }
  }
  .submit-btn {
    padding: 1.2rem;
    margin:1rem 0rem ;
    border-radius: 5rem;
    border: none;
    outline: none;
    background-image: linear-gradient(to right,#F41B3E,#BA549A,#8433DE);
    color:white;
    font-size: 1rem;
    font-weight:500;
    cusrsor-pointer;
    text-transform: uppercase;
  }

  @media screen and (max-width: 600px){
    .title-container {
      h1 {
        color: white;
        font-size:1.5rem;
        span {
          background: linear-gradient(to right,#f52a4b,#4080f7);  
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        }
    }
    .avatars {
      display: flex;
      gap: 1rem;
      .avatar {
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img {
          height: 4rem;
          transition: 0.5s ease-in-out;
        }
      }
      .selected {
        border: 0.3rem solid grey;
      }
    }
    .submit-btn {
      padding: 1.2rem;
      margin:1rem 0rem ;
      border-radius: 5rem;
      border: none;
      outline: none;
      font-size: 0.8rem;
      background-image: linear-gradient(to right,#F41B3E,#BA549A,#8433DE);
      color:white;
      font-weight:500;
      cusrsor-pointer;
      text-transform: uppercase;
    }
  }







  @media screen and (max-width: 450px){
    .title-container {
      text-align:center;
      padding:0.5rem;
      h1 {
        color: white;
        font-size:1.4rem;
        span{
          background: linear-gradient(to right,#f52a4b,#4080f7);  
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        }
    }
    .avatars {
      display: flex;
      gap: 1rem;
      .avatar {
        border: 0.3rem solid transparent;
        padding: 0.3rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img {
          height: 3rem;
          transition: 0.5s ease-in-out;
        }
      }
      .selected {
        border: 0.3rem solid grey;
      }
    }
    .submit-btn {
      padding: 1rem;
      margin:1rem 0rem ;
      border-radius: 5rem;
      border: none;
      outline: none;
      font-size: 0.7rem;
      background-image: linear-gradient(to right,#F41B3E,#BA549A,#8433DE);
      color:white;
      font-weight:500;
      cusrsor-pointer;
      text-transform: uppercase;
    }
  }

`;