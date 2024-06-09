import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { passwordReset } from "../utils/APIRoutes";
import "../css/entrypoint.css";

export default function Entrypoint() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "", // Corrected this typo
  });
  const getTokenFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("token");
  };

  const token = getTokenFromUrl();

  useEffect(() => {
    console.log("Token from useParams:", token); // Log token for debugging
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { newPassword, confirmPassword } = values;
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long", toastOptions);
      return;
    }
    if (newPassword !== confirmPassword) {
      // Corrected this typo
      toast.error("Confirm Password does not match", toastOptions);
      return;
    }
    const payload = { token, newPassword };
    console.log("Payload:", payload); // Log payload for debugging
    try {
      const response = await fetch(passwordReset, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === true) {
        toast.success("Password reset successfully", toastOptions);
        navigate("/entrypoint/login"); // Redirect to login page
      } else {
        toast.error(result.error, toastOptions);
      }
    } catch (err) {
      toast.error("Something went wrong, please try again", toastOptions);
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="background-forget-password">
        <div className="container-fluid-forget-password text-left">
          <div className="content-wrapper-forget-password">
            <div className="row">
              <div className="col-12">
                <div className="specter mb-3">Specter</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-container-forget-password">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword" // Corrected this name attribute
                        onChange={handleChange}
                      />
                    </div>
                    <button className="btn-login-signup" type="submit">
                      Save New Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
