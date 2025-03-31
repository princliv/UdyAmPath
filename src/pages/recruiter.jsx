import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import logo from "../assets/background.png"; // Adjust the path as needed
import headerBg from "../assets/headerbg.png";
import { signOut } from "firebase/auth";
import RecruiterHome from "../components/recruiter/RecruiterHome";

const Recruiter = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/homepage"))
      .catch((error) => console.error("Logout error:", error));
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Ensures spacing between logo and nav buttons
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

  const navStyle = {
    display: "flex",
    gap: "20px", // Ensures 20px spacing between buttons
    alignItems: "center",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "8px 12px",
    transition: "color 0.3s",
  };

  const logoutButtonStyle = {
    background: "#1d3480",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div>
      <header style={headerStyle}>
        <Link to="/recruiter">
          <img src={logo} alt="Logo" style={logoStyle} />
        </Link>
        <nav style={navStyle}>
          <Link to="/profile" style={linkStyle}>
            Profile
          </Link>
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button> 
        </nav>
      </header>

      {/* Recruiter Page Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
        {/* Top Section */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Rectangle */}
          <div
            style={{
              background: "#e4deff",
              color: "black",
              padding: "20px",
              borderRadius: "10px",
              width: "250px",
              textAlign: "left",
            }}
          >
            <h2>View Application Stats</h2>
            <button
              style={{
                marginTop: "10px",
                padding: "5px",
                background: "white",
                color: "#000000",
                border: "2px solid #000000",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              aria-label="Learn more about specialization"
            >
              View
            </button>
          </div>

          {/* Right Rectangle */}
          <div
            style={{
              backgroundImage: `url(${headerBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              padding: "20px",
              borderRadius: "10px",
              flex: 1,
              marginLeft: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: "30px" }}>
                Secure the <span style={{ color: "#004aad" }}>top</span> talent before 
                <br />
                they're off the <span style={{ color: "#004aad" }}>market!</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Details Section Below */}
        <RecruiterHome/>
      </div>
    </div>
  );
};

export default Recruiter;
