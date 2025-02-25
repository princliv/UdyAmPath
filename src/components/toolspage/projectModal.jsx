import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import project1 from "../../assets/toolpage/project1.png";
import project2 from "../../assets/toolpage/project2.png";
import project3 from "../../assets/toolpage/project3.png";

// Map keys to locally imported images
const imageMapping = {
  image1: project1,
  image2: project2,
  image3: project3,
};

const ProjectModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state;

  if (!project) {
    navigate("/");
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3f4f6, #ffffff)",
        padding: "30px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: "750px",
          width: "90%",
          textAlign: "center",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#edf2f7",
            color: "#4a5568",
            padding: "10px 20px",
            border: "1px solid #cbd5e0",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s",
            marginBottom: "20px",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#e2e8f0")}
          onMouseLeave={(e) => (e.target.style.background = "#edf2f7")}
        >
          ← Back
        </button>

        {/* Project Title */}
        <h2 style={{ color: "#2d3748", fontSize: "28px", fontWeight: "bold", marginBottom: "15px" }}>
          {project.title}
        </h2>

        {/* Project Image */}
        <img
          src={imageMapping[project.image]}
          alt={project.title}
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "auto",
            borderRadius: "12px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        />

        {/* Description */}
        <p style={{ fontSize: "18px", color: "#4a5568", marginBottom: "20px" }}>
          {project.description}
        </p>

        {/* Tech Stack Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            background: "#f7fafc",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <strong style={{ color: "#718096" }}>Frontend:</strong>
            <br />
            <span style={{ color: "#2d3748", fontSize: "14px" }}>{project.frontend}</span>
          </div>
          <div style={{ textAlign: "left" }}>
            <strong style={{ color: "#718096" }}>Backend:</strong>
            <br />
            <span style={{ color: "#2d3748", fontSize: "14px" }}>{project.backend}</span>
          </div>
          <div style={{ textAlign: "left" }}>
            <strong style={{ color: "#718096" }}>Database:</strong>
            <br />
            <span style={{ color: "#2d3748", fontSize: "14px" }}>{project.database}</span>
          </div>
        </div>

        {/* Project Details */}
        <div
          style={{
            textAlign: "left",
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h3 style={{ fontSize: "20px", color: "#2d3748", marginBottom: "10px" }}>Project Details</h3>
          <p style={{ fontSize: "16px", color: "#4a5568", lineHeight: "1.6" }}>{project.details}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
