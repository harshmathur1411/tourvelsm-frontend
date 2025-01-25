import React, { useState, useEffect } from "react";

const PopularPackages = () => {
  const [listings, setListings] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); // Show 4 items initially
  const [newPackage, setNewPackage] = useState({
    image: "",
    title: "",
    price: "",
    day: "",
  });

  // Fetch listings from the backend
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/packages");
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

  // Handle input change for new package form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPackage((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new package to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPackage),
      });
      const newListing = await response.json();
      setListings((prev) => [...prev, newListing]); // Add the new listing to the list
      setNewPackage({ image: "", title: "", price: "", day: "" }); // Reset form
    } catch (error) {
      console.error("Error adding listing:", error);
    }
  };

  // Handle Load More button
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4); // Load 4 more items
  };

  return (
    <div>
      <section className="package-list heading-title">
        <h2>Popular Packages</h2>
        <div className="listings-container container">
          {listings.slice(0, visibleCount).map((listing) => (
            <div key={listing.id} className="listing-item">
              <div className="image-container">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="listing-image"
                />
                <div className="box-body">
                  <h3>{listing.title}</h3>
                  <span>
                    {listing.price} / {listing.day}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Show "Load More" button only if there are more items to display */}
        {visibleCount < listings.length && (
          <div className="view-all-container">
            <button
              onClick={handleLoadMore}
              className="btn btn-primary view-all-button"
            >
              View All Packages
            </button>
          </div>
        )}
      </section>

      {/* Form to add a new package */}
      <section className="add-package">
        <h3>Add New Package</h3>
        <form onSubmit={handleSubmit} className="add-package-form">
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newPackage.image}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Package Title"
            value={newPackage.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newPackage.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="day"
            placeholder="Duration (e.g., 3 Days, 2 Nights)"
            value={newPackage.day}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-success">
            Add Package
          </button>
        </form>
      </section>
    </div>
  );
};

export default PopularPackages;
