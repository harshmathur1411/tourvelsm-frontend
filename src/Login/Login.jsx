import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux"; // Import useDispatch
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice"; // Import login action
import "./Login.css";

const Login = () => {
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch(); // Initialize useDispatch
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...Inputs,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", Inputs);

      if (response.data && response.data.user) {
        console.log("Login successful:", response.data);
        dispatch(login(response.data.user)); // Dispatch login action
        setInputs({
          email: "",
          password: "",
        });
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
    <div>
     
      <div className="login-form">
      <h1 className="text-center">Login</h1>
        <form onSubmit={submit} action="/user" method="POST">
          <div className="todo-input title mb-3">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="input-title form-control"
              autoComplete="off"
              onChange={change}
              value={Inputs.email}
            />
          </div>
          <div className="todo-input body mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="body-input form-control"
              onChange={change}
              value={Inputs.password}
            />
          </div>
          <button type="submit" className="btn btn-danger mx-auto">
            Login
          </button>
          <div className="d-flex login-links py-4">
            <Link to="/signupform">Create an Account</Link>
            <Link to="/resetpassword">forgot Password ?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
