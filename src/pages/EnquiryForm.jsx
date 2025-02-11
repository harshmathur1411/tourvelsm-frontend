import React, { useState } from "react";

const EnquiryForm = ({ placeId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const API_URL = `${process.env.REACT_APP_BACKEND_URL}api/enquiries`;
      const response = await fetch(API_URL , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, placeId }),
      });

      const data = await response.json();
      setMessage(data.message);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setMessage("Failed to submit enquiry. Please try again.");
    }
  };

  return (
    <div>
      <h2>Enquiry Form</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone" required />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required></textarea>
        <button type="submit">Submit Enquiry</button>
      </form>
    </div>
  );
};

export default EnquiryForm;
