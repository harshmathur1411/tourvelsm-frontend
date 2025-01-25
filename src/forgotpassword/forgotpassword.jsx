import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./forgotpassword.css";

const ForgotPassword = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email: inputs.email,
        password: inputs.password,
      });

      if (response.data.success) {
        setMessage("Password successfully updated!");
        setInputs({ email: "", password: "", confirmPassword: "" });
      } else {
        setMessage("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h1 className="text-center">Reset Password</h1>
        <div className="mx-3 mt-4 backtoLogin">
          <Link to="/signin" className="btn-link">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Back to Login
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="form-control"
              value={inputs.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Create New Password"
              className="form-control"
              value={inputs.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              className="form-control"
              value={inputs.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mx-auto">
            Reset Password
          </button>
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
