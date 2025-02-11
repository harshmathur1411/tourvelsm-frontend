import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import "./Login.css";

const Login = () => {
  const API_URL_LOGIN = `${process.env.REACT_APP_BACKEND_URL}api/auth/login`;
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(API_URL_LOGIN, inputs);
  
      if (response.data && response.data.user) {
        console.log("Login successful:", response.data);
  
        // Update localStorage and Redux
        localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));
        dispatch(login(response.data.user));
  
        setInputs({ email: "", password: "" });
        navigate("/");
      } else {
        alert("Login failed. Email not found.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Failed to sign in. Please check your credentials.");
    }
  };
  

  return (
    <div className="login-form">
      <h1 className="text-center">Login</h1>
      <form onSubmit={submit}>
        <div className="todo-input title mb-3">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="input-title form-control"
            autoComplete="off"
            onChange={change}
            value={inputs.email}
          />
        </div>
        <div className="todo-input body mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="body-input form-control"
            onChange={change}
            value={inputs.password}
          />
        </div>
        <button type="submit" className="btn btn-danger mx-auto">Login</button>
        <div className="d-flex login-links py-4">
          <Link to="/signupform">Create an Account</Link>
          <Link to="/resetpassword">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
