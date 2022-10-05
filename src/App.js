import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from './pages/Chat';
import EntryPoint from './pages/Entrypoint';
import Login from './pages/Login';
import Register from './pages/Register';
import SetAvatar from './pages/SetAvatar';
export default function App() {
  return (
    <>
    <Router>
    <Routes>
    <Route path="/" element={<Chat/>}/>
    <Route path="/entrypoint" element={<EntryPoint/>}>
        <Route path="register" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
         

    </Route>
    <Route path="/setavatar" element={<SetAvatar/>}/>
    </Routes>
    </Router>
    
    
    </>
  )
};
