import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {BiPowerOff} from 'react-icons/bi'

export default function Logout() {
    const navigate = useNavigate();
    const handleClick=()=>{
        localStorage.clear();
        navigate('/entrypoint');
    }
  return (
    <Button onClick={handleClick}>
        <BiPowerOff/>
    </Button>
  )
}
const Button = styled.button`
display:flex;
justify-content:center;
align-items:center;
padding:0.5rem;
background-color:darkgrey;
border:none;
cursor:poiner;
border-radius:0.5rem;
svg{
    font-size:1.5rem;
}

`;
