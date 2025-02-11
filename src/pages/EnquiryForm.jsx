import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EnquiryForm = () => {
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
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
    
    <div className="container mt-4">
         <Navbar />
         <BannerSection headingText={"Enquiry Form"} />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Enquiry Form</h2>

            {message && <div className="alert alert-info text-center">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Enter your name" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter your email" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="Enter your phone number" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" rows="4" placeholder="Enter your message" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">Submit Enquiry</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
