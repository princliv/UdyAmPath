import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InternApply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {};

  if (!job) {
    navigate("/");
    return null;
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#ffffff",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      borderRadius: "16px",
      fontFamily: "Segoe UI, sans-serif"
    }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "600",
        marginBottom: "25px",
        color: "#3F92C3"
      }}>
        Apply for {job.title} at {job.company}
      </h2>

      <form>
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Full Name</label>
          <input type="text" required placeholder="Your full name" style={inputStyle} />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Email Address</label>
          <input type="email" required placeholder="you@example.com" style={inputStyle} />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Resume (PDF)</label>
          <input type="file" accept=".pdf" required style={inputStyle} />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Why are you interested in this internship?</label>
          <textarea rows="4" required placeholder="Write your reason here..." style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <button type="submit" style={{
          backgroundColor: "#3F92C3",
          color: "#fff",
          padding: "12px 20px",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          width: "100%",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          transition: "0.2s ease"
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#196795"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#3F92C3"}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "600",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  fontFamily: "inherit",
  backgroundColor: "#f9f9f9",
  outline: "none",
  boxSizing: "border-box"
};

export default InternApply;
