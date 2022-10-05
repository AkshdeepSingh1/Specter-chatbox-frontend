import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import ChatContainer from '../components/ChatContainer';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import { fetchAllContacts, host } from '../utils/APIRoutes'
import { io } from "socket.io-client"
import Logout from '../components/Logout';
export default function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)

  const [newVisibilityOfContacts, setNewVisibilityOfContacts] = useState(true)
  //var contacts = [];
  // const CurrentUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();


  // useEffect(()=>{
  //  console.log(JSON.parse(localStorage.getItem('user')))
  //    setCurrentUser(JSON.parse(localStorage.getItem('user')));
  // },[contacts])

  useEffect(() => {
    var fun = async () => {
      if (!localStorage.getItem('user')) {
        navigate('/entrypoint/login');
      }
      else {
        // console.log('user setting')
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
      }
    }
    fun();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      // console.log('socket.id',socket.id);
      socket.current.emit("add-user", currentUser._id);
    }
    //console.log('socket.id',socket.id)
  }, [currentUser])


  useEffect(() => {
    var fetchcontact = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          let result = await fetch(`${fetchAllContacts}/${currentUser._id}`, {
            method: 'get',
            headers: {
              'Content-Type': "application/json"
            }
          });
          result = await result.json();
          //console.log(result);
          // eslint-disable-next-line
          setContacts(result)
          //console.log(contacts);
        } else {
          navigate('/setAvatar');
        }
      }

    }
    fetchcontact();
    // eslint-disable-next-line
  }, [currentUser])

  // console.log("this is final currentUser",currentUser,contacts)

  const handleChatChange = (chat,visibilityOfContacts) => {
     console.log("visibility",visibilityOfContacts)
     setNewVisibilityOfContacts(visibilityOfContacts)
    setCurrentChat(chat);
  }

  const getVisibility = (visibilityFromChatContainer)=>{
    setNewVisibilityOfContacts(visibilityFromChatContainer)
  }
  return (
    <>
      {currentUser && contacts && (<Container>


        <div className="container-fluid text-center">

          <div className={`headnav ${newVisibilityOfContacts?"visible":"not-visible"}`}>
            <div className="left-side">Specter</div>
            <div className="right-side">
              <div className='user-details'>

                <div className="avatar">
                  <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar"
                  />
                </div>
                <div className="username">
                  {currentUser.username}
                </div>

              </div>
              <Logout />
            </div>


          </div>
          <div className="row">
            <div className={`col-4 chatcol1 ${newVisibilityOfContacts?"visible":"not-visible"}`}>
              <div className="inside-chatcol1">
                <Contacts Contacts={contacts} CurrentUser={currentUser} changeChat={handleChatChange} />
              </div>
            </div>
            <div className={`col-8 chatcol2 ${newVisibilityOfContacts?"not-visible":"visible"}`}>
              <div className="inside-chatcol2">
                {!currentChat ? (<Welcome currentUser={currentUser} />) :
                  (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} getVisibility={getVisibility} />)
                }
              </div>
            </div>
          </div>
        </div>

















      </Container>)}
    </>
  )
}
const Container = styled.div`
background: linear-gradient(to right,#01050B,#011533);
width: 100vw;
height: 100vh;
.headnav{
  color:darkgoldenrod;
  height: 7vh;
  display:flex;
  justify-content:space-between;
  padding:1rem;
  .left-side{
    height:inherit;
    background: linear-gradient(to right,#eb2747,#5283cc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size:1.8rem;
    margin-left:2rem;
  }
  .right-side{
    padding: 0 2rem;
    height:inherit;
  display:flex;
  .user-details{
    height:inherit;
    display:flex;
    align-items:center;
    .username{
      align-items:center;
      color:white;
      padding: 0 1rem;
   }
   .avatar{
    align-items:center;
       img{
           height:2rem;
       }
   }
   
  }


  }
  }
  .chatcol1{
    background-color: transparent;
    height: 93vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.inside-chatcol1{
  height: 85vh;
  width: 85%;
  background-color: transparent;
  border-radius: 1rem;

}
.chatcol2{
  background-color: transparent;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inside-chatcol2{
  height: 85vh;
  width: 90%;
  background-color: #111528;
  border-radius: 1rem;
}



@media screen and (max-width: 545px) {
  .not-visible{
    display:none;
  }
  /* //////////////////////left column */
  // .chatcol1  {display: none;
      
  // }
  .chatcol1{
    width: 100%;
    padding:0px;
  }
.chatcol2{
  width: 100%;
 padding:0px;
      .inside-chatcol2{
        height: 100%;
        width: 100%;
        background-color: darkgray;
        border-radius: 1rem;
      }
}



  /* ////////////////////////righ column */
 

 
}

`;