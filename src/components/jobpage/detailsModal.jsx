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
        width: "600px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header Section */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid #eee",
        paddingBottom: "10px",
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={job.logo} alt={job.company} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
          <div>
            <h2 style={{ margin: 0 }}>{job.title}</h2>
            <p style={{ margin: 0, color: "gray" }}>{job.company}</p>
          </div>
        </div>
        <button onClick={onClose} style={{ border: "none", background: "none", fontSize: "18px", cursor: "pointer" }}>✕</button>
      </div>

      {/* Job Details */}
      <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
        <div>
          <p><strong>Location:</strong> {job.location.join(", ")}</p>
          <p><strong>Experience:</strong> {job.experience}</p>
          <p><strong>Salary:</strong> <span style={{ color: "#196795", fontWeight: "bold" }}>{job.salary}</span></p>
          <p><strong>Posted:</strong> {job.date}</p>
        </div>
        <div style={{
          backgroundColor: "#f8f9fa",
          padding: "15px",
          borderRadius: "10px",
          textAlign: "center",
        }}>
          <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>{job.salary}</p>
          <p style={{ margin: "5px 0", fontSize: "14px", color: "gray" }}>Avg. Salary</p>
          <button style={{
            backgroundColor: "#196795",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>Apply for this job</button>
        </div>
      </div>

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
