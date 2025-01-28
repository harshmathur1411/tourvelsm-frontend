import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../store/authSlice";
import DestinationList from "../components/Destination/DestinationList";

const Navbar = () => {
  const API_URL_DESTINATION = `${process.env.REACT_APP_BACKEND_URL}api/destination/destinations`;
  const user = useSelector((state) => state.auth.user); // Get user from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch destinations from the API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(API_URL_DESTINATION);
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/signin");
  };

  const handleDestinationSelect = (event) => {
    const destinationId = event.target.value;
    if (destinationId) {
      navigate(`/destination-details/${destinationId}`);
    }
  };

  return (
    <div>
      <div className={`d-flex top-bar ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="navbar">
            <ul className="navbar-ul">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/blog">Blogs</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
              <li>
                <div className="navbar-dropdown">
                  <select
                    className="destination-select"
                    onChange={handleDestinationSelect}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a Destination
                    </option>
                    {destinations.map((destination) => (
                      <option key={destination._id} value={destination._id}>
                        {destination.name}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
            </ul>
            {/* Destination Dropdown */}
          </div>
        </div>
        <div className="search-box">
          <button
            type="button"
            className="btn search-button"
            data-bs-toggle="offcanvas"
            data-bs-target="#searchbar-box"
          >
            <FontAwesomeIcon
              icon={faSearch}
              style={{ color: "#fff", fontSize: "18px" }}
            />
          </button>
        </div>
        <div>
          <div className="dropdown user-opt">
            <button
              type="button"
              className="btn dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ color: "#fff", fontSize: "24px" }}
              />
            </button>
            <ul className="dropdown-menu">
              {user ? (
                <>
                  <li className="navbar-item">
                    <span>Welcome, {user.username}!</span>
                  </li>
                  <li className="navbar-item">
                    <button onClick={handleLogout} className="btn">
                      <FontAwesomeIcon icon={faSignOutAlt} color="#2e4c82" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="navbar-item">
                  <i>Hello Guest !</i>
                  <div>
                    <FontAwesomeIcon icon={faSignInAlt} color="#2e4c82" />
                    <button onClick={() => navigate("/Signin")} className="btn">
                      Login
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-top" id="searchbar-box">
        <div className="offcanvas-header text-center">
          <h1 className="offcanvas-title">Where do you want to go?</h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <DestinationList />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
