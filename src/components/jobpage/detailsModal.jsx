import React from "react";

const DetailsModal = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        zIndex: 1000,
        width: "500px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header Section */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <img src={job.logo} alt={job.company} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
        <div>
          <h2 style={{ margin: 0 }}>{job.title}</h2>
          <p style={{ margin: 0, color: "gray" }}>{job.company}</p>
        </div>
      </div>

      {/* Job Details */}
      <p><strong>Location:</strong> {job.location.join(", ")}</p>
      <p><strong>Experience:</strong> {job.experience}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Date:</strong> {job.date}</p>
      <button style={{
        backgroundColor: "#196795",
        color: "white",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}>Apply Now</button>

      {/* Key Responsibilities */}
      <h3 style={{ marginTop: "20px" }}>Key Responsibilities:</h3>
      <ul>
        {job.key_responsibilities.map((resp, index) => (
          <li key={index}>{resp}</li>
        ))}
      </ul>

      {/* Skills Required */}
      <h3>Skill(s) Required:</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {job.skills_required.map((skill, index) => (
          <span key={index} style={{
            backgroundColor: "#e7ddcd",
            padding: "8px 12px",
            borderRadius: "20px",
            fontSize: "14px",
          }}>{skill}</span>
        ))}
      </div>

      {/* Close Button */}
      <button onClick={onClose} style={{
        marginTop: "20px",
        backgroundColor: "#ccc",
        border: "none",
        padding: "8px 12px",
        cursor: "pointer",
        borderRadius: "5px"
      }}>Close</button>
    </div>
  );
};

export default DetailsModal;