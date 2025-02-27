import React, { useState } from "react";
import RecentView from "../components/coursepage/recentView";
import headerBg from '../assets/coursepage/headerbg.png';

const CoursePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Implement search functionality here
    console.log("Searching for:", searchTerm);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      {/* Top Section */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Rectangle */}
        <div style={{ 
          background: "#e4deff", 
          color: "black", 
          padding: "20px", 
          borderRadius: "10px", 
          width: "250px", 
          textAlign: "left" 
        }}>
          <h2>Customized Path to Reduce the Duration of the Specialization</h2>
          <button 
            style={{ 
              marginTop: "10px", 
              padding: "10px 15px", 
              background: "white", 
              color: "#131346", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer" 
            }}
            aria-label="Learn more about specialization"
          >
            Learn More
          </button>
        </div>

        {/* Right Rectangle */}
        <div style={{ 
          backgroundImage: `url(${headerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px", 
          borderRadius: "10px", 
          flex: 1, 
          marginLeft: "20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "30px" }}>
              Get <span style={{ color: "#004aad" }}>Customized</span> Specialization<br /> 
              based on your <span style={{ color: "#004aad" }}>Knowledge</span>
            </h2>
            <input
              type="text"
              placeholder="Search Specialization"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "300px"}}
              aria-label="Search for specialization"
            />
          </div>
          <button 
            style={{ 
              marginTop: "10px", 
              padding: "10px 15px", 
              background: "#004aad", 
              color: "white", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer", 
              width: "100px", 
              float: "right" 
            }}
            onClick={handleSearchSubmit}
            aria-label="Find specialization"
          >
            Find
          </button>
        </div>
      </div>

      {/* Details Section Below */}
      <RecentView />
    </div>
  );
};

export default CoursePage;