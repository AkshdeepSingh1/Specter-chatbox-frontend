import React from 'react'
import styled from 'styled-components'
import welcomegif from '../assets/welcomegif.gif'
export default function Welcome({currentUser}) {
  return (
<Container>
    <img src={welcomegif} alt="WelcomeGif"></img>
</Container>
  )
  }
  const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  height:100%;
  img{
    height:80vh;
  }
 
  @media screen and (max-width:950px){
  img{
    height:50vh;
  }
  }
  `;