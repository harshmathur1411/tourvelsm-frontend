import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>About Us</h3>
          <p>
            We are a travel agency that offers the best travel packages, tips,
            and destinations. Your journey starts with us.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/destinations">Destinations</Link>
            </li>
            <li>
              <Link to="/packages">Packages</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: support@travelagency.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Travel St., City, Country</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Travel Agency. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
