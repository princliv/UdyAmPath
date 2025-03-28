import React from "react";
import { Link } from "react-router-dom";
import backgroud from "../assets/background.png"; // Adjust the path as needed

const Recruiter = () => {
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    background: "#f8f9fa",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    height: "50px",
    cursor: "pointer",
  };

  return (
    <div>
      <header style={headerStyle}>
        <Link to="/homepage">
          <img src={backgroud} alt="Logo" style={logoStyle} />
        </Link>
      </header>

      {/* Recruiter Page Content */}
      <div style={{ padding: "20px" }}>
        <h1>Welcome, Recruiter</h1>
        <p>This is the recruiter dashboard.</p>
      </div>
    </div>
  );
};

export default Recruiter;
