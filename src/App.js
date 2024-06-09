import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import EntryPoint from "./pages/Entrypoint";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import ForgetPasswordRequest from "./pages/ForgetPasswordRequest";
import MultiFactorAuthentication from "./pages/MultiFactorAuthentication";
import ForgetPassword from "./pages/ForgetPassword";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/entrypoint" element={<EntryPoint />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route
              path="forgetPasswordRequest"
              element={<ForgetPasswordRequest />}
            />
            <Route
              path="multiFactorAuthentication"
              element={<MultiFactorAuthentication />}
            />
          </Route>
          <Route path="/setavatar" element={<SetAvatar />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </>
  );
}
