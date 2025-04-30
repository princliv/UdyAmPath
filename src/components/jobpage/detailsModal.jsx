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
        backgroundColor: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        zIndex: 1000,
        width: "580px",
        fontFamily: "Arial, sans-serif",
        maxHeight: "90vh",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        paddingBottom: "12px",
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={job.logo} alt={job.company} style={{ width: "50px", height: "50px", marginRight: "12px", borderRadius: "8px" }} />
          <div>
            <h2 style={{ margin: 0, fontSize: "20px" }}>{job.title}</h2>
            <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>{job.company}</p>
          </div>
        </div>
        <button onClick={onClose} style={{
          border: "none",
          background: "none",
          fontSize: "22px",
          color: "#777",
          cursor: "pointer",
        }}>✕</button>
      </div>

      {/* Job Details */}
      <div style={{ marginTop: "20px" }}>
        <p style={{ margin: "6px 0" }}><strong>Location:</strong> {job.location.join(", ")}</p>
        <p style={{ margin: "6px 0" }}><strong>Experience:</strong> {job.experience}</p>
        <p style={{ margin: "6px 0" }}><strong>Salary Offered:</strong> <span style={{ color: "#196795", fontWeight: "bold" }}>{job.salary}</span></p>
        <p style={{ margin: "6px 0" }}><strong>Posted on:</strong> {job.date}</p>
      </div>

      {/* Apply Button */}
      <div style={{
        marginTop: "25px",
        textAlign: "center",
      }}>
        <button style={{
          backgroundColor: "#196795",
          color: "#fff",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          width: "100%",
          transition: "background-color 0.3s",
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = "#155a7a"}
        onMouseOut={e => e.currentTarget.style.backgroundColor = "#196795"}
        >
          Apply for this Job
        </button>
      </div>

      {/* Key Responsibilities */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Key Responsibilities</h3>
        <ul style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
          {job.key_responsibilities.map((resp, index) => (
            <li key={index} style={{ marginBottom: "6px" }}>{resp}</li>
          ))}
        </ul>
      </div>

      {/* Skills Required */}
      <div style={{ marginTop: "25px" }}>
        <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Skills Required</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {job.skills_required.map((skill, index) => (
            <span key={index} style={{
              backgroundColor: "#f1f3f5",
              padding: "8px 14px",
              borderRadius: "20px",
              fontSize: "13px",
              color: "#333",
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Close Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button onClick={onClose} style={{
          backgroundColor: "#ddd",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
        }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailsModal;
