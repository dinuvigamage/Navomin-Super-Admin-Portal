/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { userLogin } from "../apis/user";
import GlobalVars from "../globalVars";
import { useNavigate } from "react-router-dom";
import { ownerLogin } from "../apis/owner";
import { useUser } from "../userContext.jsx"; // Import the useUser hook

const Login = () => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const { user, updateUser, logoutUser } = useUser();

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const userCredentials = {
      Email: email,
      Password: password,
    };

    ownerLogin(userCredentials)
      .then((response) => {
        updateUser(response); // Update the global user state
        if (response) {
          navigate(-1); // Go back to the previous page
        } else {
          navigate("/login"); // Redirect to the home page
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "600px" }}>
        <img
          src="images/Logo.png"
          alt="Logo"
          className="mx-auto mb-3"
          style={{ width: "160px", height: "50px" }}
        />
        <h5 className="text-center mt-2">Welcome to Navomin Super</h5>
        <p className="text-center text-muted">Sign in to place orders...</p>

        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username/Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button onClick={handleLogin} className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-2">
          <a href="#" className="text-decoration-none">
            Forgot Password?
          </a>
        </div>

        <div className="text-center mt-3">
          <small>Not registered yet?</small>{" "}
          <a className="text-primary text-decoration-none">Sign Up</a>
        </div>

        {/* Social Media Login */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <FaGoogle className="text-primary fs-4 cursor-pointer" />
          <FaFacebookF className="text-primary fs-4 cursor-pointer" />
          <FaTwitter className="text-primary fs-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Login;
