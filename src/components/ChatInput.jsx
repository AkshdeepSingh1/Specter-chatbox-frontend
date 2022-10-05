import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'

import { BsEmojiSmileFill } from 'react-icons/bs'
export default function ChatInput({ handleSendMessage }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg, setMsg] = useState("")

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiClick = (event, emoji) => {
    console.log(emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  }

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg('');
    }
  }
  return (
    <Container>

      <form className='input-container' onSubmit={(e) => { sendChat(e) }}>
        <input type="text" placeholder='type your message here' value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button className='submit'>
          <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
align-items: center;
background-color: #111528;
padding: 0 0.2rem;
.input-container{
height:3rem;
width: 100%;
  display: flex;
  background: linear-gradient(#0C1122, #0C1122) padding-box,
  linear-gradient(45deg, #FF1067, #6F27FD) border-box;
border: 1px solid transparent;
border-radius: 2rem;
background-color: transparent;
color:grey;
align-items: center;
outline: none;
}
&&focus {
box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%);
}
  

  input{
    width: 90%;
    height: 60%;
    background-color: transparent;
    color: white;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;
    
    &::selection {
      background-color: #9a86f3;
    }
    &:focus {
      outline: none;
    }
  }
  button{
    padding: 0.1rem 0.5rem;
    margin-left:auto;
    border-radius: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right,#ff4388,#eb66c1,#ad5df8);
    color:white;
    border: none;
    height:100%;
    svg {
      font-size: 2rem;
      color: white;
    }
  }
}


`;
