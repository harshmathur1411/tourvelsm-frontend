import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DestinationList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle search
  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/destination/destinations/search?name=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle view details
  const handleViewDetails = (id) => {
    navigate(`/destination-details/${id}`); // Navigate to the details page with the ID
  };

  return (
    <div className="search-body-inner">
      <input
        type="text"
        placeholder="Search for a destination..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px" }}>
        Search
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {results.length > 0 ? (
            results.map((destination) => (
              <div key={destination._id} style={{ marginBottom: "10px" }}>
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <img
                  src={destination.image}
                  alt={destination.name}
                  style={{
                    width: "200px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <button
                  className="btn view-detail"
                  onClick={() => handleViewDetails(destination._id)} // Pass the ID to the handler
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No destinations found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DestinationList;
