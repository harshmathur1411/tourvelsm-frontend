import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BannerSection from "../Banner";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/blogs"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-container">
      <Navbar />
      <BannerSection headingText={"Blogs"} />
  
      {loading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="blog-grid p-5">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <img
                src={blog.image}
                alt={blog.title}
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
              />
              <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{blog.title}</h3>
              <p style={{ fontSize: "14px", color: "#555" }}>
                {blog.content.slice(0, 100)}...
              </p>
              <button
                style={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 15px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
                onClick={() => alert(`Read more about: ${blog.title}`)}
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
